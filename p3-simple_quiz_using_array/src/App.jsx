
import { useState } from "react";
import "./App.css";

const questions = [
    {
        question: "What is the capital city of Nepal?",
        options: ["Pokhara", "Kathmandu", "Butwal", "Biratnagar"],
        answer: "Kathmandu"
    },
    {
        question: "What is the national flower of Nepal?",
        options: ["Rose", "Lotus", "Rhododendron", "Sunflower"],
        answer: "Rhododendron"
    },
    {
        question: "What is the highest mountain in Nepal?",
        options: ["Mount Everest", "Mount Kanchenjunga", "Annapurna", "Dhaulagiri"],
        answer: "Mount Everest"
    },
    {
        question: "What is the national animal of Nepal?",
        options: ["Tiger", "Cow", "Elephant", "Snow Leopard"],
        answer: "Cow"
    },
    {
        question: "What is the currency of Nepal?",
        options: ["Indian Rupee", "US Dollar", "Nepalese Rupee", "Taka"],
        answer: "Nepalese Rupee"
    },
    {
        question: "When is Nepal's Constitution Day celebrated?",
        options: [
            "September 20",
            "January 1",
            "May 1",
            "December 25"
        ],
        answer: "September 20"
    },
    {
        question: "Which is the birthplace of Gautama Buddha?",
        options: ["Kathmandu", "Lumbini", "Janakpur", "Pokhara"],
        answer: "Lumbini"
    },
    {
        question: "What is the national bird of Nepal?",
        options: ["Peacock", "Danphe", "Parrot", "Eagle"],
        answer: "Danphe"
    },
    {
        question: "How many provinces are there in Nepal?",
        options: ["5", "6", "7", "8"],
        answer: "7"
    },
    {
        question: "Which is the longest river in Nepal?",
        options: ["Bagmati", "Koshi", "Karnali", "Narayani"],
        answer: "Karnali"
    }
];

function App() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    function handleAnswer(option) {
        if (selectedAnswer === "") {
            setSelectedAnswer(option);

            if (option === questions[currentQuestion].answer) {
                setScore(score + 1);
            }
        }
    }

    function handleNext() {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer("");
        } else {
            setShowResult(true);
        }
    }

    function restartQuiz() {
        setCurrentQuestion(0);
        setSelectedAnswer("");
        setScore(0);
        setShowResult(false);
    }

    if (showResult) {
        return (
            <div className="quiz-container">
                <h1>Quiz Completed!</h1>

                <h2>Your Final Score</h2>

                <p>
                    You scored {score} out of {questions.length}.
                </p>

                <h3>
                    {score === questions.length
                        ? "Excellent! Perfect Score!"
                        : score >= questions.length / 2
                        ? "Good job! Keep learning."
                        : "Keep practicing. You can do better!"}
                </h3>

                <button onClick={restartQuiz}>
                    Restart Quiz
                </button>
            </div>
        );
    }

    const question = questions[currentQuestion];

    return (
        <div className="quiz-container">
            <h1>Nepal GK Quiz</h1>

            <p>
                Question {currentQuestion + 1} of {questions.length}
            </p>

            <div className="progress-bar">
                <div
                    className="progress"
                    style={{
                        width: `${((currentQuestion + 1) / questions.length) * 100}%`
                    }}
                ></div>
            </div>

            <h2>{question.question}</h2>

            <div className="options">
                {question.options.map(function (option) {
                    let className = "option-button";

                    if (selectedAnswer !== "") {
                        if (option === question.answer) {
                            className += " correct";
                        } else if (option === selectedAnswer) {
                            className += " incorrect";
                        }
                    }

                    return (
                        <button
                            key={option}
                            className={className}
                            onClick={function () {
                                handleAnswer(option);
                            }}
                            disabled={selectedAnswer !== ""}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>

            {selectedAnswer !== "" && (
                <p>
                    {selectedAnswer === question.answer
                        ? "Correct answer!"
                        : `Incorrect! The correct answer is ${question.answer}.`}
                </p>
            )}

            <button
                className="next-button"
                onClick={handleNext}
                disabled={selectedAnswer === ""}
            >
                {currentQuestion === questions.length - 1
                    ? "Show Result"
                    : "Next Question"}
            </button>

            <p>Score: {score}</p>
        </div>
    );
}

export default App;
