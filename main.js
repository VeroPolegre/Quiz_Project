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

function startGame() {
  startButton.classList.add("hidden");
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hidden");
  setNextQuestion();
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

function showQuestion(question) {
  questionElement.innerText = question.question;
  const answers = [];
  answers.push({ text: question.correct_answer, correct: true });
  question.incorrect_answers.forEach((answer) => {
    answers.push({ text: answer });
  });
  console.log(answers);
  // const button = document.createElement("button");
  // button.innerText = answers;
  // if (answer.correct) {
  //   button.dataset.correct = true;
  // }
  // button.addEventListener("click", selectAnswer);
  // answerButtons.appendChild(button);
}

function setNextQuestion() {
  resetState(); //limpiar antes de pintar
  showQuestion(questions[currentQuestionIndex]);
}

function setStatusClass(element) {
  if (element.dataset.correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function selectAnswer() {
  Array.from(answerButtons.children).forEach((button) => {
    setStatusClass(button);
  });
  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hidden");
  } else {
    //grafica resultados
    startButton.innerText = "Restart";
    startButton.classList.remove("hidden");
  }
}

function resetState() {
  nextButton.classList.add("hidden");
  answerButtons.innerHTML = "";
}

profileNav.addEventListener("click", goProfile);
homeNav.addEventListener("click", goHome);
questionsNav.addEventListener("click", goQuestions);
resultsNav.addEventListener("click", goResults);
friendsNav.addEventListener("click", goFriends);

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
