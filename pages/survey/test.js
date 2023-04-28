import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import UnauthorizedPage from '../unauthorized';


const SECONDS_PER_QUESTION = 30;
const questions = [
	{
		question:
			'A business has the opportunity to secure a lucrative contract with a company that has a history of unethical practices. Should the business accept the contract?',
		choices: [
			"The business should prioritize ethical values over profits and consider the impact of working with an unethical company on the company's reputation and relationships with other stakeholders",
			'Treat other companies and individuals with respect by avoiding associations with those who engage in unethical practices.',
			'Set a standard for business relationships that maximizes overall social welfare, balancing profits and public welfare.',
			'Act with integrity and responsibility, considering the broader implications of business decisions and promoting ethical values in the business world.',
		],
		schools: [
			('Virtue', 'Deontology'),
			('Care', 'Deontology'),
			'Utilitarianism',
			('Virtue', 'Deontology'),
		],
	},
	{
		question:
			'A company is considering outsourcing production to a country with lax labor laws and low wages. Should they go ahead with the plan?',
		choices: [
			'Prioritize the rights of workers to fair treatment and safe working conditions, and consider the impact of the decision on their well-being.',
			'Treat workers with dignity and respect by providing fair wages, safe working conditions, and opportunities for growth and development.',
			'Set a standard for global labor practices that maximizes overall social welfare, balancing profits and public welfare, and recognizes the value of labor as a human right.',
			'Act with the virtues of justice and compassion, considering the broader implications of the decision and promoting ethical values in the global market.',
		],
		schools: [
			('Human Rights', 'Virtue'),
			('Social Justice', 'Care'),
			('Utilitarianism', 'Deontology'),
			('Virtue Ethics', 'Feminist Ethics'),
		],
	},
	{
		question:
			'A tech company has access to sensitive user data that could be used to manipulate users. Should they use this data to increase profits?',
		choices: [
			"Prioritize user privacy and security over profits and consider the impact of the decision on users' trust and confidence in the company.",
			'Treat users with respect by not using their data without their consent and protecting their privacy and security.',
			'Set a standard for data privacy and security that maximizes overall social welfare, balancing profits and public welfare.',
			'Act with the virtues of integrity and responsibility, considering the broader implications of the decision and promoting ethical values in the tech industry.',
		],
		schools: [
			('Deontology', 'Utilitarianism'),
			('Care', 'Virtue'),
			('Utilitarianism', 'Deontology'),
			('Virtue', 'Care'),
		],
	},
	{
		question:
			'A pharmaceutical company has developed a life-saving medication for a rare disease but wants to charge a high price for it, making it unaffordable for many people who need it.',
		choices: [
			'Prioritize the right to health for all individuals, especially those who are vulnerable, over profits and consider the impact of pricing decisions on access to life-saving medication.',
			'Treat patients with dignity and respect by providing affordable access to life-saving medication, recognizing the value of health as a human right.',
			'Set a price that maximizes overall social welfare, balancing profits and public welfare, and recognizes the responsibility of the company to contribute to global health equity.',
			'Act with the virtues of compassion and justice, considering the well-being of patients and the broader societal implications of pricing decisions, and promote ethical values in the pharmaceutical industry.',
		],
		schools: [
			('Healthcare Justice', 'Virtue Ethics'),
			('Social Justice', 'Care Ethics'),
			('Utilitarianism', 'Deontology'),
			('Global Justice', 'Feminist Ethics'),
		],
	},
];

export default function SurveyPage() {
	const { data: session, status } = useSession();

	if (!session) {
		return (<UnauthorizedPage />)
	}

	const email = session.user.email;

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
					<p className="text-indigo-500 font-bold mt-2">
						Time's up! Please move on to the next question.
					</p>
				)}
				<h2 className="text-2xl font-bold mb-4 mt-4">{question.question}</h2>
				{renderChoices(question.choices)}
				<button
					onClick={handleNextQuestion}
					disabled={!hasAnswered}
					className={`bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded mt-4 ${!hasAnswered ? 'opacity-50 cursor-not-allowed' : ''
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
			const school = question.schools[answerIndex];
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
		console.log('Before calling api')
		console.log(email, schools)
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
