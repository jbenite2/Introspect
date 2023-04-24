
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
      question: "A company is considering outsourcing production to a country with lax labor laws and low wages. Should they go ahead with the plan?",
      choices: [
      "Prioritize the rights of workers to fair treatment and safe working conditions, and consider the impact of the decision on their well-being.",
      "Treat workers with dignity and respect by providing fair wages, safe working conditions, and opportunities for growth and development.",
      "Set a standard for global labor practices that maximizes overall social welfare, balancing profits and public welfare, and recognizes the value of labor as a human right.",
      "Act with the virtues of justice and compassion, considering the broader implications of the decision and promoting ethical values in the global market."
      ],
      schools: [('Human Rights', 'Virtue'), ('Social Justice', 'Care'), ('Utilitarianism', 'Deontology'), ('Virtue Ethics', 'Feminist Ethics')]
    },
    {
      question: "A tech company has access to sensitive user data that could be used to manipulate users. Should they use this data to increase profits?",
      choices: [
        "Prioritize user privacy and security over profits and consider the impact of the decision on users' trust and confidence in the company.",
        "Treat users with respect by not using their data without their consent and protecting their privacy and security.",
        "Set a standard for data privacy and security that maximizes overall social welfare, balancing profits and public welfare.",
        "Act with the virtues of integrity and responsibility, considering the broader implications of the decision and promoting ethical values in the tech industry."
      ],
      schools: [('Deontology','Utilitarianism'), ('Care','Virtue'), ('Utilitarianism','Deontology'), ('Virtue','Care')]
    },
    {
      question: "A pharmaceutical company has developed a life-saving medication for a rare disease but wants to charge a high price for it, making it unaffordable for many people who need it.",
      choices: [
      "Prioritize the right to health for all individuals, especially those who are vulnerable, over profits and consider the impact of pricing decisions on access to life-saving medication.",
      "Treat patients with dignity and respect by providing affordable access to life-saving medication, recognizing the value of health as a human right.",
      "Set a price that maximizes overall social welfare, balancing profits and public welfare, and recognizes the responsibility of the company to contribute to global health equity.",
      "Act with the virtues of compassion and justice, considering the well-being of patients and the broader societal implications of pricing decisions, and promote ethical values in the pharmaceutical industry."
      ],
      schools: [('Healthcare Justice', 'Virtue Ethics'), ('Social Justice', 'Care Ethics'), ('Utilitarianism', 'Deontology'), ('Global Justice', 'Feminist Ethics')]
      }
    ];
  
    export default questions;
    
  