import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import UnauthorizedPage from "../unauthorized";
import Spinner from "../components/spinner/spinner";

const SECONDS_PER_QUESTION = 45;
const questions = [
    {
        question:
            "A business has the opportunity to secure a highly profitable contract with a company that has a history of unethical practices. Should the business accept the contract?",
        choices: [
            "The business should accept the contract if it would result in the greatest overall benefit for everyone.",
            "The business should carefully consider the impact of accepting the contract on everybody involved, and prioritize the well-being of all those affected by its decisions.",
            "The business should not accept the contract because it would violate its duty to avoid unethical practices.",
            "The business should value integrity and responsibility, so it is best to decline the contract.",
        ],
        schools: [
            ["Utilitarianism"],
            ["Care"],
            ["Deontology"],
            ["Virtue"],
        ],
    },
    {
        question:
            "A company is considering outsourcing production to a country with poor labor laws and low wages. Should they go ahead with the plan?",
        choices: [
            "It depends on whether the outsourcing would result in the greatest overall benefit for the workers and the company.",
            "Whatever they do, the company should prioritize the well-being of the workers, customers, and the broader community.",
            "The company has a duty to prioritize fair treatment and safe working conditions for workers, regardless of the potential financial gain.",
            "It depends on the company's values. If the company values compassion and respect for workers, it may be best to provide fair wages and safe working conditions, rather than outsourcing.",
        ],
        schools: [
            ["Utilitarianism"],
            ["Care"],
            ["Deontology"],
            ["Virtue"],
        ],
    },
    {
        question:
            "A tech company has access to sensitive user data that could be used to manipulate users. Should they use this data to increase profits?",
        choices: [
            "If it improves the user experience, yes. If not, then it is not justified.",
            "This may harm users, so the company should prioritize the well-being of users over profits.",
            "No, because they would violate user privacy and autonomy and this is inheritly incorrect.",
            "No, because the company should value honesty, transparency, and respect for user privacy.",
        ],
        schools: [
            ["Utilitarianism"],
            ["Care"],
            ["Deontology"],
            ["Virtue"],
        ],
    },
    {
        question:
            "A pharmaceutical company has developed a life-saving medication for a rare disease but wants to charge a high price for it, making it unaffordable for many people who need it.",
        choices: [
            "They should charge a price that allows it to recoup its research and development costs, while also making the medication accessible to as many people as possible.",
            "They should prioritize the well-being of patients and the broader community when considering how to price the medication.",
            "They have a duty to prioritize the health and well-being of patients over profits, and they should not charge a high price.",
            "If the company values compassion, integrity, and responsibility, it may be best to price the medication in a way that reflects these values, even if it means accepting lower profits.",
        ],
        schools: [
            ["Utilitarianism"],
            ["Care"],
            ["Deontology"],
            ["Virtue"],
        ],
    },
];

export default function SurveyPage() {
    const { data: session, status } = useSession();
    if (status == "loading") {
        return <Spinner />;
    }
    if (!session || status == "unauthenticated") {
        return <UnauthorizedPage />;
    }

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [timeRemaining, setTimeRemaining] = useState(SECONDS_PER_QUESTION);
    const [showSummary, setShowSummary] = useState(false);
    const email = session.user.email;

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeRemaining > 0) {
                setTimeRemaining(timeRemaining - 1);
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
        if (currentQuestion < questions.length - 1) {
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
                    <p className="text-indigo-500 font-bold mt-2">
                        Time's up! Please move on to the next question.
                    </p>
                )}
                <h2 className="text-2xl font-bold mb-4 mt-4">
                    {question.question}
                </h2>
                {renderChoices(question.choices)}
                <button
                    onClick={handleNextQuestion}
                    disabled={!hasAnswered}
                    className={`bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded mt-4 ${!hasAnswered ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    Next
                </button>
            </div>
        );
    };

    const answersArray = [];

    const renderSummary = () => {
        return (
            <div className="w-full max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-4">Survey Results</h2>
                <ul>
                    {answers.map((answer, index) => {
                        answersArray.push(answer);
                        return (
                            <li key={index} className="mb-2">
                                {questions[index].question}: {questions[index].choices[answer]}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    };


    const handleGetSchools = () => {
        const schools = answers.map((answerIndex, questionIndex) => {
            const question = questions[questionIndex];
            const school = question.schools[answerIndex]
            return school;
        });
        return schools;
    };

    useEffect(() => {
        if (showSummary) {
            const schools = handleGetSchools();
            addScores(email, schools, answersArray);
        }
    }, [showSummary]);

    async function addScores(email, schools) {
        const response = await fetch('/api/scores', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                schools: schools,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            console.log('error')
        }
    }



    return (
        <div className="flex items-center justify-center h-screen">
            {showSummary
                ? renderSummary()
                : renderQuestion(questions[currentQuestion])}
        </div>
    );
}
