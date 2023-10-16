const homeNav = document.getElementById("home-nav");
const profileNav = document.getElementById("profile-nav");
const questionsNav = document.getElementById("questions-nav");
const resultsNav = document.getElementById("results-nav");
const friendsNav = document.getElementById("friends-nav");

const homeDiv = document.getElementById("home");
const profileDiv = document.getElementById("profile");
const questionsDiv = document.getElementById("questions");
const resultsDiv = document.getElementById("results");
const friendsDiv = document.getElementById("friends");

const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question-element");
const answerButtons = document.getElementById("answer-buttons");

const questionTitle = document.getElementById("question-title");
let currentQuestionIndex;

function hideViews() {
  homeDiv.classList.add("hidden");
  profileDiv.classList.add("hidden");
  questionsDiv.classList.add("hidden");
  resultsDiv.classList.add("hidden");
  friendsDiv.classList.add("hidden");
}

function goHome() {
  hideViews();
  homeDiv.classList.remove("hidden");
}

function goProfile() {
  hideViews();
  profileDiv.classList.remove("hidden");
}

function goQuestions() {
  hideViews();
  questionsDiv.classList.remove("hidden");
}

function goResults() {
  hideViews();
  resultsDiv.classList.remove("hidden");
}

function goFriends() {
  hideViews();
  friendsDiv.classList.remove("hidden");
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
  nextButton.classList.add("hidden");
  answerButtons.innerHTML = "";
}

function setStatusClass(element) {
  if (element.dataset.correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}
//
function showQuestion(question) {
  const answers = [];
  questionElement.innerText = question.question;
  answers.push({ text: question.correct_answer, correct: true });

  question.incorrect_answers.forEach((answer) => {
    answers.push({ text: answer, correct: false });
  });
  answers.sort(() => Math.random() - 0.5);

  // Create buttons for each answer
  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    if (answer.correct) {
      button.dataset.correct = "true";
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function selectAnswer() {
  Array.from(answerButtons.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct === "true");
  });
  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hidden");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hidden");
  }
}
function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function startGame() {
  resetState();
  currentQuestionIndex = 0;
  startButton.classList.add("hidden");
  questionContainer.classList.remove("hidden");
  setNextQuestion();
}

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

homeNav.addEventListener("click", goHome);
profileNav.addEventListener("click", goProfile);
questionsNav.addEventListener("click", goQuestions);
resultsNav.addEventListener("click", goResults);
friendsNav.addEventListener("click", goFriends);
