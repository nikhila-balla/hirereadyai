// Company-specific base questions
export const companyQuestions: Record<string, string[]> = {
  TCS: [
    "Tell me about yourself in 30 seconds.",
    "What is object-oriented programming? Give an example.",
    "How would you find a duplicate in an array with O(1) extra space?",
    "If 5 cats catch 5 mice in 5 minutes, how many cats are needed to catch 100 mice in 100 minutes?",
    "Why do you want to join TCS? What do you know about us?",
    "Explain the SDLC phases you have experience with.",
    "What is normalization in databases?",
  ],
  Google: [
    "Tell me about yourself and your strongest technical skill.",
    "Design a URL shortening service like bit.ly. Walk me through your approach.",
    "How would you find the median of two sorted arrays in O(log(m+n))?",
    "Tell me about a time you had a difficult conflict with a teammate. How did you resolve it?",
    "Describe a project where you took full ownership from start to finish.",
    "Explain Big-O notation with examples from your own code.",
    "How would you design a distributed caching system?",
  ],
  Amazon: [
    "Tell me about yourself.",
    "Give me an example of when you were obsessed with delivering a great customer experience.",
    "How would you design the checkout system for Amazon?",
    "Tell me about a time you went beyond the scope of your role to get something done.",
    "Describe the hardest technical challenge you have faced and how you solved it.",
    "Tell me about a time you had to earn trust from a skeptical stakeholder.",
    "How do you prioritize when everything is urgent?",
  ],
  Infosys: [
    "Tell me about yourself.",
    "How would you reverse a string without using extra space?",
    "Have you participated in HackWithInfy or any coding competition?",
    "Give an example of effective teamwork from your experience.",
    "Where do you see yourself in 5 years?",
    "Explain the difference between SQL and NoSQL databases.",
  ],
  Microsoft: [
    "Tell me about yourself and a project you are proud of.",
    "How would you design a real-time collaborative document editor?",
    "Explain the difference between a process and a thread.",
    "Tell me about a time you received critical feedback. How did you handle it?",
    "What excites you most about working at Microsoft?",
    "How would you implement authentication for a cloud service?",
  ],
  Wipro: [
    "Tell me about yourself.",
    "What is the difference between an abstract class and an interface?",
    "Write a function to check if a string is a palindrome.",
    "How do you handle pressure and tight deadlines?",
    "Why Wipro? What attracts you to this company?",
  ],
  Flipkart: [
    "Tell me about yourself.",
    "Design a product recommendation system for an e-commerce platform.",
    "How would you implement an LRU cache?",
    "Tell me about a time you had to make a decision with incomplete information.",
    "What do you think sets Flipkart apart from its competitors?",
  ],
  default: [
    "Tell me about yourself.",
    "What are your key strengths and one area you are working to improve?",
    "Describe the most challenging project you have worked on.",
    "Why are you interested in this company?",
    "What are your career goals for the next few years?",
  ],
};

// Skill-specific question templates
const skillQuestionTemplates: Record<string, string[]> = {
  JavaScript: [
    "Explain closures in JavaScript and where you have used them.",
    "What is the difference between var, let, and const? Give a real scenario.",
    "How does the JavaScript event loop work?",
  ],
  React: [
    "Explain React hooks you have used in your projects. Which is your favorite and why?",
    "How do you manage state in a large React application?",
    "What is the virtual DOM and why does React use it?",
  ],
  Python: [
    "How did you use Python in your projects? Walk me through an example.",
    "Explain list comprehensions vs generator expressions in Python.",
    "What Python libraries have you worked with and for what purpose?",
  ],
  SQL: [
    "Describe your database design experience. Have you normalized schemas?",
    "Explain JOINs with an example from a project you built.",
    "How would you optimize a slow SQL query?",
  ],
  "Node.js": [
    "How have you used Node.js in your backend projects?",
    "Explain middleware in Express.js with an example.",
    "How do you handle asynchronous operations in Node?",
  ],
  MongoDB: [
    "When would you choose MongoDB over a relational database?",
    "Explain document schema design in MongoDB.",
  ],
  Docker: [
    "How have you used Docker in your development workflow?",
    "Explain the difference between a Docker image and a container.",
  ],
  AWS: [
    "Which AWS services have you used and for what purpose?",
    "How would you deploy a web application on AWS?",
  ],
  Git: [
    "Explain your Git workflow. How do you handle merge conflicts?",
    "What is the difference between rebase and merge?",
  ],
  DSA: [
    "What data structures do you use most frequently and why?",
    "Walk me through your approach to solving a coding problem.",
    "Explain time complexity analysis with an example.",
  ],
  Java: [
    "Explain inheritance and polymorphism with a Java example.",
    "What is the difference between HashMap and TreeMap?",
    "How does garbage collection work in Java?",
  ],
  "C++": [
    "Explain pointers and memory management in C++.",
    "What are the differences between C++ and Java?",
  ],
  TypeScript: [
    "Why would you choose TypeScript over JavaScript?",
    "Explain generics in TypeScript with an example.",
  ],
  HTML: [
    "What is semantic HTML and why does it matter?",
  ],
  CSS: [
    "Explain CSS Flexbox vs Grid. When would you use each?",
  ],
  "Machine Learning": [
    "Explain a machine learning project you have worked on.",
    "What is the difference between supervised and unsupervised learning?",
  ],
  Firebase: [
    "How have you used Firebase in your projects?",
  ],
  Redux: [
    "Explain the Redux data flow pattern.",
  ],
  "REST API": [
    "How do you design RESTful APIs? Walk through an example.",
  ],
  GraphQL: [
    "What are the advantages of GraphQL over REST?",
  ],
};

