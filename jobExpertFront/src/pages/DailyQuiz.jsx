import React, { useEffect, useState } from "react";
import axios from "axios";

function DailyQuiz() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=20&type=multiple"
        );
        const questions = response.data.results;
        setQuizQuestions(questions);
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    }

    fetchQuestions();
  }, []);

  const handleAnswerSubmit = (selectedOption) => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correct_answer;

    setUserAnswers([
      ...userAnswers,
      { question: currentQuestion.question, isCorrect },
    ]);
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResult(false);
  };

  if (quizQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
          <p className="text-gray-700">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
          <h1 className="text-2xl font-semibold mb-4">Quiz Result</h1>
          <p className="text-gray-700 mb-4">
            Your score: {score} out of {quizQuestions.length}
          </p>
          <button
            onClick={restartQuiz}
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h1 className="text-2xl font-semibold mb-4">Daily Quiz</h1>
        <p className="text-gray-700 mb-4">
          Question {currentQuestionIndex + 1} of {quizQuestions.length}
        </p>
        <p className="text-gray-800 mb-6">{currentQuestion.question}</p>
        <ul>
          {currentQuestion.incorrect_answers.map((option, index) => (
            <li
              key={index}
              onClick={() => handleAnswerSubmit(option)}
              className="bg-gray-200 p-2 rounded-md cursor-pointer hover:bg-blue-200 transition duration-300 ease-in-out mb-2"
            >
              {option}
            </li>
          ))}
          <li
            onClick={() => handleAnswerSubmit(currentQuestion.correct_answer)}
            className=" bg-gray-200 p-2 rounded-md cursor-pointer hover:bg-blue-200 transition duration-300 ease-in-out mb-2"
          >
            {currentQuestion.correct_answer}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DailyQuiz;
