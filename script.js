// Chaque réponse est associée à un philosophe :
// "d" = Démocrite, "h" = Héraclite
const questions = [
  {
    question: "Ta sortie du samedi est annulée à la dernière minute. Tu…",
    answers: [
      { text: "Hausses les épaules, ris et trouves autre chose à faire.", type: "d" },
      { text: "Es agacé·e, mais tu te dis que rien ne se passe jamais comme prévu, et que c'est ça la vie.", type: "h" }
    ]
  },
  {
    question: "À un anniversaire avec plein de monde, tu es plutôt…",
    answers: [
      { text: "Un peu à l'écart pour observer, et tu t'ennuies quand ça parle de choses sans importance.", type: "h" },
      { text: "Au milieu du groupe, à faire des blagues et à t'amuser avec tout le monde.", type: "d" }
    ]
  },
  {
    question: "Dans un exposé en groupe, vous n'êtes pas d'accord. Tu…",
    answers: [
      { text: "Fais une blague pour détendre l'ambiance et cherches un compromis.", type: "d" },
      { text: "Défends ton idée jusqu'au bout : c'est en discutant fort qu'on trouve la meilleure solution.", type: "h" }
    ]
  },
  {
    question: "Pour toi, le monde fonctionne comment ?",
    answers: [
      { text: "Rien ne reste jamais pareil : le monde change tout le temps, et ça me motive à le comprendre.", type: "h" },
      { text: "Tout est fait de petites choses simples qui s'assemblent, pas besoin de chercher un grand mystère.", type: "d" }
    ]
  },
  {
    question: "Le collège, pour toi, c'est…",
    answers: [
      { text: "Un endroit où tout bouge sans arrêt : les classes, les amitiés, les humeurs. C'est ça qui le rend intéressant.", type: "h" },
      { text: "Un endroit plutôt sympa, où tu as tes repères et où tu profites des bons moments : récré, cantine, copains.", type: "d" }
    ]
  },
  {
    question: "Un camarade fait une gaffe devant toute la classe. Tu…",
    answers: [
      { text: "Souris : tout le monde fait des bêtises, toi aussi.", type: "d" },
      { text: "Soupires : les gens ne réfléchissent pas assez avant d'agir.", type: "h" }
    ]
  },
  {
    question: "Pour toi, être heureux, c'est…",
    answers: [
      { text: "Trouver le juste milieu : ni trop, ni trop peu, et être tranquille.", type: "d" },
      { text: "Vivre à fond, même si ça fait parfois souffrir.", type: "h" }
    ]
  },
  {
    question: "Pour mieux comprendre le monde, tu préfères…",
    answers: [
      { text: "Rester au calme et réfléchir : les réponses sont en toi.", type: "h" },
      { text: "Voyager, rencontrer plein de gens et tout essayer.", type: "d" }
    ]
  },
  {
    question: "Bientôt, c'est le lycée. Tu…",
    answers: [
      { text: "Profites du moment présent sans trop y penser.", type: "d" },
      { text: "Es un peu nostalgique : tout change si vite.", type: "h" }
    ]
  }
];

const results = {
  d: {
    title: "Tu es Démocrite !",
    emoji: "😄",
    text: "Tu gardes ton calme, tu aimes rire et tu ne te prends pas trop au sérieux. Pour toi, mieux vaut profiter de la vie que s'en faire. Comme Démocrite, le philosophe qui rit, tu sais prendre du recul."
  },
  h: {
    title: "Tu es Héraclite !",
    emoji: "🌊",
    text: "Tu ressens les choses fort, tu remarques que tout change autour de toi et tu aimes les grandes discussions. Tu préfères l'intensité à la tranquillité. Comme Héraclite, tu sais que rien ne reste jamais pareil."
  }
};

let current = 0;
let scores = { d: 0, h: 0 };

const introScreen = document.getElementById("intro-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const progressEl = document.getElementById("progress");
const barFill = document.getElementById("bar-fill");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");

function show(screen) {
  [introScreen, quizScreen, resultScreen].forEach(s => s.classList.add("hidden"));
  screen.classList.remove("hidden");
}

function startTest() {
  current = 0;
  scores = { d: 0, h: 0 };
  show(quizScreen);
  showQuestion();
}

function showQuestion() {
  const q = questions[current];
  progressEl.textContent = `Question ${current + 1} / ${questions.length}`;
  barFill.style.width = `${(current / questions.length) * 100}%`;
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;
    btn.addEventListener("click", () => choose(answer.type));
    answersEl.appendChild(btn);
  });
}

function choose(type) {
  scores[type]++;
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const winner = scores.d > scores.h ? "d" : "h";
  const r = results[winner];
  document.getElementById("result-title").textContent = r.title;
  document.getElementById("result-emoji").textContent = r.emoji;
  document.getElementById("result-text").textContent = r.text;
  document.getElementById("result-score").textContent =
    `Démocrite : ${scores.d} réponse(s) · Héraclite : ${scores.h} réponse(s)`;
  show(resultScreen);
}

document.getElementById("start").addEventListener("click", startTest);
document.getElementById("restart").addEventListener("click", () => show(introScreen));