// Behavioral questions pool
const behavioralQuestions = [
  "Tell me about a time you failed at something. What did you learn?",
  "How do you handle disagreements with team members?",
  "Describe a situation where you had to learn something quickly.",
  "Give an example of a time you showed initiative.",
  "How do you stay updated with new technologies?",
  "Tell me about your most impactful project contribution.",
  "How do you handle tight deadlines with multiple tasks?",
];

/**
 * Generate 15-20 resume-based + company-specific interview questions
 */
export const generateResumeQuestions = (
  skills: string[],
  company: string
): string[] => {
  const result: string[] = [];

  // 1. Opening (2 questions)
  result.push("Tell me about yourself and walk me through your resume.");
  result.push("What motivated you to pursue a career in technology?");

  // 2. Skill-based questions from resume (6-10 questions)
  const matchedSkills = skills.filter(
    (s) => skillQuestionTemplates[s] || skillQuestionTemplates[s.replace(/\.js$/i, "")]
  );
  const unmatchedSkills = skills.filter(
    (s) => !skillQuestionTemplates[s] && !skillQuestionTemplates[s.replace(/\.js$/i, "")]
  );

  for (const skill of matchedSkills) {
    const templates = skillQuestionTemplates[skill] || skillQuestionTemplates[skill.replace(/\.js$/i, "")] || [];
    // Pick 1-2 questions per skill
    const pick = templates.slice(0, result.length < 8 ? 2 : 1);
    result.push(...pick);
  }

  // Generic questions for unmatched skills
  for (const skill of unmatchedSkills.slice(0, 3)) {
    result.push(`Tell me about your experience with ${skill}. How did you use it in a project?`);
  }

  // 3. Company-specific questions (3-5 questions)
  const cqs = companyQuestions[company] || companyQuestions.default;
  // Skip "tell me about yourself" variants from company Qs since we already have one
  const filtered = cqs.filter((q) => !q.toLowerCase().startsWith("tell me about yourself"));
  result.push(...filtered.slice(0, 5));

  // 4. Behavioral questions (2-3 questions)
  const shuffled = [...behavioralQuestions].sort(() => Math.random() - 0.5);
  const behavioralCount = Math.max(2, 18 - result.length);
  result.push(...shuffled.slice(0, behavioralCount));

  // 5. Closing
  result.push("Do you have any questions for us?");

  // Cap at 20 questions
  return result.slice(0, 20);
};

/**
 * Generate a general tech interview based ONLY on resume skills (no company bias)
 */
export const generateGeneralQuestions = (skills: string[]): string[] => {
  const result: string[] = [];
  result.push("Tell me about yourself and walk me through your resume.");
  result.push("Which technology on your resume are you strongest in, and why?");

  const matched = skills.filter((s) => skillQuestionTemplates[s] || skillQuestionTemplates[s.replace(/\.js$/i, "")]);
  const unmatched = skills.filter((s) => !skillQuestionTemplates[s] && !skillQuestionTemplates[s.replace(/\.js$/i, "")]);

  // Shuffle skills for variety each session
  const shuffledMatched = [...matched].sort(() => Math.random() - 0.5);
  for (const skill of shuffledMatched) {
    const t = skillQuestionTemplates[skill] || skillQuestionTemplates[skill.replace(/\.js$/i, "")] || [];
    const shuffled = [...t].sort(() => Math.random() - 0.5);
    result.push(...shuffled.slice(0, result.length < 8 ? 2 : 1));
    if (result.length >= 14) break;
  }

  for (const skill of unmatched.slice(0, 3)) {
    result.push(`Walk me through a project where you used ${skill}. What was your specific contribution?`);
  }

  // Cross-cutting tech questions
  const generalTech = [
    "Describe the architecture of your most complex project end-to-end.",
    "How do you debug a production issue you cannot reproduce locally?",
    "What does clean, maintainable code mean to you? Give an example.",
    "How do you approach learning a new technology under a deadline?",
    "Walk me through how you would test a feature you just built.",
  ].sort(() => Math.random() - 0.5);
  result.push(...generalTech.slice(0, 3));

  const beh = [...behavioralQuestions].sort(() => Math.random() - 0.5);
  result.push(...beh.slice(0, 2));
  result.push("Do you have any questions for me?");
  return result.slice(0, 18);
};

/**
 * Legacy: get 5 company-only questions (kept for backward compat)
 */
export const getQuestionsForCompany = (company: string): string[] => {
  return companyQuestions[company] || companyQuestions.default;
};
