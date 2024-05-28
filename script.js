class Question {
    constructor(question, choices, correctAnswer) {
        this.question = question;
        this.choices = choices;
        this.correctAnswer = correctAnswer;
    }

    isCorrectAnswer(choice) {
        return this.correctAnswer === choice;
    }
}

class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.score = 0;
        this.currentQuestionIndex = 0;
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    guess(answer) {
        if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.currentQuestionIndex++;
    }

    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }
}

const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4"),
    new Question("What is the capital of France?", ["London", "Berlin", "Paris", "Madrid"], "Paris"),
    new Question("Who wrote 'Hamlet'?", ["Shakespeare", "Hemingway", "Tolstoy", "Joyce"], "Shakespeare"),
    new Question("What is the color of blood when it's inside your body?",  ["Yellow", "Red", "Green", "Blue"], "Red")
];

const quiz = new Quiz(questions);

function showQuestion() {
    if (quiz.hasEnded()) {
        showScores();
    } else {
        const questionElement = document.getElementById("quiz");
        const currentQuestion = quiz.getCurrentQuestion();
        questionElement.innerHTML = `
            <h2>${currentQuestion.question}</h2>
            <ul>
                ${currentQuestion.choices.map((choice, index) => `
                    <li>
                        <label>
                            <input type="radio" name="choice" value="${choice}">
                            ${choice}
                        </label>
                    </li>
                `).join('')}
            </ul>
        `;
    }
}

function showScores() {
    const resultsElement = document.getElementById("results");
    const totalQuestions = quiz.questions.length;

    resultsElement.innerHTML = `<h2>Your score: ${quiz.score}/${totalQuestions}</h2>`;

    // Check if the user got a perfect score
    if (quiz.score === totalQuestions) {
        document.body.classList.add('perfect-score');
    }
}

document.getElementById("submit").addEventListener("click", () => {
    const selectedChoice = document.querySelector('input[name="choice"]:checked');
    if (selectedChoice) {
        quiz.guess(selectedChoice.value);
        showQuestion();
    } else {
        alert("Please select an answer.");
    }
});

showQuestion();
