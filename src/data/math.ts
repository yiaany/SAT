import type { Section } from "./types";

function ex(
  id: string,
  type: "mc" | "fill" | "choose",
  q: string,
  answer: number | string,
  exp: string,
  opts?: string[]
) {
  return { id, type, q, opts, answer, exp };
}

export const MATH_SECTIONS: Section[] = [
  {
    id: "m1",
    domain: "math",
    title: "Algebra",
    shortTitle: "Algebra",
    description:
      "Линейные уравнения, системы, неравенства и связи между переменными — ядро Digital SAT Math.",
    color: "#0075de",
    lessons: [
      {
        id: "m1l1",
        title: "Linear Equations in One Variable",
        difficulty: "easy",
        theory: `<b>1. СУТЬ</b><br>Линейное уравнение: ax + b = c. Цель — изолировать x.<br><br>
<b>2. АЛГОРИТМ</b><br>• Раскрой скобки<br>• Собери like terms<br>• Перенеси константы<br>• Раздели на коэффициент при x<br><br>
<b>3. SAT TRAPS</b><br>🔴 Дроби: умножь обе части на НОК<br>🔴 Знак минус при раскрытии скобок<br>🔴 Уравнение без решения / бесконечно много решений`,
        examples: [
          "<b>3x − 7 = 11</b> → 3x = 18 → x = 6",
          "<b>(x/2) + 5 = 9</b> → x/2 = 4 → x = 8",
        ],
        exercises: [
          ex("m1l1e1", "mc", "Solve: 4x − 9 = 15", 2, "4x = 24 → x = 6", [
            "x = 4",
            "x = 5",
            "x = 6",
            "x = 7",
          ]),
          ex("m1l1e2", "fill", "Solve: 2(x + 3) = 18. x = ?", "6", "x+3=9 → x=6"),
          ex("m1l1e3", "mc", "3x + 5 = 2x + 12. x = ?", 0, "x = 7", [
            "7",
            "5",
            "17",
            "−7",
          ]),
          ex(
            "m1l1e4",
            "mc",
            "Which has no solution?",
            1,
            "2x+3=2x+5 → 3=5 false",
            ["2x+1=5", "2x+3=2x+5", "x−1=x−1", "3x=0"]
          ),
        ],
      },
      {
        id: "m1l2",
        title: "Linear Equations in Two Variables",
        difficulty: "easy",
        theory: `<b>1. СУТЬ</b><br>y = mx + b: m — slope, b — y-intercept.<br><br>
<b>2. SLOPE</b><br>m = (y₂ − y₁)/(x₂ − x₁)<br>Parallel → same m. Perpendicular → m₁·m₂ = −1<br><br>
<b>3. SAT</b><br>🔴 Word problems → define variables first<br>🔴 Point-slope form: y − y₁ = m(x − x₁)`,
        examples: [
          "Through (2,3) and (4,7): m = 2 → y − 3 = 2(x − 2)",
          "Parallel to y=3x+1 through (0,5): y=3x+5",
        ],
        exercises: [
          ex(
            "m1l2e1",
            "mc",
            "Slope through (1,2) and (3,8)?",
            2,
            "(8-2)/(3-1)=3",
            ["1", "2", "3", "4"]
          ),
          ex(
            "m1l2e2",
            "mc",
            "y-intercept of y = −2x + 5?",
            1,
            "b = 5",
            ["−2", "5", "2", "0"]
          ),
          ex(
            "m1l2e3",
            "fill",
            "Line parallel to y=4x−1 through (0,3). Slope m=?",
            "4",
            "Parallel → same slope"
          ),
          ex(
            "m1l2e4",
            "mc",
            "Perpendicular to slope 2 has slope:",
            2,
            "−1/2",
            ["2", "1/2", "−1/2", "−2"]
          ),
        ],
      },
      {
        id: "m1l3",
        title: "Systems of Linear Equations",
        difficulty: "medium",
        theory: `<b>1. МЕТОДЫ</b><br>• Substitution<br>• Elimination<br>• Graphing (intersection)<br><br>
<b>2. SPECIAL CASES</b><br>• No solution: parallel lines<br>• Infinite: same line<br><br>
<b>3. SAT TIP</b><br>Если спрашивают x+y или x−y — иногда не нужно находить x и y отдельно.`,
        examples: [
          "x+y=10, x−y=4 → add: 2x=14 → x=7, y=3",
          "2x+3y=6 and 4x+6y=12 → infinite solutions",
        ],
        exercises: [
          ex(
            "m1l3e1",
            "mc",
            "x + y = 10, x − y = 2. x = ?",
            1,
            "2x=12 → x=6",
            ["5", "6", "4", "8"]
          ),
          ex(
            "m1l3e2",
            "fill",
            "x+y=7, x−y=1. y=?",
            "3",
            "2y=6 → y=3"
          ),
          ex(
            "m1l3e3",
            "mc",
            "2x+y=5, 4x+2y=10 has:",
            2,
            "Second = 2× first → infinite",
            ["1 solution", "no solution", "infinite", "2 solutions"]
          ),
          ex(
            "m1l3e4",
            "mc",
            "x+2y=8, x+2y=5 has:",
            0,
            "Contradiction → no solution",
            ["no solution", "one", "infinite", "two"]
          ),
        ],
      },
      {
        id: "m1l4",
        title: "Linear Inequalities",
        difficulty: "medium",
        theory: `<b>1. ПРАВИЛА</b><br>• Как уравнения, НО: при умножении/делении на отрицательное — flip inequality<br>• Graph: open/closed circle, shaded region<br><br>
<b>2. SYSTEMS</b><br>Пересечение полуплоскостей / overlapping intervals`,
        examples: [
          "−2x > 6 → divide by −2 → x < −3",
          "x ≥ 2 and x < 5 → [2, 5)",
        ],
        exercises: [
          ex(
            "m1l4e1",
            "mc",
            "−3x ≤ 9. Solution:",
            1,
            "x ≥ −3 (flip!)",
            ["x ≤ −3", "x ≥ −3", "x ≤ 3", "x ≥ 3"]
          ),
          ex(
            "m1l4e2",
            "fill",
            "2x + 4 > 10. x > ?",
            "3",
            "2x>6 → x>3"
          ),
          ex(
            "m1l4e3",
            "mc",
            "Which is true for x=0 in x>−1 and x≤2?",
            0,
            "0 is in (−1, 2]",
            ["true", "false"]
          ),
          ex(
            "m1l4e4",
            "mc",
            "Graph of x < 5 uses:",
            0,
            "Open circle at 5",
            ["open circle", "closed circle", "solid line only", "nothing"]
          ),
        ],
      },
      {
        id: "m1l5",
        title: "Absolute Value Equations",
        difficulty: "medium",
        theory: `<b>|A| = k</b> (k≥0) → A = k or A = −k<br>
<b>|A| = |B|</b> → A = B or A = −B<br>
Если k < 0 → no solution`,
        examples: [
          "|x−3|=5 → x−3=5 or x−3=−5 → x=8 or x=−2",
          "|2x+1|=−4 → no solution",
        ],
        exercises: [
          ex(
            "m1l5e1",
            "mc",
            "|x−4|=6. Solutions sum?",
            2,
            "x=10 or x=−2 → sum=8",
            ["4", "6", "8", "10"]
          ),
          ex(
            "m1l5e2",
            "fill",
            "|x|=0. x=?",
            "0",
            "Only zero"
          ),
          ex(
            "m1l5e3",
            "mc",
            "|x+1|=−2 has how many solutions?",
            0,
            "k<0 → none",
            ["0", "1", "2", "infinite"]
          ),
          ex(
            "m1l5e4",
            "mc",
            "|2x|=10. Positive solution?",
            1,
            "x=5",
            ["2", "5", "10", "20"]
          ),
        ],
      },
    ],
  },
  {
    id: "m2",
    domain: "math",
    title: "Advanced Math",
    shortTitle: "Advanced",
    description:
      "Квадратные уравнения, функции, экспоненты, полиномы — ~35% Math section.",
    color: "#7c3aed",
    lessons: [
      {
        id: "m2l1",
        title: "Quadratic Equations",
        difficulty: "medium",
        theory: `<b>1. ФОРМЫ</b><br>• Standard: ax²+bx+c=0<br>• Factored: a(x−r)(x−s)=0<br>• Vertex: a(x−h)²+k<br><br>
<b>2. РЕШЕНИЯ</b><br>• Factoring<br>• Quadratic formula: x = (−b±√(b²−4ac))/(2a)<br>• Completing the square<br><br>
<b>3. DISCRIMINANT</b><br>D>0 two real; D=0 one; D<0 none (real)`,
        examples: [
          "x²−5x+6=0 → (x−2)(x−3)=0 → x=2,3",
          "Vertex of y=x²−4x+1: h=2, k=−3",
        ],
        exercises: [
          ex(
            "m2l1e1",
            "mc",
            "Roots of x² − 5x + 6 = 0?",
            0,
            "2 and 3",
            ["2 and 3", "1 and 6", "−2 and −3", "0 and 5"]
          ),
          ex(
            "m2l1e2",
            "fill",
            "Sum of roots of x² − 7x + 10 = 0?",
            "7",
            "Sum = −b/a = 7"
          ),
          ex(
            "m2l1e3",
            "mc",
            "Discriminant of x²+2x+5?",
            2,
            "4−20=−16 < 0",
            ["positive", "zero", "negative", "undefined"]
          ),
          ex(
            "m2l1e4",
            "mc",
            "Vertex x-coordinate of y=x²−6x+2?",
            1,
            "h=−b/2a=3",
            ["2", "3", "6", "−3"]
          ),
        ],
      },
      {
        id: "m2l2",
        title: "Nonlinear Functions",
        difficulty: "medium",
        theory: `<b>EXPONENTIAL</b> y = a·bˣ<br>
<b>RADICAL</b> domain of √x: x≥0<br>
<b>RATIONAL</b> undefined when denominator = 0<br>
SAT: compare growth, find intercepts, interpret parameters`,
        examples: [
          "f(x)=3·2ˣ doubles each step from 3",
          "g(x)=1/(x−2) undefined at x=2",
        ],
        exercises: [
          ex(
            "m2l2e1",
            "mc",
            "f(x)=2ˣ. f(3)=?",
            2,
            "8",
            ["4", "6", "8", "9"]
          ),
          ex(
            "m2l2e2",
            "fill",
            "Domain restriction for 1/(x−4): x ≠ ?",
            "4",
            "Denominator ≠ 0"
          ),
          ex(
            "m2l2e3",
            "mc",
            "Which grows faster for large x?",
            1,
            "Exponential beats linear",
            ["y=100x", "y=2ˣ", "y=1000", "y=x+1000"]
          ),
          ex(
            "m2l2e4",
            "mc",
            "√(x−1) defined when x:",
            2,
            "x≥1",
            [">1", "<1", "≥1", "any"]
          ),
        ],
      },
      {
        id: "m2l3",
        title: "Polynomials & Factoring",
        difficulty: "medium",
        theory: `<b>FACTORING</b><br>• GCF first<br>• Difference of squares: a²−b²=(a−b)(a+b)<br>• Trinomials: find factors of ac that sum to b<br><br>
<b>REMAINDER THEOREM</b><br>f(a) = remainder when divided by (x−a)`,
        examples: [
          "x²−9=(x−3)(x+3)",
          "x³−x = x(x−1)(x+1)",
        ],
        exercises: [
          ex(
            "m2l3e1",
            "mc",
            "Factor x² − 16",
            0,
            "(x−4)(x+4)",
            ["(x−4)(x+4)", "(x−8)(x+2)", "(x−16)(x+1)", "prime"]
          ),
          ex(
            "m2l3e2",
            "fill",
            "GCF of 12x³ and 18x²?",
            "6x^2",
            "6x²"
          ),
          ex(
            "m2l3e3",
            "mc",
            "If f(2)=0 then (x−2) is a:",
            0,
            "Factor by factor theorem",
            ["factor", "remainder", "asymptote", "vertex"]
          ),
          ex(
            "m2l3e4",
            "mc",
            "x²+5x+6 =",
            1,
            "(x+2)(x+3)",
            ["(x+1)(x+6)", "(x+2)(x+3)", "(x−2)(x−3)", "(x+5)(x+1)"]
          ),
        ],
      },
      {
        id: "m2l4",
        title: "Exponents & Radicals",
        difficulty: "easy",
        theory: `<b>LAWS</b><br>aᵐ·aⁿ=aᵐ⁺ⁿ<br>aᵐ/aⁿ=aᵐ⁻ⁿ<br>(aᵐ)ⁿ=aᵐⁿ<br>a⁰=1<br>a⁻ⁿ=1/aⁿ<br>√a = a^(1/2)`,
        examples: [
          "2³·2⁴=2⁷=128",
          "√50 = 5√2",
        ],
        exercises: [
          ex(
            "m2l4e1",
            "mc",
            "2⁵ · 2³ = ?",
            2,
            "2⁸=256",
            ["2¹⁵", "64", "256", "32"]
          ),
          ex(
            "m2l4e2",
            "fill",
            "3⁻² as fraction?",
            "1/9",
            "1/3²=1/9"
          ),
          ex(
            "m2l4e3",
            "mc",
            "√72 simplified:",
            1,
            "6√2",
            ["8√2", "6√2", "36√2", "3√8"]
          ),
          ex(
            "m2l4e4",
            "mc",
            "(x³)⁴ =",
            0,
            "x¹²",
            ["x¹²", "x⁷", "x⁶⁴", "4x³"]
          ),
        ],
      },
    ],
  },
  {
    id: "m3",
    domain: "math",
    title: "Problem-Solving & Data Analysis",
    shortTitle: "Data",
    description:
      "Проценты, ratios, статистика, вероятность, интерпретация графиков и таблиц.",
    color: "#059669",
    lessons: [
      {
        id: "m3l1",
        title: "Ratios, Rates & Proportions",
        difficulty: "easy",
        theory: `<b>RATIO</b> a:b = a/b<br>
<b>PROPORTION</b> a/b = c/d → ad = bc<br>
<b>UNIT RATE</b> divide to per-one<br>
SAT loves unit conversions and mixture rates.`,
        examples: [
          "3:5 = x:20 → x=12",
          "60 miles / 1.5 hr = 40 mph",
        ],
        exercises: [
          ex(
            "m3l1e1",
            "mc",
            "If 3/5 = x/20, x=?",
            1,
            "x=12",
            ["10", "12", "15", "18"]
          ),
          ex(
            "m3l1e2",
            "fill",
            "120 km in 2 hours. Speed km/h?",
            "60",
            "120/2=60"
          ),
          ex(
            "m3l1e3",
            "mc",
            "Recipe 2:3 flour:sugar. 10 cups flour → sugar?",
            2,
            "15 cups",
            ["12", "10", "15", "6"]
          ),
          ex(
            "m3l1e4",
            "mc",
            "Scale 1:50. 2 cm on map = real cm?",
            2,
            "100 cm",
            ["25", "50", "100", "200"]
          ),
        ],
      },
      {
        id: "m3l2",
        title: "Percents & Percent Change",
        difficulty: "easy",
        theory: `<b>%</b> = part/whole × 100<br>
Increase: new = old(1+r)<br>
Decrease: new = old(1−r)<br>
% change = (new−old)/old × 100<br>
Successive: multiply factors, don't add %`,
        examples: [
          "20% off $80 → $64",
          "+10% then −10% ≠ original (×1.1×0.9=0.99)",
        ],
        exercises: [
          ex(
            "m3l2e1",
            "mc",
            "30% of 80?",
            1,
            "24",
            ["20", "24", "30", "40"]
          ),
          ex(
            "m3l2e2",
            "fill",
            "Price $50 up 20%. New price?",
            "60",
            "50×1.2=60"
          ),
          ex(
            "m3l2e3",
            "mc",
            "From 40 to 50 is what % increase?",
            0,
            "10/40=25%",
            ["25%", "20%", "10%", "80%"]
          ),
          ex(
            "m3l2e4",
            "mc",
            "After +10% and −10%, $100 becomes:",
            1,
            "$99",
            ["100", "99", "101", "90"]
          ),
        ],
      },
      {
        id: "m3l3",
        title: "Statistics: Mean, Median, Mode",
        difficulty: "medium",
        theory: `<b>MEAN</b> average<br>
<b>MEDIAN</b> middle (sorted)<br>
<b>MODE</b> most frequent<br>
<b>RANGE</b> max−min<br>
Outliers pull mean more than median.`,
        examples: [
          "2,3,3,5,12 → mean=5, median=3, mode=3",
          "Adding outlier increases mean",
        ],
        exercises: [
          ex(
            "m3l3e1",
            "mc",
            "Mean of 4, 6, 8, 10?",
            1,
            "28/4=7",
            ["6", "7", "8", "9"]
          ),
          ex(
            "m3l3e2",
            "fill",
            "Median of 1,3,7,9,11?",
            "7",
            "Middle value"
          ),
          ex(
            "m3l3e3",
            "mc",
            "Mode of 2,2,3,5,5,5,7?",
            2,
            "5 appears thrice",
            ["2", "3", "5", "7"]
          ),
          ex(
            "m3l3e4",
            "mc",
            "Range of 3, 8, 15, 20?",
            1,
            "20−3=17",
            ["15", "17", "12", "23"]
          ),
        ],
      },
      {
        id: "m3l4",
        title: "Probability & Two-Way Tables",
        difficulty: "medium",
        theory: `<b>P(A)</b> = favorable / total<br>
Independent: P(A and B)=P(A)P(B)<br>
Conditional: P(A|B)=P(A and B)/P(B)<br>
Read two-way tables carefully — total rows/columns`,
        examples: [
          "Die: P(even)=3/6=1/2",
          "Table: 20 of 50 students play sports → 0.4",
        ],
        exercises: [
          ex(
            "m3l4e1",
            "mc",
            "P(rolling 6 on fair die)?",
            0,
            "1/6",
            ["1/6", "1/3", "1/2", "1"]
          ),
          ex(
            "m3l4e2",
            "fill",
            "Bag: 3 red, 2 blue. P(red)=? (as decimal 0.x)",
            "0.6",
            "3/5=0.6"
          ),
          ex(
            "m3l4e3",
            "mc",
            "Two coins. P(two heads)?",
            1,
            "1/4",
            ["1/2", "1/4", "1/3", "1"]
          ),
          ex(
            "m3l4e4",
            "mc",
            "P(A)=0.5, P(B)=0.4 independent. P(both)?",
            0,
            "0.2",
            ["0.2", "0.9", "0.1", "0.4"]
          ),
        ],
      },
      {
        id: "m3l5",
        title: "Scatterplots & Linear Models",
        difficulty: "medium",
        theory: `<b>SCATTERPLOT</b> strength & direction of association<br>
<b>LINE OF BEST FIT</b> y = mx + b approximates trend<br>
<b>RESIDUAL</b> actual − predicted<br>
Correlation ≠ causation`,
        examples: [
          "Positive association: study hours ↑, score ↑",
          "Predict with plug-in to regression line",
        ],
        exercises: [
          ex(
            "m3l5e1",
            "mc",
            "Strong positive correlation means:",
            0,
            "Both increase together tightly",
            [
              "as x↑ y↑ closely",
              "as x↑ y↓",
              "no pattern",
              "causation proven",
            ]
          ),
          ex(
            "m3l5e2",
            "fill",
            "If ŷ=2x+1, predict y when x=4",
            "9",
            "8+1=9"
          ),
          ex(
            "m3l5e3",
            "mc",
            "Residual when actual=10, predicted=8?",
            0,
            "10−8=2",
            ["2", "−2", "8", "18"]
          ),
          ex(
            "m3l5e4",
            "mc",
            "Correlation implies causation?",
            1,
            "No",
            ["yes", "no"]
          ),
        ],
      },
    ],
  },
  {
    id: "m4",
    domain: "math",
    title: "Geometry & Trigonometry",
    shortTitle: "Geo/Trig",
    description:
      "Площади, объёмы, углы, круги, прямоугольные треугольники и базовая тригонометрия.",
    color: "#ea580c",
    lessons: [
      {
        id: "m4l1",
        title: "Lines, Angles & Triangles",
        difficulty: "easy",
        theory: `<b>ANGLES</b><br>Vertical equal; linear pair = 180°<br>
Parallel + transversal: corresponding equal<br>
<b>TRIANGLES</b><br>Sum = 180°<br>
Similar → proportional sides<br>
Pythagorean: a²+b²=c²`,
        examples: [
          "3-4-5 right triangle",
          "Exterior angle = sum of remote interiors",
        ],
        exercises: [
          ex(
            "m4l1e1",
            "mc",
            "Angles in triangle sum to:",
            2,
            "180°",
            ["90", "360", "180", "270"]
          ),
          ex(
            "m4l1e2",
            "fill",
            "Right triangle legs 6 and 8. Hypotenuse?",
            "10",
            "6-8-10"
          ),
          ex(
            "m4l1e3",
            "mc",
            "Isosceles base angles equal. Vertex 40°. Base angle?",
            1,
            "(180-40)/2=70",
            ["40", "70", "80", "140"]
          ),
          ex(
            "m4l1e4",
            "mc",
            "Vertical angles are:",
            0,
            "Equal",
            ["equal", "supplementary", "complementary", "always 90"]
          ),
        ],
      },
      {
        id: "m4l2",
        title: "Area, Volume & Circles",
        difficulty: "medium",
        theory: `<b>AREA</b> rect=lw; triangle=½bh; circle=πr²<br>
<b>CIRCUMFERENCE</b> 2πr<br>
<b>VOLUME</b> prism=Bh; cylinder=πr²h; sphere=4/3πr³; cone=⅓πr²h<br>
SAT gives reference sheet — still know when to use which.`,
        examples: [
          "Circle r=3 → A=9π",
          "Cylinder r=2 h=5 → V=20π",
        ],
        exercises: [
          ex(
            "m4l2e1",
            "mc",
            "Area of circle r=4?",
            1,
            "16π",
            ["8π", "16π", "4π", "32π"]
          ),
          ex(
            "m4l2e2",
            "fill",
            "Rectangle 5 by 8. Area?",
            "40",
            "5×8"
          ),
          ex(
            "m4l2e3",
            "mc",
            "Volume rectangular box 2×3×4?",
            2,
            "24",
            ["9", "12", "24", "36"]
          ),
          ex(
            "m4l2e4",
            "mc",
            "Circumference r=5?",
            0,
            "10π",
            ["10π", "25π", "5π", "15π"]
          ),
        ],
      },
      {
        id: "m4l3",
        title: "Right Triangle Trigonometry",
        difficulty: "medium",
        theory: `<b>SOH-CAH-TOA</b><br>
sin = opp/hyp<br>
cos = adj/hyp<br>
tan = opp/adj<br>
Complementary: sinθ = cos(90°−θ)`,
        examples: [
          "30-60-90: sides 1 : √3 : 2",
          "45-45-90: 1 : 1 : √2",
        ],
        exercises: [
          ex(
            "m4l3e1",
            "mc",
            "In right triangle, sin of angle with opp=3 hyp=5?",
            0,
            "3/5",
            ["3/5", "4/5", "3/4", "5/3"]
          ),
          ex(
            "m4l3e2",
            "fill",
            "cos of angle adj=4 hyp=5?",
            "4/5",
            "adj/hyp"
          ),
          ex(
            "m4l3e3",
            "mc",
            "tan = ?",
            1,
            "opp/adj",
            ["opp/hyp", "opp/adj", "adj/hyp", "hyp/opp"]
          ),
          ex(
            "m4l3e4",
            "mc",
            "sin 30° = ?",
            0,
            "1/2",
            ["1/2", "√3/2", "1", "√2/2"]
          ),
        ],
      },
      {
        id: "m4l4",
        title: "Coordinate Geometry",
        difficulty: "medium",
        theory: `<b>DISTANCE</b> √[(x₂−x₁)²+(y₂−y₁)²]<br>
<b>MIDPOINT</b> ((x₁+x₂)/2, (y₁+y₂)/2)<br>
Circle center (h,k) radius r: (x−h)²+(y−k)²=r²`,
        examples: [
          "Distance (0,0) to (3,4) = 5",
          "Midpoint (2,4) and (6,8) = (4,6)",
        ],
        exercises: [
          ex(
            "m4l4e1",
            "mc",
            "Distance (0,0) to (6,8)?",
            2,
            "10",
            ["7", "8", "10", "14"]
          ),
          ex(
            "m4l4e2",
            "fill",
            "Midpoint of (0,0) and (4,6). x-coordinate?",
            "2",
            "(0+4)/2=2"
          ),
          ex(
            "m4l4e3",
            "mc",
            "Circle (x−1)²+(y+2)²=9. Radius?",
            1,
            "3",
            ["9", "3", "1", "√9 only if center origin"]
          ),
          ex(
            "m4l4e4",
            "mc",
            "Center of (x+3)²+(y−5)²=4?",
            0,
            "(−3, 5)",
            ["(−3,5)", "(3,−5)", "(3,5)", "(−3,−5)"]
          ),
        ],
      },
    ],
  },
];
