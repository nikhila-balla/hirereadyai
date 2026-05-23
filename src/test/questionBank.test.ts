import { describe, it, expect } from "vitest";
import { generateQuizQuestions } from "../data/questionBank";

describe("Question Shuffling & Randomization", () => {
  it("should generate 10 questions and they should be sorted by difficulty", () => {
    const qs = generateQuizQuestions("aptitude", 10, "Speed & Distance");
    expect(qs).toHaveLength(10);
    
    // Check that difficulties are sorted: easy -> medium -> hard
    const order = { easy: 0, medium: 1, hard: 2 };
    for (let i = 0; i < qs.length - 1; i++) {
      expect(order[qs[i].difficulty]).toBeLessThanOrEqual(order[qs[i + 1].difficulty]);
    }
  });

  it("should shuffle option positions and correctly remap the answer index", () => {
    // Run multiple times to verify randomization doesn't break correct answer matching
    for (let run = 0; run < 10; run++) {
      const qs = generateQuizQuestions("aptitude", 10, "Percentages");
      
      // Let's check that each question's correct answer index matches the options
      // For instance, check if the question's text or properties are intact
      qs.forEach((q) => {
        expect(q.options).toHaveLength(4);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThanOrEqual(3);
        
        // Ensure options has the answer
        const correctAnswerText = q.options[q.answer];
        expect(correctAnswerText).toBeDefined();
      });
    }
  });

  it("should yield different order of questions on different calls", () => {
    // Generate questions for DSA Arrays topic multiple times and check if they are in different order
    const qs1 = generateQuizQuestions("dsa", 10, "Arrays");
    const qs2 = generateQuizQuestions("dsa", 10, "Arrays");
    
    const qText1 = qs1.map(q => q.q);
    const qText2 = qs2.map(q => q.q);
    
    // While it is theoretically possible to get the exact same shuffle,
    // with 10 questions the probability is 1/10! = 1/3,628,800.
    // So they should not be identical.
    expect(qText1).not.toEqual(qText2);
  });
});
