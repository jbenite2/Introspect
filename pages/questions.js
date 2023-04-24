// This file stores an array of questions for the user to answer

const questions = [
  {
    question: "A business has the opportunity to secure a lucrative contract with a company that has a history of unethical practices. Should the business accept the contract?",
    choices: [
      "The business should prioritize ethical values over profits and consider the impact of working with an unethical company on the company's reputation and relationships with other stakeholders",
      "Treat other companies and individuals with respect by avoiding associations with those who engage in unethical practices.",
      "Set a standard for business relationships that maximizes overall social welfare, balancing profits and public welfare.",
      "Act with integrity and responsibility, considering the broader implications of business decisions and promoting ethical values in the business world."
    ],
    schools: [('Virtue','Deontology'), ('Care', 'Deontology'), ('Utilitarianism'), ('Virtue', 'Deontology')]
  },
  {
    'question': "A company is considering outsourcing production to a country with lax labor laws and low wages. Should they go ahead with the plan?",
    'choices': [
    "Prioritize the rights of workers to fair treatment and safe working conditions, and consider the impact of the decision on their well-being.",
    "Treat workers with dignity and respect by providing fair wages, safe working conditions, and opportunities for growth and development.",
    "Set a standard for global labor practices that maximizes overall social welfare, balancing profits and public welfare, and recognizes the value of labor as a human right.",
    "Act with the virtues of justice and compassion, considering the broader implications of the decision and promoting ethical values in the global market."
    ],
    'schools': [('Human Rights', 'Virtue'), ('Social Justice', 'Care'), ('Utilitarianism', 'Deontology'), ('Virtue Ethics', 'Feminist Ethics')]
  },
  {
    'question': "A tech company has access to sensitive user data that could be used to manipulate users. Should they use this data to increase profits?",
    'choices': [
      "Prioritize user privacy and security over profits and consider the impact of the decision on users' trust and confidence in the company.",
      "Treat users with respect by not using their data without their consent and protecting their privacy and security.",
      "Set a standard for data privacy and security that maximizes overall social welfare, balancing profits and public welfare.",
      "Act with the virtues of integrity and responsibility, considering the broader implications of the decision and promoting ethical values in the tech industry."
    ],
    'schools': [('Deontology','Utilitarianism'), ('Care','Virtue'), ('Utilitarianism','Deontology'), ('Virtue','Care')]
  },
  {
    'question': "A pharmaceutical company has developed a life-saving medication for a rare disease but wants to charge a high price for it, making it unaffordable for many people who need it.",
    'choices': [
    "Prioritize the right to health for all individuals, especially those who are vulnerable, over profits and consider the impact of pricing decisions on access to life-saving medication.",
    "Treat patients with dignity and respect by providing affordable access to life-saving medication, recognizing the value of health as a human right.",
    "Set a price that maximizes overall social welfare, balancing profits and public welfare, and recognizes the responsibility of the company to contribute to global health equity.",
    "Act with the virtues of compassion and justice, considering the well-being of patients and the broader societal implications of pricing decisions, and promote ethical values in the pharmaceutical industry."
    ],
    'schools': [('Healthcare Justice', 'Virtue Ethics'), ('Social Justice', 'Care Ethics'), ('Utilitarianism', 'Deontology'), ('Global Justice', 'Feminist Ethics')]
    }
    // {
    //   question: "Was the decision to drop the atomic bombs on Hiroshima and Nagasaki justified?",
    //   choices: [
    //       "Not justified: it caused harm and suffering to innocent civilians.",
    //       "Not justified: violated principle of respect for persons by causing deaths of innocent civilians.",
    //       "Justified  : helped end World War II, saving more lives than it took.",
    //       "Justifiable if:  decision-makers acted prudently by weighing the potential consequences and making the best decision given the available information",

    //   ]
    // },
    // {
    //   question: "Do you believe that the use of torture in interrogations is ever justified?",
    //   choices: [
    //     "Not justified, as it causes immense harm and suffering to the individual being tortured, which goes against the principle of preventing harm to others.",
    //     "Not justified, as it violates the principle of treating individuals as ends in themselves rather than mere means to an end",
    //     "Justifiable in certain situations, but only if the potential benefits of the information gained outweigh the harm caused by torture",
    //     "If the interrogator acted with courage and responsibility, they may use it as a last resort in extreme circumstances."
    //   ]
    // },
    // {
    //   question: "Do you believe that the death penalty is an ethical form of punishment?",
    //   choices: [
    //     "No, the death penalty causes harm and suffering",
    //     "Not ethical because it violates the principle of respect for human life",
    //     "Depends on whether the benefits of using the death penalty outweigh the harm caused. if the death penalty helps to prevent more harm than it causes, then it may be ethical",
    //     "Depends on the virtues of the decision-makers involved. If they act with the virtues of compassion and mercy, they may reject the death penalty. However, if they act with the virtues of justice and fairness, they may support the use of the death penalty "
    //   ]
    // },
    // {
    //   question: "A company has discovered that one of its products has a defect that could potentially harm consumers. The company's leadership team is now faced with the ethical dilemma of whether to recall the product or not.",
    //   choices: [
    //     "The company should recall the product to prevent harm to its consumers, even if it means financial loss for the company.",
    //     "The company has a duty to protect the well-being of its consumers and should recall the product to fulfill this duty, even if it causes financial harm to the company.",
    //     "The company should weigh the potential harm to consumers against the costs of the recall. If the harm to consumers outweighs the cost, then the company should recall the product",
    //     "The company should act with the virtues of honesty and integrity and recall the product, even if it causes financial harm to the company"
    //   ]
    // },
    // {
    //   question: "Do you believe that colonialism was an ethical and justifiable practice?",
    //   choices: [
    //     "Yes, because...",
    //     "Yes, because...",
    //     "Yes, because...",
    //     "No, because...",
    //     "No, because...",
    //     "No, because...",
    //   ]
    // },
    // {
    //   question: "Do you believe that affirmative action is an ethical practice?",
    //   choices: [
    //     "Yes, because...",
    //     "Yes, because...",
    //     "Yes, because...",
    //     "No, because...",
    //     "No, because...",
    //     "No, because...",
    //   ]
    // },
    // Add more questions and choices here
  ];

  export default questions;
  