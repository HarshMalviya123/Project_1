const questions = [
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "3", correct: false },
      { text: "4", correct: true },
      { text: "5", correct: false }
    ]
  },
  {
    question: "Which is a JavaScript framework?",
    answers: [
      { text: "React", correct: true },
      { text: "Laravel", correct: false },
      { text: "Django", correct: false }
    ]
  },
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "HyperText Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinks Text Management Language", correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const feedbackElement = document.getElementById("feedback");

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  feedbackElement.innerText = "";
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  if (isCorrect) {
    feedbackElement.innerText = "Correct!";
    score++;
  } else {
    feedbackElement.innerText = "Wrong!";
  }

  // Disable all buttons after selection
  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.style.backgroundColor = "#4CAF50";
    } else {
      button.style.backgroundColor = "#f44336";
    }
  });

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.innerText = `🎉 You scored ${score} out of ${questions.length}`;
  nextButton.innerText = "Play Again";
  nextButton.style.display = "block";
  nextButton.onclick = startQuiz;
}

startQuiz();
