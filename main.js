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

function goProfile() {
  homeDiv.classList.add("hidden");
  profileDiv.classList.remove("hidden");
}

function goHome() {
  homeDiv.classList.remove("hidden");
  profileDiv.classList.add("hidden");
}

profileNav.addEventListener("click", goProfile);
homeNav.addEventListener("click", goHome);
