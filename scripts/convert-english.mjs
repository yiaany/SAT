import fs from "fs";
import vm from "vm";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const code = fs.readFileSync(path.join(root, "scripts", "legacy-data.js"), "utf8");
const ctx = {};
vm.createContext(ctx);
vm.runInContext(code + "\nthis.DATA = DATA;", ctx);
const DATA = ctx.DATA;

const descs = {
  1: "Грамматика, пунктуация, согласование — фундамент R&W.",
  2: "Тон, структура, rhetorical devices и word choice.",
  3: "Main idea, inference, evidence, графики и данные.",
  4: "Concision, transitions, организация и стиль.",
};

const colors = {
  1: "#0075de",
  2: "#7c3aed",
  3: "#059669",
  4: "#ea580c",
};

const sections = DATA.sections.map((s) => ({
  id: `rw${s.id}`,
  domain: "rw",
  title: s.title,
  shortTitle: s.shortTitle || s.title.split(" ")[0],
  description: descs[s.id] || s.title,
  color: colors[s.id] || "#0075de",
  lessons: s.lessons.map((l, li) => ({
    id: l.id,
    title: l.title,
    difficulty: ["easy", "medium", "hard"][li % 3],
    theory: l.theory,
    examples: l.examples || [],
    exercises: (l.exercises || []).map((ex, i) => ({
      id: `${l.id}e${i + 1}`,
      type: ex.type,
      q: ex.q,
      opts: ex.opts,
      answer: ex.answer,
      exp: ex.exp,
    })),
  })),
}));

const out = path.join(root, "src", "data", "english.json");
fs.writeFileSync(out, JSON.stringify(sections));
const lessons = sections.reduce((a, s) => a + s.lessons.length, 0);
console.log(`OK: ${sections.length} sections, ${lessons} lessons → ${out}`);
