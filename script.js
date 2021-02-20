"strict";

const allQuestions = [
  "Chemistry is a science that studies:",
  "What is matter?",
  "Atom is electrically:",
  "Matter can be broken down into two categories:",
  "An element is a material that consists of how many types of atoms?",
  "Which properties all matter has?",
  "What are the natural states of matter?",
  "What is sublimation?",
  "What is distillation?",
  "Chemical change is:",
  "Who proposed the word atom?",
  "Atoms consist of:",
  "What are proteins made of?",
  "What is the general formula for a carbohydrate?",
  "What is symbol for Chlorine?",
];

const correctAnswers = [
  "Structure, properties, composition and transformation of matter",
  "Everything that takes up space and has mass",
  "Neutral",
  "Pure substances and mixtures",
  "One",
  "Physical and chemical properties",
  "Solids, liquids, gases and plasma",
  "Transition of a substance directly from the solid to the gas state, without passing through the liquid state",
  "The action of purifying a liquid by a process of heating and cooling",
  "Burning of magnesium",
  "Democritus",
  "Protons, neutrons and electrons",
  "Carbon, Hydrogen, Oxygen and Nitrogen",
  "CH2O",
  "CI",
];

let userName;
const givenAnswers = [];
let score = 0;

const main = document.querySelector(".main");
const nameBtn = document.querySelector(".name-button");

// Function for changing visible elements
function changeEl(e) {
  if (e.target.classList.contains(this)) {
    const submitNum = +e.target.dataset.submitAnswer;
    let answerErrorEl;
    if (this == "next-button") {
      answerErrorEl = e.target.closest(".btns-container")
        .previousElementSibling;
    }
    if (this == "next-button" && submitNum === givenAnswers.length) {
      answerErrorEl.classList.remove("hidden");
    } else {
      if (answerErrorEl) answerErrorEl.classList.add("hidden");
      e.target.closest(".section-container").classList.add("hidden");
      e.target
        .closest(".section-container")
        .nextElementSibling.classList.remove("hidden");
    }
  }
}

// Function for calculating score
function calcScore(givenAnswers, correctAnswers) {
  givenAnswers.forEach((answer, i) => {
    if (answer === correctAnswers[i]) {
      score++;
    }
  });
}

// Function for rendering the score
function scoreRender(score) {
  document.querySelector(".score-text").textContent = `${score}/15`;
}

// Function for wrong answers
function wrongAnswersRender(score, givenAnswers, correctAnswers, questions) {
  if (score === allQuestions.length) return;
  const waca = document.querySelector(".wrong-and-correct-answers");
  waca.classList.remove("hidden");

  givenAnswers.forEach((answer, i) => {
    if (answer !== correctAnswers[i]) {
      waca.insertAdjacentHTML(
        "beforeend",
        `
        <div class="waca-question">
        <div class="question-number question-number--results">
          Question ${[i + 1]}/15
        </div>

        <p class="waca-question-text">${questions[i]}</p>

        <span class="answer-label">Your answer</span>

        <p class="waca-answer wrong-answer">
          ${givenAnswers[i]}
          <svg class="wrong-answer-icon">
            <use xlink:href="images/sprite.svg#icon-remove_circle"></use>
          </svg>
        </p>

        <span class="answer-label">Correct answer</span>

        <p class="waca-answer wrong-answer">
          ${correctAnswers[i]}
          <svg class="correct-answer-icon">
            <use xlink:href="images/sprite.svg#icon-check_circle"></use>
          </svg>
        </p>
      </div>
        `
      );
    }
  });
}

// Function for message and image
function resultMessageRender(score, userName) {
  const congratEl = document.querySelector(".congrat");
  const imageContainer = document.querySelector(".container-image");
  const messageTextEl = document.querySelector(".message-text");
  if (score < 9) {
    congratEl.textContent = `Not good ${userName}!`;
    congratEl.classList.add("bad-score");
    imageContainer.style.backgroundImage = "url(images/bad-chemist.jpg)";
    messageTextEl.textContent = `The lab wouldn't survive your explosion, ${userName}!`;
    messageTextEl.classList.add("bad-score");
  } else if (score < 12) {
    congratEl.textContent = `Not bad, but it could've been better, ${userName}!`;
    congratEl.classList.add("moderate-score");
    imageContainer.style.backgroundImage = "url(images/study-more.jfif)";
    messageTextEl.textContent = `You should study some more, ${userName}!`;
    messageTextEl.classList.add("moderate-score");
  } else {
    congratEl.textContent = `Well done, ${userName}!`;
    congratEl.classList.add("good-score");
    imageContainer.style.backgroundImage = "url(images/happy-teacher.jpg)";
    messageTextEl.textContent = `Your Junior School teacher would be proud, ${userName}!`;
    messageTextEl.classList.add("good-score");
  }
}

// EL za start btn
main.addEventListener("click", changeEl.bind("start-button"));

// EL za user name
nameBtn.addEventListener("click", () => {
  userName = document.querySelector(".name-input").value.trim();
  if (userName.length < 1) {
    document.querySelector(".name-error-message").classList.remove("hidden");
  } else {
    document.querySelector(".name-screen").classList.add("hidden");
    document.querySelector(".question--1").classList.remove("hidden");
    document.querySelector(".name-error-message").classList.add("hidden");
    document.querySelector(
      ".finishing-title"
    ).textContent = `You have finished the quiz, ${userName}.`;
  }
  document.querySelector(".name-input").value = "";
});

// EL za odabir odgovora
main.addEventListener("click", (e) => {
  if (e.target.classList.contains("answer-option")) {
    const otherOptions = [...e.target.closest("#answers").children];
    otherOptions.forEach((option) => {
      option.classList.remove("chosen-answer");
    });
    e.target.classList.add("chosen-answer");

    const answerNumber = e.target.dataset.questionNumber;

    const answerText = e.target.textContent.replace(/\s+/g, " ").trim();

    givenAnswers[answerNumber] = answerText;
  }
});

// EL za previous button
main.addEventListener("click", (e) => {
  if (e.target.classList.contains("previous-button")) {
    e.target.closest(".section-container").classList.add("hidden");
    e.target
      .closest(".section-container")
      .previousElementSibling.classList.remove("hidden");
  }
});

// EL za next
main.addEventListener("click", changeEl.bind("next-button"));

// EL za submit button
main.addEventListener("click", (e) => {
  if (e.target.classList.contains("submit-button")) {
    e.target.closest(".section-container").classList.add("hidden");
    e.target
      .closest(".section-container")
      .nextElementSibling.classList.remove("hidden");

    // Result title
    document.querySelector(
      ".result-title"
    ).textContent = `${userName}, your score is:`;

    // Calculate score
    calcScore(givenAnswers, correctAnswers);

    //Render score
    scoreRender(score);

    // Render waca
    wrongAnswersRender(score, givenAnswers, correctAnswers, allQuestions);

    // Render result message
    resultMessageRender(score, userName);
  }
});
