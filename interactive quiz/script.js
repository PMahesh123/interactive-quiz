document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    
    // Quiz questions and answers
    const myQuestions = [
        {
            question: "What is the capital of France?",
            answers: {
                a: "London",
                b: "Paris",
                c: "Berlin",
                d: "Madrid"
            },
            correctAnswer: "b"
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: {
                a: "Venus",
                b: "Mars",
                c: "Jupiter",
                d: "Saturn"
            },
            correctAnswer: "b"
        },
        {
            question: "What is the largest mammal in the world?",
            answers: {
                a: "Elephant",
                b: "Blue Whale",
                c: "Giraffe",
                d: "Polar Bear"
            },
            correctAnswer: "b"
        },
        {
            question: "Which element has the chemical symbol 'O'?",
            answers: {
                a: "Gold",
                b: "Oxygen",
                c: "Osmium",
                d: "Iron"
            },
            correctAnswer: "b"
        },
        {
            question: "Who painted the Mona Lisa?",
            answers: {
                a: "Vincent van Gogh",
                b: "Pablo Picasso",
                c: "Leonardo da Vinci",
                d: "Michelangelo"
            },
            correctAnswer: "c"
        }
    ];

    // Build the quiz
    function buildQuiz() {
        const output = [];

        myQuestions.forEach((currentQuestion, questionNumber) => {
            const answers = [];
            
            for (const letter in currentQuestion.answers) {
                answers.push(
                    `<label class="option">
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter}: ${currentQuestion.answers[letter]}
                    </label>`
                );
            }

            output.push(
                `<div class="question">
                    <h2>${currentQuestion.question}</h2>
                    <div class="options">${answers.join('')}</div>
                </div>`
            );
        });

        quizContainer.innerHTML = output.join('');
        
        // Add event listeners to options for visual feedback
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.addEventListener('click', function() {
                // Remove selected class from all options in this question
                const questionDiv = this.closest('.question');
                questionDiv.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Add selected class to clicked option
                this.classList.add('selected');
            });
        });
    }

    // Show results
    function showResults() {
        const answerContainers = quizContainer.querySelectorAll('.question');
        let numCorrect = 0;
        
        myQuestions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;
            
            if (userAnswer === currentQuestion.correctAnswer) {
                numCorrect++;
                answerContainers[questionNumber].classList.add('correct');
            } else {
                answerContainers[questionNumber].classList.add('incorrect');
            }
        });
        
        resultsContainer.innerHTML = `You scored ${numCorrect} out of ${myQuestions.length} questions correctly!`;
        resultsContainer.style.display = 'block';
        
        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }

    // Build the quiz when page loads
    buildQuiz();

    // Event listener for submit button
    submitButton.addEventListener('click', showResults);
});