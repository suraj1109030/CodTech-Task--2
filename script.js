const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 2
    },
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        correct: 3
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Central Style Sheets",
            "Cascading Style Sheets",
            "Cascading Simple Sheets",
            "Control Style Sheets"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById('quiz');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const resultContainer = document.getElementById('result');

function loadQuiz() {
    const currentQuiz = quizData[currentQuestion];
    quizContainer.innerHTML = `
        <h2>${currentQuiz.question}</h2>
        ${currentQuiz.options.map((option, index) => `
            <div>
                <input type="radio" id="option${index}" name="answer" value="${index}">
                <label for="option${index}">${option}</label>
            </div>
        `).join('')}
    `;
}

function getSelectedAnswer() {
    const answers = document.getElementsByName('answer');
    let selected = null;
    answers.forEach(answer => {
        if (answer.checked) selected = answer.value;
    });
    return selected;
}

nextBtn.addEventListener('click', () => {
    const selectedAnswer = getSelectedAnswer();
    if (selectedAnswer === null) {
        alert('Please select an answer!');
        return;
    }

    if (parseInt(selectedAnswer) === quizData[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuiz();
    } else {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
    }
});

submitBtn.addEventListener('click', () => {
    resultContainer.style.display = 'block';
    quizContainer.style.display = 'none';
    submitBtn.style.display = 'none';
    resultContainer.innerHTML = `You scored ${score}/${quizData.length}!`;
});

// Initial Load
loadQuiz();
