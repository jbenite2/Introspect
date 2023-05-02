import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
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
            ["Care Ethics"],
            ["Deontology"],
            ["Virtue Ethics"],
        ],
    },
    {
        question:
            "A company is considering outsourcing production to a country with poor labor laws and low wages. Should they go ahead with the plan?",
        choices: [
            "It depends on the company's values. If the company values compassion and respect for workers, it may be best to provide fair wages and safe working conditions, rather than outsourcing.",
            "It depends on whether the outsourcing would result in the greatest overall benefit for the workers and the company.",
            "Whatever they do, the company should prioritize the well-being of the workers, customers, and the broader community.",
            "The company has a duty to prioritize fair treatment and safe working conditions for workers, regardless of the potential financial gain.",
        ],
        schools: [
            ["Virtue Ethics"],
            ["Utilitarianism"],
            ["Care Ethics"],
            ["Deontology"],
        ],
    },
    {
        question:
            "A tech company has access to sensitive user data that could be used to manipulate users. Should they use this data to increase profits?",
        choices: [
            "No, because they would violate user privacy and autonomy and this is inheritly incorrect.",
            "No, because the company should value honesty, transparency, and respect for user privacy.",
            "If it improves the user experience, yes. If not, then it is not justified.",
            "This may harm users, so the company should prioritize the well-being of users over profits.",
        ],
        schools: [
            ["Deontology"],
            ["Virtue Ethics"],
            ["Utilitarianism"],
            ["Care Ethics"],
        ],
    },
    {
        question:
            "A pharmaceutical company has developed a life-saving medication for a rare disease but wants to charge a high price for it, making it unaffordable for many people who need it.",
        choices: [
            "They should prioritize the well-being of patients and the broader community when considering how to price the medication.",
            "They should charge a price that allows it to recoup its research and development costs, while also making the medication accessible to as many people as possible.",
            "If the company values compassion, integrity, and responsibility, it may be best to price the medication in a way that reflects these values, even if it means accepting lower profits.",
            "They have a duty to prioritize the health and well-being of patients over profits, and they should not charge a high price.",
        ],
        schools: [
            ["Care Ethics"],
            ["Utilitarianism"],
            ["Virtue Ethics"],
            ["Deontology"],
        ],
    },
    {
        question: "A company is developing autonomous weapons that could potentially harm innocent civilians. What should they do?",
        choices: [
            "Whatever they choose to do with the weapon, they should prioritize compassion and responsibility to minimize harm as much as possible.",
            "They should think about the potential grief and other harm civilians may experience and take steps to minimize harm.",
            "They should not use the autonomous weapons because it can harm innocent civilians.",
            "They should prioritize the overall benefit to society and use the autonomous weapons to protect innocent people, even if it means causing harm to some.",
        ],
        schools: [
            ["Virtue Ethics"],
            ["Care Ethics"],
            ["Deontology"],
            ["Utilitarianism"],
        ]
      },
      {
        question: "A self-driving car must make a split-second decision to either swerve and hit a pedestrian or stay on course and hit a parked car, potentially injuring the passengers inside. What should be the car do?",
        choices: [
          "It should consider the potential emotional and physical impact on all parties and take steps to minimize harm to all.",
          "The car should calculate which option would result the least damage to society, which could include calculations of age and occupation.",
          "The car should prioritize compassion and responsibility and take steps to minimize harm to all parties involved.",
          "The car should follow one set of rules and not deviate from them, even if it means harming more innocent people.",
        ],
        schools: [
            ["Care Ethics"],
          ["Utilitarianism"],
          ["Virtue Ethics"],
          ["Deontology"],
        ]
      },
      {
        question: "A social media platform is considering implementing an algorithm that would promote posts based on their potential to generate engagement, even if the content is misleading or harmful. What should they think of first?",
        choices: [
            "To promote misleading and harmful content is inherently wrong no matter what.",
            "They need to care about the well-being of its users and the broader community over its own profit motives.",
            "While promoting engaging content may generate more revenue in the short-term, it could lead to a decline in public trust and harm to society in the long-term.",
          "The call for upholding honesty, integrity, and responsibility opposes the implementation of the algorithm.",
        ],
        schools: [
            ["Deontology"],
            ["Care Ethics"],
            ["Utilitarianism"],
            ["Virtue Ethics"],
        ]
      },
      {
        question: "A tech company is developing a new product that would greatly benefit the market, but they are facing tight deadlines and budget constraints. As a result, they are considering cutting corners on safety testing. What should they do?",
        choices: [
            "Whatever they do, they must stay transparent and honest with users.",
            "Continue, but be cautious of the potential harm to users and the broader community.",
            "Cutting corners on safety testing should be avoided at all cost.",
            "Calculate if the likelihood of success outweighs the potential harm to society.",
        ],
        schools: [
            ["Virtue Ethics"],
            ["Care Ethics"],
            ["Deontology"],
            ["Utilitarianism"],
        ]
      },
      {
        question: "A company is using AI to screen job applicants, but the AI system has been found to discriminate against certain groups of people. What should the company do?",
        choices: [
          "The AI should calculate things based on the candidate's likelihood of generating the most value for society.",
          "The company must be empathetic towards the groupos affected and ensure fair and unbiased hiring practices.",
          "The company should value fairness and integrity. They should not discriminate against any group of people.",
          "Discrimination is wrong and there should be an unbiased hiring process.",
        ],
        schools: [
          ["Utilitarianism"],
          ["Care Ethics"],
          ["Virtue Ethics"],
          ["Deontology"],
        ]
      },
      {
        question: "A social media platform has been accused of not doing enough to combat hate speech and harassment on their site. What should they do?",
        choices: [
            "They should put people's feelings first and do what they can to combat these types of contents.",
            "It's a moral imperative to combat harmful contents.",
            "It depends on if the company values free speech more than the well-being of its users.",
            "They should put more investments in combating hate speech and harassment to minimize the amount of harm being done to users.",
        ],
        schools: [
            ["Care Ethics"],
            ["Deontology"],
            ["Virtue Ethics"],
            ["Utilitarianism"],
        ]
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
    const router = useRouter()

    const renderSummary = () => {
        return (
            <div className="w-full max-w-md mx-auto h-screen">
                <h2 className="text-2xl font-bold mb-4 mt-10">Survey Results</h2>
                <div className="overflow-y-scroll">
                    {questions.map((question, index) => {
                        const answerIndex = answers[index];
                        return (
                            <div key={index} className="mb-4">
                                <h3 className="text-lg font-bold mb-2">{question.question}</h3>
                                <p>{question.choices[answerIndex]}</p>
                            </div>
                        );
                    })}
                </div>
                <button
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded mt-4 mb-10"
                    onClick={() => {
                    router.push("/user_dashboard");
                    }}
                >
                    Next
                </button>
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
