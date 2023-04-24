import { useState, useEffect } from 'react';
import questions from '../questions';


const SECONDS_PER_QUESTION = 300;

export default function SurveyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [timeRemaining, setTimeRemaining] = useState(SECONDS_PER_QUESTION);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        handleNextQuestion();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeRemaining]);

  const handleAnswer = (answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1 && timeRemaining > 0) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeRemaining(SECONDS_PER_QUESTION);
    } else {
      setShowSummary(true);
    }
  };

  const renderChoices = (choices) => {
    return choices.map((choice, index) => (
      <div key={index} className="my-2">
        <input
          type="radio"
          name="choice"
          id={`choice-${index}`}
          value={choice}
          onChange={() => handleAnswer(index)}
          checked={answers[currentQuestion] === index}
          className="mr-2"
        />
        <label htmlFor={`choice-${index}`}>{choice}</label>
      </div>
    ));
  };

  const renderQuestion = (question) => {
    const hasAnswered = answers[currentQuestion] !== null;
  
    return (
      <div className="w-full max-w-md mx-auto">
        {timeRemaining > 0 && (
          <p className="text-indigo-500 font-bold mt-2">{`Time remaining: ${timeRemaining}`}</p>
        )}
        {timeRemaining === 0 && (
          <p className="text-indigo-500 font-bold mt-2">Time's up! Please move on to the next question.</p>
        )}
        <h2 className="text-2xl font-bold mb-4 mt-4">{question.question}</h2>
        {renderChoices(question.choices)}
        <button
          onClick={handleNextQuestion}
          disabled={!hasAnswered}
          className={`bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded mt-4 ${
            !hasAnswered ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    );
  };

  const renderSummary = () => {
    return (
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Survey Results</h2>
        <ul>
          {answers.map((answer, index) => (
            <li key={index} className="mb-2">
              {questions[index].question}: {questions[index].choices[answer]}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {showSummary ? renderSummary() : renderQuestion(questions[currentQuestion])}
    </div>
);
}
