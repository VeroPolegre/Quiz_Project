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

profileNav.addEventListener("click", goProfile);
homeNav.addEventListener("click", goHome);
questionsNav.addEventListener("click", goQuestions);
resultsNav.addEventListener("click", goResults);
friendsNav.addEventListener("click", goFriends);
