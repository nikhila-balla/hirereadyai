import { useCallback } from "react";

export interface AnswerScore {
  questionIndex: number;
  question: string;
  answer: string;
  contentScore: number;
  confidenceScore: number;
  structureScore: number;
  overallScore: number;
  feedback: string;
}

export interface InterviewScores {
  confidence: number;
  content: number;
  structure: number;
  overall: number;
  perQuestion: AnswerScore[];
}

// Filler words that reduce confidence score
const FILLER_WORDS = ["um", "uh", "like", "you know", "basically", "actually", "so", "well", "i mean", "kind of", "sort of"];

// STAR method indicators
const STAR_INDICATORS = {
  situation: ["situation", "context", "background", "when i", "there was", "at my", "during"],
  task: ["task", "responsible", "goal", "objective", "needed to", "had to", "challenge"],
  action: ["action", "i did", "i built", "i implemented", "i created", "i designed", "i developed", "i led", "i used", "my approach"],
  result: ["result", "outcome", "achieved", "improved", "reduced", "increased", "led to", "successfully", "delivered"],
};

// Technical depth keywords
const TECHNICAL_DEPTH = [
  "algorithm", "complexity", "o(n)", "o(1)", "o(log", "database", "api", "framework",
  "architecture", "scalab", "optimiz", "cache", "async", "deploy", "ci/cd", "testing",
  "debug", "refactor", "design pattern", "microservice", "docker", "kubernetes",
];

export const useInterviewScoring = () => {
  const scoreAnswer = useCallback((question: string, answer: string, resumeSkills: string[]): AnswerScore => {
    const words = answer.trim().split(/\s+/);
    const wordCount = words.length;
    const lowerAnswer = answer.toLowerCase();
    const lowerQuestion = question.toLowerCase();

    // --- Content Score (0-100) ---
    let contentScore = 0;

    // Word count factor (good answers: 30-150 words)
    if (wordCount < 5) contentScore += 5;
    else if (wordCount < 15) contentScore += 20;
    else if (wordCount < 30) contentScore += 35;
    else if (wordCount < 80) contentScore += 50;
    else if (wordCount < 150) contentScore += 45;
    else contentScore += 35; // Too long

    // Resume skill mention bonus
    const mentionedSkills = resumeSkills.filter((s) => lowerAnswer.includes(s.toLowerCase()));
    contentScore += Math.min(25, mentionedSkills.length * 8);

    // Technical depth
    const techMatches = TECHNICAL_DEPTH.filter((t) => lowerAnswer.includes(t));
    contentScore += Math.min(15, techMatches.length * 5);

    // Relevance: does the answer address the question topic?
    const questionKeywords = lowerQuestion.split(/\s+/).filter((w) => w.length > 3);
    const relevanceHits = questionKeywords.filter((kw) => lowerAnswer.includes(kw));
    contentScore += Math.min(10, relevanceHits.length * 3);

    contentScore = Math.min(100, contentScore);

    // --- Confidence Score (0-100) ---
    let confidenceScore = 70; // Base

    // Filler words penalty
    const fillerCount = FILLER_WORDS.reduce(
      (count, filler) => count + (lowerAnswer.match(new RegExp(`\\b${filler}\\b`, "gi"))?.length || 0),
      0
    );
    const fillerRate = wordCount > 0 ? fillerCount / wordCount : 0;
    confidenceScore -= Math.min(30, fillerRate * 200);

    // Short answers suggest low confidence
    if (wordCount < 10) confidenceScore -= 20;
    else if (wordCount < 20) confidenceScore -= 10;

    // Assertive language bonus
    const assertive = ["i believe", "i am confident", "my strength", "i excel", "i successfully", "i achieved"];
    const assertiveCount = assertive.filter((a) => lowerAnswer.includes(a)).length;
    confidenceScore += Math.min(15, assertiveCount * 5);

    // Hedging penalty
    const hedging = ["i think maybe", "i'm not sure", "i guess", "probably", "perhaps"];
    const hedgeCount = hedging.filter((h) => lowerAnswer.includes(h)).length;
    confidenceScore -= hedgeCount * 5;

    confidenceScore = Math.max(10, Math.min(100, confidenceScore));

    // --- Structure Score (0-100) ---
    let structureScore = 40; // Base

    // STAR method detection
    let starCount = 0;
    for (const [, indicators] of Object.entries(STAR_INDICATORS)) {
      if (indicators.some((ind) => lowerAnswer.includes(ind))) starCount++;
    }
    structureScore += starCount * 10;

    // Sentence count (structured answers have 3-8 sentences)
    const sentences = answer.split(/[.!?]+/).filter((s) => s.trim().length > 5);
    if (sentences.length >= 3 && sentences.length <= 10) structureScore += 15;
    else if (sentences.length >= 2) structureScore += 8;

    // Example/project mention bonus
    const exampleIndicators = ["for example", "in my project", "instance", "such as", "when i worked"];
    if (exampleIndicators.some((e) => lowerAnswer.includes(e))) structureScore += 10;

    structureScore = Math.min(100, structureScore);

    // --- Overall ---
    const overallScore = Math.round(contentScore * 0.4 + confidenceScore * 0.3 + structureScore * 0.3);

    // --- Feedback ---
    const feedbackParts: string[] = [];
    if (wordCount < 15) feedbackParts.push("Try to elaborate more.");
    if (fillerCount > 2) feedbackParts.push("Reduce filler words (um, uh, like).");
    if (starCount >= 3) feedbackParts.push("Great STAR method usage!");
    if (mentionedSkills.length > 0) feedbackParts.push(`Good skill references: ${mentionedSkills.join(", ")}.`);
    if (techMatches.length > 0) feedbackParts.push("Strong technical depth.");
    if (contentScore < 30) feedbackParts.push("Address the question more directly.");

    return {
      questionIndex: 0,
      question,
      answer,
      contentScore,
      confidenceScore,
      structureScore,
      overallScore,
      feedback: feedbackParts.join(" ") || "Decent answer. Try adding specific examples.",
    };
  }, []);

  const scoreInterview = useCallback(
    (questions: string[], answers: string[], resumeSkills: string[]): InterviewScores => {
      const perQuestion = questions.map((q, i) => {
        const ans = answers[i] || "";
        const scored = scoreAnswer(q, ans, resumeSkills);
        return { ...scored, questionIndex: i };
      });

      const answered = perQuestion.filter((q) => q.answer.trim().length > 0);
      const count = answered.length || 1;

      return {
        confidence: Math.round(answered.reduce((s, q) => s + q.confidenceScore, 0) / count),
        content: Math.round(answered.reduce((s, q) => s + q.contentScore, 0) / count),
        structure: Math.round(answered.reduce((s, q) => s + q.structureScore, 0) / count),
        overall: Math.round(answered.reduce((s, q) => s + q.overallScore, 0) / count),
        perQuestion,
      };
    },
    [scoreAnswer]
  );

  return { scoreAnswer, scoreInterview };
};
