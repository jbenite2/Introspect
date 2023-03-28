import { useState } from 'react';

const questions = [
  {
    question: "Obamna?",
    choices: [
        "Very yes",
        "Yes",
        "No",
        "Very no"
    ]
  },
  {
    question: "Joe Rogan?",
    choices: [
        "Very yes",
        "Yes",
        "No",
        "Very no"
    ]
  },
  // Add more questions and choices here
];

export default function SurveyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleAnswer = (answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
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
    return (
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">{question.question}</h2>
        {renderChoices(question.choices)}
        <button
          onClick={() => setCurrentQuestion(currentQuestion + 1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
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
      {currentQuestion < questions.length
        ? renderQuestion(questions[currentQuestion])
        : renderSummary()}
    </div>
  );
}
