export interface Question {
  q: string;
  options: string[];
  answer: number;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  topic?: string;
  company?: string;
}

// ─── APTITUDE: 30 topics ───
const aptitudeQuestions: Question[] = [
  // Speed & Distance (10)
  { q: "A train travels 360 km in 4 hours. What is its speed?", options: ["80 km/h", "90 km/h", "100 km/h", "70 km/h"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Speed & Distance" },
  { q: "A car covers 150 km in 2.5 hours. Find the speed.", options: ["50 km/h", "55 km/h", "60 km/h", "65 km/h"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Speed & Distance" },
  { q: "Two trains 200m and 300m long cross each other in 10s moving opposite. Combined speed?", options: ["50 m/s", "40 m/s", "30 m/s", "60 m/s"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Speed & Distance" },
  { q: "A boat goes 20km upstream in 4h and 20km downstream in 2h. Speed of stream?", options: ["2.5 km/h", "3 km/h", "5 km/h", "1.5 km/h"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Speed & Distance" },
  { q: "A 240m train crosses a platform in 20s at 72 km/h. Platform length?", options: ["160m", "200m", "180m", "220m"], answer: 0, difficulty: "hard", category: "aptitude", topic: "Speed & Distance" },
  { q: "If a person walks at 4 km/h, he reaches 10 min late. At 6 km/h, 10 min early. Find distance.", options: ["8 km", "10 km", "12 km", "6 km"], answer: 0, difficulty: "hard", category: "aptitude", topic: "Speed & Distance" },
  { q: "A man runs at 10 km/h. How far does he go in 45 minutes?", options: ["6.5 km", "7 km", "7.5 km", "8 km"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Speed & Distance" },
  { q: "Two cities are 300 km apart. Cars leave at same time. Speeds 60 and 40 km/h. When do they meet?", options: ["2 hrs", "3 hrs", "4 hrs", "5 hrs"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Speed & Distance" },
  { q: "A cyclist covers 12 km at 6 km/h and returns at 4 km/h. Average speed?", options: ["4.8 km/h", "5 km/h", "5.2 km/h", "4.5 km/h"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Speed & Distance" },
  { q: "Relative speed of two trains moving in same direction at 60 and 40 km/h?", options: ["100 km/h", "20 km/h", "50 km/h", "10 km/h"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Speed & Distance" },

  // Percentages (10)
  { q: "What is 25% of 400?", options: ["75", "100", "125", "150"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Percentages" },
  { q: "What is 15% of 200?", options: ["20", "25", "30", "35"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Percentages" },
  { q: "A shirt costs ₹500 after 20% discount. Original price?", options: ["₹600", "₹625", "₹650", "₹700"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Percentages" },
  { q: "Compound interest on ₹10,000 at 10% for 2 years?", options: ["₹2000", "₹2100", "₹2200", "₹1900"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Percentages" },
  { q: "A value increases from 200 to 250. Percentage increase?", options: ["20%", "25%", "30%", "15%"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Percentages" },
  { q: "If price increases by 20% then decreases by 20%, net change?", options: ["-4%", "0%", "-2%", "+4%"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Percentages" },
  { q: "Population grows 10% yearly. After 2 years from 10000?", options: ["12000", "12100", "11000", "12200"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Percentages" },
  { q: "60% of a number is 150. What is the number?", options: ["200", "225", "250", "300"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Percentages" },
  { q: "Successive discounts of 10% and 20% on ₹1000?", options: ["₹700", "₹720", "₹680", "₹750"], answer: 1, difficulty: "hard", category: "aptitude", topic: "Percentages" },
  { q: "A earns 20% more than B. B earns how much % less than A?", options: ["20%", "16.67%", "15%", "25%"], answer: 1, difficulty: "hard", category: "aptitude", topic: "Percentages" },

  // Time & Work (10)
  { q: "If 3 workers finish a job in 6 days, how many days for 6 workers?", options: ["2", "3", "4", "12"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Time & Work" },
  { q: "How many seconds are in 2 hours?", options: ["3600", "5400", "7200", "9000"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Time & Work" },
  { q: "A does work in 10 days, B in 15 days. Together?", options: ["5 days", "6 days", "7 days", "8 days"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Time & Work" },
  { q: "A pipe fills a tank in 12h. Another empties in 15h. Net fill time?", options: ["50h", "60h", "40h", "30h"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Time & Work" },
  { q: "A can do a work in 12 days and B in 18 days. They work together for 4 days, then A leaves. B finishes in?", options: ["6 days", "8 days", "10 days", "5 days"], answer: 2, difficulty: "hard", category: "aptitude", topic: "Time & Work" },
  { q: "15 men finish work in 20 days. How many men needed for 10 days?", options: ["25", "30", "35", "40"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Time & Work" },
  { q: "A tap fills 1/3 in 5 hours. Full tank time?", options: ["10h", "12h", "15h", "20h"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Time & Work" },
  { q: "A is twice as fast as B. Together 12 days. A alone?", options: ["16 days", "18 days", "20 days", "24 days"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Time & Work" },
  { q: "10 women can do a work in 7 days. 10 men finish in 5 days. 5M + 5W together?", options: ["5.83 days", "6 days", "7 days", "4 days"], answer: 0, difficulty: "hard", category: "aptitude", topic: "Time & Work" },
  { q: "Machine A produces 100 units/hr, B 150 units/hr. Together for 4 hrs?", options: ["800", "900", "1000", "1100"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Time & Work" },

  // Algebra (10)
  { q: "If x + 5 = 12, what is x?", options: ["5", "6", "7", "8"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Algebra" },
  { q: "Solve: 2x - 3 = 7", options: ["3", "4", "5", "6"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Algebra" },
  { q: "If log₂(x) + log₂(x-2) = 3, find x.", options: ["4", "3", "5", "6"], answer: 0, difficulty: "hard", category: "aptitude", topic: "Algebra" },
  { q: "Sum of roots of x² - 5x + 6 = 0?", options: ["5", "6", "-5", "3"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Algebra" },
  { q: "If 3^(x+1) = 81, find x.", options: ["2", "3", "4", "5"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Algebra" },
  { q: "Product of roots of x² - 7x + 12 = 0?", options: ["7", "12", "-12", "-7"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Algebra" },
  { q: "Simplify: (a+b)² - (a-b)²", options: ["2ab", "4ab", "2a²", "2b²"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Algebra" },
  { q: "If f(x) = 2x² + 3x - 5, find f(2).", options: ["7", "9", "11", "13"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Algebra" },
  { q: "Solve: |2x - 6| = 10", options: ["8, -2", "8, 2", "-8, 2", "-8, -2"], answer: 0, difficulty: "hard", category: "aptitude", topic: "Algebra" },
  { q: "How many real roots does x² + 4 = 0 have?", options: ["2", "1", "0", "4"], answer: 2, difficulty: "medium", category: "aptitude", topic: "Algebra" },

  // Probability (10)
  { q: "Probability of getting a head on a fair coin?", options: ["1/4", "1/3", "1/2", "2/3"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Probability" },
  { q: "Probability of rolling 6 on a die?", options: ["1/2", "1/3", "1/6", "1/4"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Probability" },
  { q: "Probability of at least one head in 3 coin tosses?", options: ["7/8", "3/4", "1/2", "5/8"], answer: 0, difficulty: "hard", category: "aptitude", topic: "Probability" },
  { q: "Two dice thrown. P(sum = 7)?", options: ["1/6", "1/4", "1/3", "1/12"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Probability" },
  { q: "A bag has 3 red, 5 blue. P(red)?", options: ["3/5", "5/8", "3/8", "1/3"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Probability" },
  { q: "P(A) = 0.3, P(B) = 0.4, independent. P(A ∩ B)?", options: ["0.7", "0.12", "0.1", "0.3"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Probability" },
  { q: "5 cards drawn from 52. P(all spades)?", options: ["33/66640", "1/2048", "1/4165", "33/66640"], answer: 0, difficulty: "hard", category: "aptitude", topic: "Probability" },
  { q: "P(A ∪ B) = P(A) + P(B) - P(A ∩ B). If A & B mutually exclusive, P(A ∪ B)?", options: ["P(A) × P(B)", "P(A) + P(B)", "P(A) - P(B)", "0"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Probability" },
  { q: "Expected value of a fair die roll?", options: ["3", "3.5", "4", "2.5"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Probability" },
  { q: "From 10 items, 3 defective. P(both picked are defective)?", options: ["1/15", "3/10", "1/5", "2/15"], answer: 0, difficulty: "hard", category: "aptitude", topic: "Probability" },

  // Ratios & Proportions (10)
  { q: "If A:B = 3:4 and B:C = 5:6, what is A:C?", options: ["15:24", "5:8", "3:6", "9:12"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Ratios" },
  { q: "Divide 100 in ratio 2:3.", options: ["40, 60", "30, 70", "50, 50", "45, 55"], answer: 0, difficulty: "easy", category: "aptitude", topic: "Ratios" },
  { q: "If 4:x = 8:12, find x.", options: ["4", "5", "6", "8"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Ratios" },
  { q: "A mixture of 5L water and 3L milk. Ratio of water to total?", options: ["5:3", "5:8", "3:8", "3:5"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Ratios" },
  { q: "Income ratio of A and B is 5:4. Expenses 3:2. Both save ₹1000. A's income?", options: ["₹5000", "₹4000", "₹3000", "₹2500"], answer: 0, difficulty: "hard", category: "aptitude", topic: "Ratios" },
  { q: "3rd proportional to 4 and 12?", options: ["24", "36", "48", "16"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Ratios" },
  { q: "Mean proportional between 4 and 16?", options: ["6", "8", "10", "12"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Ratios" },
  { q: "Ratio 2:3:5. Total is 200. Middle value?", options: ["40", "50", "60", "100"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Ratios" },
  { q: "If A:B = 2:3 and A = 10, B = ?", options: ["12", "15", "18", "20"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Ratios" },
  { q: "Compounded ratio of 2:3 and 4:5?", options: ["6:8", "8:15", "8:12", "6:15"], answer: 1, difficulty: "hard", category: "aptitude", topic: "Ratios" },

  // Geometry (10)
  { q: "Area of a rectangle with length 8 and width 5?", options: ["35", "40", "45", "30"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Geometry" },
  { q: "Circumference of circle with radius 7? (π ≈ 22/7)", options: ["44", "38", "42", "46"], answer: 0, difficulty: "easy", category: "aptitude", topic: "Geometry" },
  { q: "Area of a triangle with base 10 and height 6?", options: ["60", "30", "40", "50"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Geometry" },
  { q: "Diagonal of a square with side 5?", options: ["5√2", "10", "25", "5√3"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Geometry" },
  { q: "Volume of a cube with side 4?", options: ["16", "32", "64", "128"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Geometry" },
  { q: "Surface area of a sphere with radius 3?", options: ["36π", "27π", "12π", "9π"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Geometry" },
  { q: "Interior angle sum of a hexagon?", options: ["540°", "720°", "900°", "1080°"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Geometry" },
  { q: "Hypotenuse of right triangle with legs 3 and 4?", options: ["6", "7", "5", "8"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Geometry" },
  { q: "Area of a circle with diameter 14?", options: ["154", "144", "196", "176"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Geometry" },
  { q: "Volume of a cylinder: radius 7, height 10?", options: ["1540", "1440", "1320", "1400"], answer: 0, difficulty: "hard", category: "aptitude", topic: "Geometry" },

  // Patterns & Series (10)
  { q: "Next: 2, 6, 12, 20, ?", options: ["28", "30", "32", "25"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Patterns" },
  { q: "Next: 1, 1, 2, 3, 5, 8, ?", options: ["10", "11", "12", "13"], answer: 3, difficulty: "easy", category: "aptitude", topic: "Patterns" },
  { q: "Next: 3, 6, 11, 18, 27, ?", options: ["36", "38", "40", "42"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Patterns" },
  { q: "Next: 2, 3, 5, 7, 11, ?", options: ["12", "13", "14", "15"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Patterns" },
  { q: "Next: 1, 4, 9, 16, 25, ?", options: ["30", "35", "36", "49"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Patterns" },
  { q: "Next: 100, 98, 94, 86, 70, ?", options: ["38", "46", "50", "54"], answer: 0, difficulty: "hard", category: "aptitude", topic: "Patterns" },
  { q: "Next: 2, 6, 18, 54, ?", options: ["108", "162", "216", "72"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Patterns" },
  { q: "Next: 1, 8, 27, 64, ?", options: ["100", "125", "150", "216"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Patterns" },
  { q: "Odd one out: 2, 5, 11, 23, __(47)__, 95", options: ["45", "46", "47", "48"], answer: 2, difficulty: "hard", category: "aptitude", topic: "Patterns" },
  { q: "Next: 0, 1, 3, 6, 10, ?", options: ["14", "15", "16", "20"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Patterns" },

  // Averages (10)
  { q: "Average of 10, 20, 30, 40, 50?", options: ["25", "30", "35", "40"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Averages" },
  { q: "Average of first 10 natural numbers?", options: ["5", "5.5", "6", "4.5"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Averages" },
  { q: "Average age of 5 students is 20. A new student makes it 21. New student's age?", options: ["25", "26", "27", "28"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Averages" },
  { q: "Weighted avg: 3 subjects with marks 80, 90, 70 & weights 2, 3, 1?", options: ["82", "83.33", "85", "80"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Averages" },
  { q: "Avg of 5 numbers is 20. If one is excluded, avg becomes 18. Excluded number?", options: ["24", "26", "28", "30"], answer: 2, difficulty: "medium", category: "aptitude", topic: "Averages" },
  { q: "Batsman's avg after 20 innings is 30. After 21st, avg becomes 31. Runs in 21st?", options: ["50", "51", "52", "55"], answer: 1, difficulty: "hard", category: "aptitude", topic: "Averages" },
  { q: "Average of first 50 even numbers?", options: ["50", "51", "52", "49"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Averages" },
  { q: "Mean of 12, 15, 18, 21, 24?", options: ["17", "18", "19", "20"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Averages" },
  { q: "If average of a, b, c is 10 and average of a, b is 8, what is c?", options: ["12", "14", "16", "10"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Averages" },
  { q: "Average speed if 60 km at 30 km/h and 60 km at 60 km/h?", options: ["40 km/h", "45 km/h", "42 km/h", "50 km/h"], answer: 0, difficulty: "hard", category: "aptitude", topic: "Averages" },

  // Permutations & Combinations (10)
  { q: "5 people around a circular table?", options: ["120", "24", "60", "12"], answer: 1, difficulty: "hard", category: "aptitude", topic: "Permutations" },
  { q: "How many ways to arrange 4 books on a shelf?", options: ["12", "16", "24", "48"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Permutations" },
  { q: "C(5,2) = ?", options: ["10", "20", "15", "25"], answer: 0, difficulty: "easy", category: "aptitude", topic: "Permutations" },
  { q: "How many 3-digit numbers from digits 1-5 (no repeat)?", options: ["60", "120", "80", "100"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Permutations" },
  { q: "Ways to select a committee of 3 from 8 people?", options: ["56", "336", "24", "120"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Permutations" },
  { q: "P(7,3) = ?", options: ["210", "35", "120", "840"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Permutations" },
  { q: "How many ways to arrange MISSISSIPPI?", options: ["34650", "39916800", "2520", "5040"], answer: 0, difficulty: "hard", category: "aptitude", topic: "Permutations" },
  { q: "Combination formula C(n,r) = ?", options: ["n!/r!", "n!/(r!(n-r)!)", "(n-r)!/r!", "n!/(n-r)!"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Permutations" },
  { q: "Derangement of 3 items?", options: ["1", "2", "3", "6"], answer: 1, difficulty: "hard", category: "aptitude", topic: "Permutations" },
  { q: "C(10,0) + C(10,10) = ?", options: ["0", "1", "2", "10"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Permutations" },

  // Profit & Loss (10)
  { q: "CP = ₹200, SP = ₹250. Profit %?", options: ["20%", "25%", "30%", "15%"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Profit & Loss" },
  { q: "CP = ₹500, Loss = 10%. SP?", options: ["₹400", "₹450", "₹475", "₹425"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Profit & Loss" },
  { q: "SP = ₹600, Profit = 20%. CP?", options: ["₹480", "₹500", "₹520", "₹540"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Profit & Loss" },
  { q: "Buy 10 for ₹100, sell 10 for ₹120. Profit %?", options: ["10%", "15%", "20%", "25%"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Profit & Loss" },
  { q: "Marked price ₹1000, discount 10%, profit 20%. CP?", options: ["₹750", "₹800", "₹700", "₹850"], answer: 0, difficulty: "hard", category: "aptitude", topic: "Profit & Loss" },
  { q: "A sells to B at 20% profit. B sells to C at 10% loss. If A's CP was ₹100, C paid?", options: ["₹108", "₹110", "₹112", "₹98"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Profit & Loss" },
  { q: "An item is sold at 5% loss. If sold for ₹50 more, profit 5%. CP?", options: ["₹400", "₹450", "₹500", "₹550"], answer: 2, difficulty: "hard", category: "aptitude", topic: "Profit & Loss" },
  { q: "Buy 5 get 1 free. Sell all at cost. Profit %?", options: ["16.67%", "20%", "25%", "10%"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Profit & Loss" },
  { q: "Total CP of 2 items = ₹600. One sold at 20% profit, other at 20% loss. Net?", options: ["No P/L", "₹24 loss", "₹24 profit", "₹12 loss"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Profit & Loss" },
  { q: "Trader marks goods 40% above CP and gives 25% discount. Profit %?", options: ["5%", "10%", "15%", "20%"], answer: 0, difficulty: "hard", category: "aptitude", topic: "Profit & Loss" },

  // Simple Interest (10)
  { q: "SI on ₹5000 at 8% for 3 years?", options: ["₹1000", "₹1200", "₹1500", "₹800"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Simple Interest" },
  { q: "P = ₹2000, R = 5%, T = 4 years. SI?", options: ["₹300", "₹400", "₹500", "₹200"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Simple Interest" },
  { q: "SI = ₹600, R = 10%, T = 3 years. P?", options: ["₹1500", "₹2000", "₹2500", "₹3000"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Simple Interest" },
  { q: "A sum doubles in 8 years at SI. Rate?", options: ["10%", "12.5%", "15%", "8%"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Simple Interest" },
  { q: "Difference between CI and SI for 2 years on ₹10000 at 10%?", options: ["₹50", "₹100", "₹150", "₹200"], answer: 1, difficulty: "hard", category: "aptitude", topic: "Simple Interest" },
  { q: "₹8000 at 10% SI for 2 years. Amount?", options: ["₹9200", "₹9600", "₹10000", "₹8800"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Simple Interest" },
  { q: "Rate at which ₹1000 becomes ₹1500 in 5 years?", options: ["8%", "10%", "12%", "15%"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Simple Interest" },
  { q: "Time for ₹5000 to earn ₹2000 at 10% SI?", options: ["3 yrs", "4 yrs", "5 yrs", "2 yrs"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Simple Interest" },
  { q: "Two sums in ratio 2:3. Same rate & time. SI ratio?", options: ["2:3", "3:2", "4:9", "1:1"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Simple Interest" },
  { q: "A sum triples in 10 years. SI rate?", options: ["15%", "20%", "25%", "30%"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Simple Interest" },

  // Logical Reasoning (10)
  { q: "All cats are animals. All animals are living. Therefore?", options: ["All living are cats", "All cats are living", "Some living are not cats", "None"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Logical Reasoning" },
  { q: "If APPLE = 50, BALL = ?", options: ["27", "24", "30", "22"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Logical Reasoning" },
  { q: "Pointing to a man: 'He is my mother's only son's son.' Relation?", options: ["Son", "Brother", "Nephew", "Uncle"], answer: 0, difficulty: "easy", category: "aptitude", topic: "Logical Reasoning" },
  { q: "A is east of B. C is north of A. B is south of D. D is in which direction of C?", options: ["West", "East", "North", "South"], answer: 0, difficulty: "hard", category: "aptitude", topic: "Logical Reasoning" },
  { q: "Complete: Z, X, V, T, R, ?", options: ["O", "P", "Q", "S"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Logical Reasoning" },
  { q: "If '+' means '×', '-' means '÷', '×' means '-', '÷' means '+'. Then 8+6-3×2÷1 = ?", options: ["15", "17", "19", "21"], answer: 1, difficulty: "hard", category: "aptitude", topic: "Logical Reasoning" },
  { q: "How many triangles in a figure with 3 horizontal and 3 vertical lines forming a grid?", options: ["6", "8", "10", "12"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Logical Reasoning" },
  { q: "Mirror image of DOCTOR?", options: ["ROTCOD", "DOTCOR", "ⱤOTƆOƊ", "DOCTOR reversed"], answer: 0, difficulty: "easy", category: "aptitude", topic: "Logical Reasoning" },
  { q: "Odd one out: 3, 5, 7, 11, 13, 15, 17", options: ["3", "11", "15", "17"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Logical Reasoning" },
  { q: "Statement: Some dogs are cats. All cats are birds. Conclusion: Some dogs are birds.", options: ["True", "False", "Cannot determine", "Partially true"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Logical Reasoning" },

  // Data Interpretation (10)
  { q: "Bar chart shows: Mon=20, Tue=30, Wed=25. Average?", options: ["20", "25", "30", "35"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Data Interpretation" },
  { q: "Pie chart: A=40%, B=25%, C=20%, D=15%. If total=1000, D's value?", options: ["100", "150", "200", "250"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Data Interpretation" },
  { q: "Line graph shows profits: 2018=100, 2019=120, 2020=90. Max drop year?", options: ["2018", "2019", "2020", "None"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Data Interpretation" },
  { q: "Table: Product A=₹500×100, Product B=₹300×200. Total revenue?", options: ["₹110000", "₹100000", "₹90000", "₹80000"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Data Interpretation" },
  { q: "Revenue grows: 100, 120, 144, 172.8. Growth rate?", options: ["15%", "18%", "20%", "25%"], answer: 2, difficulty: "medium", category: "aptitude", topic: "Data Interpretation" },
  { q: "If exports = 60% of production and production = 5000 units, exports?", options: ["2500", "3000", "3500", "4000"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Data Interpretation" },
  { q: "Ratio of sales Q1:Q2:Q3:Q4 = 2:3:4:1. Q3's share?", options: ["20%", "30%", "40%", "10%"], answer: 2, difficulty: "medium", category: "aptitude", topic: "Data Interpretation" },
  { q: "Year-over-year growth: 100→130→169. CAGR?", options: ["25%", "30%", "35%", "40%"], answer: 1, difficulty: "hard", category: "aptitude", topic: "Data Interpretation" },
  { q: "If chart shows M=40, F=60. What % are male?", options: ["30%", "35%", "40%", "45%"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Data Interpretation" },
  { q: "Stacked bar: 2020 total=500, component A=200. A's share?", options: ["35%", "40%", "45%", "50%"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Data Interpretation" },

  // Number Systems (10)
  { q: "Convert binary 1010 to decimal.", options: ["8", "10", "12", "14"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Number Systems" },
  { q: "HCF of 12 and 18?", options: ["4", "6", "8", "12"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Number Systems" },
  { q: "LCM of 4, 6, and 8?", options: ["12", "16", "24", "48"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Number Systems" },
  { q: "Which is not a prime? 2, 3, 9, 11", options: ["2", "3", "9", "11"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Number Systems" },
  { q: "Remainder when 17 is divided by 5?", options: ["1", "2", "3", "4"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Number Systems" },
  { q: "Convert decimal 25 to binary.", options: ["11001", "10011", "11010", "10101"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Number Systems" },
  { q: "Product of two co-prime numbers is 77. The numbers are?", options: ["7,11", "1,77", "Both", "None"], answer: 2, difficulty: "medium", category: "aptitude", topic: "Number Systems" },
  { q: "Hexadecimal A in decimal?", options: ["8", "9", "10", "11"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Number Systems" },
  { q: "Largest 3-digit prime?", options: ["991", "993", "997", "999"], answer: 2, difficulty: "hard", category: "aptitude", topic: "Number Systems" },
  { q: "Remainder of 2^10 / 7?", options: ["1", "2", "4", "6"], answer: 1, difficulty: "hard", category: "aptitude", topic: "Number Systems" },

  // Clocks & Calendars (10)
  { q: "Angle between clock hands at 3:00?", options: ["60°", "75°", "90°", "120°"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Clocks & Calendars" },
  { q: "What day is Jan 1, 2025 if Jan 1, 2024 is Monday?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Clocks & Calendars" },
  { q: "At what time between 2 and 3 are hands at 90°?", options: ["2:16", "2:27", "2:33", "2:38"], answer: 1, difficulty: "hard", category: "aptitude", topic: "Clocks & Calendars" },
  { q: "How many times do clock hands overlap in 12 hours?", options: ["10", "11", "12", "22"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Clocks & Calendars" },
  { q: "Angle at 6:30?", options: ["0°", "3°", "6°", "15°"], answer: 2, difficulty: "medium", category: "aptitude", topic: "Clocks & Calendars" },
  { q: "A clock gains 5 min every hour. After 12 hours, it shows?", options: ["1 hr ahead", "30 min ahead", "1 hr behind", "45 min ahead"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Clocks & Calendars" },
  { q: "If today is Friday, what day is after 100 days?", options: ["Sunday", "Monday", "Tuesday", "Wednesday"], answer: 0, difficulty: "easy", category: "aptitude", topic: "Clocks & Calendars" },
  { q: "Leap year condition: divisible by?", options: ["4 only", "4, but not 100 unless 400", "400 only", "100"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Clocks & Calendars" },
  { q: "Minutes between 3:15 AM and 5:45 AM?", options: ["120", "130", "140", "150"], answer: 3, difficulty: "easy", category: "aptitude", topic: "Clocks & Calendars" },
  { q: "Minute hand covers how many degrees in 20 minutes?", options: ["100°", "110°", "120°", "130°"], answer: 2, difficulty: "medium", category: "aptitude", topic: "Clocks & Calendars" },

  // Coding-Decoding (10)
  { q: "If CAT = DBU, DOG = ?", options: ["EPH", "CPF", "FQI", "DOH"], answer: 0, difficulty: "easy", category: "aptitude", topic: "Coding-Decoding" },
  { q: "If ROSE = 6789, SORE = ?", options: ["9876", "8679", "9678", "7689"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Coding-Decoding" },
  { q: "A=1, B=2... FACE = ?", options: ["21", "17", "14", "15"], answer: 0, difficulty: "easy", category: "aptitude", topic: "Coding-Decoding" },
  { q: "If FRIEND is coded as HUMGPF, how is CANDLE coded?", options: ["DCPFMG", "EDRFNG", "ECPHNG", "ECRFNG"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Coding-Decoding" },
  { q: "If 'apple' is coded as 'banana', 'banana' as 'cherry', what do you eat with cereal?", options: ["Apple", "Cherry", "Banana", "Cannot determine"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Coding-Decoding" },
  { q: "TRAIN in reverse coding?", options: ["NIART", "USBJO", "SQZHM", "WUDKP"], answer: 0, difficulty: "easy", category: "aptitude", topic: "Coding-Decoding" },
  { q: "If A=2, B=4, C=6... Z=?", options: ["48", "50", "52", "54"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Coding-Decoding" },
  { q: "COMPUTER → OCPMTURE. Pattern?", options: ["Swap pairs", "Reverse", "Shift +1", "Random"], answer: 0, difficulty: "hard", category: "aptitude", topic: "Coding-Decoding" },
  { q: "If JOB = 27, FUN = ?", options: ["42", "40", "45", "36"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Coding-Decoding" },
  { q: "If 'go' means 'come', 'come' means 'stay', 'stay' means 'sit'. What means 'stay'?", options: ["go", "come", "sit", "stay"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Coding-Decoding" },

  // Blood Relations (10)
  { q: "A is B's father. B is C's sister. A is C's what?", options: ["Uncle", "Father", "Brother", "Grandfather"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Blood Relations" },
  { q: "Pointing to a photo: 'She is my mother's mother.' Relation?", options: ["Mother", "Sister", "Grandmother", "Aunt"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Blood Relations" },
  { q: "A + B means A is father of B. A - B means A is wife of B. C + D - E means?", options: ["C is father-in-law of E", "E is husband of D", "C is father of D, D is wife of E", "None"], answer: 2, difficulty: "hard", category: "aptitude", topic: "Blood Relations" },
  { q: "X says to Y: 'Your mother is my mother's daughter.' X is Y's?", options: ["Uncle", "Father", "Brother", "Nephew"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Blood Relations" },
  { q: "If A is B's son, B is C's daughter, C is D's father. A is D's?", options: ["Grandson", "Son", "Great-grandson", "Nephew"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Blood Relations" },
  { q: "P's father is Q's son. Q is R's father. P is R's?", options: ["Son", "Grandson", "Great-grandson", "Nephew"], answer: 2, difficulty: "hard", category: "aptitude", topic: "Blood Relations" },
  { q: "My uncle's mother is my?", options: ["Mother", "Grandmother", "Aunt", "Sister"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Blood Relations" },
  { q: "A is married to B. C is A's brother. D is C's daughter. D is B's?", options: ["Niece", "Daughter", "Sister", "Cousin"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Blood Relations" },
  { q: "If 'sister' means 'mother', 'mother' means 'father'. My sister's mother is my?", options: ["Mother's father", "Grandfather", "Grandmother", "Father"], answer: 1, difficulty: "hard", category: "aptitude", topic: "Blood Relations" },
  { q: "M is son of P. Q is daughter of P. R is son of Q. M is R's?", options: ["Uncle", "Father", "Cousin", "Brother"], answer: 0, difficulty: "easy", category: "aptitude", topic: "Blood Relations" },

  // Direction Sense (10)
  { q: "Face north, turn right, then right again. Which direction now?", options: ["North", "South", "East", "West"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Direction Sense" },
  { q: "Walk 5km east, then 3km north. Direction from start?", options: ["NE", "NW", "SE", "SW"], answer: 0, difficulty: "easy", category: "aptitude", topic: "Direction Sense" },
  { q: "Face south, turn left 90°, then left 90° again. Direction?", options: ["North", "South", "East", "West"], answer: 0, difficulty: "easy", category: "aptitude", topic: "Direction Sense" },
  { q: "A walks 10m N, turns right 10m, right again 10m. How far from start?", options: ["5m", "10m", "15m", "20m"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Direction Sense" },
  { q: "If sunrise is in front and you turn 135° clockwise, which direction?", options: ["SW", "NW", "SE", "NE"], answer: 0, difficulty: "hard", category: "aptitude", topic: "Direction Sense" },
  { q: "A is north of B. C is east of B. A is in which direction of C?", options: ["NE", "NW", "SE", "SW"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Direction Sense" },
  { q: "Walk 5km south, 5km east, 5km north. Distance from start?", options: ["5 km", "10 km", "15 km", "0 km"], answer: 0, difficulty: "easy", category: "aptitude", topic: "Direction Sense" },
  { q: "Shadow falls to left in morning. You are facing?", options: ["North", "South", "East", "West"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Direction Sense" },
  { q: "A faces east. Turns 180°, then 45° anti-clockwise. Direction?", options: ["NW", "NE", "SW", "SE"], answer: 0, difficulty: "hard", category: "aptitude", topic: "Direction Sense" },
  { q: "B is SW of A. C is NE of B. C could be in which direction of A?", options: ["Any", "Only NE", "Only N", "Only E"], answer: 0, difficulty: "hard", category: "aptitude", topic: "Direction Sense" },

  // Seating Arrangement (10)
  { q: "5 people in a row. A is in the middle. A's position?", options: ["1st", "2nd", "3rd", "4th"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Seating Arrangement" },
  { q: "A is to the left of B. C is to the right of B. Order?", options: ["ACB", "ABC", "BAC", "CAB"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Seating Arrangement" },
  { q: "6 people in a circle. A opposite B. C left of A. C is how many seats from B?", options: ["2", "3", "4", "1"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Seating Arrangement" },
  { q: "8 people in a row. P is 3rd from left, Q is 5th from right. How many between them?", options: ["0", "1", "2", "3"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Seating Arrangement" },
  { q: "In a circular arrangement of 6, each person has how many neighbors?", options: ["1", "2", "3", "6"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Seating Arrangement" },
  { q: "A sits 2nd from right. Total 7 seats. Position from left?", options: ["4th", "5th", "6th", "7th"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Seating Arrangement" },
  { q: "5 friends: A B C D E. A not adjacent to B. B not adjacent to C. Valid arrangement?", options: ["ADBCE", "ABDCE", "BACDE", "ABCDE"], answer: 0, difficulty: "hard", category: "aptitude", topic: "Seating Arrangement" },
  { q: "In a row of 10, Ram is 6th from left. His position from right?", options: ["4th", "5th", "6th", "7th"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Seating Arrangement" },
  { q: "A faces B in circular. C is 2 seats right of A. D is left of B. Minimum people?", options: ["4", "5", "6", "8"], answer: 2, difficulty: "hard", category: "aptitude", topic: "Seating Arrangement" },
  { q: "L-shaped arrangement. 3 on one side, 4 on another. Corner person counted?", options: ["Once", "Twice", "Not counted", "Depends"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Seating Arrangement" },

  // Mixtures & Alligation (10)
  { q: "Mix 2L of ₹40/L with 3L of ₹60/L. Average price?", options: ["₹48", "₹50", "₹52", "₹55"], answer: 2, difficulty: "easy", category: "aptitude", topic: "Mixtures" },
  { q: "20L milk, 5L water. Milk concentration?", options: ["75%", "80%", "85%", "90%"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Mixtures" },
  { q: "Replace 10L from 50L pure milk with water. Milk %?", options: ["75%", "80%", "85%", "90%"], answer: 1, difficulty: "medium", category: "aptitude", topic: "Mixtures" },
  { q: "Alligation: mix ₹30 and ₹50 items to get ₹35 avg. Ratio?", options: ["3:1", "1:3", "2:1", "1:2"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Mixtures" },
  { q: "Milk:Water = 4:1. Add 5L water to make 3:2. Total milk?", options: ["10L", "12L", "15L", "20L"], answer: 1, difficulty: "hard", category: "aptitude", topic: "Mixtures" },
  { q: "60L solution, 80% acid. How much water to make 60%?", options: ["10L", "15L", "20L", "25L"], answer: 2, difficulty: "hard", category: "aptitude", topic: "Mixtures" },
  { q: "Two containers: A has milk:water 7:3, B has 3:7. Mix equal quantities. Ratio?", options: ["1:1", "5:5", "7:3", "3:7"], answer: 0, difficulty: "medium", category: "aptitude", topic: "Mixtures" },
  { q: "Replace 10L from 40L milk with water, twice. Milk concentration?", options: ["56.25%", "62.5%", "50%", "75%"], answer: 0, difficulty: "hard", category: "aptitude", topic: "Mixtures" },
  { q: "Mix 3kg sugar at ₹20/kg with 2kg at ₹30/kg. Cost per kg?", options: ["₹22", "₹24", "₹25", "₹26"], answer: 1, difficulty: "easy", category: "aptitude", topic: "Mixtures" },
  { q: "A vessel has 100L, 20% alcohol. How much to drain and replace with pure to get 25%?", options: ["5L", "6.25L", "7.5L", "10L"], answer: 1, difficulty: "hard", category: "aptitude", topic: "Mixtures" },
];

// ─── DSA: 60 topics ───
const dsaQuestions: Question[] = [
  // Arrays (10)
  { q: "Time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], answer: 1, difficulty: "easy", category: "dsa", topic: "Arrays" },
  { q: "Time complexity of inserting at the beginning of an array?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], answer: 2, difficulty: "medium", category: "dsa", topic: "Arrays" },
  { q: "Kadane's algorithm solves?", options: ["Sorting", "Max subarray sum", "Binary search", "Graph traversal"], answer: 1, difficulty: "medium", category: "dsa", topic: "Arrays" },
  { q: "Best case of linear search?", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], answer: 2, difficulty: "easy", category: "dsa", topic: "Arrays" },
  { q: "Two pointer technique is best for?", options: ["Tree traversal", "Sorted array problems", "Graph coloring", "Hashing"], answer: 1, difficulty: "medium", category: "dsa", topic: "Arrays" },
  { q: "Dutch National Flag problem sorts array with how many distinct values?", options: ["2", "3", "4", "n"], answer: 1, difficulty: "hard", category: "dsa", topic: "Arrays" },
  { q: "Merge two sorted arrays time complexity?", options: ["O(n+m)", "O(n*m)", "O(n log n)", "O(1)"], answer: 0, difficulty: "medium", category: "dsa", topic: "Arrays" },
  { q: "Prefix sum array allows range sum queries in?", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], answer: 2, difficulty: "medium", category: "dsa", topic: "Arrays" },
  { q: "Maximum element in unsorted array requires?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], answer: 2, difficulty: "easy", category: "dsa", topic: "Arrays" },
  { q: "Sliding window technique reduces complexity from?", options: ["O(n²) to O(n)", "O(n) to O(1)", "O(n³) to O(n)", "O(2^n) to O(n)"], answer: 0, difficulty: "hard", category: "dsa", topic: "Arrays" },

  // Strings (10)
  { q: "Time complexity to reverse a string?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], answer: 2, difficulty: "easy", category: "dsa", topic: "Strings" },
  { q: "KMP pattern matching complexity?", options: ["O(n*m)", "O(n+m)", "O(n²)", "O(m²)"], answer: 1, difficulty: "hard", category: "dsa", topic: "Strings" },
  { q: "Anagram check requires?", options: ["Sorting only", "Hashing only", "Sorting or hashing", "BFS"], answer: 2, difficulty: "easy", category: "dsa", topic: "Strings" },
  { q: "Longest palindromic substring naive approach?", options: ["O(n)", "O(n²)", "O(n³)", "O(2^n)"], answer: 2, difficulty: "medium", category: "dsa", topic: "Strings" },
  { q: "Rabin-Karp uses which technique?", options: ["Two pointers", "Rolling hash", "Divide & conquer", "Greedy"], answer: 1, difficulty: "hard", category: "dsa", topic: "Strings" },
  { q: "String immutability means?", options: ["Can be changed", "Cannot be modified after creation", "Has fixed length", "Is always empty"], answer: 1, difficulty: "easy", category: "dsa", topic: "Strings" },
  { q: "Z-algorithm finds pattern occurrences in?", options: ["O(n+m)", "O(n*m)", "O(n²)", "O(n log n)"], answer: 0, difficulty: "hard", category: "dsa", topic: "Strings" },
  { q: "Longest common prefix of n strings can be found in?", options: ["O(S) where S = sum of all chars", "O(n)", "O(1)", "O(n²)"], answer: 0, difficulty: "medium", category: "dsa", topic: "Strings" },
  { q: "Check if string is palindrome — best approach?", options: ["Two pointers from both ends", "Reverse and compare", "Stack", "All work equally"], answer: 0, difficulty: "easy", category: "dsa", topic: "Strings" },
  { q: "String rotation check: is 'waterbottle' a rotation of 'erbottlewat'?", options: ["Yes", "No", "Cannot determine", "Depends on algorithm"], answer: 0, difficulty: "medium", category: "dsa", topic: "Strings" },

  // Linked Lists (10)
  { q: "Insert at head of linked list time?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], answer: 0, difficulty: "easy", category: "dsa", topic: "Linked Lists" },
  { q: "Detect cycle in linked list — best approach?", options: ["Hash set", "Floyd's cycle detection", "Brute force", "Sorting"], answer: 1, difficulty: "medium", category: "dsa", topic: "Linked Lists" },
  { q: "Reverse a linked list time complexity?", options: ["O(1)", "O(n)", "O(n²)", "O(log n)"], answer: 1, difficulty: "easy", category: "dsa", topic: "Linked Lists" },
  { q: "Middle of linked list (single pass)?", options: ["Two pointers (slow/fast)", "Count then traverse", "Stack", "Recursion"], answer: 0, difficulty: "medium", category: "dsa", topic: "Linked Lists" },
  { q: "Merge two sorted linked lists?", options: ["O(n+m)", "O(n*m)", "O(n log n)", "O(1)"], answer: 0, difficulty: "medium", category: "dsa", topic: "Linked Lists" },
  { q: "Doubly linked list advantage over singly?", options: ["Less memory", "O(1) deletion with node ref", "Faster search", "Simpler code"], answer: 1, difficulty: "easy", category: "dsa", topic: "Linked Lists" },
  { q: "LRU Cache typically uses?", options: ["Array", "Stack", "Doubly linked list + hash map", "Queue"], answer: 2, difficulty: "hard", category: "dsa", topic: "Linked Lists" },
  { q: "Nth node from end in single pass?", options: ["Two pointers with n gap", "Reverse then count", "Stack", "Recursion"], answer: 0, difficulty: "medium", category: "dsa", topic: "Linked Lists" },
  { q: "Intersection point of two linked lists?", options: ["O(n*m) brute force only", "O(n+m) with length difference", "O(1)", "Not possible"], answer: 1, difficulty: "hard", category: "dsa", topic: "Linked Lists" },
  { q: "Clone a linked list with random pointers?", options: ["O(n) with interweaving", "O(n²) only", "O(n log n)", "Not possible in O(n)"], answer: 0, difficulty: "hard", category: "dsa", topic: "Linked Lists" },

  // Stacks & Queues (10)
  { q: "Stack follows which principle?", options: ["FIFO", "LIFO", "Random", "Priority"], answer: 1, difficulty: "easy", category: "dsa", topic: "Stacks & Queues" },
  { q: "Queue follows which principle?", options: ["LIFO", "FIFO", "FILO", "Random"], answer: 1, difficulty: "easy", category: "dsa", topic: "Stacks & Queues" },
  { q: "Valid parentheses check uses?", options: ["Queue", "Stack", "Array only", "Linked list"], answer: 1, difficulty: "easy", category: "dsa", topic: "Stacks & Queues" },
  { q: "Next Greater Element uses?", options: ["Queue", "Monotonic stack", "BST", "Heap"], answer: 1, difficulty: "medium", category: "dsa", topic: "Stacks & Queues" },
  { q: "Implement queue using two stacks — dequeue complexity (amortized)?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], answer: 0, difficulty: "medium", category: "dsa", topic: "Stacks & Queues" },
  { q: "Min stack (get minimum in O(1)) uses?", options: ["Sorting", "Extra stack/variable", "Heap", "BST"], answer: 1, difficulty: "medium", category: "dsa", topic: "Stacks & Queues" },
  { q: "Circular queue advantage?", options: ["Faster enqueue", "Reuses empty space", "O(1) search", "Smaller memory"], answer: 1, difficulty: "easy", category: "dsa", topic: "Stacks & Queues" },
  { q: "Largest rectangle in histogram uses?", options: ["DP", "Monotonic stack", "BFS", "Greedy"], answer: 1, difficulty: "hard", category: "dsa", topic: "Stacks & Queues" },
  { q: "Priority queue is typically implemented with?", options: ["Array", "Linked list", "Heap", "Stack"], answer: 2, difficulty: "medium", category: "dsa", topic: "Stacks & Queues" },
  { q: "Deque supports insertion/deletion at?", options: ["Front only", "Rear only", "Both ends", "Middle"], answer: 2, difficulty: "easy", category: "dsa", topic: "Stacks & Queues" },

  // Trees (10)
  { q: "In-order traversal of BST gives?", options: ["Random order", "Sorted order", "Reverse sorted", "Level order"], answer: 1, difficulty: "easy", category: "dsa", topic: "Trees" },
  { q: "Height of balanced BST with n nodes?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], answer: 1, difficulty: "medium", category: "dsa", topic: "Trees" },
  { q: "Which traversal visits root first?", options: ["In-order", "Post-order", "Pre-order", "Level-order"], answer: 2, difficulty: "easy", category: "dsa", topic: "Trees" },
  { q: "Max nodes at level k of binary tree?", options: ["k", "2k", "2^k", "k²"], answer: 2, difficulty: "medium", category: "dsa", topic: "Trees" },
  { q: "Lowest Common Ancestor in BST?", options: ["O(n)", "O(h)", "O(n²)", "O(1)"], answer: 1, difficulty: "medium", category: "dsa", topic: "Trees" },
  { q: "AVL tree guarantees?", options: ["O(n) operations", "O(log n) balanced operations", "O(1) insert", "Unsorted data"], answer: 1, difficulty: "medium", category: "dsa", topic: "Trees" },
  { q: "BFS on a tree uses?", options: ["Stack", "Queue", "Heap", "Recursion only"], answer: 1, difficulty: "easy", category: "dsa", topic: "Trees" },
  { q: "Total nodes in complete binary tree of height h?", options: ["2^h", "2^(h+1)-1", "h²", "2h+1"], answer: 1, difficulty: "hard", category: "dsa", topic: "Trees" },
  { q: "Serialize/deserialize binary tree commonly uses?", options: ["Pre-order + null markers", "In-order only", "Post-order only", "BFS only"], answer: 0, difficulty: "hard", category: "dsa", topic: "Trees" },
  { q: "Morris traversal achieves O(1) space by using?", options: ["Stack", "Queue", "Threaded pointers", "Recursion"], answer: 2, difficulty: "hard", category: "dsa", topic: "Trees" },

  // Graphs (10)
  { q: "BFS uses which data structure?", options: ["Stack", "Queue", "Heap", "Array"], answer: 1, difficulty: "easy", category: "dsa", topic: "Graphs" },
  { q: "DFS uses which data structure?", options: ["Queue", "Stack/Recursion", "Heap", "Deque"], answer: 1, difficulty: "easy", category: "dsa", topic: "Graphs" },
  { q: "Dijkstra's shortest path complexity with min-heap?", options: ["O(V²)", "O(E log V)", "O(V+E)", "O(V³)"], answer: 1, difficulty: "hard", category: "dsa", topic: "Graphs" },
  { q: "Topological sort works on?", options: ["Undirected graphs", "DAGs only", "Cyclic graphs", "All graphs"], answer: 1, difficulty: "medium", category: "dsa", topic: "Graphs" },
  { q: "Detect cycle in undirected graph?", options: ["DFS with parent tracking", "BFS only", "Sorting", "Binary search"], answer: 0, difficulty: "medium", category: "dsa", topic: "Graphs" },
  { q: "Number of connected components uses?", options: ["BFS/DFS", "Sorting", "Binary search", "Hashing"], answer: 0, difficulty: "easy", category: "dsa", topic: "Graphs" },
  { q: "Bellman-Ford can handle?", options: ["Only positive weights", "Negative weights", "Only unweighted", "Only DAGs"], answer: 1, difficulty: "medium", category: "dsa", topic: "Graphs" },
  { q: "Minimum spanning tree — Kruskal's uses?", options: ["BFS", "Union-Find", "Stack", "Queue"], answer: 1, difficulty: "hard", category: "dsa", topic: "Graphs" },
  { q: "Bipartite graph check uses?", options: ["DFS/BFS with 2-coloring", "Sorting", "Hashing", "DP"], answer: 0, difficulty: "medium", category: "dsa", topic: "Graphs" },
  { q: "Floyd-Warshall finds?", options: ["Single source shortest path", "All-pairs shortest path", "MST", "Topological order"], answer: 1, difficulty: "hard", category: "dsa", topic: "Graphs" },

  // Hashing (10)
  { q: "Average case of hash table lookup?", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], answer: 2, difficulty: "easy", category: "dsa", topic: "Hashing" },
  { q: "Hash collision resolution — chaining uses?", options: ["Arrays", "Linked lists", "Trees", "Stacks"], answer: 1, difficulty: "easy", category: "dsa", topic: "Hashing" },
  { q: "Two Sum problem optimal solution uses?", options: ["Sorting", "Hash map", "Brute force", "Binary search"], answer: 1, difficulty: "easy", category: "dsa", topic: "Hashing" },
  { q: "Open addressing collision resolution includes?", options: ["Linear probing", "Chaining", "Separate linking", "Bucket sort"], answer: 0, difficulty: "medium", category: "dsa", topic: "Hashing" },
  { q: "Load factor of hash table?", options: ["n/capacity", "capacity/n", "n*capacity", "log(n)"], answer: 0, difficulty: "medium", category: "dsa", topic: "Hashing" },
  { q: "Worst case of hash table operations?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], answer: 2, difficulty: "medium", category: "dsa", topic: "Hashing" },
  { q: "Count frequency of elements — best approach?", options: ["Sorting", "Hash map", "Binary search", "Stack"], answer: 1, difficulty: "easy", category: "dsa", topic: "Hashing" },
  { q: "Consistent hashing is used in?", options: ["Sorting", "Distributed systems", "Encryption", "Compression"], answer: 1, difficulty: "hard", category: "dsa", topic: "Hashing" },
  { q: "Bloom filter provides?", options: ["Exact membership", "Probabilistic membership (no false negatives)", "Sorting", "Encryption"], answer: 1, difficulty: "hard", category: "dsa", topic: "Hashing" },
  { q: "Subarray with given sum uses?", options: ["Sorting", "Prefix sum + hash map", "Binary search", "Stack"], answer: 1, difficulty: "medium", category: "dsa", topic: "Hashing" },

  // Sorting (10)
  { q: "Time complexity of merge sort?", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], answer: 1, difficulty: "easy", category: "dsa", topic: "Sorting" },
  { q: "Quicksort worst case?", options: ["O(n log n)", "O(n)", "O(n²)", "O(2^n)"], answer: 2, difficulty: "medium", category: "dsa", topic: "Sorting" },
  { q: "Which sort is stable?", options: ["Quick sort", "Heap sort", "Merge sort", "Selection sort"], answer: 2, difficulty: "easy", category: "dsa", topic: "Sorting" },
  { q: "Counting sort works best when?", options: ["Any data", "Small range of integers", "Strings", "Floats"], answer: 1, difficulty: "medium", category: "dsa", topic: "Sorting" },
  { q: "In-place sorting algorithm?", options: ["Merge sort", "Counting sort", "Quick sort", "Radix sort"], answer: 2, difficulty: "easy", category: "dsa", topic: "Sorting" },
  { q: "Best case of bubble sort?", options: ["O(n²)", "O(n log n)", "O(n)", "O(1)"], answer: 2, difficulty: "easy", category: "dsa", topic: "Sorting" },
  { q: "Heap sort uses?", options: ["Stack", "Queue", "Binary heap", "BST"], answer: 2, difficulty: "medium", category: "dsa", topic: "Sorting" },
  { q: "Radix sort time complexity?", options: ["O(n log n)", "O(n²)", "O(nk) where k=digits", "O(n)"], answer: 2, difficulty: "hard", category: "dsa", topic: "Sorting" },
  { q: "Which finds kth smallest in O(n) average?", options: ["Merge Sort", "Quick Select", "Heap Sort", "Binary Search"], answer: 1, difficulty: "hard", category: "dsa", topic: "Sorting" },
  { q: "Space complexity of merge sort?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], answer: 2, difficulty: "medium", category: "dsa", topic: "Sorting" },

  // Dynamic Programming (10)
  { q: "Fibonacci naive recursive complexity?", options: ["O(n)", "O(n²)", "O(2^n)", "O(log n)"], answer: 2, difficulty: "easy", category: "dsa", topic: "Dynamic Programming" },
  { q: "Memoization is?", options: ["Bottom-up DP", "Top-down DP with caching", "Greedy", "Brute force"], answer: 1, difficulty: "easy", category: "dsa", topic: "Dynamic Programming" },
  { q: "0/1 Knapsack complexity?", options: ["O(n)", "O(nW)", "O(2^n)", "O(n²)"], answer: 1, difficulty: "medium", category: "dsa", topic: "Dynamic Programming" },
  { q: "Longest Common Subsequence complexity?", options: ["O(n)", "O(n log n)", "O(n*m)", "O(2^n)"], answer: 2, difficulty: "medium", category: "dsa", topic: "Dynamic Programming" },
  { q: "Tabulation converts recursive to?", options: ["Recursive with cache", "Iterative with table", "Greedy", "Backtracking"], answer: 1, difficulty: "medium", category: "dsa", topic: "Dynamic Programming" },
  { q: "Coin change problem — minimum coins is?", options: ["Greedy always", "DP problem", "Graph problem", "Sorting problem"], answer: 1, difficulty: "medium", category: "dsa", topic: "Dynamic Programming" },
  { q: "Edit distance between two strings?", options: ["O(n)", "O(n+m)", "O(n*m)", "O(n²)"], answer: 2, difficulty: "hard", category: "dsa", topic: "Dynamic Programming" },
  { q: "Longest Increasing Subsequence optimal?", options: ["O(n²)", "O(n log n)", "O(n)", "O(2^n)"], answer: 1, difficulty: "hard", category: "dsa", topic: "Dynamic Programming" },
  { q: "Matrix chain multiplication uses?", options: ["Greedy", "DP", "BFS", "Hashing"], answer: 1, difficulty: "hard", category: "dsa", topic: "Dynamic Programming" },
  { q: "Overlapping subproblems means?", options: ["Same subproblems solved repeatedly", "Problems don't overlap", "Greedy is optimal", "No recursion needed"], answer: 0, difficulty: "easy", category: "dsa", topic: "Dynamic Programming" },

  // Recursion & Backtracking (10)
  { q: "Base case in recursion is?", options: ["The recursive call", "Termination condition", "Loop variable", "Function signature"], answer: 1, difficulty: "easy", category: "dsa", topic: "Recursion" },
  { q: "N-Queens problem uses?", options: ["DP", "Backtracking", "Greedy", "BFS"], answer: 1, difficulty: "medium", category: "dsa", topic: "Recursion" },
  { q: "Tower of Hanoi moves for n disks?", options: ["n²", "2^n - 1", "n!", "2n"], answer: 1, difficulty: "medium", category: "dsa", topic: "Recursion" },
  { q: "Subset generation complexity?", options: ["O(n)", "O(n²)", "O(2^n)", "O(n!)"], answer: 2, difficulty: "medium", category: "dsa", topic: "Recursion" },
  { q: "Permutation generation complexity?", options: ["O(n)", "O(n²)", "O(2^n)", "O(n!)"], answer: 3, difficulty: "hard", category: "dsa", topic: "Recursion" },
  { q: "Sudoku solver uses?", options: ["Greedy", "DP", "Backtracking", "BFS"], answer: 2, difficulty: "hard", category: "dsa", topic: "Recursion" },
  { q: "Tail recursion advantage?", options: ["More readable", "Compiler can optimize to loop", "Uses more memory", "Always faster"], answer: 1, difficulty: "medium", category: "dsa", topic: "Recursion" },
  { q: "Rat in a maze uses?", options: ["DP", "BFS", "Backtracking", "Greedy"], answer: 2, difficulty: "medium", category: "dsa", topic: "Recursion" },
  { q: "Stack overflow in recursion caused by?", options: ["Too many parameters", "Missing base case / deep recursion", "Wrong return type", "Large input only"], answer: 1, difficulty: "easy", category: "dsa", topic: "Recursion" },
  { q: "Word search in grid uses?", options: ["Sorting", "Backtracking + DFS", "BFS only", "Hashing"], answer: 1, difficulty: "hard", category: "dsa", topic: "Recursion" },

  // Heaps (10)
  { q: "Max-heap root contains?", options: ["Minimum element", "Maximum element", "Median", "Random"], answer: 1, difficulty: "easy", category: "dsa", topic: "Heaps" },
  { q: "Insert into heap complexity?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], answer: 1, difficulty: "easy", category: "dsa", topic: "Heaps" },
  { q: "Extract min from min-heap?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], answer: 1, difficulty: "easy", category: "dsa", topic: "Heaps" },
  { q: "Build heap from array complexity?", options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"], answer: 1, difficulty: "medium", category: "dsa", topic: "Heaps" },
  { q: "Kth largest element using min-heap of size k?", options: ["O(n log k)", "O(n log n)", "O(n²)", "O(k)"], answer: 0, difficulty: "medium", category: "dsa", topic: "Heaps" },
  { q: "Heap is implemented as?", options: ["Linked list", "Array", "Hash map", "Graph"], answer: 1, difficulty: "easy", category: "dsa", topic: "Heaps" },
  { q: "Median in a stream uses?", options: ["Sorting", "Two heaps (max + min)", "Single heap", "Array"], answer: 1, difficulty: "hard", category: "dsa", topic: "Heaps" },
  { q: "Left child of node at index i in array?", options: ["2i", "2i+1", "2i+2", "i/2"], answer: 1, difficulty: "medium", category: "dsa", topic: "Heaps" },
  { q: "Merge k sorted lists optimally uses?", options: ["Sorting", "Min-heap", "Stack", "DFS"], answer: 1, difficulty: "hard", category: "dsa", topic: "Heaps" },
  { q: "Heap sort complexity?", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], answer: 1, difficulty: "medium", category: "dsa", topic: "Heaps" },

  // Tries (10)
  { q: "Trie is used for?", options: ["Number storage", "String/prefix operations", "Graph traversal", "Sorting"], answer: 1, difficulty: "easy", category: "dsa", topic: "Tries" },
  { q: "Trie insert/search complexity?", options: ["O(n)", "O(length of word)", "O(n²)", "O(log n)"], answer: 1, difficulty: "easy", category: "dsa", topic: "Tries" },
  { q: "Autocomplete feature typically uses?", options: ["Array", "Hash map", "Trie", "Stack"], answer: 2, difficulty: "medium", category: "dsa", topic: "Tries" },
  { q: "Space optimization of trie?", options: ["Compressed/Radix trie", "Bigger nodes", "More children", "Less depth"], answer: 0, difficulty: "hard", category: "dsa", topic: "Tries" },
  { q: "Each trie node typically contains?", options: ["A value", "Array/map of children + end flag", "Left and right pointers", "Priority"], answer: 1, difficulty: "medium", category: "dsa", topic: "Tries" },
  { q: "Longest common prefix using trie?", options: ["O(n*m)", "O(S) total chars", "O(n²)", "O(1)"], answer: 1, difficulty: "medium", category: "dsa", topic: "Tries" },
  { q: "Trie vs Hash map for prefix search?", options: ["Hash map better", "Trie better for prefix queries", "Same performance", "Neither works"], answer: 1, difficulty: "medium", category: "dsa", topic: "Tries" },
  { q: "Maximum XOR pair uses?", options: ["Sorting", "Binary trie", "Hash map", "Stack"], answer: 1, difficulty: "hard", category: "dsa", topic: "Tries" },
  { q: "Word dictionary with wildcard search uses?", options: ["Hash map", "Trie with DFS", "Sorting", "Array"], answer: 1, difficulty: "hard", category: "dsa", topic: "Tries" },
  { q: "Spell checker can be built using?", options: ["Stack", "Queue", "Trie", "Heap"], answer: 2, difficulty: "easy", category: "dsa", topic: "Tries" },

  // Greedy (10)
  { q: "Greedy algorithm always gives optimal solution?", options: ["Yes", "No, only for specific problems", "Only for sorting", "Only for graphs"], answer: 1, difficulty: "easy", category: "dsa", topic: "Greedy" },
  { q: "Activity selection is solved by?", options: ["DP", "Greedy", "Backtracking", "BFS"], answer: 1, difficulty: "easy", category: "dsa", topic: "Greedy" },
  { q: "Huffman coding uses?", options: ["DP", "Greedy + priority queue", "BFS", "Sorting only"], answer: 1, difficulty: "medium", category: "dsa", topic: "Greedy" },
  { q: "Fractional knapsack uses?", options: ["DP", "Greedy (sort by value/weight)", "BFS", "Backtracking"], answer: 1, difficulty: "medium", category: "dsa", topic: "Greedy" },
  { q: "Job scheduling with deadlines?", options: ["DP", "Greedy", "BFS", "DFS"], answer: 1, difficulty: "medium", category: "dsa", topic: "Greedy" },
  { q: "Minimum platforms problem?", options: ["Greedy with sorting", "DP", "Graph", "Stack"], answer: 0, difficulty: "medium", category: "dsa", topic: "Greedy" },
  { q: "Greedy vs DP: Greedy makes?", options: ["Globally optimal choice each step", "Locally optimal choice each step", "Random choice", "Exhaustive search"], answer: 1, difficulty: "easy", category: "dsa", topic: "Greedy" },
  { q: "Minimum coins (denominations 1,5,10,25) for 30 cents — greedy works?", options: ["Yes for standard denominations", "Never", "Only for even amounts", "Only for odd"], answer: 0, difficulty: "medium", category: "dsa", topic: "Greedy" },
  { q: "Kruskal's MST is a greedy algorithm?", options: ["Yes", "No", "Only for dense graphs", "Only for sparse"], answer: 0, difficulty: "easy", category: "dsa", topic: "Greedy" },
  { q: "Interval scheduling maximization — sort by?", options: ["Start time", "End time", "Duration", "Random"], answer: 1, difficulty: "hard", category: "dsa", topic: "Greedy" },

  // Bit Manipulation (10)
  { q: "x & 1 checks if x is?", options: ["Even", "Odd", "Positive", "Negative"], answer: 1, difficulty: "easy", category: "dsa", topic: "Bit Manipulation" },
  { q: "x ^ x equals?", options: ["x", "0", "1", "-1"], answer: 1, difficulty: "easy", category: "dsa", topic: "Bit Manipulation" },
  { q: "Find single number in array where all others appear twice?", options: ["Sorting", "XOR all elements", "Hash map", "Both B and C work"], answer: 3, difficulty: "easy", category: "dsa", topic: "Bit Manipulation" },
  { q: "Count set bits in a number — Brian Kernighan's method?", options: ["O(n)", "O(log n)", "O(number of set bits)", "O(1)"], answer: 2, difficulty: "medium", category: "dsa", topic: "Bit Manipulation" },
  { q: "x & (x-1) does?", options: ["Adds 1", "Clears lowest set bit", "Sets all bits", "Negates x"], answer: 1, difficulty: "medium", category: "dsa", topic: "Bit Manipulation" },
  { q: "Power of 2 check?", options: ["x % 2 == 0", "x & (x-1) == 0 && x > 0", "x / 2 == 0", "x ^ 2 == 0"], answer: 1, difficulty: "medium", category: "dsa", topic: "Bit Manipulation" },
  { q: "Left shift x << 1 is equivalent to?", options: ["x / 2", "x * 2", "x + 1", "x - 1"], answer: 1, difficulty: "easy", category: "dsa", topic: "Bit Manipulation" },
  { q: "Swap two numbers without temp variable?", options: ["XOR swap", "Addition/subtraction", "Both work", "Not possible"], answer: 2, difficulty: "medium", category: "dsa", topic: "Bit Manipulation" },
  { q: "Bitwise AND of range [m, n]?", options: ["Common prefix of m and n in binary", "m & n", "m | n", "m ^ n"], answer: 0, difficulty: "hard", category: "dsa", topic: "Bit Manipulation" },
  { q: "Maximum XOR of two numbers in array?", options: ["O(n²) brute force only", "O(n log max) with trie", "O(n) with sorting", "O(1)"], answer: 1, difficulty: "hard", category: "dsa", topic: "Bit Manipulation" },

  // Binary Search (10)
  { q: "Binary search requires array to be?", options: ["Reversed", "Sorted", "Unique", "Non-empty"], answer: 1, difficulty: "easy", category: "dsa", topic: "Binary Search" },
  { q: "Binary search complexity?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], answer: 1, difficulty: "easy", category: "dsa", topic: "Binary Search" },
  { q: "Find first occurrence of element?", options: ["Standard binary search", "Modified binary search (leftmost)", "Linear search only", "Hash map"], answer: 1, difficulty: "medium", category: "dsa", topic: "Binary Search" },
  { q: "Search in rotated sorted array?", options: ["O(n) only", "O(log n) modified binary search", "O(n log n)", "Not possible"], answer: 1, difficulty: "hard", category: "dsa", topic: "Binary Search" },
  { q: "Peak element in array?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], answer: 1, difficulty: "medium", category: "dsa", topic: "Binary Search" },
  { q: "Binary search on answer technique is used for?", options: ["Sorting", "Optimization problems", "String matching", "Graph traversal"], answer: 1, difficulty: "medium", category: "dsa", topic: "Binary Search" },
  { q: "Square root using binary search?", options: ["Binary search on [1, n]", "Linear scan", "Newton's method only", "Not possible"], answer: 0, difficulty: "medium", category: "dsa", topic: "Binary Search" },
  { q: "Median of two sorted arrays?", options: ["O(n+m)", "O(log(min(n,m)))", "O(n²)", "O(1)"], answer: 1, difficulty: "hard", category: "dsa", topic: "Binary Search" },
  { q: "Lower bound finds?", options: ["Exact element", "First element >= target", "Last element <= target", "Random element"], answer: 1, difficulty: "easy", category: "dsa", topic: "Binary Search" },
  { q: "Aggressive cows / book allocation uses?", options: ["Greedy", "Binary search on answer", "DP", "BFS"], answer: 1, difficulty: "hard", category: "dsa", topic: "Binary Search" },
];

// ─── MOCK INTERVIEW: 20 topics ───
const mockQuestions: Question[] = [
  // Tell Me About Yourself (10)
  { q: "Best answer to 'Tell me about yourself'?", options: ["My hobbies are...", "Brief professional summary + relevant skills", "I'm 22 years old from...", "I have many achievements"], answer: 1, difficulty: "easy", category: "mock", topic: "Tell Me About Yourself" },
  { q: "How long should your 'about yourself' answer be?", options: ["30 seconds", "1-2 minutes", "5 minutes", "10 minutes"], answer: 1, difficulty: "easy", category: "mock", topic: "Tell Me About Yourself" },
  { q: "Should you mention personal life details?", options: ["Always", "Never", "Only if relevant to the role", "Only if asked"], answer: 2, difficulty: "easy", category: "mock", topic: "Tell Me About Yourself" },
  { q: "What structure should you follow?", options: ["Random facts", "Present → Past → Future", "Only education", "Only projects"], answer: 1, difficulty: "medium", category: "mock", topic: "Tell Me About Yourself" },
  { q: "What to avoid in self-introduction?", options: ["Technical skills", "Relevant experience", "Memorized script word-for-word", "Company research"], answer: 2, difficulty: "medium", category: "mock", topic: "Tell Me About Yourself" },
  { q: "Should you tailor your answer to the company?", options: ["No, use same answer everywhere", "Yes, align with role requirements", "Only for dream companies", "Never"], answer: 1, difficulty: "easy", category: "mock", topic: "Tell Me About Yourself" },
  { q: "Is it okay to mention career gaps?", options: ["Never", "Only if long", "Yes, briefly with positive framing", "Always in detail"], answer: 2, difficulty: "medium", category: "mock", topic: "Tell Me About Yourself" },
  { q: "Best way to end your introduction?", options: ["Just stop talking", "Ask 'Any questions?'", "Connect to why you're excited about this role", "List all certifications"], answer: 2, difficulty: "medium", category: "mock", topic: "Tell Me About Yourself" },
  { q: "Freshers should focus on?", options: ["Work experience they don't have", "Academic projects, skills, and enthusiasm", "Salary expectations", "Other job offers"], answer: 1, difficulty: "easy", category: "mock", topic: "Tell Me About Yourself" },
  { q: "Confidence in delivery comes from?", options: ["Memorizing exactly", "Practicing key points naturally", "Reading from notes", "Speaking very fast"], answer: 1, difficulty: "easy", category: "mock", topic: "Tell Me About Yourself" },

  // Strengths & Weaknesses (10)
  { q: "When asked about a weakness, you should:", options: ["Say you have none", "Name a real weakness + steps to improve", "Blame others", "Change the subject"], answer: 1, difficulty: "easy", category: "mock", topic: "Strengths & Weaknesses" },
  { q: "How many strengths should you mention?", options: ["1", "2-3 with examples", "10+", "None"], answer: 1, difficulty: "easy", category: "mock", topic: "Strengths & Weaknesses" },
  { q: "'I'm a perfectionist' as weakness is?", options: ["Great answer", "Overused and insincere", "Always appropriate", "Never used"], answer: 1, difficulty: "medium", category: "mock", topic: "Strengths & Weaknesses" },
  { q: "Best way to present weakness?", options: ["As a fatal flaw", "As something you've worked on improving", "Deny having any", "Blame circumstances"], answer: 1, difficulty: "easy", category: "mock", topic: "Strengths & Weaknesses" },
  { q: "Should strengths align with job requirements?", options: ["No", "Yes, ideally", "Only for senior roles", "Never"], answer: 1, difficulty: "easy", category: "mock", topic: "Strengths & Weaknesses" },
  { q: "Example of a good weakness answer?", options: ["I'm terrible at everything", "'I used to struggle with time management, so I started using a planner'", "I have no weaknesses", "I'm too smart"], answer: 1, difficulty: "medium", category: "mock", topic: "Strengths & Weaknesses" },
  { q: "Avoid mentioning weakness that is?", options: ["Minor", "A core requirement of the role", "Something you improved", "Past issue"], answer: 1, difficulty: "medium", category: "mock", topic: "Strengths & Weaknesses" },
  { q: "STAR method for strengths means?", options: ["State strength + example story", "Just name the strength", "Read from resume", "Make up stories"], answer: 0, difficulty: "easy", category: "mock", topic: "Strengths & Weaknesses" },
  { q: "Should you ask for feedback on your weaknesses?", options: ["Never", "Only to friends", "Shows self-awareness — yes", "Only after hiring"], answer: 2, difficulty: "medium", category: "mock", topic: "Strengths & Weaknesses" },
  { q: "How honest should weakness answers be?", options: ["100% raw truth", "Genuine but strategic", "Completely made up", "Avoid the question"], answer: 1, difficulty: "medium", category: "mock", topic: "Strengths & Weaknesses" },

  // STAR Method (10)
  { q: "STAR stands for?", options: ["Start, Think, Act, Review", "Situation, Task, Action, Result", "Story, Theme, Analysis, Reflection", "Strategy, Timing, Approach, Resolution"], answer: 1, difficulty: "easy", category: "mock", topic: "STAR Method" },
  { q: "Which part of STAR should be longest?", options: ["Situation", "Task", "Action", "Result"], answer: 2, difficulty: "medium", category: "mock", topic: "STAR Method" },
  { q: "STAR method is used for?", options: ["Technical questions", "Behavioral questions", "Salary negotiation", "Resume writing"], answer: 1, difficulty: "easy", category: "mock", topic: "STAR Method" },
  { q: "Situation in STAR should be?", options: ["Very detailed (5 min)", "Brief context (2-3 sentences)", "Skipped entirely", "Made up"], answer: 1, difficulty: "easy", category: "mock", topic: "STAR Method" },
  { q: "Result should include?", options: ["Vague statements", "Quantifiable outcomes when possible", "Only feelings", "Nothing specific"], answer: 1, difficulty: "medium", category: "mock", topic: "STAR Method" },
  { q: "Can you use academic projects in STAR?", options: ["Never", "Yes, especially for freshers", "Only for research roles", "Only if published"], answer: 1, difficulty: "easy", category: "mock", topic: "STAR Method" },
  { q: "Action should focus on?", options: ["Team's effort", "YOUR specific contribution", "Manager's decisions", "Company's resources"], answer: 1, difficulty: "medium", category: "mock", topic: "STAR Method" },
  { q: "How many STAR stories should you prepare?", options: ["1", "3-5 versatile ones", "20+", "None, improvise"], answer: 1, difficulty: "medium", category: "mock", topic: "STAR Method" },
  { q: "Negative result in STAR — acceptable?", options: ["Never", "Yes, if you learned from it", "Only if minor", "Always avoid"], answer: 1, difficulty: "hard", category: "mock", topic: "STAR Method" },
  { q: "STAR helps you avoid?", options: ["Being too brief", "Rambling without structure", "Speaking confidently", "Giving examples"], answer: 1, difficulty: "easy", category: "mock", topic: "STAR Method" },

  // Why This Company (10)
  { q: "Best response to 'Why this company?'", options: ["Good salary", "Research-backed alignment with company values", "Close to home", "My friend works here"], answer: 1, difficulty: "easy", category: "mock", topic: "Why This Company" },
  { q: "Should you mention company's recent achievements?", options: ["No", "Yes, shows research", "Only for startups", "Never"], answer: 1, difficulty: "easy", category: "mock", topic: "Why This Company" },
  { q: "Mentioning salary as reason is?", options: ["Great", "Inappropriate at this stage", "Required", "Expected"], answer: 1, difficulty: "easy", category: "mock", topic: "Why This Company" },
  { q: "Company culture alignment means?", options: ["Same dress code", "Your values match theirs", "Same location", "Same industry"], answer: 1, difficulty: "medium", category: "mock", topic: "Why This Company" },
  { q: "Best way to research a company?", options: ["Only check salary", "Website, news, LinkedIn, Glassdoor", "Ask friends", "Don't research"], answer: 1, difficulty: "easy", category: "mock", topic: "Why This Company" },
  { q: "Should you mention competitors?", options: ["Yes, to show knowledge", "Briefly, in positive comparison", "Never", "Always negatively"], answer: 1, difficulty: "medium", category: "mock", topic: "Why This Company" },
  { q: "Connecting your skills to company needs shows?", options: ["Arrogance", "Strategic thinking and genuine interest", "Desperation", "Lack of focus"], answer: 1, difficulty: "medium", category: "mock", topic: "Why This Company" },
  { q: "Generic answer to 'Why this company?'", options: ["Impressive", "Shows lack of preparation", "Acceptable", "Expected"], answer: 1, difficulty: "easy", category: "mock", topic: "Why This Company" },
  { q: "Mention growth opportunities?", options: ["Never", "Yes, shows long-term thinking", "Only for entry level", "Shows greed"], answer: 1, difficulty: "easy", category: "mock", topic: "Why This Company" },
  { q: "Should answer be different for each company?", options: ["No, same everywhere", "Yes, customize for each", "Only for top companies", "Doesn't matter"], answer: 1, difficulty: "easy", category: "mock", topic: "Why This Company" },

  // Salary & Negotiation (10)
  { q: "When asked about salary expectations?", options: ["Give lowest number", "Research market rate and give a range", "Refuse to answer", "Ask for maximum"], answer: 1, difficulty: "medium", category: "mock", topic: "Salary & Negotiation" },
  { q: "Best time to discuss salary?", options: ["First interview", "After receiving offer", "During technical round", "In resume"], answer: 1, difficulty: "medium", category: "mock", topic: "Salary & Negotiation" },
  { q: "Revealing current salary is?", options: ["Required", "Optional — focus on market value", "Always expected", "Illegal"], answer: 1, difficulty: "medium", category: "mock", topic: "Salary & Negotiation" },
  { q: "Counter-offer etiquette?", options: ["Demand double", "Politely justify with market data", "Accept first offer always", "Threaten to leave"], answer: 1, difficulty: "hard", category: "mock", topic: "Salary & Negotiation" },
  { q: "Benefits to consider beyond salary?", options: ["Only base pay matters", "Health, learning, flexibility, growth", "Only vacation days", "None"], answer: 1, difficulty: "easy", category: "mock", topic: "Salary & Negotiation" },
  { q: "Anchoring in negotiation means?", options: ["Setting the first number", "Refusing to negotiate", "Accepting any offer", "Changing subjects"], answer: 0, difficulty: "medium", category: "mock", topic: "Salary & Negotiation" },
  { q: "If salary is below expectations?", options: ["Reject immediately", "Ask about review cycles and growth path", "Accept silently", "Argue aggressively"], answer: 1, difficulty: "medium", category: "mock", topic: "Salary & Negotiation" },
  { q: "Should freshers negotiate?", options: ["Never", "Yes, respectfully within market range", "Only for top companies", "Always demand more"], answer: 1, difficulty: "medium", category: "mock", topic: "Salary & Negotiation" },
  { q: "Getting offer in writing before resigning is?", options: ["Unnecessary", "Very important", "Rude to ask", "Only for senior roles"], answer: 1, difficulty: "easy", category: "mock", topic: "Salary & Negotiation" },
  { q: "Multiple offers — how to decide?", options: ["Highest salary only", "Evaluate total package, culture, growth", "Ask friends", "Random choice"], answer: 1, difficulty: "hard", category: "mock", topic: "Salary & Negotiation" },

  // Where Do You See Yourself (10)
  { q: "How to answer 'Where do you see yourself in 5 years?'", options: ["In your position", "Career growth aligned with company goals", "I don't plan ahead", "Running my own company"], answer: 1, difficulty: "medium", category: "mock", topic: "Future Goals" },
  { q: "Mentioning you want interviewer's job is?", options: ["Confident", "Threatening and inappropriate", "Expected", "Humble"], answer: 1, difficulty: "easy", category: "mock", topic: "Future Goals" },
  { q: "Should you mention specific roles?", options: ["Never", "If aligned with natural career progression", "Always exact titles", "Only CEO"], answer: 1, difficulty: "medium", category: "mock", topic: "Future Goals" },
  { q: "Focus of this answer should be?", options: ["Personal life goals", "Professional growth + value to company", "Salary expectations", "Where you'll live"], answer: 1, difficulty: "easy", category: "mock", topic: "Future Goals" },
  { q: "Saying 'I don't know' is?", options: ["Honest and good", "Shows lack of ambition", "Acceptable", "Expected"], answer: 1, difficulty: "easy", category: "mock", topic: "Future Goals" },
  { q: "Should your 5-year plan show loyalty?", options: ["No, mention job-hopping", "Yes, suggest staying and growing", "Mention other companies", "Say you'll see"], answer: 1, difficulty: "medium", category: "mock", topic: "Future Goals" },
  { q: "Mentioning skill development is?", options: ["Irrelevant", "Shows growth mindset — positive", "Weakness", "Off-topic"], answer: 1, difficulty: "easy", category: "mock", topic: "Future Goals" },
  { q: "Should you be realistic?", options: ["No, dream big", "Yes, ambitious but realistic", "No, say anything", "Only for senior roles"], answer: 1, difficulty: "medium", category: "mock", topic: "Future Goals" },
  { q: "Mentioning leadership aspirations?", options: ["Only for managers", "Appropriate if genuine", "Never for freshers", "Always inappropriate"], answer: 1, difficulty: "medium", category: "mock", topic: "Future Goals" },
  { q: "Tying answer to company's mission shows?", options: ["Flattery", "Genuine interest and alignment", "Desperation", "Lack of originality"], answer: 1, difficulty: "easy", category: "mock", topic: "Future Goals" },

  // Teamwork (10)
  { q: "Best teamwork example involves?", options: ["Working alone", "Collaboration with clear outcome", "Complaining about team", "Taking all credit"], answer: 1, difficulty: "easy", category: "mock", topic: "Teamwork" },
  { q: "What does 'culture fit' mean?", options: ["Same hobbies", "Values & work style alignment", "Same university", "Same age group"], answer: 1, difficulty: "easy", category: "mock", topic: "Teamwork" },
  { q: "Handling disagreement in team?", options: ["Argue loudly", "Listen, discuss, find compromise", "Go to manager immediately", "Ignore it"], answer: 1, difficulty: "medium", category: "mock", topic: "Teamwork" },
  { q: "Cross-functional teamwork means?", options: ["Working within same department", "Collaborating across different departments", "Working alone", "Remote work"], answer: 1, difficulty: "easy", category: "mock", topic: "Teamwork" },
  { q: "When a teammate isn't contributing?", options: ["Do their work", "Communicate concerns respectfully", "Complain to everyone", "Ignore"], answer: 1, difficulty: "medium", category: "mock", topic: "Teamwork" },
  { q: "Remote teamwork challenge?", options: ["Too many meetings", "Communication gaps", "Too much freedom", "Better productivity"], answer: 1, difficulty: "easy", category: "mock", topic: "Teamwork" },
  { q: "Best teams have?", options: ["All same skills", "Diverse skills and perspectives", "Only leaders", "No disagreements"], answer: 1, difficulty: "easy", category: "mock", topic: "Teamwork" },
  { q: "Giving credit to team members shows?", options: ["Weakness", "Leadership and humility", "Lack of contribution", "Desperation"], answer: 1, difficulty: "easy", category: "mock", topic: "Teamwork" },
  { q: "Leading a team project as fresher — possible?", options: ["Never", "Yes, show initiative examples", "Only for managers", "Inappropriate to mention"], answer: 1, difficulty: "medium", category: "mock", topic: "Teamwork" },
  { q: "Pair programming is an example of?", options: ["Individual work", "Collaborative development", "Code review", "Documentation"], answer: 1, difficulty: "easy", category: "mock", topic: "Teamwork" },

  // Technical Interview Tips (10)
  { q: "Before coding, you should?", options: ["Start immediately", "Clarify requirements and edge cases", "Write pseudocode only", "Ask for solution"], answer: 1, difficulty: "easy", category: "mock", topic: "Technical Tips" },
  { q: "If stuck on a problem?", options: ["Stay silent", "Think aloud and ask for hints", "Give up", "Guess random answer"], answer: 1, difficulty: "easy", category: "mock", topic: "Technical Tips" },
  { q: "Time complexity discussion should happen?", options: ["Never", "After presenting solution", "Before starting", "Only if asked"], answer: 1, difficulty: "medium", category: "mock", topic: "Technical Tips" },
  { q: "Brute force first approach is?", options: ["Bad practice", "Good — then optimize", "Lazy", "Time waste"], answer: 1, difficulty: "easy", category: "mock", topic: "Technical Tips" },
  { q: "Testing your code with examples shows?", options: ["Lack of confidence", "Thoroughness and attention to detail", "Time waste", "Nervousness"], answer: 1, difficulty: "easy", category: "mock", topic: "Technical Tips" },
  { q: "Whiteboard interviews test?", options: ["Handwriting", "Problem-solving process and communication", "Coding speed", "Memory"], answer: 1, difficulty: "medium", category: "mock", topic: "Technical Tips" },
  { q: "System design interviews need?", options: ["Code only", "High-level architecture discussion", "Database queries", "Frontend design"], answer: 1, difficulty: "medium", category: "mock", topic: "Technical Tips" },
  { q: "Mock interviews help because?", options: ["Get actual questions", "Practice under pressure", "Guaranteed to get same questions", "Not useful"], answer: 1, difficulty: "easy", category: "mock", topic: "Technical Tips" },
  { q: "Asking interviewer questions at end?", options: ["Shows disinterest", "Shows engagement and interest", "Is rude", "Only for senior roles"], answer: 1, difficulty: "easy", category: "mock", topic: "Technical Tips" },
  { q: "Following up after interview with thank you email?", options: ["Desperate", "Professional and recommended", "Only for dream companies", "Not done anymore"], answer: 1, difficulty: "easy", category: "mock", topic: "Technical Tips" },

  // Body Language (10)
  { q: "Good eye contact shows?", options: ["Aggression", "Confidence and engagement", "Nervousness", "Boredom"], answer: 1, difficulty: "easy", category: "mock", topic: "Body Language" },
  { q: "Crossing arms during interview suggests?", options: ["Confidence", "Defensiveness or discomfort", "Relaxation", "Professionalism"], answer: 1, difficulty: "easy", category: "mock", topic: "Body Language" },
  { q: "Firm handshake indicates?", options: ["Aggression", "Confidence", "Nervousness", "Indifference"], answer: 1, difficulty: "easy", category: "mock", topic: "Body Language" },
  { q: "Fidgeting during interview?", options: ["Normal", "Shows nervousness — minimize it", "Professional", "Expected"], answer: 1, difficulty: "easy", category: "mock", topic: "Body Language" },
  { q: "Sitting posture should be?", options: ["Slouched", "Upright and slightly forward", "Reclined", "Stiff"], answer: 1, difficulty: "easy", category: "mock", topic: "Body Language" },
  { q: "Nodding while listening shows?", options: ["Agreement with everything", "Active listening", "Confusion", "Impatience"], answer: 1, difficulty: "easy", category: "mock", topic: "Body Language" },
  { q: "In video interviews, camera position?", options: ["Below face", "At eye level", "Above head", "Doesn't matter"], answer: 1, difficulty: "easy", category: "mock", topic: "Body Language" },
  { q: "Smiling appropriately during interview?", options: ["Unprofessional", "Creates positive rapport", "Shows nervousness", "Only in casual interviews"], answer: 1, difficulty: "easy", category: "mock", topic: "Body Language" },
  { q: "Hand gestures while speaking?", options: ["Always avoid", "Natural gestures enhance communication", "Only in person", "Show nervousness"], answer: 1, difficulty: "medium", category: "mock", topic: "Body Language" },
  { q: "Mirror effect in interviews means?", options: ["Looking at mirror", "Subtly matching interviewer's body language", "Copying exact words", "Acting"], answer: 1, difficulty: "medium", category: "mock", topic: "Body Language" },

  // HR Round (10)
  { q: "HR round primarily assesses?", options: ["Technical skills", "Cultural fit, communication, motivation", "Coding ability", "System design"], answer: 1, difficulty: "easy", category: "mock", topic: "HR Round" },
  { q: "Why should we hire you?", options: ["I need the job", "Match your skills to job requirements", "I'm the best", "Lower salary"], answer: 1, difficulty: "easy", category: "mock", topic: "HR Round" },
  { q: "Reason for leaving current job — best answer?", options: ["Bad manager", "Seeking growth and new challenges", "Hated the work", "Better salary"], answer: 1, difficulty: "medium", category: "mock", topic: "HR Round" },
  { q: "Background verification checks?", options: ["Social media only", "Education, employment, criminal records", "Only references", "Nothing serious"], answer: 1, difficulty: "easy", category: "mock", topic: "HR Round" },
  { q: "Asking about work-life balance is?", options: ["Unprofessional", "Perfectly appropriate", "Only for remote jobs", "Red flag"], answer: 1, difficulty: "easy", category: "mock", topic: "HR Round" },
  { q: "Discussing other offers with HR?", options: ["Never", "Professionally, to show demand without being arrogant", "Always in detail", "Only to pressure them"], answer: 1, difficulty: "hard", category: "mock", topic: "HR Round" },
  { q: "Notice period negotiation?", options: ["Not possible", "Discuss early, offer compromises", "Demand immediate joining", "Lie about current notice"], answer: 1, difficulty: "medium", category: "mock", topic: "HR Round" },
  { q: "Questions to ask HR?", options: ["None", "About team, culture, growth opportunities", "Only about salary", "About competitors"], answer: 1, difficulty: "easy", category: "mock", topic: "HR Round" },
  { q: "Dress code for interview?", options: ["Casual always", "Business formal or smart casual based on company", "Doesn't matter", "Suit always"], answer: 1, difficulty: "easy", category: "mock", topic: "HR Round" },
  { q: "Red flags in HR round answers?", options: ["Showing enthusiasm", "Badmouthing previous employer", "Asking questions", "Being prepared"], answer: 1, difficulty: "easy", category: "mock", topic: "HR Round" },
];

// ─── SQL: 10 topics ───
const sqlQuestions: Question[] = [
  // JOINs (10)
  { q: "INNER JOIN returns?", options: ["All rows from both", "Matching rows only", "All from left", "All from right"], answer: 1, difficulty: "easy", category: "sql", topic: "JOINs" },
  { q: "LEFT JOIN returns?", options: ["Matching only", "All left + matching right", "All right + matching left", "Cartesian product"], answer: 1, difficulty: "easy", category: "sql", topic: "JOINs" },
  { q: "CROSS JOIN produces?", options: ["Matching rows", "Cartesian product", "Union", "Intersection"], answer: 1, difficulty: "medium", category: "sql", topic: "JOINs" },
  { q: "SELF JOIN is?", options: ["Join with different table", "Table joined with itself", "Automatic join", "Error"], answer: 1, difficulty: "medium", category: "sql", topic: "JOINs" },
  { q: "NATURAL JOIN matches on?", options: ["Primary key", "All common column names", "First column", "Foreign key only"], answer: 1, difficulty: "medium", category: "sql", topic: "JOINs" },
  { q: "FULL OUTER JOIN returns?", options: ["Only matching", "All from both + NULLs for non-matching", "Left only", "Right only"], answer: 1, difficulty: "medium", category: "sql", topic: "JOINs" },
  { q: "Anti-join finds rows in A not in B using?", options: ["INNER JOIN", "LEFT JOIN + WHERE B.key IS NULL", "CROSS JOIN", "UNION"], answer: 1, difficulty: "hard", category: "sql", topic: "JOINs" },
  { q: "Multiple JOINs performance improved by?", options: ["More JOINs", "Proper indexing on join columns", "Removing WHERE", "SELECT *"], answer: 1, difficulty: "hard", category: "sql", topic: "JOINs" },
  { q: "Join condition goes in?", options: ["WHERE only", "ON clause", "SELECT", "GROUP BY"], answer: 1, difficulty: "easy", category: "sql", topic: "JOINs" },
  { q: "Difference between ON and WHERE in JOIN?", options: ["Same thing", "ON filters before join, WHERE filters after", "WHERE is faster", "ON is deprecated"], answer: 1, difficulty: "hard", category: "sql", topic: "JOINs" },

  // Subqueries (10)
  { q: "Subquery is?", options: ["Stored procedure", "Query nested inside another query", "View", "Index"], answer: 1, difficulty: "easy", category: "sql", topic: "Subqueries" },
  { q: "Correlated subquery references?", options: ["Nothing", "Outer query's columns", "Only constants", "Other databases"], answer: 1, difficulty: "medium", category: "sql", topic: "Subqueries" },
  { q: "EXISTS returns?", options: ["Count", "TRUE/FALSE", "Column values", "Table"], answer: 1, difficulty: "medium", category: "sql", topic: "Subqueries" },
  { q: "Scalar subquery returns?", options: ["Multiple rows", "Single value", "Table", "Nothing"], answer: 1, difficulty: "easy", category: "sql", topic: "Subqueries" },
  { q: "IN vs EXISTS — for large outer, small inner?", options: ["IN is better", "EXISTS is better", "Same", "Neither works"], answer: 0, difficulty: "hard", category: "sql", topic: "Subqueries" },
  { q: "Subquery in FROM clause creates?", options: ["Error", "Derived table", "Index", "View"], answer: 1, difficulty: "medium", category: "sql", topic: "Subqueries" },
  { q: "ALL keyword with subquery means?", options: ["Any match", "Compare with every value returned", "First value only", "Random"], answer: 1, difficulty: "medium", category: "sql", topic: "Subqueries" },
  { q: "ANY keyword with subquery means?", options: ["All must match", "At least one match", "None match", "First only"], answer: 1, difficulty: "medium", category: "sql", topic: "Subqueries" },
  { q: "CTE (WITH clause) advantage over subquery?", options: ["Faster always", "Better readability and reusability", "Less memory", "More columns"], answer: 1, difficulty: "hard", category: "sql", topic: "Subqueries" },
  { q: "Nested subqueries limit?", options: ["2 levels", "No fixed limit, but performance degrades", "10 levels", "1 level"], answer: 1, difficulty: "hard", category: "sql", topic: "Subqueries" },

  // GROUP BY & Aggregations (10)
  { q: "GROUP BY is used with?", options: ["UPDATE", "Aggregate functions", "DROP", "ALTER"], answer: 1, difficulty: "easy", category: "sql", topic: "Aggregations" },
  { q: "HAVING filters?", options: ["Individual rows", "Groups after aggregation", "Columns", "Tables"], answer: 1, difficulty: "easy", category: "sql", topic: "Aggregations" },
  { q: "COUNT(*) includes NULLs?", options: ["No", "Yes", "Depends", "Error"], answer: 1, difficulty: "medium", category: "sql", topic: "Aggregations" },
  { q: "COUNT(column) includes NULLs?", options: ["No", "Yes", "Sometimes", "Error"], answer: 0, difficulty: "medium", category: "sql", topic: "Aggregations" },
  { q: "SUM of NULL values?", options: ["0", "NULL", "Error", "Empty"], answer: 1, difficulty: "medium", category: "sql", topic: "Aggregations" },
  { q: "ORDER of clauses: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY?", options: ["Any order", "Exactly this order", "GROUP BY before WHERE", "HAVING before GROUP BY"], answer: 1, difficulty: "easy", category: "sql", topic: "Aggregations" },
  { q: "DISTINCT in aggregate: COUNT(DISTINCT col)?", options: ["Counts all", "Counts unique values", "Error", "Same as COUNT(col)"], answer: 1, difficulty: "medium", category: "sql", topic: "Aggregations" },
  { q: "ROLLUP produces?", options: ["Regular groups", "Groups + subtotals + grand total", "Only grand total", "Nothing extra"], answer: 1, difficulty: "hard", category: "sql", topic: "Aggregations" },
  { q: "CUBE vs ROLLUP?", options: ["Same", "CUBE gives all combinations of groupings", "ROLLUP gives more results", "CUBE is deprecated"], answer: 1, difficulty: "hard", category: "sql", topic: "Aggregations" },
  { q: "Can we use alias in HAVING?", options: ["Yes in all databases", "Depends on database (MySQL yes, PostgreSQL no)", "Never", "Always"], answer: 1, difficulty: "hard", category: "sql", topic: "Aggregations" },

  // Window Functions (10)
  { q: "Window function vs GROUP BY?", options: ["Same thing", "Window preserves individual rows", "GROUP BY keeps all rows", "Window aggregates and groups"], answer: 1, difficulty: "medium", category: "sql", topic: "Window Functions" },
  { q: "ROW_NUMBER() does?", options: ["Counts rows", "Assigns unique sequential number", "Ranks with gaps", "Dense rank"], answer: 1, difficulty: "easy", category: "sql", topic: "Window Functions" },
  { q: "RANK() vs DENSE_RANK()?", options: ["Same", "RANK skips numbers after ties, DENSE_RANK doesn't", "DENSE_RANK skips", "Neither handles ties"], answer: 1, difficulty: "medium", category: "sql", topic: "Window Functions" },
  { q: "PARTITION BY in window functions?", options: ["Divides result into groups", "Sorts data", "Filters rows", "Joins tables"], answer: 0, difficulty: "easy", category: "sql", topic: "Window Functions" },
  { q: "LAG() function?", options: ["Next row value", "Previous row value", "First value", "Last value"], answer: 1, difficulty: "medium", category: "sql", topic: "Window Functions" },
  { q: "LEAD() function?", options: ["Previous row value", "Next row value", "Current value", "Sum"], answer: 1, difficulty: "medium", category: "sql", topic: "Window Functions" },
  { q: "Running total uses?", options: ["COUNT", "SUM() OVER (ORDER BY ...)", "GROUP BY", "DISTINCT"], answer: 1, difficulty: "medium", category: "sql", topic: "Window Functions" },
  { q: "NTILE(4) divides rows into?", options: ["2 groups", "4 approximately equal groups", "4 exact groups", "Random groups"], answer: 1, difficulty: "medium", category: "sql", topic: "Window Functions" },
  { q: "FIRST_VALUE() with ORDER BY returns?", options: ["Last in partition", "First in partition based on order", "Random", "NULL"], answer: 1, difficulty: "hard", category: "sql", topic: "Window Functions" },
  { q: "Frame clause ROWS BETWEEN in window?", options: ["Not supported", "Defines which rows window function considers", "Same as PARTITION BY", "Only for SUM"], answer: 1, difficulty: "hard", category: "sql", topic: "Window Functions" },

  // Indexes & Performance (10)
  { q: "Index speeds up?", options: ["INSERT", "SELECT queries", "DELETE only", "All DML equally"], answer: 1, difficulty: "easy", category: "sql", topic: "Indexes" },
  { q: "Too many indexes cause?", options: ["Faster everything", "Slower writes, more storage", "No effect", "Database crash"], answer: 1, difficulty: "easy", category: "sql", topic: "Indexes" },
  { q: "Composite index on (A, B) helps queries on?", options: ["B only", "A only, or A+B", "Any combination", "Neither"], answer: 1, difficulty: "medium", category: "sql", topic: "Indexes" },
  { q: "EXPLAIN shows?", options: ["Data", "Query execution plan", "Table structure", "Index list"], answer: 1, difficulty: "easy", category: "sql", topic: "Indexes" },
  { q: "Clustered index determines?", options: ["Nothing", "Physical order of data", "Only index order", "View"], answer: 1, difficulty: "medium", category: "sql", topic: "Indexes" },
  { q: "How many clustered indexes per table?", options: ["Unlimited", "One", "Two", "Ten"], answer: 1, difficulty: "medium", category: "sql", topic: "Indexes" },
  { q: "B-tree index is used for?", options: ["Full text search", "Range queries and equality", "Spatial data", "JSON"], answer: 1, difficulty: "medium", category: "sql", topic: "Indexes" },
  { q: "Hash index is best for?", options: ["Range queries", "Exact equality lookups", "Sorting", "Pattern matching"], answer: 1, difficulty: "medium", category: "sql", topic: "Indexes" },
  { q: "Covering index means?", options: ["Covers all tables", "Index contains all columns needed for query", "Covers primary key", "Auto-created"], answer: 1, difficulty: "hard", category: "sql", topic: "Indexes" },
  { q: "Index scan vs table scan?", options: ["Same speed", "Index scan usually faster for selective queries", "Table scan always better", "Index scan always better"], answer: 1, difficulty: "hard", category: "sql", topic: "Indexes" },

  // DDL & Schema (10)
  { q: "PRIMARY KEY is?", options: ["Any column", "Unique + NOT NULL identifier", "Foreign reference", "Index"], answer: 1, difficulty: "easy", category: "sql", topic: "DDL & Schema" },
  { q: "FOREIGN KEY references?", options: ["Same table column", "Primary key of another table", "Any column", "Index"], answer: 1, difficulty: "easy", category: "sql", topic: "DDL & Schema" },
  { q: "ALTER TABLE is used to?", options: ["Query data", "Modify table structure", "Delete data", "Insert data"], answer: 1, difficulty: "easy", category: "sql", topic: "DDL & Schema" },
  { q: "DROP vs TRUNCATE?", options: ["Same", "DROP removes table, TRUNCATE removes all data", "TRUNCATE removes table", "DROP removes data only"], answer: 1, difficulty: "medium", category: "sql", topic: "DDL & Schema" },
  { q: "UNIQUE constraint allows NULLs?", options: ["No", "Yes (usually one NULL)", "Multiple NULLs", "Depends on database"], answer: 3, difficulty: "hard", category: "sql", topic: "DDL & Schema" },
  { q: "CHECK constraint ensures?", options: ["Referential integrity", "Column value meets a condition", "Uniqueness", "NOT NULL"], answer: 1, difficulty: "easy", category: "sql", topic: "DDL & Schema" },
  { q: "DEFAULT value is used when?", options: ["Always", "No value provided during INSERT", "During UPDATE", "In SELECT"], answer: 1, difficulty: "easy", category: "sql", topic: "DDL & Schema" },
  { q: "Normalization reduces?", options: ["Performance", "Data redundancy", "Tables", "Columns"], answer: 1, difficulty: "medium", category: "sql", topic: "DDL & Schema" },
  { q: "3NF requires?", options: ["Only 1NF", "No transitive dependencies", "All keys are composite", "Denormalization"], answer: 1, difficulty: "hard", category: "sql", topic: "DDL & Schema" },
  { q: "CASCADE in foreign key means?", options: ["Nothing", "Delete/update child when parent changes", "Prevent parent deletion", "Set to NULL"], answer: 1, difficulty: "medium", category: "sql", topic: "DDL & Schema" },

  // DML Basics (10)
  { q: "INSERT INTO syntax?", options: ["INSERT table VALUES", "INSERT INTO table (cols) VALUES (vals)", "ADD INTO table", "PUT INTO table"], answer: 1, difficulty: "easy", category: "sql", topic: "DML Basics" },
  { q: "UPDATE without WHERE?", options: ["Updates first row", "Updates all rows", "Error", "No effect"], answer: 1, difficulty: "easy", category: "sql", topic: "DML Basics" },
  { q: "DELETE vs TRUNCATE?", options: ["Same", "DELETE is DML (row-by-row, logged), TRUNCATE is DDL (fast)", "TRUNCATE is slower", "DELETE removes table"], answer: 1, difficulty: "medium", category: "sql", topic: "DML Basics" },
  { q: "UPSERT means?", options: ["Update only", "Insert only", "Insert or update if exists", "Delete and insert"], answer: 2, difficulty: "medium", category: "sql", topic: "DML Basics" },
  { q: "MERGE statement does?", options: ["Combine databases", "Conditional insert/update/delete", "Create views", "Sort data"], answer: 1, difficulty: "hard", category: "sql", topic: "DML Basics" },
  { q: "INSERT SELECT is used to?", options: ["Create table", "Insert data from another query", "Update rows", "Delete rows"], answer: 1, difficulty: "easy", category: "sql", topic: "DML Basics" },
  { q: "RETURNING clause (PostgreSQL)?", options: ["Returns error", "Returns affected rows' data", "Returns count", "Not supported"], answer: 1, difficulty: "medium", category: "sql", topic: "DML Basics" },
  { q: "Bulk INSERT advantage?", options: ["Same as single insert", "Fewer round trips, faster", "Uses more memory", "Not possible"], answer: 1, difficulty: "medium", category: "sql", topic: "DML Basics" },
  { q: "ON CONFLICT in PostgreSQL?", options: ["Error handler", "Upsert mechanism", "Join type", "Index"], answer: 1, difficulty: "hard", category: "sql", topic: "DML Basics" },
  { q: "SAVEPOINT in transactions?", options: ["Commits transaction", "Creates a point to rollback to within transaction", "Starts transaction", "Ends transaction"], answer: 1, difficulty: "hard", category: "sql", topic: "DML Basics" },

  // Views & CTEs (10)
  { q: "VIEW is?", options: ["Table copy", "Virtual table based on query", "Index", "Stored procedure"], answer: 1, difficulty: "easy", category: "sql", topic: "Views & CTEs" },
  { q: "CTE stands for?", options: ["Common Table Expression", "Create Table Extension", "Combined Table Entity", "Computed Table Element"], answer: 0, difficulty: "easy", category: "sql", topic: "Views & CTEs" },
  { q: "Materialized view vs regular view?", options: ["Same", "Materialized stores data physically", "Regular is faster", "Materialized is virtual"], answer: 1, difficulty: "medium", category: "sql", topic: "Views & CTEs" },
  { q: "CTE syntax starts with?", options: ["CREATE", "WITH", "SELECT", "FROM"], answer: 1, difficulty: "easy", category: "sql", topic: "Views & CTEs" },
  { q: "Recursive CTE is used for?", options: ["Loops in SQL", "Hierarchical/tree data queries", "Table creation", "Indexing"], answer: 1, difficulty: "hard", category: "sql", topic: "Views & CTEs" },
  { q: "Can you UPDATE through a view?", options: ["Never", "Yes, for simple views", "Always", "Only with triggers"], answer: 1, difficulty: "medium", category: "sql", topic: "Views & CTEs" },
  { q: "Multiple CTEs in one query?", options: ["Not possible", "Yes, comma-separated", "Only 2", "One per query"], answer: 1, difficulty: "medium", category: "sql", topic: "Views & CTEs" },
  { q: "CTE scope?", options: ["Entire session", "Only the immediately following statement", "Multiple queries", "Forever"], answer: 1, difficulty: "medium", category: "sql", topic: "Views & CTEs" },
  { q: "View security advantage?", options: ["None", "Restrict access to specific columns/rows", "Faster queries", "Less storage"], answer: 1, difficulty: "medium", category: "sql", topic: "Views & CTEs" },
  { q: "Temp table vs CTE?", options: ["Same", "Temp table persists in session, CTE doesn't", "CTE persists", "Both persist"], answer: 1, difficulty: "hard", category: "sql", topic: "Views & CTEs" },

  // Transactions (10)
  { q: "ACID stands for?", options: ["Add, Create, Insert, Delete", "Atomicity, Consistency, Isolation, Durability", "Automated, Cached, Indexed, Distributed", "None"], answer: 1, difficulty: "easy", category: "sql", topic: "Transactions" },
  { q: "Atomicity means?", options: ["Fast execution", "All or nothing", "Concurrent access", "Data recovery"], answer: 1, difficulty: "easy", category: "sql", topic: "Transactions" },
  { q: "Isolation level READ COMMITTED means?", options: ["See uncommitted data", "Only see committed data", "No isolation", "Full serialization"], answer: 1, difficulty: "medium", category: "sql", topic: "Transactions" },
  { q: "Dirty read happens when?", options: ["Data is corrupted", "Reading uncommitted data from another transaction", "Network error", "Deadlock"], answer: 1, difficulty: "medium", category: "sql", topic: "Transactions" },
  { q: "SERIALIZABLE isolation level?", options: ["Fastest", "Strictest — prevents phantom reads", "Default everywhere", "Deprecated"], answer: 1, difficulty: "hard", category: "sql", topic: "Transactions" },
  { q: "Deadlock occurs when?", options: ["Too many queries", "Two transactions wait for each other's locks", "Server crash", "Timeout"], answer: 1, difficulty: "medium", category: "sql", topic: "Transactions" },
  { q: "COMMIT does?", options: ["Cancels changes", "Makes changes permanent", "Starts transaction", "Creates savepoint"], answer: 1, difficulty: "easy", category: "sql", topic: "Transactions" },
  { q: "ROLLBACK does?", options: ["Saves changes", "Undoes changes since last commit/savepoint", "Drops table", "Creates backup"], answer: 1, difficulty: "easy", category: "sql", topic: "Transactions" },
  { q: "Optimistic vs pessimistic locking?", options: ["Same", "Optimistic checks at commit, pessimistic locks early", "Optimistic is slower", "Pessimistic never locks"], answer: 1, difficulty: "hard", category: "sql", topic: "Transactions" },
  { q: "Phantom read?", options: ["Data disappears", "New rows appear in repeated query within transaction", "Lock failure", "Network issue"], answer: 1, difficulty: "hard", category: "sql", topic: "Transactions" },
];

// ─── SYSTEM DESIGN: 10 topics ───
const systemDesignQuestions: Question[] = [
  // Scalability (10)
  { q: "Horizontal scaling means?", options: ["Bigger server", "More servers", "More RAM", "Better CPU"], answer: 1, difficulty: "easy", category: "system", topic: "Scalability" },
  { q: "Vertical scaling means?", options: ["More servers", "Upgrading single server resources", "More databases", "CDN"], answer: 1, difficulty: "easy", category: "system", topic: "Scalability" },
  { q: "Load balancer distributes?", options: ["Data", "Traffic across servers", "Code", "Logs"], answer: 1, difficulty: "easy", category: "system", topic: "Scalability" },
  { q: "Auto-scaling triggers on?", options: ["Manual request", "CPU/memory thresholds or traffic", "Time only", "Never"], answer: 1, difficulty: "medium", category: "system", topic: "Scalability" },
  { q: "Stateless services are easier to scale because?", options: ["No code", "No session data on server", "Smaller size", "Faster CPU"], answer: 1, difficulty: "medium", category: "system", topic: "Scalability" },
  { q: "Database sharding splits data by?", options: ["Time only", "Key/partition", "Random", "Size"], answer: 1, difficulty: "hard", category: "system", topic: "Scalability" },
  { q: "Read replicas help with?", options: ["Write performance", "Read-heavy workloads", "Schema changes", "Backups only"], answer: 1, difficulty: "medium", category: "system", topic: "Scalability" },
  { q: "Microservices vs monolith for scaling?", options: ["Monolith always better", "Microservices allow independent scaling", "Same", "Neither scales"], answer: 1, difficulty: "medium", category: "system", topic: "Scalability" },
  { q: "Connection pooling reduces?", options: ["CPU usage", "Database connection overhead", "Memory", "Network latency"], answer: 1, difficulty: "medium", category: "system", topic: "Scalability" },
  { q: "Rate limiting prevents?", options: ["Scaling", "Abuse and overload", "Caching", "Replication"], answer: 1, difficulty: "easy", category: "system", topic: "Scalability" },

  // Caching (10)
  { q: "Cache purpose?", options: ["Store permanently", "Speed up frequent access patterns", "Replace database", "Encrypt data"], answer: 1, difficulty: "easy", category: "system", topic: "Caching" },
  { q: "Redis is commonly used as?", options: ["Primary database", "In-memory cache/data store", "File storage", "CDN"], answer: 1, difficulty: "easy", category: "system", topic: "Caching" },
  { q: "Cache-aside pattern?", options: ["Write to cache first", "App checks cache → miss → fetch DB → update cache", "Cache writes to DB", "Automatic"], answer: 1, difficulty: "medium", category: "system", topic: "Caching" },
  { q: "Write-through cache?", options: ["Write DB only", "Write cache + DB simultaneously", "Write cache only", "Lazy write"], answer: 1, difficulty: "medium", category: "system", topic: "Caching" },
  { q: "Cache invalidation is considered?", options: ["Easy", "One of the hardest problems in CS", "Unnecessary", "Automatic"], answer: 1, difficulty: "medium", category: "system", topic: "Caching" },
  { q: "TTL (Time To Live) in cache?", options: ["Cache creation time", "Duration before cache entry expires", "Total data limit", "Throughput"], answer: 1, difficulty: "easy", category: "system", topic: "Caching" },
  { q: "LRU eviction policy?", options: ["Least Recently Used is evicted first", "Last Read Updated", "Longest Running Used", "Latest Random Update"], answer: 0, difficulty: "medium", category: "system", topic: "Caching" },
  { q: "CDN is a type of?", options: ["Database", "Edge/content cache", "Load balancer", "Firewall"], answer: 1, difficulty: "easy", category: "system", topic: "Caching" },
  { q: "Cache stampede occurs when?", options: ["Cache is full", "Many requests hit DB simultaneously when cache expires", "Server crash", "Network failure"], answer: 1, difficulty: "hard", category: "system", topic: "Caching" },
  { q: "Distributed cache advantages?", options: ["Simpler code", "Shared across services, survives restarts", "Less memory total", "No network calls"], answer: 1, difficulty: "hard", category: "system", topic: "Caching" },

  // CAP Theorem (10)
  { q: "CAP stands for?", options: ["Cache, API, Protocol", "Consistency, Availability, Partition tolerance", "Create, Alter, Partition", "Concurrency, Atomicity, Persistence"], answer: 1, difficulty: "easy", category: "system", topic: "CAP Theorem" },
  { q: "In network partition, you must choose between?", options: ["Speed and memory", "Consistency and Availability", "Cost and performance", "Security and speed"], answer: 1, difficulty: "medium", category: "system", topic: "CAP Theorem" },
  { q: "CP system prioritizes?", options: ["Availability", "Consistency over availability", "Performance", "Cost"], answer: 1, difficulty: "medium", category: "system", topic: "CAP Theorem" },
  { q: "AP system prioritizes?", options: ["Consistency", "Availability over consistency", "Partition intolerance", "Strong consistency"], answer: 1, difficulty: "medium", category: "system", topic: "CAP Theorem" },
  { q: "Eventual consistency means?", options: ["Never consistent", "Data becomes consistent over time", "Always consistent", "Only for SQL"], answer: 1, difficulty: "medium", category: "system", topic: "CAP Theorem" },
  { q: "MongoDB is typically classified as?", options: ["CA", "CP", "AP", "CAP"], answer: 1, difficulty: "hard", category: "system", topic: "CAP Theorem" },
  { q: "Cassandra is typically classified as?", options: ["CP", "CA", "AP", "None"], answer: 2, difficulty: "hard", category: "system", topic: "CAP Theorem" },
  { q: "Strong consistency means?", options: ["All reads return latest write", "Eventually consistent", "No reads allowed", "Cached data"], answer: 0, difficulty: "easy", category: "system", topic: "CAP Theorem" },
  { q: "Why can't we have all 3 of CAP?", options: ["Cost", "Network partitions are unavoidable in distributed systems", "Hardware limits", "Software bugs"], answer: 1, difficulty: "hard", category: "system", topic: "CAP Theorem" },
  { q: "PACELC extends CAP with?", options: ["Pricing", "Latency vs Consistency tradeoff when no partition", "Performance", "Availability"], answer: 1, difficulty: "hard", category: "system", topic: "CAP Theorem" },

  // URL Shortener (10)
  { q: "URL shortener core function?", options: ["Compress files", "Map short code to long URL", "Encrypt URLs", "Cache websites"], answer: 1, difficulty: "easy", category: "system", topic: "URL Shortener" },
  { q: "Short URL generation approach?", options: ["Random string", "Base62 encoding of counter", "Hash of URL", "All can work"], answer: 3, difficulty: "medium", category: "system", topic: "URL Shortener" },
  { q: "Collision handling in URL shortener?", options: ["Ignore", "Check and regenerate or use counter", "Delete old URL", "Error"], answer: 1, difficulty: "medium", category: "system", topic: "URL Shortener" },
  { q: "Read:Write ratio for URL shortener?", options: ["Equal", "Read-heavy (100:1 typical)", "Write-heavy", "No reads"], answer: 1, difficulty: "medium", category: "system", topic: "URL Shortener" },
  { q: "Storage for 1 billion URLs (avg 500 bytes)?", options: ["500 MB", "500 GB", "5 TB", "50 TB"], answer: 1, difficulty: "hard", category: "system", topic: "URL Shortener" },
  { q: "Cache popular URLs using?", options: ["File system", "Redis/Memcached", "Database only", "CDN only"], answer: 1, difficulty: "easy", category: "system", topic: "URL Shortener" },
  { q: "Analytics for URL shortener tracks?", options: ["Nothing", "Click count, location, referrer, time", "Only clicks", "Only errors"], answer: 1, difficulty: "medium", category: "system", topic: "URL Shortener" },
  { q: "301 vs 302 redirect for short URLs?", options: ["Same", "301 permanent (cached), 302 temporary (trackable)", "302 is permanent", "301 is temporary"], answer: 1, difficulty: "hard", category: "system", topic: "URL Shortener" },
  { q: "Base62 uses characters?", options: ["0-9 only", "a-z, A-Z, 0-9", "Hex characters", "Binary"], answer: 1, difficulty: "easy", category: "system", topic: "URL Shortener" },
  { q: "6-character Base62 can represent?", options: ["1 million", "56 billion", "1 billion", "100 million"], answer: 1, difficulty: "hard", category: "system", topic: "URL Shortener" },

  // Message Queue (10)
  { q: "Message queue enables?", options: ["Synchronous only", "Asynchronous communication", "Direct calls", "Faster database"], answer: 1, difficulty: "easy", category: "system", topic: "Message Queue" },
  { q: "Producer-Consumer pattern?", options: ["Producer sends, Consumer receives messages", "Both produce and consume", "Direct method calls", "Database triggers"], answer: 0, difficulty: "easy", category: "system", topic: "Message Queue" },
  { q: "Kafka is best for?", options: ["Small messages", "High-throughput event streaming", "Simple queue", "Email"], answer: 1, difficulty: "medium", category: "system", topic: "Message Queue" },
  { q: "RabbitMQ vs Kafka?", options: ["Same", "RabbitMQ for task queues, Kafka for event streaming", "Kafka for simple queues", "RabbitMQ for streaming"], answer: 1, difficulty: "hard", category: "system", topic: "Message Queue" },
  { q: "Dead letter queue stores?", options: ["Old messages", "Failed/unprocessable messages", "Deleted queues", "Logs"], answer: 1, difficulty: "medium", category: "system", topic: "Message Queue" },
  { q: "At-least-once delivery means?", options: ["Message may not arrive", "Message arrives 1+ times, may duplicate", "Exactly once", "At most once"], answer: 1, difficulty: "medium", category: "system", topic: "Message Queue" },
  { q: "Exactly-once delivery is?", options: ["Easy", "Very hard, often achieved with idempotency", "Default in all queues", "Impossible"], answer: 1, difficulty: "hard", category: "system", topic: "Message Queue" },
  { q: "Fan-out pattern?", options: ["One producer, one consumer", "One message sent to multiple consumers", "Multiple producers, one consumer", "No consumers"], answer: 1, difficulty: "medium", category: "system", topic: "Message Queue" },
  { q: "Message ordering guaranteed in?", options: ["All queues", "Single partition/queue, not across partitions", "Never", "Always across all"], answer: 1, difficulty: "hard", category: "system", topic: "Message Queue" },
  { q: "Back-pressure in queues means?", options: ["Queue is empty", "Consumer signals producer to slow down", "Producer stops", "Queue deletes messages"], answer: 1, difficulty: "hard", category: "system", topic: "Message Queue" },

  // API Design (10)
  { q: "REST stands for?", options: ["Remote State Transfer", "Representational State Transfer", "Request-Execute-Send-Transmit", "None"], answer: 1, difficulty: "easy", category: "system", topic: "API Design" },
  { q: "HTTP GET is for?", options: ["Creating", "Reading data", "Updating", "Deleting"], answer: 1, difficulty: "easy", category: "system", topic: "API Design" },
  { q: "HTTP status 404 means?", options: ["Success", "Not Found", "Server Error", "Unauthorized"], answer: 1, difficulty: "easy", category: "system", topic: "API Design" },
  { q: "GraphQL advantage over REST?", options: ["Faster server", "Client specifies exact data needed", "Simpler always", "Better caching"], answer: 1, difficulty: "medium", category: "system", topic: "API Design" },
  { q: "Rate limiting protects against?", options: ["Slow connections", "API abuse and DDoS", "Data loss", "Caching issues"], answer: 1, difficulty: "easy", category: "system", topic: "API Design" },
  { q: "API versioning approaches?", options: ["Never version", "URL path, header, or query param", "Only URL", "Not possible"], answer: 1, difficulty: "medium", category: "system", topic: "API Design" },
  { q: "Idempotent HTTP methods?", options: ["POST only", "GET, PUT, DELETE", "All methods", "None"], answer: 1, difficulty: "medium", category: "system", topic: "API Design" },
  { q: "Pagination in API — cursor vs offset?", options: ["Same", "Cursor is more performant for large datasets", "Offset always better", "Neither works"], answer: 1, difficulty: "hard", category: "system", topic: "API Design" },
  { q: "CORS stands for?", options: ["Code Origin Resource Sharing", "Cross-Origin Resource Sharing", "Client Object Request Server", "None"], answer: 1, difficulty: "easy", category: "system", topic: "API Design" },
  { q: "WebSocket vs REST?", options: ["Same", "WebSocket is bidirectional real-time, REST is request-response", "REST is real-time", "WebSocket is stateless"], answer: 1, difficulty: "medium", category: "system", topic: "API Design" },

  // Database Design (10)
  { q: "SQL vs NoSQL main difference?", options: ["Same", "SQL: structured/relational, NoSQL: flexible/document", "NoSQL is always faster", "SQL is outdated"], answer: 1, difficulty: "easy", category: "system", topic: "Database Design" },
  { q: "When to use NoSQL?", options: ["Always", "Flexible schema, high write throughput, horizontal scaling", "Never", "Only for small data"], answer: 1, difficulty: "medium", category: "system", topic: "Database Design" },
  { q: "Database replication benefit?", options: ["Less storage", "High availability and read scaling", "Faster writes", "Schema flexibility"], answer: 1, difficulty: "medium", category: "system", topic: "Database Design" },
  { q: "Denormalization trades?", options: ["Performance for complexity", "Redundancy for read performance", "Nothing", "Storage for speed"], answer: 1, difficulty: "medium", category: "system", topic: "Database Design" },
  { q: "ACID vs BASE?", options: ["Same", "ACID: strong consistency, BASE: eventual consistency", "BASE is stronger", "ACID is for NoSQL"], answer: 1, difficulty: "hard", category: "system", topic: "Database Design" },
  { q: "Time-series database examples?", options: ["MySQL", "InfluxDB, TimescaleDB", "MongoDB", "Redis"], answer: 1, difficulty: "medium", category: "system", topic: "Database Design" },
  { q: "Graph database is best for?", options: ["Simple queries", "Relationship-heavy data (social networks)", "Time series", "File storage"], answer: 1, difficulty: "medium", category: "system", topic: "Database Design" },
  { q: "Database migration strategy?", options: ["Switch instantly", "Dual-write, migrate, verify, switch", "Copy and pray", "Manual transfer"], answer: 1, difficulty: "hard", category: "system", topic: "Database Design" },
  { q: "Connection pool size too large causes?", options: ["Better performance", "Resource exhaustion on database server", "No effect", "Faster queries"], answer: 1, difficulty: "hard", category: "system", topic: "Database Design" },
  { q: "Object storage (S3) is best for?", options: ["Transactions", "Large files: images, videos, backups", "Real-time queries", "Small JSON"], answer: 1, difficulty: "easy", category: "system", topic: "Database Design" },

  // Microservices (10)
  { q: "Microservices architecture means?", options: ["One big application", "Small independent services communicating via APIs", "No backend", "Only frontend"], answer: 1, difficulty: "easy", category: "system", topic: "Microservices" },
  { q: "Circuit breaker pattern prevents?", options: ["Short circuits", "Cascading failures between services", "Data loss", "Code bugs"], answer: 1, difficulty: "medium", category: "system", topic: "Microservices" },
  { q: "Service discovery is needed because?", options: ["Services have fixed IPs", "Service instances change dynamically", "No networking needed", "Manual configuration"], answer: 1, difficulty: "medium", category: "system", topic: "Microservices" },
  { q: "API Gateway does?", options: ["Database queries", "Routes requests, handles auth, rate limiting", "File storage", "Caching only"], answer: 1, difficulty: "medium", category: "system", topic: "Microservices" },
  { q: "Saga pattern handles?", options: ["Authentication", "Distributed transactions across services", "Logging", "Caching"], answer: 1, difficulty: "hard", category: "system", topic: "Microservices" },
  { q: "Event-driven microservices use?", options: ["Direct HTTP calls only", "Message broker for asynchronous communication", "Shared database", "File system"], answer: 1, difficulty: "medium", category: "system", topic: "Microservices" },
  { q: "Each microservice should have?", options: ["Shared database", "Own database (database per service)", "No database", "Central database"], answer: 1, difficulty: "medium", category: "system", topic: "Microservices" },
  { q: "Containerization (Docker) helps microservices by?", options: ["Making code faster", "Consistent deployment and isolation", "Reducing code", "Removing bugs"], answer: 1, difficulty: "easy", category: "system", topic: "Microservices" },
  { q: "Kubernetes orchestrates?", options: ["Code deployment", "Container lifecycle, scaling, networking", "Database queries", "Frontend only"], answer: 1, difficulty: "medium", category: "system", topic: "Microservices" },
  { q: "Monolith to microservices — strangler fig pattern?", options: ["Rewrite everything at once", "Gradually replace parts of monolith with services", "Delete monolith", "Keep both forever"], answer: 1, difficulty: "hard", category: "system", topic: "Microservices" },

  // Authentication & Security (10)
  { q: "JWT stands for?", options: ["Java Web Token", "JSON Web Token", "JavaScript Web Transfer", "Just Works Technology"], answer: 1, difficulty: "easy", category: "system", topic: "Auth & Security" },
  { q: "OAuth 2.0 is for?", options: ["Encryption", "Delegated authorization", "Database access", "File storage"], answer: 1, difficulty: "easy", category: "system", topic: "Auth & Security" },
  { q: "Hashing passwords — bcrypt advantage?", options: ["Reversible", "Intentionally slow + salt", "Fast", "No salt needed"], answer: 1, difficulty: "medium", category: "system", topic: "Auth & Security" },
  { q: "HTTPS encrypts data using?", options: ["Hashing", "TLS/SSL", "Base64", "Nothing"], answer: 1, difficulty: "easy", category: "system", topic: "Auth & Security" },
  { q: "SQL injection is prevented by?", options: ["Longer queries", "Parameterized queries/prepared statements", "More indexes", "Larger database"], answer: 1, difficulty: "easy", category: "system", topic: "Auth & Security" },
  { q: "XSS attack targets?", options: ["Database", "Users' browsers via injected scripts", "Server hardware", "Network"], answer: 1, difficulty: "medium", category: "system", topic: "Auth & Security" },
  { q: "CSRF protection uses?", options: ["Longer passwords", "Anti-CSRF tokens", "More encryption", "IP blocking"], answer: 1, difficulty: "medium", category: "system", topic: "Auth & Security" },
  { q: "Session vs Token authentication?", options: ["Same", "Session: server-side state, Token: stateless (JWT)", "Token needs database", "Session is stateless"], answer: 1, difficulty: "medium", category: "system", topic: "Auth & Security" },
  { q: "Principle of least privilege means?", options: ["No access", "Give minimum required permissions", "Full admin access", "Random access"], answer: 1, difficulty: "easy", category: "system", topic: "Auth & Security" },
  { q: "DDoS mitigation strategies?", options: ["Bigger server only", "CDN, rate limiting, WAF, auto-scaling", "Ignore", "Block all traffic"], answer: 1, difficulty: "hard", category: "system", topic: "Auth & Security" },

  // LRU Cache Design (10)
  { q: "LRU Cache evicts?", options: ["Most recently used", "Least recently used", "Random", "Oldest by timestamp"], answer: 1, difficulty: "easy", category: "system", topic: "LRU Cache" },
  { q: "LRU Cache data structures?", options: ["Array only", "Doubly linked list + hash map", "Stack", "Queue"], answer: 1, difficulty: "medium", category: "system", topic: "LRU Cache" },
  { q: "Get operation in LRU cache?", options: ["O(n)", "O(1)", "O(log n)", "O(n²)"], answer: 1, difficulty: "medium", category: "system", topic: "LRU Cache" },
  { q: "Put operation in LRU cache?", options: ["O(n)", "O(1)", "O(log n)", "O(n²)"], answer: 1, difficulty: "medium", category: "system", topic: "LRU Cache" },
  { q: "When cache is full, LRU removes?", options: ["First inserted", "Last accessed", "Least recently accessed", "Random"], answer: 2, difficulty: "easy", category: "system", topic: "LRU Cache" },
  { q: "Why doubly linked list for LRU?", options: ["Sorting", "O(1) removal from middle", "Less memory", "Faster search"], answer: 1, difficulty: "hard", category: "system", topic: "LRU Cache" },
  { q: "LRU vs LFU?", options: ["Same", "LRU: recency-based, LFU: frequency-based", "LFU is always better", "LRU uses more memory"], answer: 1, difficulty: "medium", category: "system", topic: "LRU Cache" },
  { q: "Distributed LRU cache challenge?", options: ["None", "Keeping eviction consistent across nodes", "Too fast", "No use case"], answer: 1, difficulty: "hard", category: "system", topic: "LRU Cache" },
  { q: "Thread-safe LRU cache needs?", options: ["Nothing extra", "Locks/mutexes or concurrent data structures", "Bigger cache", "More nodes"], answer: 1, difficulty: "hard", category: "system", topic: "LRU Cache" },
  { q: "Real-world LRU cache usage?", options: ["Nowhere", "Browser cache, database buffer pool, CDN", "Only academic", "Only Redis"], answer: 1, difficulty: "easy", category: "system", topic: "LRU Cache" },
];

// ─── Combined question bank ───
export const questionBank: Record<string, Question[]> = {
  aptitude: aptitudeQuestions,
  dsa: dsaQuestions,
  mock: mockQuestions,
  sql: sqlQuestions,
  system: systemDesignQuestions,
};

// Company-specific question tags
export const companyQuestions: Record<string, { categories: string[]; difficulty: string; description: string }> = {
  "TCS": { categories: ["aptitude", "dsa"], difficulty: "easy-medium", description: "NQT-style aptitude + basic coding" },
  "Infosys": { categories: ["aptitude", "dsa"], difficulty: "easy-medium", description: "InfyTQ-style logical + programming" },
  "Wipro": { categories: ["aptitude", "mock"], difficulty: "easy", description: "NLTH aptitude + soft skills" },
  "Google": { categories: ["dsa", "system"], difficulty: "hard", description: "Advanced DSA + System Design" },
  "Amazon": { categories: ["dsa", "mock"], difficulty: "medium-hard", description: "Leadership principles + DSA" },
  "Microsoft": { categories: ["dsa", "system"], difficulty: "medium-hard", description: "DSA + Problem solving" },
};

export const topicOptions: Record<string, string[]> = {
  aptitude: [
    "All Topics", "Speed & Distance", "Percentages", "Time & Work", "Algebra",
    "Probability", "Ratios", "Geometry", "Patterns", "Averages",
    "Permutations", "Profit & Loss", "Simple Interest", "Logical Reasoning",
    "Data Interpretation", "Number Systems", "Clocks & Calendars",
    "Coding-Decoding", "Blood Relations", "Direction Sense",
    "Seating Arrangement", "Mixtures",
  ],
  dsa: [
    "All Topics", "Arrays", "Strings", "Linked Lists", "Stacks & Queues",
    "Trees", "Graphs", "Hashing", "Sorting", "Dynamic Programming",
    "Recursion", "Heaps", "Tries", "Greedy", "Bit Manipulation", "Binary Search",
  ],
  mock: [
    "All Topics", "Tell Me About Yourself", "Strengths & Weaknesses", "STAR Method",
    "Why This Company", "Salary & Negotiation", "Future Goals", "Teamwork",
    "Technical Tips", "Body Language", "HR Round",
  ],
  sql: [
    "All Topics", "JOINs", "Subqueries", "Aggregations", "Window Functions",
    "Indexes", "DDL & Schema", "DML Basics", "Views & CTEs", "Transactions",
  ],
  system: [
    "All Topics", "Scalability", "Caching", "CAP Theorem", "URL Shortener",
    "Message Queue", "API Design", "Database Design", "Microservices",
    "Auth & Security", "LRU Cache",
  ],
};

// Track recently-shown questions per category to avoid repetition across sessions
const RECENT_KEY = "practice_recent_qs";
function getRecent(): Record<string, string[]> {
  try { return JSON.parse(sessionStorage.getItem(RECENT_KEY) || "{}"); } catch { return {}; }
}
function pushRecent(category: string, qs: string[]) {
  try {
    const all = getRecent();
    const existing = all[category] || [];
    all[category] = [...qs, ...existing].slice(0, 30); // keep last 30
    sessionStorage.setItem(RECENT_KEY, JSON.stringify(all));
  } catch {
    // Ignore storage quota limits
  }
}

// Fisher-Yates Shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Shuffles options and adapts correct answer index
function shuffleOptions(question: Question): Question {
  const options = [...question.options];
  const correctOptionText = options[question.answer];
  
  // Shuffle options using Fisher-Yates
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  
  const newAnswerIndex = options.indexOf(correctOptionText);
  return {
    ...question,
    options,
    answer: newAnswerIndex !== -1 ? newAnswerIndex : question.answer
  };
}

export function generateQuizQuestions(
  category: string,
  count: number = 10,
  topic?: string,
  company?: string,
): Question[] {
  let pool = questionBank[category] || questionBank.aptitude;

  if (topic && topic !== "All Topics") {
    const filtered = pool.filter((q) => q.topic === topic);
    if (filtered.length > 0) pool = filtered;
  }

  if (company && companyQuestions[company]) {
    const companyDifficulty = companyQuestions[company].difficulty;
    if (companyDifficulty === "easy") pool = pool.filter((q) => q.difficulty === "easy");
    else if (companyDifficulty === "easy-medium") pool = pool.filter((q) => q.difficulty !== "hard");
    else if (companyDifficulty === "hard") pool = pool.filter((q) => q.difficulty === "hard" || q.difficulty === "medium");
    else if (companyDifficulty === "medium-hard") pool = pool.filter((q) => q.difficulty !== "easy");
  }

  if (pool.length === 0) pool = questionBank[category] || questionBank.aptitude;

  // Push recently-seen questions to the back so each session feels fresh
  const recent = new Set((getRecent()[category] || []));
  const fresh = pool.filter((q) => !recent.has(q.q));
  const stale = pool.filter((q) => recent.has(q.q));
  
  // Shuffle both lists using robust Fisher-Yates
  const ordered = [
    ...shuffleArray(fresh),
    ...shuffleArray(stale),
  ];

  const result: Question[] = [];
  for (let i = 0; result.length < count && i < ordered.length * 2; i++) {
    // Shuffle the options of the selected question so they aren't static
    result.push(shuffleOptions(ordered[i % ordered.length]));
  }

  const order = { easy: 0, medium: 1, hard: 2 };
  result.sort((a, b) => order[a.difficulty] - order[b.difficulty]);

  pushRecent(category, result.map((q) => q.q));
  return result;
}

export async function generateQuizQuestionsViaGemini(
  category: string,
  topic: string,
  apiKey: string,
  count: number = 10
): Promise<Question[]> {
  const prompt = `Generate exactly ${count} unique, high-quality multiple-choice questions for the quiz topic "${topic}" under the category "${category}".
Each question must test conceptual understanding or practical knowledge of "${topic}".
Each question must have exactly 4 options and 1 correct answer (0-indexed index in the options array).
Vary the difficulty of questions among easy, medium, and hard.

Return ONLY a valid JSON array matching this TypeScript structure:
interface Question {
  q: string;
  options: string[];
  answer: number;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  topic: string;
}

Ensure the output is clean JSON. Do NOT wrap it in markdown code blocks or add any comments or text. Just return the raw JSON array.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textResponse) {
    throw new Error("Empty response from Gemini");
  }

  // Parse JSON
  let cleaned = textResponse.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.substring(7);
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.substring(0, cleaned.length - 3);
  }
  cleaned = cleaned.trim();

  const parsed = JSON.parse(cleaned) as Question[];
  if (!Array.isArray(parsed)) {
    throw new Error("Invalid response format: not an array");
  }

  // Validate questions schema and sanitize
  return parsed.map((q, idx) => ({
    q: q.q || `Practice Question ${idx + 1}`,
    options: Array.isArray(q.options) && q.options.length === 4 ? q.options : ["A", "B", "C", "D"],
    answer: typeof q.answer === "number" && q.answer >= 0 && q.answer <= 3 ? q.answer : 0,
    difficulty: q.difficulty === "easy" || q.difficulty === "medium" || q.difficulty === "hard" ? q.difficulty : "medium",
    category,
    topic
  }));
}

export function getTimerForDifficulty(difficulty: "easy" | "medium" | "hard"): number {
  switch (difficulty) {
    case "easy": return 45;
    case "medium": return 90;
    case "hard": return 120;
  }
}
