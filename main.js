const homeNav = document.getElementById("home-nav");
const profileNav = document.getElementById("profile-nav");
const questionsNav = document.getElementById("questions-nav");
const resultsNav = document.getElementById("results-nav");
const scoreboardNav = document.getElementById("scoreboard-nav");

const homeDiv = document.getElementById("home");
const profileDiv = document.getElementById("profile");
const questionsDiv = document.getElementById("questions");
const resultsDiv = document.getElementById("results");
const scoreboardDiv = document.getElementById("scoreboard");

const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question-element");
const answerButtons = document.getElementById("answer-buttons");

const questionTitle = document.getElementById("question-title");
let currentQuestionIndex;
let correctAnswersCount = 0;
function hideViews() {
  homeDiv.classList.add("d-none");
  profileDiv.classList.add("d-none");
  questionsDiv.classList.add("d-none");
  resultsDiv.classList.add("d-none");
  scoreboardDiv.classList.add("d-none");
}

function goHome() {
  hideViews();
  homeDiv.classList.remove("d-none");
}

function goProfile() {
  hideViews();
  profileDiv.classList.remove("d-none");
}

function goQuestions() {
  hideViews();
  questionsDiv.classList.remove("d-none");
}

function goResults() {
  hideViews();
  resultsDiv.classList.remove("d-none");
  document.getElementById(
    "results-correct-count"
  ).textContent = `You got ${correctAnswersCount} answers right`;

  createResultsChart(
    correctAnswersCount,
    questions.length - correctAnswersCount
  );
}

function createResultsChart(correctCount, incorrectCount) {
  const resultsChartCanvas = document.getElementById("results-chart");

  if (resultsChartCanvas.chart) {
    resultsChartCanvas.chart.destroy();
  }

  resultsChartCanvas.chart = new Chart(resultsChartCanvas, {
    type: "doughnut",
    data: {
      labels: ["Correct", "Incorrect"],
      datasets: [
        {
          label: "Answers",
          data: [correctCount, incorrectCount],
          backgroundColor: ["lightblue", "pink"],
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}

function goScoreboard() {
  hideViews();
  scoreboardDiv.classList.remove("d-none");
}

let questions = [];
axios
  .get(
    "https://opentdb.com/api.php?amount=10&category=15&difficulty=hard&type=multiple"
  )
  .then((res) => {
    questions = res.data.results;
  })
  .catch((err) => console.error(err));

function resetState() {
  nextButton.classList.add("d-none");
  answerButtons.innerHTML = "";
}

const correctAudio = new Audio("assets/audio/correct_audio.mp3");
const incorrectAudio = new Audio("assets/audio/incorrect_audio.mp3");

function setStatusClass(element) {
  if (element.dataset.correct) {
    element.classList.replace("btn-warning", "btn-success");
  } else {
    element.classList.add("btn-danger");
    incorrectAudio.play();
  }
}

function showQuestion(question) {
  const questionTitle = document.getElementById("question-title");
  questionTitle.innerHTML = `Question ${currentQuestionIndex + 1}`;
  const answers = [];
  questionElement.innerHTML = question.question;
  answers.push({ text: question.correct_answer, correct: true });

  question.incorrect_answers.forEach((answer) => {
    answers.push({ text: answer, correct: false });
  });
  answers.sort(() => Math.random() - 0.5);

  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("btn", "btn-lg", "btn-warning");
    button.innerHTML = answer.text;
    if (answer.correct) {
      button.dataset.correct = "true";
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function selectAnswer() {
  const selectedButton = this;

  Array.from(answerButtons.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct === "true");
    button.disabled = true;
  });

  if (selectedButton.dataset.correct === "true") {
    correctAnswersCount++;
  }

  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("d-none");
  } else {
    startButton.innerHTML = "Restart";
    startButton.classList.remove("d-none");
    startButton.classList.replace("btn-warning", "btn-info");
    startButton.classList.replace("btn-outline-warning", "btn-outline-info");
    goResults();
  }
}

function setNextQuestion() {
  resetState();
  if (currentQuestionIndex === questions.length) {
    goResults();
  } else {
    showQuestion(questions[currentQuestionIndex]);
  }
}

function startGame() {
  resetState();
  currentQuestionIndex = 0;
  startButton.classList.add("d-none");
  questionContainer.classList.remove("d-none");
  setNextQuestion();
  homeDiv.classList.add("d-none");
}
startButton.addEventListener("click", goQuestions);
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

homeNav.addEventListener("click", goHome);
questionsNav.addEventListener("click", goQuestions);
resultsNav.addEventListener("click", goResults);
scoreboardNav.addEventListener("click", goScoreboard);
profileNav.addEventListener("click", goProfile);
