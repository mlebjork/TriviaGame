var card = $("#quiz-area");
var countStartNumber = 30;

// Question set
var questions = [{
  question: "Which country was the first to give women the right to vote?",
  answers: ["USA", "Australia.", "New Zealand", "Sweden"],
  correctAnswer: "New Zealand",
  image: "assets/images/NZ.gif"
}, {
  question: "What was the name of the first dog in space to orbit Earth?",
  answers: ["Luna", "Bailey", "Laika", "Astra"],
  correctAnswer: "Laika",
  image: "assets/images/spaceDog.gif"
}, {
  question: "Who is the only US president to serve more than two terms?",
  answers: ["Abraham Lincoln", "Ronald Reagan", "George Washington", "Franklin D. Roosevelt"],
  correctAnswer: "Franklin D. Roosevelt",
  image: "assets/images/roosevelt.webp"
}, {
  question: "How many electoral votes are needed to become president of the United States?",
  answers: ["538", "322", "300", "270"],
  correctAnswer: "270",
  image: "assets/images/electoralVotes.gif"
}, {
  question: "Which country did Germany invade on the 1st of September 1939?",
  answers: ["France", "Poland", "Finland", "Czeckoslovakia"],
  correctAnswer: "Poland",
  image: "assets/images/marching.gif"
}, {
  question: "What year did the Berlin wall fall?",
  answers: ["1988", "1994", "1991", "1989"],
  correctAnswer: "1989",
  image: "assets/images/wall.gif"
}, {
  question: "1867 Swedish chemist and engineer Alfred Nobel invented ___",
  answers: ["The internal combustion engine", "Escalator", "Concrete", "Dynamite"],
  correctAnswer: "Dynamite",
  image: "assets/images/dynamite.gif"
}, {
  question: "Where was the first programmable computer, the Z1, created?",
  answers: ["Germany", "England", "Russia", "USA"],
  correctAnswer: "Germany",
  image: "assets/images/computer.gif"
}];

// Variable to hold our setInterval
var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    this.counter--;
    $("#counter-number").text(this.counter);
    if (this.counter === 0) {
      console.log("TIME IS UP!");
      this.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(this.countdown.bind(this), 1000);

    card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      card.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    this.counter = window.countStartNumber;
    $("#counter-number").text(this.counter);
    this.currentQuestion++;
    this.loadQuestion.bind(this)();
  },

  timeUp: function() {

    clearInterval(window.timer);

    $("#counter-number").text(this.counter);

    card.html("<h2>Out of Time!</h2>");
    card.append("<h3>The correct answer was: " + questions[this.currentQuestion].correctAnswer);
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results, 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(window.timer);

    card.html("<h2>All done! Here's how you did:</h2>");

    $("#counter-number").text(this.counter);

    card.append("<h3>Correct answers: " + this.correct + "</h3>");
    card.append("<h3>Incorrect answers: " + this.incorrect + "</h3>");
    // card.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
    card.append("<br><button id='start-over'>Start over?</button>");
  },

  clicked: function(e) {
    clearInterval(window.timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    this.incorrect++;

    clearInterval(window.timer);

    card.html("<h2>Nope!</h2>");
    card.append("<h3>The correct answer was: " + questions[this.currentQuestion].correctAnswer + "</h3>");
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(window.timer);

    this.correct++;

    card.html("<h2>Correct!</h2>");
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", game.reset.bind(game));

$(document).on("click", ".answer-button", function(e) {
  game.clicked.bind(game, e)();
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion.bind(game)();
});