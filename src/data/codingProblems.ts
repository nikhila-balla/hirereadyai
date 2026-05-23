export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  topicId: string;
  description: string;
  constraints: string[];
  examples: TestCase[];
  hiddenTests: TestCase[];
  starterCode: Record<string, string>;
  xpReward: number;
}

export interface CodingTopic {
  id: string;
  title: string;
  level: "basic" | "intermediate" | "advanced";
  description: string;
  problemCount: number;
}

export const languageOptions = [
  { id: "python", label: "Python", pistonLang: "python", version: "3.10.0" },
  { id: "cpp", label: "C++", pistonLang: "c++", version: "10.2.0" },
  { id: "c", label: "C", pistonLang: "c", version: "10.2.0" },
  { id: "java", label: "Java", pistonLang: "java", version: "15.0.2" },
] as const;

export type LanguageId = typeof languageOptions[number]["id"];

const monacoLangMap: Record<LanguageId, string> = {
  python: "python",
  cpp: "cpp",
  c: "c",
  java: "java",
};

export function getMonacoLanguage(lang: LanguageId): string {
  return monacoLangMap[lang];
}

// ═══════════════════════════════════════
// 50 CODING TOPICS (Basic → Advanced)
// ═══════════════════════════════════════

export const codingTopics: CodingTopic[] = [
  // ── BASIC (15) ──
  { id: "arrays-basics", title: "Arrays Basics", level: "basic", description: "Fundamentals of array manipulation, traversal, and basic operations", problemCount: 3 },
  { id: "strings-manipulation", title: "Strings Manipulation", level: "basic", description: "String reversal, palindromes, and character operations", problemCount: 3 },
  { id: "sorting-intro", title: "Sorting Intro", level: "basic", description: "Bubble sort, insertion sort fundamentals", problemCount: 2 },
  { id: "linear-search", title: "Linear Search", level: "basic", description: "Sequential search and element finding", problemCount: 2 },
  { id: "recursion-basics", title: "Recursion Basics", level: "basic", description: "Factorial, Fibonacci, and recursive thinking", problemCount: 3 },
  { id: "stack-operations", title: "Stack Operations", level: "basic", description: "Push, pop, peek and stack-based problems", problemCount: 3 },
  { id: "queue-operations", title: "Queue Operations", level: "basic", description: "Enqueue, dequeue, and circular queue", problemCount: 2 },
  { id: "linked-list-intro", title: "Linked List Intro", level: "basic", description: "Singly linked list traversal and insertion", problemCount: 2 },
  { id: "hash-map-basics", title: "Hash Map Basics", level: "basic", description: "Frequency counting and key-value lookups", problemCount: 3 },
  { id: "math-problems", title: "Math Problems", level: "basic", description: "GCD, LCM, prime checking, and basic math", problemCount: 2 },
  { id: "pattern-printing", title: "Pattern Printing", level: "basic", description: "Star patterns, number pyramids, and diamond shapes", problemCount: 2 },
  { id: "number-series", title: "Number Series", level: "basic", description: "Fibonacci, Armstrong, and special number sequences", problemCount: 2 },
  { id: "simple-bit-ops", title: "Simple Bit Operations", level: "basic", description: "AND, OR, XOR, and basic bit manipulation", problemCount: 2 },
  { id: "greedy-choice", title: "Greedy Choice", level: "basic", description: "Activity selection and coin change basics", problemCount: 2 },
  { id: "two-pointer-basics", title: "Two Pointer Basics", level: "basic", description: "Two pointer technique for sorted arrays", problemCount: 3 },

  // ── INTERMEDIATE (20) ──
  { id: "advanced-arrays", title: "Advanced Arrays", level: "intermediate", description: "Kadane's, prefix sums, and subarray problems", problemCount: 3 },
  { id: "string-algorithms", title: "String Algorithms", level: "intermediate", description: "Anagram detection, substring search, and pattern matching", problemCount: 3 },
  { id: "binary-search", title: "Binary Search", level: "intermediate", description: "Binary search and its variations", problemCount: 3 },
  { id: "quicksort-mergesort", title: "Quick Sort / Merge Sort", level: "intermediate", description: "Divide and conquer sorting algorithms", problemCount: 2 },
  { id: "backtracking-basics", title: "Backtracking Basics", level: "intermediate", description: "Permutations, combinations, and subset generation", problemCount: 3 },
  { id: "tree-traversal", title: "Tree Traversal", level: "intermediate", description: "Inorder, preorder, postorder, and level-order", problemCount: 3 },
  { id: "graph-bfs-dfs", title: "Graph BFS/DFS", level: "intermediate", description: "Breadth-first and depth-first graph traversal", problemCount: 3 },
  { id: "hashing-advanced", title: "Hashing Advanced", level: "intermediate", description: "Group anagrams, two-sum variations, and collisions", problemCount: 3 },
  { id: "sliding-window", title: "Sliding Window", level: "intermediate", description: "Fixed and variable size sliding window problems", problemCount: 3 },
  { id: "matrix-problems", title: "Matrix Problems", level: "intermediate", description: "Matrix rotation, spiral order, and search", problemCount: 2 },
  { id: "recursion-patterns", title: "Recursion Patterns", level: "intermediate", description: "Tower of Hanoi, power set, and divide & conquer", problemCount: 2 },
  { id: "dp-1d", title: "DP 1D", level: "intermediate", description: "Climbing stairs, house robber, and coin change", problemCount: 3 },
  { id: "greedy-advanced", title: "Greedy Advanced", level: "intermediate", description: "Job scheduling, fractional knapsack, Huffman coding", problemCount: 2 },
  { id: "heap-basics", title: "Heap Basics", level: "intermediate", description: "Min/max heap, priority queue, and top-K elements", problemCount: 3 },
  { id: "linked-list-medium", title: "Linked List Medium", level: "intermediate", description: "Cycle detection, merge sorted lists, and reversal", problemCount: 3 },
  { id: "stack-applications", title: "Stack Applications", level: "intermediate", description: "Next greater element, stock span, and histogram", problemCount: 2 },
  { id: "queue-applications", title: "Queue Applications", level: "intermediate", description: "BFS applications, sliding window maximum", problemCount: 2 },
  { id: "number-theory-med", title: "Number Theory Medium", level: "intermediate", description: "Sieve of Eratosthenes, modular arithmetic", problemCount: 2 },
  { id: "bit-manipulation-med", title: "Bit Manipulation Medium", level: "intermediate", description: "Count set bits, power of two, single number", problemCount: 2 },
  { id: "math-medium", title: "Math Medium", level: "intermediate", description: "Matrix exponentiation, combinatorics basics", problemCount: 2 },

  // ── ADVANCED (15) ──
  { id: "dp-2d", title: "Dynamic Programming 2D", level: "advanced", description: "LCS, edit distance, and grid DP problems", problemCount: 3 },
  { id: "trees-advanced", title: "Trees Advanced (BST)", level: "advanced", description: "BST operations, LCA, and tree diameter", problemCount: 3 },
  { id: "graphs-advanced", title: "Graphs Advanced", level: "advanced", description: "Dijkstra, Bellman-Ford, and shortest paths", problemCount: 2 },
  { id: "tries", title: "Tries", level: "advanced", description: "Prefix tree implementation and word search", problemCount: 2 },
  { id: "segment-tree", title: "Segment Tree", level: "advanced", description: "Range queries and lazy propagation", problemCount: 2 },
  { id: "fenwick-tree", title: "Fenwick Tree", level: "advanced", description: "Binary indexed tree for prefix sums", problemCount: 2 },
  { id: "advanced-backtracking", title: "Advanced Backtracking", level: "advanced", description: "N-Queens, Sudoku solver, and word break", problemCount: 3 },
  { id: "bit-manipulation-hard", title: "Bit Manipulation Hard", level: "advanced", description: "Subset XOR, maximum AND, bit DP", problemCount: 2 },
  { id: "string-hard", title: "String Hard (KMP)", level: "advanced", description: "KMP, Rabin-Karp, and Z-algorithm", problemCount: 2 },
  { id: "matrix-advanced", title: "Matrix Advanced", level: "advanced", description: "Matrix chain multiplication, maximal rectangle", problemCount: 2 },
  { id: "union-find", title: "Union Find", level: "advanced", description: "Disjoint set union with path compression", problemCount: 2 },
  { id: "advanced-greedy", title: "Advanced Greedy", level: "advanced", description: "Interval scheduling, task assignment optimization", problemCount: 2 },
  { id: "advanced-sorting", title: "Advanced Sorting", level: "advanced", description: "Counting sort, radix sort, and custom comparators", problemCount: 2 },
  { id: "advanced-math", title: "Advanced Math", level: "advanced", description: "FFT basics, number theory, modular inverse", problemCount: 2 },
  { id: "system-design-mini", title: "System Design Mini", level: "advanced", description: "LRU Cache, rate limiter, and hash map design", problemCount: 3 },
];

export const levelFilters = ["All", "Basic", "Intermediate", "Advanced"] as const;

export function getTopicsFiltered(level?: string, search?: string): CodingTopic[] {
  let result = [...codingTopics];
  if (level && level !== "All") {
    result = result.filter(t => t.level === level.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(t => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
  }
  return result;
}

// Helper to make starter code
function py(code: string) { return code; }
function cpp(code: string) { return code; }
function c(code: string) { return code; }
function java(code: string) { return code; }

function defaultStarter(lang: string): string {
  const map: Record<string, string> = {
    python: `# Read input and solve\nimport sys\n\ndef solve():\n    # Your code here\n    pass\n\nsolve()`,
    cpp: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}`,
    c: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    // Your code here\n    return 0;\n}`,
    java: `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Your code here\n    }\n}`,
  };
  return map[lang] || "";
}

function makeStarter(pyCode: string): Record<string, string> {
  return {
    python: pyCode,
    cpp: defaultStarter("cpp"),
    c: defaultStarter("c"),
    java: defaultStarter("java"),
  };
}

// ═══════════════════════════════════════
// ALL CODING PROBLEMS (organized by topic)
// ═══════════════════════════════════════

export const codingProblems: CodingProblem[] = [
  // ──────────────────────────────────────
  // BASIC TOPICS
  // ──────────────────────────────────────

  // === Arrays Basics ===
  {
    id: "two-sum", title: "Two Sum", difficulty: "easy", category: "Arrays", topicId: "arrays-basics",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.",
    constraints: ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹", "Only one valid answer exists"],
    examples: [
      { input: "[2,7,11,15]\n9", expectedOutput: "[0,1]" },
      { input: "[3,2,4]\n6", expectedOutput: "[1,2]" },
      { input: "[3,3]\n6", expectedOutput: "[0,1]" },
    ],
    hiddenTests: [
      { input: "[1,5,3,7]\n8", expectedOutput: "[1,3]", isHidden: true },
      { input: "[0,4,3,0]\n0", expectedOutput: "[0,3]", isHidden: true },
    ],
    starterCode: {
      python: `def two_sum(nums, target):\n    # Your code here\n    pass\n\nnums = list(map(int, input().strip('[]').split(',')))\ntarget = int(input())\nprint(two_sum(nums, target))`,
      cpp: defaultStarter("cpp"), c: defaultStarter("c"), java: defaultStarter("java"),
    },
    xpReward: 50,
  },
  {
    id: "max-element", title: "Find Maximum Element", difficulty: "easy", category: "Arrays", topicId: "arrays-basics",
    description: "Given an array of integers, find and print the maximum element.",
    constraints: ["1 ≤ n ≤ 10⁵", "-10⁹ ≤ arr[i] ≤ 10⁹"],
    examples: [
      { input: "3 1 4 1 5 9 2 6", expectedOutput: "9" },
      { input: "-1 -5 -3", expectedOutput: "-1" },
    ],
    hiddenTests: [
      { input: "42", expectedOutput: "42", isHidden: true },
      { input: "0 0 0 1 0", expectedOutput: "1", isHidden: true },
    ],
    starterCode: makeStarter(`nums = list(map(int, input().split()))\n# Find and print the maximum\nprint(max(nums))  # Replace with your logic`),
    xpReward: 30,
  },
  {
    id: "merge-sorted-array", title: "Merge Sorted Array", difficulty: "easy", category: "Arrays", topicId: "arrays-basics",
    description: "You are given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order. Merge `nums2` into `nums1` as one sorted array. Print the merged array.",
    constraints: ["nums1.length == m + n", "nums2.length == n", "0 ≤ m, n ≤ 200"],
    examples: [
      { input: "1 2 3 0 0 0\n3\n2 5 6\n3", expectedOutput: "1 2 2 3 5 6" },
      { input: "1\n1\n\n0", expectedOutput: "1" },
    ],
    hiddenTests: [{ input: "0\n0\n1\n1", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`nums1 = list(map(int, input().split())) if True else []\nm = int(input())\nline = input().strip()\nnums2 = list(map(int, line.split())) if line else []\nn = int(input())\n# Merge and print\nresult = sorted(nums1[:m] + nums2[:n])\nprint(' '.join(map(str, result)))`),
    xpReward: 50,
  },

  // === Strings Manipulation ===
  {
    id: "reverse-string", title: "Reverse String", difficulty: "easy", category: "Strings", topicId: "strings-manipulation",
    description: "Write a function that reverses a string in-place.",
    constraints: ["1 ≤ s.length ≤ 10⁵"],
    examples: [
      { input: "hello", expectedOutput: "olleh" },
      { input: "Hannah", expectedOutput: "hannaH" },
    ],
    hiddenTests: [
      { input: "a", expectedOutput: "a", isHidden: true },
      { input: "ab", expectedOutput: "ba", isHidden: true },
    ],
    starterCode: makeStarter(`s = list(input())\n# Reverse in-place\ns.reverse()\nprint(''.join(s))`),
    xpReward: 30,
  },
  {
    id: "palindrome-check", title: "Palindrome Check", difficulty: "easy", category: "Strings", topicId: "strings-manipulation",
    description: "Given a string, check if it is a palindrome (reads the same forwards and backwards). Ignore case.",
    constraints: ["1 ≤ s.length ≤ 10⁵", "s consists of alphanumeric characters"],
    examples: [
      { input: "racecar", expectedOutput: "true" },
      { input: "hello", expectedOutput: "false" },
      { input: "MadAm", expectedOutput: "true" },
    ],
    hiddenTests: [
      { input: "a", expectedOutput: "true", isHidden: true },
      { input: "ab", expectedOutput: "false", isHidden: true },
    ],
    starterCode: makeStarter(`s = input().strip().lower()\n# Check palindrome\nprint("true" if s == s[::-1] else "false")`),
    xpReward: 30,
  },
  {
    id: "count-vowels", title: "Count Vowels & Consonants", difficulty: "easy", category: "Strings", topicId: "strings-manipulation",
    description: "Given a string, count the number of vowels and consonants (ignore non-alphabetic characters). Print as `vowels consonants`.",
    constraints: ["1 ≤ s.length ≤ 10⁴"],
    examples: [
      { input: "hello world", expectedOutput: "3 7" },
      { input: "aeiou", expectedOutput: "5 0" },
    ],
    hiddenTests: [
      { input: "xyz", expectedOutput: "0 3", isHidden: true },
    ],
    starterCode: makeStarter(`s = input().strip().lower()\nvowels = sum(1 for c in s if c in 'aeiou')\nconsonants = sum(1 for c in s if c.isalpha() and c not in 'aeiou')\nprint(vowels, consonants)`),
    xpReward: 30,
  },

  // === Sorting Intro ===
  {
    id: "bubble-sort", title: "Bubble Sort", difficulty: "easy", category: "Sorting", topicId: "sorting-intro",
    description: "Implement bubble sort to sort an array of integers in ascending order. Print the sorted array.",
    constraints: ["1 ≤ n ≤ 1000"],
    examples: [
      { input: "5 3 8 1 2", expectedOutput: "1 2 3 5 8" },
      { input: "1", expectedOutput: "1" },
    ],
    hiddenTests: [{ input: "3 2 1", expectedOutput: "1 2 3", isHidden: true }],
    starterCode: makeStarter(`arr = list(map(int, input().split()))\n# Implement bubble sort\nfor i in range(len(arr)):\n    for j in range(len(arr)-i-1):\n        if arr[j] > arr[j+1]:\n            arr[j], arr[j+1] = arr[j+1], arr[j]\nprint(' '.join(map(str, arr)))`),
    xpReward: 40,
  },
  {
    id: "insertion-sort", title: "Insertion Sort", difficulty: "easy", category: "Sorting", topicId: "sorting-intro",
    description: "Implement insertion sort to sort an array of integers in ascending order.",
    constraints: ["1 ≤ n ≤ 1000"],
    examples: [
      { input: "12 11 13 5 6", expectedOutput: "5 6 11 12 13" },
    ],
    hiddenTests: [{ input: "1 2 3", expectedOutput: "1 2 3", isHidden: true }],
    starterCode: makeStarter(`arr = list(map(int, input().split()))\n# Implement insertion sort\nfor i in range(1, len(arr)):\n    key = arr[i]\n    j = i - 1\n    while j >= 0 and arr[j] > key:\n        arr[j+1] = arr[j]\n        j -= 1\n    arr[j+1] = key\nprint(' '.join(map(str, arr)))`),
    xpReward: 40,
  },

  // === Linear Search ===
  {
    id: "linear-search-find", title: "Find Element Index", difficulty: "easy", category: "Search", topicId: "linear-search",
    description: "Given an array and a target, find the index of the target using linear search. Print -1 if not found.",
    constraints: ["1 ≤ n ≤ 10⁵"],
    examples: [
      { input: "1 3 5 7 9\n5", expectedOutput: "2" },
      { input: "2 4 6\n5", expectedOutput: "-1" },
    ],
    hiddenTests: [{ input: "1\n1", expectedOutput: "0", isHidden: true }],
    starterCode: makeStarter(`arr = list(map(int, input().split()))\ntarget = int(input())\n# Linear search\nresult = -1\nfor i, x in enumerate(arr):\n    if x == target:\n        result = i\n        break\nprint(result)`),
    xpReward: 30,
  },
  {
    id: "count-occurrences", title: "Count Occurrences", difficulty: "easy", category: "Search", topicId: "linear-search",
    description: "Count how many times a target appears in the array.",
    constraints: ["1 ≤ n ≤ 10⁵"],
    examples: [
      { input: "1 2 3 2 2 4\n2", expectedOutput: "3" },
      { input: "1 1 1\n1", expectedOutput: "3" },
    ],
    hiddenTests: [{ input: "5\n3", expectedOutput: "0", isHidden: true }],
    starterCode: makeStarter(`arr = list(map(int, input().split()))\ntarget = int(input())\nprint(arr.count(target))`),
    xpReward: 30,
  },

  // === Recursion Basics ===
  {
    id: "factorial", title: "Factorial", difficulty: "easy", category: "Recursion", topicId: "recursion-basics",
    description: "Compute the factorial of n using recursion.",
    constraints: ["0 ≤ n ≤ 20"],
    examples: [
      { input: "5", expectedOutput: "120" },
      { input: "0", expectedOutput: "1" },
      { input: "10", expectedOutput: "3628800" },
    ],
    hiddenTests: [{ input: "1", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`def factorial(n):\n    if n <= 1: return 1\n    return n * factorial(n-1)\n\nprint(factorial(int(input())))`),
    xpReward: 30,
  },
  {
    id: "fibonacci", title: "Fibonacci Number", difficulty: "easy", category: "Recursion", topicId: "recursion-basics",
    description: "Find the nth Fibonacci number (0-indexed). F(0)=0, F(1)=1.",
    constraints: ["0 ≤ n ≤ 30"],
    examples: [
      { input: "6", expectedOutput: "8" },
      { input: "0", expectedOutput: "0" },
      { input: "1", expectedOutput: "1" },
    ],
    hiddenTests: [{ input: "10", expectedOutput: "55", isHidden: true }],
    starterCode: makeStarter(`def fib(n):\n    if n <= 1: return n\n    return fib(n-1) + fib(n-2)\n\nprint(fib(int(input())))`),
    xpReward: 30,
  },
  {
    id: "sum-of-digits", title: "Sum of Digits", difficulty: "easy", category: "Recursion", topicId: "recursion-basics",
    description: "Find the sum of digits of a number using recursion.",
    constraints: ["0 ≤ n ≤ 10⁹"],
    examples: [
      { input: "12345", expectedOutput: "15" },
      { input: "0", expectedOutput: "0" },
    ],
    hiddenTests: [{ input: "999", expectedOutput: "27", isHidden: true }],
    starterCode: makeStarter(`def sum_digits(n):\n    if n == 0: return 0\n    return n % 10 + sum_digits(n // 10)\n\nprint(sum_digits(int(input())))`),
    xpReward: 30,
  },

  // === Stack Operations ===
  {
    id: "valid-parentheses", title: "Valid Parentheses", difficulty: "easy", category: "Stacks", topicId: "stack-operations",
    description: "Given a string containing just `(){}[]`, determine if the input string is valid.",
    constraints: ["1 ≤ s.length ≤ 10⁴"],
    examples: [
      { input: "()", expectedOutput: "true" },
      { input: "()[]{}", expectedOutput: "true" },
      { input: "(]", expectedOutput: "false" },
    ],
    hiddenTests: [
      { input: "((()))", expectedOutput: "true", isHidden: true },
      { input: "({[)]}", expectedOutput: "false", isHidden: true },
    ],
    starterCode: makeStarter(`def is_valid(s):\n    stack = []\n    pairs = {')':'(','}':'{',']':'['}\n    for c in s:\n        if c in pairs:\n            if not stack or stack[-1] != pairs[c]: return False\n            stack.pop()\n        else:\n            stack.append(c)\n    return len(stack) == 0\n\nprint(str(is_valid(input())).lower())`),
    xpReward: 50,
  },
  {
    id: "min-stack", title: "Min Stack", difficulty: "easy", category: "Stacks", topicId: "stack-operations",
    description: "Design a stack that supports push, pop, top, and retrieving the minimum element in O(1). Process operations and print results of getMin and top.",
    constraints: ["1 ≤ operations ≤ 3×10⁴"],
    examples: [
      { input: "push -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin", expectedOutput: "-3\n0\n-2" },
    ],
    hiddenTests: [
      { input: "push 1\npush 2\ngetMin\npop\ngetMin", expectedOutput: "1\n1", isHidden: true },
    ],
    starterCode: makeStarter(`import sys\nstack = []\nmin_stack = []\nfor line in sys.stdin:\n    parts = line.strip().split()\n    if parts[0] == 'push':\n        val = int(parts[1])\n        stack.append(val)\n        min_stack.append(min(val, min_stack[-1] if min_stack else val))\n    elif parts[0] == 'pop':\n        stack.pop(); min_stack.pop()\n    elif parts[0] == 'top':\n        print(stack[-1])\n    elif parts[0] == 'getMin':\n        print(min_stack[-1])`),
    xpReward: 50,
  },
  {
    id: "reverse-stack", title: "Reverse Stack Using Recursion", difficulty: "easy", category: "Stacks", topicId: "stack-operations",
    description: "Given a list of integers representing a stack, reverse it using recursion and print the result.",
    constraints: ["1 ≤ n ≤ 1000"],
    examples: [
      { input: "1 2 3 4 5", expectedOutput: "5 4 3 2 1" },
    ],
    hiddenTests: [{ input: "1", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`arr = list(map(int, input().split()))\narr.reverse()\nprint(' '.join(map(str, arr)))`),
    xpReward: 30,
  },

  // === Queue Operations ===
  {
    id: "queue-using-stacks", title: "Queue Using Two Stacks", difficulty: "easy", category: "Queue", topicId: "queue-operations",
    description: "Implement a queue using two stacks. Process enqueue/dequeue/peek operations.",
    constraints: ["1 ≤ operations ≤ 10⁴"],
    examples: [
      { input: "enqueue 1\nenqueue 2\npeek\ndequeue\npeek", expectedOutput: "1\n2" },
    ],
    hiddenTests: [{ input: "enqueue 5\ndequeue\nenqueue 3\npeek", expectedOutput: "3", isHidden: true }],
    starterCode: makeStarter(`import sys\ns1, s2 = [], []\nfor line in sys.stdin:\n    parts = line.strip().split()\n    if parts[0] == 'enqueue':\n        s1.append(int(parts[1]))\n    elif parts[0] == 'dequeue':\n        if not s2:\n            while s1: s2.append(s1.pop())\n        s2.pop()\n    elif parts[0] == 'peek':\n        if not s2:\n            while s1: s2.append(s1.pop())\n        print(s2[-1])`),
    xpReward: 50,
  },
  {
    id: "circular-queue", title: "Circular Queue", difficulty: "easy", category: "Queue", topicId: "queue-operations",
    description: "Implement a circular queue with fixed size. Process operations and print results.",
    constraints: ["1 ≤ k ≤ 1000"],
    examples: [
      { input: "3\nenqueue 1\nenqueue 2\nenqueue 3\nenqueue 4\ndequeue\nenqueue 4\npeek", expectedOutput: "false\n2" },
    ],
    hiddenTests: [{ input: "1\nenqueue 5\npeek\ndequeue\nenqueue 3\npeek", expectedOutput: "5\n3", isHidden: true }],
    starterCode: makeStarter(`import sys\nlines = sys.stdin.read().strip().split('\\n')\nk = int(lines[0])\nq = []\nfor line in lines[1:]:\n    parts = line.strip().split()\n    if parts[0] == 'enqueue':\n        if len(q) >= k:\n            print("false")\n        else:\n            q.append(int(parts[1]))\n    elif parts[0] == 'dequeue':\n        if q: q.pop(0)\n    elif parts[0] == 'peek':\n        if q: print(q[0])`),
    xpReward: 40,
  },

  // === Linked List Intro ===
  {
    id: "reverse-linked-list", title: "Reverse a List", difficulty: "easy", category: "Linked List", topicId: "linked-list-intro",
    description: "Given a space-separated list of integers, reverse the list and print it.",
    constraints: ["1 ≤ n ≤ 10⁵"],
    examples: [
      { input: "1 2 3 4 5", expectedOutput: "5 4 3 2 1" },
    ],
    hiddenTests: [{ input: "1", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`arr = list(map(int, input().split()))\narr.reverse()\nprint(' '.join(map(str, arr)))`),
    xpReward: 40,
  },
  {
    id: "middle-element", title: "Find Middle Element", difficulty: "easy", category: "Linked List", topicId: "linked-list-intro",
    description: "Given a list, find and print the middle element. If even length, print the second middle.",
    constraints: ["1 ≤ n ≤ 10⁵"],
    examples: [
      { input: "1 2 3 4 5", expectedOutput: "3" },
      { input: "1 2 3 4", expectedOutput: "3" },
    ],
    hiddenTests: [{ input: "1", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`arr = list(map(int, input().split()))\nprint(arr[len(arr)//2])`),
    xpReward: 30,
  },

  // === Hash Map Basics ===
  {
    id: "frequency-count", title: "Frequency Count", difficulty: "easy", category: "Hash Map", topicId: "hash-map-basics",
    description: "Given an array, print each unique element and its frequency, sorted by first appearance.",
    constraints: ["1 ≤ n ≤ 10⁵"],
    examples: [
      { input: "1 2 2 3 3 3", expectedOutput: "1 1\n2 2\n3 3" },
    ],
    hiddenTests: [{ input: "5 5 5", expectedOutput: "5 3", isHidden: true }],
    starterCode: makeStarter(`from collections import Counter, OrderedDict\narr = list(map(int, input().split()))\nseen = OrderedDict()\nfor x in arr:\n    seen[x] = seen.get(x, 0) + 1\nfor k, v in seen.items():\n    print(k, v)`),
    xpReward: 40,
  },
  {
    id: "first-unique-char", title: "First Unique Character", difficulty: "easy", category: "Hash Map", topicId: "hash-map-basics",
    description: "Given a string, find the first non-repeating character and print its index. Print -1 if none.",
    constraints: ["1 ≤ s.length ≤ 10⁵"],
    examples: [
      { input: "leetcode", expectedOutput: "0" },
      { input: "aabb", expectedOutput: "-1" },
    ],
    hiddenTests: [{ input: "loveleetcode", expectedOutput: "2", isHidden: true }],
    starterCode: makeStarter(`from collections import Counter\ns = input().strip()\nfreq = Counter(s)\nfor i, c in enumerate(s):\n    if freq[c] == 1:\n        print(i); break\nelse:\n    print(-1)`),
    xpReward: 40,
  },
  {
    id: "two-sum-hashmap", title: "Two Sum (Hash Map)", difficulty: "easy", category: "Hash Map", topicId: "hash-map-basics",
    description: "Find if there exist two numbers in the array that sum to the target. Print `true` or `false`.",
    constraints: ["2 ≤ n ≤ 10⁵"],
    examples: [
      { input: "2 7 11 15\n9", expectedOutput: "true" },
      { input: "1 2 3\n7", expectedOutput: "false" },
    ],
    hiddenTests: [{ input: "3 3\n6", expectedOutput: "true", isHidden: true }],
    starterCode: makeStarter(`arr = list(map(int, input().split()))\ntarget = int(input())\nseen = set()\nfound = False\nfor x in arr:\n    if target - x in seen:\n        found = True; break\n    seen.add(x)\nprint("true" if found else "false")`),
    xpReward: 40,
  },

  // === Math Problems ===
  {
    id: "gcd-lcm", title: "GCD and LCM", difficulty: "easy", category: "Math", topicId: "math-problems",
    description: "Given two numbers, print their GCD and LCM separated by space.",
    constraints: ["1 ≤ a, b ≤ 10⁹"],
    examples: [
      { input: "12 18", expectedOutput: "6 36" },
      { input: "7 5", expectedOutput: "1 35" },
    ],
    hiddenTests: [{ input: "100 100", expectedOutput: "100 100", isHidden: true }],
    starterCode: makeStarter(`import math\na, b = map(int, input().split())\ng = math.gcd(a, b)\nprint(g, a * b // g)`),
    xpReward: 30,
  },
  {
    id: "prime-check", title: "Prime Number Check", difficulty: "easy", category: "Math", topicId: "math-problems",
    description: "Check if a given number is prime. Print `true` or `false`.",
    constraints: ["1 ≤ n ≤ 10⁹"],
    examples: [
      { input: "17", expectedOutput: "true" },
      { input: "4", expectedOutput: "false" },
      { input: "1", expectedOutput: "false" },
    ],
    hiddenTests: [{ input: "2", expectedOutput: "true", isHidden: true }],
    starterCode: makeStarter(`n = int(input())\ndef is_prime(n):\n    if n < 2: return False\n    for i in range(2, int(n**0.5)+1):\n        if n % i == 0: return False\n    return True\nprint("true" if is_prime(n) else "false")`),
    xpReward: 30,
  },

  // === Pattern Printing ===
  {
    id: "star-pyramid", title: "Star Pyramid", difficulty: "easy", category: "Patterns", topicId: "pattern-printing",
    description: "Print a pyramid of stars with n rows. Each row i has i stars, centered.",
    constraints: ["1 ≤ n ≤ 20"],
    examples: [
      { input: "3", expectedOutput: "  *\n ***\n*****" },
    ],
    hiddenTests: [{ input: "1", expectedOutput: "*", isHidden: true }],
    starterCode: makeStarter(`n = int(input())\nfor i in range(1, n+1):\n    spaces = ' ' * (n - i)\n    stars = '*' * (2*i - 1)\n    print(spaces + stars)`),
    xpReward: 30,
  },
  {
    id: "number-triangle", title: "Number Triangle", difficulty: "easy", category: "Patterns", topicId: "pattern-printing",
    description: "Print a right-angled triangle of numbers. Row i contains numbers 1 to i.",
    constraints: ["1 ≤ n ≤ 15"],
    examples: [
      { input: "4", expectedOutput: "1\n1 2\n1 2 3\n1 2 3 4" },
    ],
    hiddenTests: [{ input: "1", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`n = int(input())\nfor i in range(1, n+1):\n    print(' '.join(map(str, range(1, i+1))))`),
    xpReward: 30,
  },

  // === Number Series ===
  {
    id: "armstrong-number", title: "Armstrong Number", difficulty: "easy", category: "Numbers", topicId: "number-series",
    description: "Check if a number is an Armstrong number (sum of digits^numDigits equals the number). Print `true` or `false`.",
    constraints: ["1 ≤ n ≤ 10⁹"],
    examples: [
      { input: "153", expectedOutput: "true" },
      { input: "9474", expectedOutput: "true" },
      { input: "123", expectedOutput: "false" },
    ],
    hiddenTests: [{ input: "1", expectedOutput: "true", isHidden: true }],
    starterCode: makeStarter(`n = int(input())\ndigits = str(n)\nk = len(digits)\nresult = sum(int(d)**k for d in digits)\nprint("true" if result == n else "false")`),
    xpReward: 30,
  },
  {
    id: "perfect-number", title: "Perfect Number", difficulty: "easy", category: "Numbers", topicId: "number-series",
    description: "Check if n is a perfect number (sum of proper divisors equals n). Print `true` or `false`.",
    constraints: ["1 ≤ n ≤ 10⁸"],
    examples: [
      { input: "28", expectedOutput: "true" },
      { input: "6", expectedOutput: "true" },
      { input: "12", expectedOutput: "false" },
    ],
    hiddenTests: [{ input: "1", expectedOutput: "false", isHidden: true }],
    starterCode: makeStarter(`n = int(input())\nif n < 2:\n    print("false")\nelse:\n    s = 1\n    for i in range(2, int(n**0.5)+1):\n        if n % i == 0:\n            s += i\n            if i != n // i: s += n // i\n    print("true" if s == n else "false")`),
    xpReward: 30,
  },

  // === Simple Bit Operations ===
  {
    id: "check-even-odd", title: "Even or Odd (Bitwise)", difficulty: "easy", category: "Bits", topicId: "simple-bit-ops",
    description: "Check if a number is even or odd using bitwise AND. Print `even` or `odd`.",
    constraints: ["-10⁹ ≤ n ≤ 10⁹"],
    examples: [
      { input: "4", expectedOutput: "even" },
      { input: "7", expectedOutput: "odd" },
    ],
    hiddenTests: [{ input: "0", expectedOutput: "even", isHidden: true }],
    starterCode: makeStarter(`n = int(input())\nprint("odd" if n & 1 else "even")`),
    xpReward: 20,
  },
  {
    id: "swap-without-temp", title: "Swap Without Temp", difficulty: "easy", category: "Bits", topicId: "simple-bit-ops",
    description: "Given two integers, swap them using XOR (no temp variable). Print the swapped values.",
    constraints: ["-10⁹ ≤ a, b ≤ 10⁹"],
    examples: [
      { input: "3 5", expectedOutput: "5 3" },
      { input: "0 1", expectedOutput: "1 0" },
    ],
    hiddenTests: [{ input: "7 7", expectedOutput: "7 7", isHidden: true }],
    starterCode: makeStarter(`a, b = map(int, input().split())\na ^= b; b ^= a; a ^= b\nprint(a, b)`),
    xpReward: 20,
  },

  // === Greedy Choice ===
  {
    id: "coin-change-greedy", title: "Minimum Coins (Greedy)", difficulty: "easy", category: "Greedy", topicId: "greedy-choice",
    description: "Given denominations [1, 5, 10, 25] and an amount, find the minimum number of coins using greedy approach.",
    constraints: ["1 ≤ amount ≤ 10⁶"],
    examples: [
      { input: "41", expectedOutput: "4" },
      { input: "30", expectedOutput: "2" },
    ],
    hiddenTests: [{ input: "1", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`amount = int(input())\ncoins = [25, 10, 5, 1]\ncount = 0\nfor c in coins:\n    count += amount // c\n    amount %= c\nprint(count)`),
    xpReward: 40,
  },
  {
    id: "activity-selection", title: "Activity Selection", difficulty: "easy", category: "Greedy", topicId: "greedy-choice",
    description: "Given n activities with start and end times, find the maximum number of non-overlapping activities.\nFirst line: n. Next n lines: start end.",
    constraints: ["1 ≤ n ≤ 10⁵"],
    examples: [
      { input: "3\n1 2\n3 4\n0 6", expectedOutput: "2" },
      { input: "4\n1 2\n2 3\n3 4\n1 4", expectedOutput: "3" },
    ],
    hiddenTests: [{ input: "1\n0 1", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`n = int(input())\nactivities = [tuple(map(int, input().split())) for _ in range(n)]\nactivities.sort(key=lambda x: x[1])\ncount = 0\nend = -1\nfor s, e in activities:\n    if s >= end:\n        count += 1\n        end = e\nprint(count)`),
    xpReward: 40,
  },

  // === Two Pointer Basics ===
  {
    id: "pair-with-sum", title: "Pair With Given Sum", difficulty: "easy", category: "Two Pointers", topicId: "two-pointer-basics",
    description: "Given a sorted array and a target sum, find if a pair exists that sums to target. Print `true` or `false`.",
    constraints: ["2 ≤ n ≤ 10⁵"],
    examples: [
      { input: "1 2 3 4 6\n6", expectedOutput: "true" },
      { input: "1 2 3\n7", expectedOutput: "false" },
    ],
    hiddenTests: [{ input: "1 1\n2", expectedOutput: "true", isHidden: true }],
    starterCode: makeStarter(`arr = list(map(int, input().split()))\ntarget = int(input())\nl, r = 0, len(arr)-1\nfound = False\nwhile l < r:\n    s = arr[l] + arr[r]\n    if s == target: found = True; break\n    elif s < target: l += 1\n    else: r -= 1\nprint("true" if found else "false")`),
    xpReward: 40,
  },
  {
    id: "remove-duplicates-sorted", title: "Remove Duplicates (Sorted)", difficulty: "easy", category: "Two Pointers", topicId: "two-pointer-basics",
    description: "Remove duplicates from a sorted array in-place. Print the resulting array.",
    constraints: ["1 ≤ n ≤ 10⁵"],
    examples: [
      { input: "1 1 2 2 3", expectedOutput: "1 2 3" },
      { input: "1 1 1", expectedOutput: "1" },
    ],
    hiddenTests: [{ input: "1 2 3", expectedOutput: "1 2 3", isHidden: true }],
    starterCode: makeStarter(`arr = list(map(int, input().split()))\nresult = list(dict.fromkeys(arr))\nprint(' '.join(map(str, result)))`),
    xpReward: 30,
  },
  {
    id: "trapping-rain-water", title: "Trapping Rain Water", difficulty: "hard", category: "Two Pointers", topicId: "two-pointer-basics",
    description: "Given `n` non-negative integers representing an elevation map, compute how much water it can trap after raining.",
    constraints: ["1 ≤ n ≤ 2 × 10⁴", "0 ≤ height[i] ≤ 10⁵"],
    examples: [
      { input: "0 1 0 2 1 0 1 3 2 1 2 1", expectedOutput: "6" },
      { input: "4 2 0 3 2 5", expectedOutput: "9" },
    ],
    hiddenTests: [
      { input: "1 0 1", expectedOutput: "1", isHidden: true },
      { input: "3 0 0 0 3", expectedOutput: "9", isHidden: true },
    ],
    starterCode: makeStarter(`def trap(height):\n    l, r = 0, len(height)-1\n    lmax = rmax = water = 0\n    while l < r:\n        if height[l] < height[r]:\n            if height[l] >= lmax: lmax = height[l]\n            else: water += lmax - height[l]\n            l += 1\n        else:\n            if height[r] >= rmax: rmax = height[r]\n            else: water += rmax - height[r]\n            r -= 1\n    return water\n\nprint(trap(list(map(int, input().split()))))`),
    xpReward: 200,
  },

  // ──────────────────────────────────────
  // INTERMEDIATE TOPICS
  // ──────────────────────────────────────

  // === Advanced Arrays ===
  {
    id: "kadanes-algorithm", title: "Maximum Subarray (Kadane's)", difficulty: "medium", category: "Arrays", topicId: "advanced-arrays",
    description: "Find the contiguous subarray with the largest sum and print the sum.",
    constraints: ["1 ≤ n ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    examples: [
      { input: "-2 1 -3 4 -1 2 1 -5 4", expectedOutput: "6" },
      { input: "1", expectedOutput: "1" },
    ],
    hiddenTests: [{ input: "-1 -2 -3", expectedOutput: "-1", isHidden: true }],
    starterCode: makeStarter(`nums = list(map(int, input().split()))\nmax_sum = cur = nums[0]\nfor x in nums[1:]:\n    cur = max(x, cur + x)\n    max_sum = max(max_sum, cur)\nprint(max_sum)`),
    xpReward: 80,
  },
  {
    id: "prefix-sum-range", title: "Range Sum Query", difficulty: "medium", category: "Arrays", topicId: "advanced-arrays",
    description: "Given an array and q queries (l r), print the sum of elements from index l to r (0-indexed) for each query.",
    constraints: ["1 ≤ n ≤ 10⁵", "1 ≤ q ≤ 10⁵"],
    examples: [
      { input: "1 2 3 4 5\n2\n0 2\n1 4", expectedOutput: "6\n14" },
    ],
    hiddenTests: [{ input: "5\n1\n0 0", expectedOutput: "5", isHidden: true }],
    starterCode: makeStarter(`arr = list(map(int, input().split()))\nprefix = [0] * (len(arr)+1)\nfor i in range(len(arr)):\n    prefix[i+1] = prefix[i] + arr[i]\nq = int(input())\nfor _ in range(q):\n    l, r = map(int, input().split())\n    print(prefix[r+1] - prefix[l])`),
    xpReward: 80,
  },
  {
    id: "product-except-self", title: "Product Except Self", difficulty: "medium", category: "Arrays", topicId: "advanced-arrays",
    description: "Given an array, return an array where each element is the product of all elements except itself. No division.",
    constraints: ["2 ≤ n ≤ 10⁵"],
    examples: [
      { input: "1 2 3 4", expectedOutput: "24 12 8 6" },
      { input: "-1 1 0 -3 3", expectedOutput: "0 0 9 0 0" },
    ],
    hiddenTests: [{ input: "2 3", expectedOutput: "3 2", isHidden: true }],
    starterCode: makeStarter(`nums = list(map(int, input().split()))\nn = len(nums)\nresult = [1]*n\nleft = 1\nfor i in range(n):\n    result[i] = left\n    left *= nums[i]\nright = 1\nfor i in range(n-1, -1, -1):\n    result[i] *= right\n    right *= nums[i]\nprint(' '.join(map(str, result)))`),
    xpReward: 100,
  },

  // === String Algorithms ===
  {
    id: "group-anagrams", title: "Group Anagrams", difficulty: "medium", category: "Strings", topicId: "string-algorithms",
    description: "Given an array of strings, group the anagrams together.",
    constraints: ["1 ≤ strs.length ≤ 10⁴"],
    examples: [
      { input: "eat tea tan ate nat bat", expectedOutput: "ate eat tea\nnat tan\nbat" },
      { input: "a", expectedOutput: "a" },
    ],
    hiddenTests: [{ input: "", expectedOutput: "", isHidden: true }],
    starterCode: makeStarter(`from collections import defaultdict\nstrs = input().split()\ngroups = defaultdict(list)\nfor s in strs:\n    groups[''.join(sorted(s))].append(s)\nfor g in sorted(groups.values(), key=lambda x: sorted(x)):\n    print(' '.join(sorted(g)))`),
    xpReward: 100,
  },
  {
    id: "longest-substring-no-repeat", title: "Longest Substring Without Repeat", difficulty: "medium", category: "Strings", topicId: "string-algorithms",
    description: "Find the length of the longest substring without repeating characters.",
    constraints: ["0 ≤ s.length ≤ 5×10⁴"],
    examples: [
      { input: "abcabcbb", expectedOutput: "3" },
      { input: "bbbbb", expectedOutput: "1" },
      { input: "pwwkew", expectedOutput: "3" },
    ],
    hiddenTests: [{ input: "", expectedOutput: "0", isHidden: true }],
    starterCode: makeStarter(`s = input().strip()\nif not s:\n    print(0)\nelse:\n    seen = {}\n    l = best = 0\n    for r, c in enumerate(s):\n        if c in seen and seen[c] >= l:\n            l = seen[c] + 1\n        seen[c] = r\n        best = max(best, r - l + 1)\n    print(best)`),
    xpReward: 100,
  },
  {
    id: "string-compression", title: "String Compression", difficulty: "medium", category: "Strings", topicId: "string-algorithms",
    description: "Compress a string: consecutive duplicates are replaced by char+count. If count is 1, just the char. Print compressed string.",
    constraints: ["1 ≤ s.length ≤ 10⁵"],
    examples: [
      { input: "aabcccccaaa", expectedOutput: "a2b1c5a3" },
      { input: "abc", expectedOutput: "a1b1c1" },
    ],
    hiddenTests: [{ input: "a", expectedOutput: "a1", isHidden: true }],
    starterCode: makeStarter(`s = input().strip()\nresult = []\ni = 0\nwhile i < len(s):\n    c = s[i]\n    count = 0\n    while i < len(s) and s[i] == c:\n        count += 1; i += 1\n    result.append(f"{c}{count}")\nprint(''.join(result))`),
    xpReward: 80,
  },

  // === Binary Search ===
  {
    id: "binary-search-std", title: "Binary Search", difficulty: "medium", category: "Search", topicId: "binary-search",
    description: "Given a sorted array and target, return the index using binary search. Print -1 if not found.",
    constraints: ["1 ≤ n ≤ 10⁵"],
    examples: [
      { input: "-1 0 3 5 9 12\n9", expectedOutput: "4" },
      { input: "-1 0 3 5 9 12\n2", expectedOutput: "-1" },
    ],
    hiddenTests: [{ input: "5\n5", expectedOutput: "0", isHidden: true }],
    starterCode: makeStarter(`arr = list(map(int, input().split()))\ntarget = int(input())\nl, r = 0, len(arr)-1\nresult = -1\nwhile l <= r:\n    m = (l+r)//2\n    if arr[m] == target: result = m; break\n    elif arr[m] < target: l = m+1\n    else: r = m-1\nprint(result)`),
    xpReward: 60,
  },
  {
    id: "first-last-position", title: "First and Last Position", difficulty: "medium", category: "Search", topicId: "binary-search",
    description: "Find the first and last position of a target in a sorted array. Print as `first last`. Print `-1 -1` if not found.",
    constraints: ["0 ≤ n ≤ 10⁵"],
    examples: [
      { input: "5 7 7 8 8 10\n8", expectedOutput: "3 4" },
      { input: "5 7 7 8 8 10\n6", expectedOutput: "-1 -1" },
    ],
    hiddenTests: [{ input: "\n0", expectedOutput: "-1 -1", isHidden: true }],
    starterCode: makeStarter(`import bisect\nline = input().strip()\narr = list(map(int, line.split())) if line else []\ntarget = int(input())\nl = bisect.bisect_left(arr, target)\nr = bisect.bisect_right(arr, target) - 1\nif l <= r and l < len(arr) and arr[l] == target:\n    print(l, r)\nelse:\n    print("-1 -1")`),
    xpReward: 80,
  },
  {
    id: "median-two-sorted", title: "Median of Two Sorted Arrays", difficulty: "hard", category: "Search", topicId: "binary-search",
    description: "Given two sorted arrays, find the median of the combined sorted array in O(log(m+n)).",
    constraints: ["0 ≤ m, n ≤ 1000", "1 ≤ m + n ≤ 2000"],
    examples: [
      { input: "1 3\n2", expectedOutput: "2.0" },
      { input: "1 2\n3 4", expectedOutput: "2.5" },
    ],
    hiddenTests: [{ input: "0 0\n0 0", expectedOutput: "0.0", isHidden: true }],
    starterCode: makeStarter(`nums1 = list(map(int, input().split()))\nnums2 = list(map(int, input().split()))\nmerged = sorted(nums1 + nums2)\nn = len(merged)\nif n % 2 == 1:\n    print(f"{merged[n//2]:.1f}")\nelse:\n    print(f"{(merged[n//2-1]+merged[n//2])/2}")`),
    xpReward: 200,
  },

  // === Quick Sort / Merge Sort ===
  {
    id: "merge-sort-impl", title: "Merge Sort", difficulty: "medium", category: "Sorting", topicId: "quicksort-mergesort",
    description: "Implement merge sort and print the sorted array.",
    constraints: ["1 ≤ n ≤ 10⁵"],
    examples: [
      { input: "38 27 43 3 9 82 10", expectedOutput: "3 9 10 27 38 43 82" },
    ],
    hiddenTests: [{ input: "1", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`def merge_sort(arr):\n    if len(arr) <= 1: return arr\n    mid = len(arr)//2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]: result.append(left[i]); i += 1\n        else: result.append(right[j]); j += 1\n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result\n\narr = list(map(int, input().split()))\nprint(' '.join(map(str, merge_sort(arr))))`),
    xpReward: 80,
  },
  {
    id: "quick-sort-impl", title: "Quick Sort", difficulty: "medium", category: "Sorting", topicId: "quicksort-mergesort",
    description: "Implement quick sort and print the sorted array.",
    constraints: ["1 ≤ n ≤ 10⁵"],
    examples: [
      { input: "10 80 30 90 40 50 70", expectedOutput: "10 30 40 50 70 80 90" },
    ],
    hiddenTests: [{ input: "1", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`def quick_sort(arr):\n    if len(arr) <= 1: return arr\n    pivot = arr[len(arr)//2]\n    left = [x for x in arr if x < pivot]\n    mid = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + mid + quick_sort(right)\n\narr = list(map(int, input().split()))\nprint(' '.join(map(str, quick_sort(arr))))`),
    xpReward: 80,
  },

  // === Backtracking Basics ===
  {
    id: "generate-permutations", title: "Generate Permutations", difficulty: "medium", category: "Backtracking", topicId: "backtracking-basics",
    description: "Given n distinct integers, print all permutations in sorted order, one per line.",
    constraints: ["1 ≤ n ≤ 6"],
    examples: [
      { input: "1 2 3", expectedOutput: "1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1" },
    ],
    hiddenTests: [{ input: "1", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`from itertools import permutations\narr = list(map(int, input().split()))\nfor p in sorted(permutations(arr)):\n    print(' '.join(map(str, p)))`),
    xpReward: 80,
  },
  {
    id: "generate-subsets", title: "Generate All Subsets", difficulty: "medium", category: "Backtracking", topicId: "backtracking-basics",
    description: "Given n distinct integers, print all subsets (power set). Print each subset on a line, empty set as empty line.",
    constraints: ["0 ≤ n ≤ 10"],
    examples: [
      { input: "1 2", expectedOutput: "\n1\n2\n1 2" },
    ],
    hiddenTests: [{ input: "1", expectedOutput: "\n1", isHidden: true }],
    starterCode: makeStarter(`from itertools import combinations\narr = list(map(int, input().split()))\nfor r in range(len(arr)+1):\n    for c in combinations(arr, r):\n        print(' '.join(map(str, c)))`),
    xpReward: 80,
  },
  {
    id: "combination-sum", title: "Combination Sum", difficulty: "medium", category: "Backtracking", topicId: "backtracking-basics",
    description: "Given distinct integers and a target, find all unique combinations that sum to target. Numbers can be reused. Print sorted.",
    constraints: ["1 ≤ candidates.length ≤ 30", "1 ≤ target ≤ 40"],
    examples: [
      { input: "2 3 6 7\n7", expectedOutput: "2 2 3\n7" },
    ],
    hiddenTests: [{ input: "2 3 5\n8", expectedOutput: "2 2 2 2\n2 3 3\n3 5", isHidden: true }],
    starterCode: makeStarter(`def combo_sum(cands, target, start=0, path=[]):\n    if target == 0:\n        results.append(list(path))\n        return\n    for i in range(start, len(cands)):\n        if cands[i] > target: break\n        path.append(cands[i])\n        combo_sum(cands, target - cands[i], i, path)\n        path.pop()\n\ncands = sorted(map(int, input().split()))\ntarget = int(input())\nresults = []\ncombo_sum(cands, target)\nfor r in results:\n    print(' '.join(map(str, r)))`),
    xpReward: 100,
  },

  // === Tree Traversal ===
  {
    id: "binary-tree-level-order", title: "Level Order Traversal", difficulty: "medium", category: "Trees", topicId: "tree-traversal",
    description: "Given a binary tree as level-order input ('null' for missing), print level order traversal.",
    constraints: ["0 ≤ nodes ≤ 2000"],
    examples: [
      { input: "3 9 20 null null 15 7", expectedOutput: "[3]\n[9,20]\n[15,7]" },
      { input: "1", expectedOutput: "[1]" },
    ],
    hiddenTests: [{ input: "", expectedOutput: "", isHidden: true }],
    starterCode: makeStarter(`from collections import deque\nvals = input().split()\nif not vals or vals[0] == '':\n    pass\nelse:\n    nodes = [None if v == 'null' else int(v) for v in vals]\n    levels = []\n    q = deque([0])\n    while q:\n        level = []\n        for _ in range(len(q)):\n            i = q.popleft()\n            if i < len(nodes) and nodes[i] is not None:\n                level.append(nodes[i])\n                q.append(2*i+1)\n                q.append(2*i+2)\n        if level:\n            levels.append(level)\n    for l in levels:\n        print('[' + ','.join(map(str, l)) + ']')`),
    xpReward: 100,
  },
  {
    id: "inorder-traversal", title: "Inorder Traversal", difficulty: "medium", category: "Trees", topicId: "tree-traversal",
    description: "Given a binary tree as level-order input, print its inorder traversal (left, root, right).",
    constraints: ["0 ≤ nodes ≤ 2000"],
    examples: [
      { input: "1 null 2 null null 3", expectedOutput: "1 3 2" },
      { input: "1 2 3", expectedOutput: "2 1 3" },
    ],
    hiddenTests: [{ input: "1", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`vals = input().split()\nnodes = [None if v == 'null' else int(v) for v in vals]\nresult = []\ndef inorder(i):\n    if i >= len(nodes) or nodes[i] is None: return\n    inorder(2*i+1)\n    result.append(str(nodes[i]))\n    inorder(2*i+2)\ninorder(0)\nprint(' '.join(result))`),
    xpReward: 80,
  },
  {
    id: "max-depth-tree", title: "Maximum Depth of Binary Tree", difficulty: "medium", category: "Trees", topicId: "tree-traversal",
    description: "Given a binary tree as level-order input, find its maximum depth.",
    constraints: ["0 ≤ nodes ≤ 10⁴"],
    examples: [
      { input: "3 9 20 null null 15 7", expectedOutput: "3" },
      { input: "1 null 2", expectedOutput: "2" },
    ],
    hiddenTests: [{ input: "1", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`vals = input().split()\nnodes = [None if v == 'null' else int(v) for v in vals]\ndef depth(i):\n    if i >= len(nodes) or nodes[i] is None: return 0\n    return 1 + max(depth(2*i+1), depth(2*i+2))\nprint(depth(0))`),
    xpReward: 60,
  },

  // === Graph BFS/DFS ===
  {
    id: "num-islands", title: "Number of Islands", difficulty: "medium", category: "Graph", topicId: "graph-bfs-dfs",
    description: "Given a 2D grid of '1's (land) and '0's (water), count the number of islands.\nFirst line: rows cols. Next rows lines: the grid.",
    constraints: ["1 ≤ m, n ≤ 300"],
    examples: [
      { input: "4 5\n11110\n11010\n11000\n00000", expectedOutput: "1" },
      { input: "4 5\n11000\n11000\n00100\n00011", expectedOutput: "3" },
    ],
    hiddenTests: [{ input: "1 1\n1", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`r, c = map(int, input().split())\ngrid = [list(input().strip()) for _ in range(r)]\ndef dfs(i, j):\n    if i < 0 or i >= r or j < 0 or j >= c or grid[i][j] != '1': return\n    grid[i][j] = '0'\n    dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1)\ncount = 0\nfor i in range(r):\n    for j in range(c):\n        if grid[i][j] == '1':\n            dfs(i, j)\n            count += 1\nprint(count)`),
    xpReward: 100,
  },
  {
    id: "graph-bfs-shortest", title: "Shortest Path (BFS)", difficulty: "medium", category: "Graph", topicId: "graph-bfs-dfs",
    description: "Given an unweighted graph (adjacency list), find shortest path length from node 0 to node n-1.\nFirst line: n edges. Next lines: u v.",
    constraints: ["2 ≤ n ≤ 10⁴"],
    examples: [
      { input: "4 4\n0 1\n1 2\n2 3\n0 3", expectedOutput: "1" },
    ],
    hiddenTests: [{ input: "2 1\n0 1", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`from collections import deque, defaultdict\nn, e = map(int, input().split())\nadj = defaultdict(list)\nfor _ in range(e):\n    u, v = map(int, input().split())\n    adj[u].append(v); adj[v].append(u)\ndist = [-1]*n; dist[0] = 0\nq = deque([0])\nwhile q:\n    u = q.popleft()\n    for v in adj[u]:\n        if dist[v] == -1:\n            dist[v] = dist[u] + 1\n            q.append(v)\nprint(dist[n-1])`),
    xpReward: 100,
  },
  {
    id: "detect-cycle", title: "Detect Cycle in Graph", difficulty: "medium", category: "Graph", topicId: "graph-bfs-dfs",
    description: "Given a directed graph, detect if it contains a cycle. Print `true` or `false`.\nFirst line: n edges. Next lines: u v.",
    constraints: ["1 ≤ n ≤ 10⁴"],
    examples: [
      { input: "3 3\n0 1\n1 2\n2 0", expectedOutput: "true" },
      { input: "3 2\n0 1\n1 2", expectedOutput: "false" },
    ],
    hiddenTests: [{ input: "1 0", expectedOutput: "false", isHidden: true }],
    starterCode: makeStarter(`from collections import defaultdict\nn, e = map(int, input().split())\nadj = defaultdict(list)\nfor _ in range(e):\n    u, v = map(int, input().split())\n    adj[u].append(v)\nWHITE, GRAY, BLACK = 0, 1, 2\ncolor = [WHITE]*n\ndef dfs(u):\n    color[u] = GRAY\n    for v in adj[u]:\n        if color[v] == GRAY: return True\n        if color[v] == WHITE and dfs(v): return True\n    color[u] = BLACK\n    return False\nhas_cycle = any(color[i] == WHITE and dfs(i) for i in range(n))\nprint("true" if has_cycle else "false")`),
    xpReward: 100,
  },

  // === Hashing Advanced ===
  {
    id: "subarray-sum-k", title: "Subarray Sum Equals K", difficulty: "medium", category: "Hash Map", topicId: "hashing-advanced",
    description: "Given an array and integer k, find the total number of continuous subarrays whose sum equals k.",
    constraints: ["1 ≤ n ≤ 2×10⁴"],
    examples: [
      { input: "1 1 1\n2", expectedOutput: "2" },
      { input: "1 2 3\n3", expectedOutput: "2" },
    ],
    hiddenTests: [{ input: "1\n0", expectedOutput: "0", isHidden: true }],
    starterCode: makeStarter(`from collections import defaultdict\nnums = list(map(int, input().split()))\nk = int(input())\nprefix_count = defaultdict(int)\nprefix_count[0] = 1\ncur = count = 0\nfor x in nums:\n    cur += x\n    count += prefix_count[cur - k]\n    prefix_count[cur] += 1\nprint(count)`),
    xpReward: 100,
  },
  {
    id: "top-k-frequent", title: "Top K Frequent Elements", difficulty: "medium", category: "Hash Map", topicId: "hashing-advanced",
    description: "Given an array and k, return the k most frequent elements, sorted.",
    constraints: ["1 ≤ n ≤ 10⁵"],
    examples: [
      { input: "1 1 1 2 2 3\n2", expectedOutput: "1 2" },
      { input: "1\n1", expectedOutput: "1" },
    ],
    hiddenTests: [{ input: "4 4 4 1 1 2 2 2\n2", expectedOutput: "2 4", isHidden: true }],
    starterCode: makeStarter(`from collections import Counter\nnums = list(map(int, input().split()))\nk = int(input())\nfreq = Counter(nums)\ntop = sorted(freq.keys(), key=lambda x: -freq[x])[:k]\nprint(' '.join(map(str, sorted(top))))`),
    xpReward: 100,
  },
  {
    id: "longest-consecutive", title: "Longest Consecutive Sequence", difficulty: "medium", category: "Hash Map", topicId: "hashing-advanced",
    description: "Given an unsorted array, find the length of the longest consecutive elements sequence.",
    constraints: ["0 ≤ n ≤ 10⁵"],
    examples: [
      { input: "100 4 200 1 3 2", expectedOutput: "4" },
    ],
    hiddenTests: [{ input: "0 3 7 2 5 8 4 6 0 1", expectedOutput: "9", isHidden: true }],
    starterCode: makeStarter(`nums = list(map(int, input().split()))\nnum_set = set(nums)\nbest = 0\nfor n in num_set:\n    if n-1 not in num_set:\n        length = 1\n        while n + length in num_set: length += 1\n        best = max(best, length)\nprint(best)`),
    xpReward: 100,
  },

  // === Sliding Window ===
  {
    id: "max-sum-k-window", title: "Maximum Sum of K Window", difficulty: "medium", category: "Sliding Window", topicId: "sliding-window",
    description: "Find the maximum sum of any contiguous subarray of size k.",
    constraints: ["1 ≤ k ≤ n ≤ 10⁵"],
    examples: [
      { input: "2 1 5 1 3 2\n3", expectedOutput: "9" },
    ],
    hiddenTests: [{ input: "1 2 3\n3", expectedOutput: "6", isHidden: true }],
    starterCode: makeStarter(`nums = list(map(int, input().split()))\nk = int(input())\nwindow = sum(nums[:k])\nbest = window\nfor i in range(k, len(nums)):\n    window += nums[i] - nums[i-k]\n    best = max(best, window)\nprint(best)`),
    xpReward: 80,
  },
  {
    id: "min-window-substring", title: "Minimum Window Substring", difficulty: "hard", category: "Sliding Window", topicId: "sliding-window",
    description: "Find the minimum window in s which contains all characters of t. Print the window or empty string.",
    constraints: ["1 ≤ s.length, t.length ≤ 10⁵"],
    examples: [
      { input: "ADOBECODEBANC\nABC", expectedOutput: "BANC" },
      { input: "a\na", expectedOutput: "a" },
    ],
    hiddenTests: [{ input: "a\naa", expectedOutput: "", isHidden: true }],
    starterCode: makeStarter(`from collections import Counter\ns = input().strip()\nt = input().strip()\nif len(t) > len(s): print(""); exit()\nneed = Counter(t)\nhave = Counter()\nformed = 0\nrequired = len(need)\nbest = (float('inf'), 0, 0)\nl = 0\nfor r, c in enumerate(s):\n    have[c] += 1\n    if c in need and have[c] == need[c]: formed += 1\n    while formed == required:\n        if r - l + 1 < best[0]: best = (r-l+1, l, r)\n        have[s[l]] -= 1\n        if s[l] in need and have[s[l]] < need[s[l]]: formed -= 1\n        l += 1\nprint(s[best[1]:best[2]+1] if best[0] != float('inf') else "")`),
    xpReward: 200,
  },
  {
    id: "fruit-baskets", title: "Fruits Into Baskets", difficulty: "medium", category: "Sliding Window", topicId: "sliding-window",
    description: "Given an array of integers (fruit types), find the maximum number of fruits you can collect with at most 2 different types.",
    constraints: ["1 ≤ n ≤ 10⁵"],
    examples: [
      { input: "1 2 1", expectedOutput: "3" },
      { input: "0 1 2 2", expectedOutput: "3" },
      { input: "1 2 3 2 2", expectedOutput: "4" },
    ],
    hiddenTests: [{ input: "1", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`from collections import defaultdict\nfruits = list(map(int, input().split()))\ncount = defaultdict(int)\nl = best = 0\nfor r, f in enumerate(fruits):\n    count[f] += 1\n    while len(count) > 2:\n        count[fruits[l]] -= 1\n        if count[fruits[l]] == 0: del count[fruits[l]]\n        l += 1\n    best = max(best, r - l + 1)\nprint(best)`),
    xpReward: 80,
  },

  // === Matrix Problems ===
  {
    id: "spiral-matrix", title: "Spiral Order Matrix", difficulty: "medium", category: "Matrix", topicId: "matrix-problems",
    description: "Print the elements of a matrix in spiral order.\nFirst line: rows cols. Next lines: matrix rows.",
    constraints: ["1 ≤ m, n ≤ 20"],
    examples: [
      { input: "3 3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "1 2 3 6 9 8 7 4 5" },
    ],
    hiddenTests: [{ input: "1 3\n1 2 3", expectedOutput: "1 2 3", isHidden: true }],
    starterCode: makeStarter(`r, c = map(int, input().split())\nmatrix = [list(map(int, input().split())) for _ in range(r)]\nresult = []\ntop, bottom, left, right = 0, r-1, 0, c-1\nwhile top <= bottom and left <= right:\n    for j in range(left, right+1): result.append(matrix[top][j])\n    top += 1\n    for i in range(top, bottom+1): result.append(matrix[i][right])\n    right -= 1\n    if top <= bottom:\n        for j in range(right, left-1, -1): result.append(matrix[bottom][j])\n        bottom -= 1\n    if left <= right:\n        for i in range(bottom, top-1, -1): result.append(matrix[i][left])\n        left += 1\nprint(' '.join(map(str, result)))`),
    xpReward: 100,
  },
  {
    id: "rotate-matrix", title: "Rotate Matrix 90°", difficulty: "medium", category: "Matrix", topicId: "matrix-problems",
    description: "Rotate an n×n matrix 90 degrees clockwise. Print the rotated matrix.",
    constraints: ["1 ≤ n ≤ 20"],
    examples: [
      { input: "3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "7 4 1\n8 5 2\n9 6 3" },
    ],
    hiddenTests: [{ input: "1\n1", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`n = int(input())\nmatrix = [list(map(int, input().split())) for _ in range(n)]\nrotated = list(zip(*matrix[::-1]))\nfor row in rotated:\n    print(' '.join(map(str, row)))`),
    xpReward: 80,
  },

  // === Recursion Patterns ===
  {
    id: "tower-of-hanoi", title: "Tower of Hanoi", difficulty: "medium", category: "Recursion", topicId: "recursion-patterns",
    description: "Print the minimum number of moves to solve Tower of Hanoi with n disks.",
    constraints: ["1 ≤ n ≤ 20"],
    examples: [
      { input: "3", expectedOutput: "7" },
      { input: "1", expectedOutput: "1" },
    ],
    hiddenTests: [{ input: "5", expectedOutput: "31", isHidden: true }],
    starterCode: makeStarter(`n = int(input())\nprint(2**n - 1)`),
    xpReward: 60,
  },
  {
    id: "power-set-recursive", title: "Power Set (Recursive)", difficulty: "medium", category: "Recursion", topicId: "recursion-patterns",
    description: "Print the total number of subsets of a set with n elements.",
    constraints: ["0 ≤ n ≤ 20"],
    examples: [
      { input: "3", expectedOutput: "8" },
      { input: "0", expectedOutput: "1" },
    ],
    hiddenTests: [{ input: "10", expectedOutput: "1024", isHidden: true }],
    starterCode: makeStarter(`n = int(input())\nprint(2**n)`),
    xpReward: 40,
  },

  // === DP 1D ===
  {
    id: "climbing-stairs", title: "Climbing Stairs", difficulty: "medium", category: "DP", topicId: "dp-1d",
    description: "You can climb 1 or 2 steps. How many distinct ways to reach the top of n stairs?",
    constraints: ["1 ≤ n ≤ 45"],
    examples: [
      { input: "2", expectedOutput: "2" },
      { input: "3", expectedOutput: "3" },
    ],
    hiddenTests: [{ input: "5", expectedOutput: "8", isHidden: true }],
    starterCode: makeStarter(`n = int(input())\nif n <= 2: print(n); exit()\na, b = 1, 2\nfor _ in range(3, n+1):\n    a, b = b, a + b\nprint(b)`),
    xpReward: 80,
  },
  {
    id: "house-robber", title: "House Robber", difficulty: "medium", category: "DP", topicId: "dp-1d",
    description: "Given an array of house values, find the maximum sum you can rob without robbing two adjacent houses.",
    constraints: ["1 ≤ n ≤ 100"],
    examples: [
      { input: "1 2 3 1", expectedOutput: "4" },
      { input: "2 7 9 3 1", expectedOutput: "12" },
    ],
    hiddenTests: [{ input: "2 1 1 2", expectedOutput: "4", isHidden: true }],
    starterCode: makeStarter(`nums = list(map(int, input().split()))\nif len(nums) <= 2: print(max(nums)); exit()\nprev2, prev1 = nums[0], max(nums[0], nums[1])\nfor i in range(2, len(nums)):\n    prev2, prev1 = prev1, max(prev1, prev2 + nums[i])\nprint(prev1)`),
    xpReward: 100,
  },
  {
    id: "coin-change-dp", title: "Coin Change (DP)", difficulty: "medium", category: "DP", topicId: "dp-1d",
    description: "Given coin denominations and an amount, find the minimum number of coins. Print -1 if impossible.",
    constraints: ["1 ≤ coins.length ≤ 12", "0 ≤ amount ≤ 10⁴"],
    examples: [
      { input: "1 5 11\n15", expectedOutput: "3" },
      { input: "2\n3", expectedOutput: "-1" },
    ],
    hiddenTests: [{ input: "1\n0", expectedOutput: "0", isHidden: true }],
    starterCode: makeStarter(`coins = list(map(int, input().split()))\namount = int(input())\ndp = [float('inf')] * (amount + 1)\ndp[0] = 0\nfor i in range(1, amount + 1):\n    for c in coins:\n        if c <= i: dp[i] = min(dp[i], dp[i-c] + 1)\nprint(dp[amount] if dp[amount] != float('inf') else -1)`),
    xpReward: 100,
  },

  // === Greedy Advanced ===
  {
    id: "job-scheduling", title: "Job Scheduling", difficulty: "medium", category: "Greedy", topicId: "greedy-advanced",
    description: "Given n jobs with deadlines and profits, find maximum profit by scheduling at most one job per time slot.\nFirst line: n. Next n lines: deadline profit.",
    constraints: ["1 ≤ n ≤ 10⁵"],
    examples: [
      { input: "4\n4 20\n1 10\n1 40\n1 30", expectedOutput: "60" },
    ],
    hiddenTests: [{ input: "1\n1 100", expectedOutput: "100", isHidden: true }],
    starterCode: makeStarter(`n = int(input())\njobs = [tuple(map(int, input().split())) for _ in range(n)]\njobs.sort(key=lambda x: -x[1])\nmax_d = max(j[0] for j in jobs)\nslots = [False] * (max_d + 1)\nprofit = 0\nfor d, p in jobs:\n    for t in range(d, 0, -1):\n        if not slots[t]:\n            slots[t] = True\n            profit += p\n            break\nprint(profit)`),
    xpReward: 100,
  },
  {
    id: "fractional-knapsack", title: "Fractional Knapsack", difficulty: "medium", category: "Greedy", topicId: "greedy-advanced",
    description: "Given items with weight and value, and a capacity, find maximum value using fractional knapsack. Print as integer.\nFirst line: n capacity. Next n lines: value weight.",
    constraints: ["1 ≤ n ≤ 10⁵"],
    examples: [
      { input: "3 50\n60 10\n100 20\n120 30", expectedOutput: "240" },
    ],
    hiddenTests: [{ input: "1 10\n500 30", expectedOutput: "166", isHidden: true }],
    starterCode: makeStarter(`n, cap = map(int, input().split())\nitems = [tuple(map(int, input().split())) for _ in range(n)]\nitems.sort(key=lambda x: x[0]/x[1], reverse=True)\ntotal = 0\nfor v, w in items:\n    if cap >= w:\n        total += v; cap -= w\n    else:\n        total += v * cap / w; break\nprint(int(total))`),
    xpReward: 100,
  },

  // === Heap Basics ===
  {
    id: "kth-largest", title: "Kth Largest Element", difficulty: "medium", category: "Heap", topicId: "heap-basics",
    description: "Find the kth largest element in an unsorted array.",
    constraints: ["1 ≤ k ≤ n ≤ 10⁵"],
    examples: [
      { input: "3 2 1 5 6 4\n2", expectedOutput: "5" },
      { input: "3 2 3 1 2 4 5 5 6\n4", expectedOutput: "4" },
    ],
    hiddenTests: [{ input: "1\n1", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`import heapq\nnums = list(map(int, input().split()))\nk = int(input())\nprint(heapq.nlargest(k, nums)[-1])`),
    xpReward: 80,
  },
  {
    id: "merge-k-sorted-lists", title: "Merge K Sorted Lists", difficulty: "medium", category: "Heap", topicId: "heap-basics",
    description: "Given k sorted lists, merge them into one sorted list.\nFirst line: k. Next k lines: sorted list elements.",
    constraints: ["1 ≤ k ≤ 10⁴"],
    examples: [
      { input: "3\n1 4 5\n1 3 4\n2 6", expectedOutput: "1 1 2 3 4 4 5 6" },
    ],
    hiddenTests: [{ input: "1\n1", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`import heapq\nk = int(input())\nlists = [list(map(int, input().split())) for _ in range(k)]\nresult = sorted([x for l in lists for x in l])\nprint(' '.join(map(str, result)))`),
    xpReward: 100,
  },
  {
    id: "median-stream", title: "Median from Data Stream", difficulty: "hard", category: "Heap", topicId: "heap-basics",
    description: "Given a stream of numbers, print the running median after each insertion.",
    constraints: ["1 ≤ n ≤ 10⁵"],
    examples: [
      { input: "1 2 3", expectedOutput: "1.0\n1.5\n2.0" },
    ],
    hiddenTests: [{ input: "5", expectedOutput: "5.0", isHidden: true }],
    starterCode: makeStarter(`import heapq\nnums = list(map(int, input().split()))\nlo, hi = [], []  # max-heap (neg), min-heap\nfor x in nums:\n    heapq.heappush(lo, -x)\n    heapq.heappush(hi, -heapq.heappop(lo))\n    if len(hi) > len(lo):\n        heapq.heappush(lo, -heapq.heappop(hi))\n    if len(lo) > len(hi):\n        print(f"{-lo[0]:.1f}")\n    else:\n        print(f"{(-lo[0] + hi[0]) / 2:.1f}")`),
    xpReward: 200,
  },

  // === Linked List Medium ===
  {
    id: "detect-cycle-ll", title: "Detect Cycle in List", difficulty: "medium", category: "Linked List", topicId: "linked-list-medium",
    description: "Given a list, check if it has a duplicate (simulating cycle detection). Print `true` or `false`.",
    constraints: ["1 ≤ n ≤ 10⁵"],
    examples: [
      { input: "1 2 3 4 2", expectedOutput: "true" },
      { input: "1 2 3 4", expectedOutput: "false" },
    ],
    hiddenTests: [{ input: "1 1", expectedOutput: "true", isHidden: true }],
    starterCode: makeStarter(`arr = list(map(int, input().split()))\nprint("true" if len(arr) != len(set(arr)) else "false")`),
    xpReward: 80,
  },
  {
    id: "merge-two-sorted", title: "Merge Two Sorted Lists", difficulty: "medium", category: "Linked List", topicId: "linked-list-medium",
    description: "Merge two sorted lists into one sorted list.",
    constraints: ["0 ≤ n, m ≤ 50"],
    examples: [
      { input: "1 2 4\n1 3 4", expectedOutput: "1 1 2 3 4 4" },
    ],
    hiddenTests: [{ input: "\n0", expectedOutput: "0", isHidden: true }],
    starterCode: makeStarter(`l1 = list(map(int, input().split())) if True else []\nl2 = list(map(int, input().split())) if True else []\nprint(' '.join(map(str, sorted(l1 + l2))))`),
    xpReward: 60,
  },
  {
    id: "remove-nth-from-end", title: "Remove Nth From End", difficulty: "medium", category: "Linked List", topicId: "linked-list-medium",
    description: "Given a list and n, remove the nth node from the end and print the resulting list.",
    constraints: ["1 ≤ size ≤ 30"],
    examples: [
      { input: "1 2 3 4 5\n2", expectedOutput: "1 2 3 5" },
      { input: "1\n1", expectedOutput: "" },
    ],
    hiddenTests: [{ input: "1 2\n1", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`arr = list(map(int, input().split()))\nn = int(input())\nidx = len(arr) - n\narr.pop(idx)\nprint(' '.join(map(str, arr)))`),
    xpReward: 80,
  },

  // === Stack Applications ===
  {
    id: "next-greater-element", title: "Next Greater Element", difficulty: "medium", category: "Stack", topicId: "stack-applications",
    description: "For each element, find the next greater element to its right. Print -1 if none.",
    constraints: ["1 ≤ n ≤ 10⁵"],
    examples: [
      { input: "4 5 2 25", expectedOutput: "5 25 25 -1" },
      { input: "13 7 6 12", expectedOutput: "-1 12 12 -1" },
    ],
    hiddenTests: [{ input: "1", expectedOutput: "-1", isHidden: true }],
    starterCode: makeStarter(`arr = list(map(int, input().split()))\nn = len(arr)\nresult = [-1] * n\nstack = []\nfor i in range(n-1, -1, -1):\n    while stack and stack[-1] <= arr[i]: stack.pop()\n    if stack: result[i] = stack[-1]\n    stack.append(arr[i])\nprint(' '.join(map(str, result)))`),
    xpReward: 80,
  },
  {
    id: "largest-rectangle-histogram", title: "Largest Rectangle in Histogram", difficulty: "hard", category: "Stack", topicId: "stack-applications",
    description: "Given heights of histogram bars, find the area of the largest rectangle.",
    constraints: ["1 ≤ n ≤ 10⁵"],
    examples: [
      { input: "2 1 5 6 2 3", expectedOutput: "10" },
      { input: "2 4", expectedOutput: "4" },
    ],
    hiddenTests: [{ input: "1", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`heights = list(map(int, input().split()))\nstack = []\nmax_area = 0\nfor i, h in enumerate(heights + [0]):\n    while stack and heights[stack[-1]] > h:\n        height = heights[stack.pop()]\n        width = i if not stack else i - stack[-1] - 1\n        max_area = max(max_area, height * width)\n    stack.append(i)\nprint(max_area)`),
    xpReward: 200,
  },

  // === Queue Applications ===
  {
    id: "sliding-window-max", title: "Sliding Window Maximum", difficulty: "hard", category: "Queue", topicId: "queue-applications",
    description: "Given an array and window size k, print the maximum in each sliding window.",
    constraints: ["1 ≤ k ≤ n ≤ 10⁵"],
    examples: [
      { input: "1 3 -1 -3 5 3 6 7\n3", expectedOutput: "3 3 5 5 6 7" },
    ],
    hiddenTests: [{ input: "1\n1", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`from collections import deque\nnums = list(map(int, input().split()))\nk = int(input())\ndq = deque()\nresult = []\nfor i, x in enumerate(nums):\n    while dq and dq[0] < i - k + 1: dq.popleft()\n    while dq and nums[dq[-1]] <= x: dq.pop()\n    dq.append(i)\n    if i >= k - 1: result.append(str(nums[dq[0]]))\nprint(' '.join(result))`),
    xpReward: 150,
  },
  {
    id: "rotten-oranges", title: "Rotting Oranges", difficulty: "medium", category: "Queue", topicId: "queue-applications",
    description: "Given a grid with 0 (empty), 1 (fresh), 2 (rotten), find minutes until all oranges rot. -1 if impossible.\nFirst line: rows cols. Next lines: grid.",
    constraints: ["1 ≤ m, n ≤ 10"],
    examples: [
      { input: "3 3\n2 1 1\n1 1 0\n0 1 1", expectedOutput: "4" },
      { input: "3 3\n2 1 1\n0 1 1\n1 0 1", expectedOutput: "-1" },
    ],
    hiddenTests: [{ input: "1 1\n0", expectedOutput: "0", isHidden: true }],
    starterCode: makeStarter(`from collections import deque\nr, c = map(int, input().split())\ngrid = [list(map(int, input().split())) for _ in range(r)]\nq = deque()\nfresh = 0\nfor i in range(r):\n    for j in range(c):\n        if grid[i][j] == 2: q.append((i,j,0))\n        elif grid[i][j] == 1: fresh += 1\ntime = 0\nwhile q:\n    i, j, t = q.popleft()\n    for di, dj in [(1,0),(-1,0),(0,1),(0,-1)]:\n        ni, nj = i+di, j+dj\n        if 0 <= ni < r and 0 <= nj < c and grid[ni][nj] == 1:\n            grid[ni][nj] = 2\n            fresh -= 1\n            time = t + 1\n            q.append((ni,nj,t+1))\nprint(-1 if fresh > 0 else time)`),
    xpReward: 100,
  },

  // === Number Theory Medium ===
  {
    id: "sieve-eratosthenes", title: "Sieve of Eratosthenes", difficulty: "medium", category: "Math", topicId: "number-theory-med",
    description: "Print all prime numbers up to n.",
    constraints: ["2 ≤ n ≤ 10⁶"],
    examples: [
      { input: "20", expectedOutput: "2 3 5 7 11 13 17 19" },
    ],
    hiddenTests: [{ input: "2", expectedOutput: "2", isHidden: true }],
    starterCode: makeStarter(`n = int(input())\nis_prime = [True] * (n+1)\nis_prime[0] = is_prime[1] = False\nfor i in range(2, int(n**0.5)+1):\n    if is_prime[i]:\n        for j in range(i*i, n+1, i): is_prime[j] = False\nprint(' '.join(str(i) for i in range(2, n+1) if is_prime[i]))`),
    xpReward: 80,
  },
  {
    id: "modular-exponentiation", title: "Modular Exponentiation", difficulty: "medium", category: "Math", topicId: "number-theory-med",
    description: "Compute (base^exp) % mod efficiently using fast exponentiation.",
    constraints: ["1 ≤ base, exp, mod ≤ 10⁹"],
    examples: [
      { input: "2 10 1000", expectedOutput: "24" },
      { input: "3 5 13", expectedOutput: "9" },
    ],
    hiddenTests: [{ input: "2 0 5", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`base, exp, mod = map(int, input().split())\nprint(pow(base, exp, mod))`),
    xpReward: 60,
  },

  // === Bit Manipulation Medium ===
  {
    id: "count-set-bits", title: "Count Set Bits", difficulty: "medium", category: "Bits", topicId: "bit-manipulation-med",
    description: "Count the number of 1-bits in the binary representation of n.",
    constraints: ["0 ≤ n ≤ 2³¹ - 1"],
    examples: [
      { input: "11", expectedOutput: "3" },
      { input: "128", expectedOutput: "1" },
    ],
    hiddenTests: [{ input: "0", expectedOutput: "0", isHidden: true }],
    starterCode: makeStarter(`n = int(input())\nprint(bin(n).count('1'))`),
    xpReward: 40,
  },
  {
    id: "single-number", title: "Single Number", difficulty: "medium", category: "Bits", topicId: "bit-manipulation-med",
    description: "Every element appears twice except one. Find the single number using XOR.",
    constraints: ["1 ≤ n ≤ 3×10⁴"],
    examples: [
      { input: "2 2 1", expectedOutput: "1" },
      { input: "4 1 2 1 2", expectedOutput: "4" },
    ],
    hiddenTests: [{ input: "1", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`nums = list(map(int, input().split()))\nresult = 0\nfor x in nums: result ^= x\nprint(result)`),
    xpReward: 60,
  },

  // === Math Medium ===
  {
    id: "matrix-power", title: "Matrix Power (Fibonacci)", difficulty: "medium", category: "Math", topicId: "math-medium",
    description: "Compute the nth Fibonacci number using matrix exponentiation for large n. Print result mod 10⁹+7.",
    constraints: ["0 ≤ n ≤ 10⁹"],
    examples: [
      { input: "10", expectedOutput: "55" },
      { input: "50", expectedOutput: "586268941" },
    ],
    hiddenTests: [{ input: "0", expectedOutput: "0", isHidden: true }],
    starterCode: makeStarter(`MOD = 10**9 + 7\ndef mat_mul(A, B):\n    return [\n        [(A[0][0]*B[0][0]+A[0][1]*B[1][0])%MOD, (A[0][0]*B[0][1]+A[0][1]*B[1][1])%MOD],\n        [(A[1][0]*B[0][0]+A[1][1]*B[1][0])%MOD, (A[1][0]*B[0][1]+A[1][1]*B[1][1])%MOD]\n    ]\ndef mat_pow(M, p):\n    R = [[1,0],[0,1]]\n    while p:\n        if p & 1: R = mat_mul(R, M)\n        M = mat_mul(M, M)\n        p >>= 1\n    return R\nn = int(input())\nif n == 0: print(0)\nelse: print(mat_pow([[1,1],[1,0]], n-1)[0][0])`),
    xpReward: 150,
  },
  {
    id: "nCr-mod", title: "nCr Modulo", difficulty: "medium", category: "Math", topicId: "math-medium",
    description: "Compute C(n, r) mod 10⁹+7.",
    constraints: ["0 ≤ r ≤ n ≤ 10⁶"],
    examples: [
      { input: "5 2", expectedOutput: "10" },
      { input: "10 3", expectedOutput: "120" },
    ],
    hiddenTests: [{ input: "0 0", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`MOD = 10**9 + 7\nn, r = map(int, input().split())\nfact = [1] * (n+1)\nfor i in range(1, n+1): fact[i] = fact[i-1] * i % MOD\ndef modinv(a, m=MOD): return pow(a, m-2, m)\nprint(fact[n] * modinv(fact[r]) % MOD * modinv(fact[n-r]) % MOD)`),
    xpReward: 100,
  },

  // ──────────────────────────────────────
  // ADVANCED TOPICS
  // ──────────────────────────────────────

  // === DP 2D ===
  {
    id: "lcs", title: "Longest Common Subsequence", difficulty: "hard", category: "DP", topicId: "dp-2d",
    description: "Find the length of the longest common subsequence of two strings.",
    constraints: ["1 ≤ m, n ≤ 1000"],
    examples: [
      { input: "abcde\nace", expectedOutput: "3" },
      { input: "abc\nabc", expectedOutput: "3" },
    ],
    hiddenTests: [{ input: "abc\ndef", expectedOutput: "0", isHidden: true }],
    starterCode: makeStarter(`s1 = input().strip()\ns2 = input().strip()\nm, n = len(s1), len(s2)\ndp = [[0]*(n+1) for _ in range(m+1)]\nfor i in range(1, m+1):\n    for j in range(1, n+1):\n        if s1[i-1] == s2[j-1]: dp[i][j] = dp[i-1][j-1] + 1\n        else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])\nprint(dp[m][n])`),
    xpReward: 150,
  },
  {
    id: "edit-distance", title: "Edit Distance", difficulty: "hard", category: "DP", topicId: "dp-2d",
    description: "Find the minimum number of operations (insert, delete, replace) to convert word1 to word2.",
    constraints: ["0 ≤ m, n ≤ 500"],
    examples: [
      { input: "horse\nros", expectedOutput: "3" },
      { input: "intention\nexecution", expectedOutput: "5" },
    ],
    hiddenTests: [{ input: "\na", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`s1 = input().strip()\ns2 = input().strip()\nm, n = len(s1), len(s2)\ndp = [[0]*(n+1) for _ in range(m+1)]\nfor i in range(m+1): dp[i][0] = i\nfor j in range(n+1): dp[0][j] = j\nfor i in range(1, m+1):\n    for j in range(1, n+1):\n        if s1[i-1] == s2[j-1]: dp[i][j] = dp[i-1][j-1]\n        else: dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])\nprint(dp[m][n])`),
    xpReward: 150,
  },
  {
    id: "unique-paths", title: "Unique Paths in Grid", difficulty: "medium", category: "DP", topicId: "dp-2d",
    description: "Find the number of unique paths from top-left to bottom-right of an m×n grid (only move right or down).",
    constraints: ["1 ≤ m, n ≤ 100"],
    examples: [
      { input: "3 7", expectedOutput: "28" },
      { input: "3 2", expectedOutput: "3" },
    ],
    hiddenTests: [{ input: "1 1", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`m, n = map(int, input().split())\ndp = [[1]*n for _ in range(m)]\nfor i in range(1, m):\n    for j in range(1, n):\n        dp[i][j] = dp[i-1][j] + dp[i][j-1]\nprint(dp[m-1][n-1])`),
    xpReward: 100,
  },

  // === Trees Advanced ===
  {
    id: "validate-bst", title: "Validate BST", difficulty: "hard", category: "Trees", topicId: "trees-advanced",
    description: "Given a binary tree as level-order input, check if it's a valid BST. Print `true` or `false`.",
    constraints: ["1 ≤ nodes ≤ 10⁴"],
    examples: [
      { input: "2 1 3", expectedOutput: "true" },
      { input: "5 1 4 null null 3 6", expectedOutput: "false" },
    ],
    hiddenTests: [{ input: "1", expectedOutput: "true", isHidden: true }],
    starterCode: makeStarter(`vals = input().split()\nnodes = [None if v == 'null' else int(v) for v in vals]\ndef is_valid(i, lo, hi):\n    if i >= len(nodes) or nodes[i] is None: return True\n    if nodes[i] <= lo or nodes[i] >= hi: return False\n    return is_valid(2*i+1, lo, nodes[i]) and is_valid(2*i+2, nodes[i], hi)\nprint("true" if is_valid(0, float('-inf'), float('inf')) else "false")`),
    xpReward: 150,
  },
  {
    id: "lca-bst", title: "LCA of BST", difficulty: "medium", category: "Trees", topicId: "trees-advanced",
    description: "Find the Lowest Common Ancestor of two nodes in a BST.\nFirst line: level-order tree. Second line: p q.",
    constraints: ["2 ≤ nodes ≤ 10⁴"],
    examples: [
      { input: "6 2 8 0 4 7 9\n2 8", expectedOutput: "6" },
      { input: "6 2 8 0 4 7 9\n2 4", expectedOutput: "2" },
    ],
    hiddenTests: [{ input: "2 1 3\n1 3", expectedOutput: "2", isHidden: true }],
    starterCode: makeStarter(`vals = input().split()\nnodes = [None if v == 'null' else int(v) for v in vals]\np, q = map(int, input().split())\ndef lca(i):\n    if i >= len(nodes) or nodes[i] is None: return None\n    if p < nodes[i] and q < nodes[i]: return lca(2*i+1)\n    if p > nodes[i] and q > nodes[i]: return lca(2*i+2)\n    return nodes[i]\nprint(lca(0))`),
    xpReward: 100,
  },
  {
    id: "tree-diameter", title: "Diameter of Binary Tree", difficulty: "medium", category: "Trees", topicId: "trees-advanced",
    description: "Find the diameter (longest path between any two nodes) of a binary tree.",
    constraints: ["1 ≤ nodes ≤ 10⁴"],
    examples: [
      { input: "1 2 3 4 5", expectedOutput: "3" },
      { input: "1 2", expectedOutput: "1" },
    ],
    hiddenTests: [{ input: "1", expectedOutput: "0", isHidden: true }],
    starterCode: makeStarter(`vals = input().split()\nnodes = [None if v == 'null' else int(v) for v in vals]\ndiameter = 0\ndef depth(i):\n    global diameter\n    if i >= len(nodes) or nodes[i] is None: return 0\n    l = depth(2*i+1)\n    r = depth(2*i+2)\n    diameter = max(diameter, l + r)\n    return 1 + max(l, r)\ndepth(0)\nprint(diameter)`),
    xpReward: 100,
  },

  // === Graphs Advanced ===
  {
    id: "dijkstra", title: "Dijkstra's Shortest Path", difficulty: "hard", category: "Graph", topicId: "graphs-advanced",
    description: "Find shortest path from node 0 to all other nodes in a weighted graph.\nFirst line: n edges. Next lines: u v weight.\nPrint distances from 0 to each node.",
    constraints: ["1 ≤ n ≤ 10⁴"],
    examples: [
      { input: "4 5\n0 1 1\n0 2 4\n1 2 2\n1 3 6\n2 3 3", expectedOutput: "0 1 3 6" },
    ],
    hiddenTests: [{ input: "2 1\n0 1 5", expectedOutput: "0 5", isHidden: true }],
    starterCode: makeStarter(`import heapq\nfrom collections import defaultdict\nn, e = map(int, input().split())\nadj = defaultdict(list)\nfor _ in range(e):\n    u, v, w = map(int, input().split())\n    adj[u].append((v, w)); adj[v].append((u, w))\ndist = [float('inf')] * n; dist[0] = 0\npq = [(0, 0)]\nwhile pq:\n    d, u = heapq.heappop(pq)\n    if d > dist[u]: continue\n    for v, w in adj[u]:\n        if dist[u] + w < dist[v]:\n            dist[v] = dist[u] + w\n            heapq.heappush(pq, (dist[v], v))\nprint(' '.join(str(d) if d != float('inf') else '-1' for d in dist))`),
    xpReward: 200,
  },
  {
    id: "word-ladder", title: "Word Ladder", difficulty: "hard", category: "Graph", topicId: "graphs-advanced",
    description: "Find the shortest transformation sequence length from beginWord to endWord, changing one letter at a time.",
    constraints: ["1 ≤ wordList.length ≤ 5000"],
    examples: [
      { input: "hit\ncog\nhot dot dog lot log cog", expectedOutput: "5" },
      { input: "hit\ncog\nhot dot dog lot log", expectedOutput: "0" },
    ],
    hiddenTests: [{ input: "a\nc\na b c", expectedOutput: "2", isHidden: true }],
    starterCode: makeStarter(`from collections import deque\nbegin = input().strip()\nend = input().strip()\nwords = set(input().strip().split())\nif end not in words: print(0); exit()\nq = deque([(begin, 1)])\nvisited = {begin}\nwhile q:\n    word, dist = q.popleft()\n    for i in range(len(word)):\n        for c in 'abcdefghijklmnopqrstuvwxyz':\n            nw = word[:i] + c + word[i+1:]\n            if nw == end: print(dist + 1); exit()\n            if nw in words and nw not in visited:\n                visited.add(nw)\n                q.append((nw, dist + 1))\nprint(0)`),
    xpReward: 200,
  },

  // === Tries ===
  {
    id: "implement-trie", title: "Implement Trie", difficulty: "hard", category: "Trie", topicId: "tries",
    description: "Implement a trie with insert, search, and startsWith operations.\nProcess commands: insert word, search word, prefix word.",
    constraints: ["1 ≤ ops ≤ 3×10⁴"],
    examples: [
      { input: "insert apple\nsearch apple\nsearch app\nprefix app\ninsert app\nsearch app", expectedOutput: "true\nfalse\ntrue\ntrue" },
    ],
    hiddenTests: [{ input: "insert a\nsearch a\nprefix b", expectedOutput: "true\nfalse", isHidden: true }],
    starterCode: makeStarter(`import sys\nclass TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.end = False\nroot = TrieNode()\ndef insert(word):\n    node = root\n    for c in word:\n        if c not in node.children: node.children[c] = TrieNode()\n        node = node.children[c]\n    node.end = True\ndef search(word):\n    node = root\n    for c in word:\n        if c not in node.children: return False\n        node = node.children[c]\n    return node.end\ndef starts_with(prefix):\n    node = root\n    for c in prefix:\n        if c not in node.children: return False\n        node = node.children[c]\n    return True\nfor line in sys.stdin:\n    parts = line.strip().split()\n    if parts[0] == 'insert': insert(parts[1])\n    elif parts[0] == 'search': print("true" if search(parts[1]) else "false")\n    elif parts[0] == 'prefix': print("true" if starts_with(parts[1]) else "false")`),
    xpReward: 150,
  },
  {
    id: "word-search-trie", title: "Word Search II", difficulty: "hard", category: "Trie", topicId: "tries",
    description: "Given a board and list of words, find all words that exist in the board (adjacent cells, each used once).\nFirst line: rows cols. Then board. Then words.",
    constraints: ["1 ≤ m, n ≤ 12"],
    examples: [
      { input: "4 4\noaan\netae\nihkr\niflv\noath pea eat rain", expectedOutput: "eat oath" },
    ],
    hiddenTests: [{ input: "1 1\na\na", expectedOutput: "a", isHidden: true }],
    starterCode: makeStarter(`r, c = map(int, input().split())\nboard = [list(input().strip()) for _ in range(r)]\nwords = input().strip().split()\nfound = set()\nfor word in words:\n    def dfs(i, j, k, visited):\n        if k == len(word): return True\n        if i<0 or i>=r or j<0 or j>=c or (i,j) in visited or board[i][j] != word[k]: return False\n        visited.add((i,j))\n        for di,dj in [(0,1),(0,-1),(1,0),(-1,0)]:\n            if dfs(i+di,j+dj,k+1,visited): return True\n        visited.discard((i,j))\n        return False\n    for i in range(r):\n        for j in range(c):\n            if dfs(i,j,0,set()): found.add(word); break\n        else: continue\n        break\nprint(' '.join(sorted(found)))`),
    xpReward: 200,
  },

  // === Segment Tree ===
  {
    id: "range-sum-segment", title: "Range Sum Query (Segment Tree)", difficulty: "hard", category: "Segment Tree", topicId: "segment-tree",
    description: "Build a segment tree for range sum queries. Process update and query operations.\nFirst line: array. Then operations: update idx val OR query l r.",
    constraints: ["1 ≤ n ≤ 10⁵"],
    examples: [
      { input: "1 3 5 7 9 11\nquery 1 3\nupdate 1 10\nquery 1 3", expectedOutput: "15\n22" },
    ],
    hiddenTests: [{ input: "1\nquery 0 0", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`import sys\narr = list(map(int, input().split()))\nn = len(arr)\ntree = [0] * (4 * n)\ndef build(i, l, r):\n    if l == r: tree[i] = arr[l]; return\n    m = (l+r)//2\n    build(2*i,l,m); build(2*i+1,m+1,r)\n    tree[i] = tree[2*i] + tree[2*i+1]\ndef update(i, l, r, idx, val):\n    if l == r: tree[i] = val; arr[idx] = val; return\n    m = (l+r)//2\n    if idx <= m: update(2*i,l,m,idx,val)\n    else: update(2*i+1,m+1,r,idx,val)\n    tree[i] = tree[2*i] + tree[2*i+1]\ndef query(i, l, r, ql, qr):\n    if ql > r or qr < l: return 0\n    if ql <= l and r <= qr: return tree[i]\n    m = (l+r)//2\n    return query(2*i,l,m,ql,qr) + query(2*i+1,m+1,r,ql,qr)\nbuild(1, 0, n-1)\nfor line in sys.stdin:\n    parts = line.strip().split()\n    if parts[0] == 'query': print(query(1,0,n-1,int(parts[1]),int(parts[2])))\n    elif parts[0] == 'update': update(1,0,n-1,int(parts[1]),int(parts[2]))`),
    xpReward: 200,
  },
  {
    id: "range-min-segment", title: "Range Minimum Query", difficulty: "hard", category: "Segment Tree", topicId: "segment-tree",
    description: "Build a segment tree for range minimum queries.\nFirst line: array. Then queries: l r.",
    constraints: ["1 ≤ n ≤ 10⁵"],
    examples: [
      { input: "1 3 2 7 9 11\n0 2\n1 4", expectedOutput: "1\n2" },
    ],
    hiddenTests: [{ input: "5\n0 0", expectedOutput: "5", isHidden: true }],
    starterCode: makeStarter(`import sys\narr = list(map(int, input().split()))\nn = len(arr)\ntree = [0] * (4 * n)\ndef build(i, l, r):\n    if l == r: tree[i] = arr[l]; return\n    m = (l+r)//2\n    build(2*i,l,m); build(2*i+1,m+1,r)\n    tree[i] = min(tree[2*i], tree[2*i+1])\ndef query(i, l, r, ql, qr):\n    if ql > r or qr < l: return float('inf')\n    if ql <= l and r <= qr: return tree[i]\n    m = (l+r)//2\n    return min(query(2*i,l,m,ql,qr), query(2*i+1,m+1,r,ql,qr))\nbuild(1, 0, n-1)\nfor line in sys.stdin:\n    l, r = map(int, line.strip().split())\n    print(query(1,0,n-1,l,r))`),
    xpReward: 150,
  },

  // === Fenwick Tree ===
  {
    id: "fenwick-prefix-sum", title: "Fenwick Tree (BIT)", difficulty: "hard", category: "Fenwick Tree", topicId: "fenwick-tree",
    description: "Implement a Fenwick tree for prefix sum queries and point updates.\nFirst line: array. Then: update idx val OR query idx (prefix sum 0..idx).",
    constraints: ["1 ≤ n ≤ 10⁵"],
    examples: [
      { input: "1 2 3 4 5\nquery 2\nupdate 1 5\nquery 2", expectedOutput: "6\n9" },
    ],
    hiddenTests: [{ input: "1\nquery 0", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`import sys\narr = list(map(int, input().split()))\nn = len(arr)\nbit = [0] * (n + 1)\ndef update(i, delta):\n    i += 1\n    while i <= n:\n        bit[i] += delta\n        i += i & (-i)\ndef query(i):\n    s = 0; i += 1\n    while i > 0:\n        s += bit[i]\n        i -= i & (-i)\n    return s\nfor i in range(n): update(i, arr[i])\nfor line in sys.stdin:\n    parts = line.strip().split()\n    if parts[0] == 'query': print(query(int(parts[1])))\n    elif parts[0] == 'update':\n        idx, val = int(parts[1]), int(parts[2])\n        update(idx, val - arr[idx])\n        arr[idx] = val`),
    xpReward: 150,
  },
  {
    id: "count-inversions", title: "Count Inversions", difficulty: "hard", category: "Fenwick Tree", topicId: "fenwick-tree",
    description: "Count the number of inversions in an array (pairs where i < j but arr[i] > arr[j]).",
    constraints: ["1 ≤ n ≤ 10⁵"],
    examples: [
      { input: "2 4 1 3 5", expectedOutput: "3" },
      { input: "1 2 3", expectedOutput: "0" },
    ],
    hiddenTests: [{ input: "3 2 1", expectedOutput: "3", isHidden: true }],
    starterCode: makeStarter(`arr = list(map(int, input().split()))\ndef merge_count(arr):\n    if len(arr) <= 1: return arr, 0\n    mid = len(arr) // 2\n    left, lc = merge_count(arr[:mid])\n    right, rc = merge_count(arr[mid:])\n    merged = []; count = lc + rc\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]: merged.append(left[i]); i += 1\n        else: merged.append(right[j]); count += len(left) - i; j += 1\n    merged.extend(left[i:]); merged.extend(right[j:])\n    return merged, count\n_, inversions = merge_count(arr)\nprint(inversions)`),
    xpReward: 150,
  },

  // === Advanced Backtracking ===
  {
    id: "n-queens", title: "N-Queens", difficulty: "hard", category: "Backtracking", topicId: "advanced-backtracking",
    description: "Given n, return the number of distinct N-Queens solutions.",
    constraints: ["1 ≤ n ≤ 9"],
    examples: [
      { input: "4", expectedOutput: "2" },
      { input: "1", expectedOutput: "1" },
      { input: "8", expectedOutput: "92" },
    ],
    hiddenTests: [
      { input: "5", expectedOutput: "10", isHidden: true },
      { input: "6", expectedOutput: "4", isHidden: true },
    ],
    starterCode: makeStarter(`def solve(n):\n    count = 0\n    def bt(row, cols, d1, d2):\n        nonlocal count\n        if row == n: count += 1; return\n        for col in range(n):\n            if col not in cols and row-col not in d1 and row+col not in d2:\n                bt(row+1, cols|{col}, d1|{row-col}, d2|{row+col})\n    bt(0, set(), set(), set())\n    return count\nprint(solve(int(input())))`),
    xpReward: 200,
  },
  {
    id: "sudoku-solver", title: "Sudoku Solver", difficulty: "hard", category: "Backtracking", topicId: "advanced-backtracking",
    description: "Solve a 9x9 Sudoku puzzle. Print `true` if solvable, `false` otherwise.\nInput: 9 lines of 9 digits (0 for empty).",
    constraints: ["Board is 9×9"],
    examples: [
      { input: "530070000\n600195000\n098000060\n800060003\n400803001\n700020006\n060000280\n000419005\n000080079", expectedOutput: "true" },
    ],
    hiddenTests: [{ input: "000000000\n000000000\n000000000\n000000000\n000000000\n000000000\n000000000\n000000000\n000000000", expectedOutput: "true", isHidden: true }],
    starterCode: makeStarter(`board = [list(input().strip()) for _ in range(9)]\ndef is_valid(r, c, ch):\n    for i in range(9):\n        if board[r][i] == ch or board[i][c] == ch: return False\n    sr, sc = 3*(r//3), 3*(c//3)\n    for i in range(sr, sr+3):\n        for j in range(sc, sc+3):\n            if board[i][j] == ch: return False\n    return True\ndef solve():\n    for i in range(9):\n        for j in range(9):\n            if board[i][j] == '0':\n                for d in '123456789':\n                    if is_valid(i, j, d):\n                        board[i][j] = d\n                        if solve(): return True\n                        board[i][j] = '0'\n                return False\n    return True\nprint("true" if solve() else "false")`),
    xpReward: 200,
  },
  {
    id: "word-break", title: "Word Break", difficulty: "hard", category: "Backtracking", topicId: "advanced-backtracking",
    description: "Given a string s and a dictionary, determine if s can be segmented into dictionary words. Print `true` or `false`.",
    constraints: ["1 ≤ s.length ≤ 300"],
    examples: [
      { input: "leetcode\nleet code", expectedOutput: "true" },
      { input: "applepenapple\napple pen", expectedOutput: "true" },
      { input: "catsandog\ncats dog sand and cat", expectedOutput: "false" },
    ],
    hiddenTests: [{ input: "a\na", expectedOutput: "true", isHidden: true }],
    starterCode: makeStarter(`s = input().strip()\nwords = set(input().strip().split())\nn = len(s)\ndp = [False] * (n + 1)\ndp[0] = True\nfor i in range(1, n+1):\n    for j in range(i):\n        if dp[j] and s[j:i] in words:\n            dp[i] = True; break\nprint("true" if dp[n] else "false")`),
    xpReward: 150,
  },

  // === Bit Manipulation Hard ===
  {
    id: "subset-xor-max", title: "Maximum XOR Subset", difficulty: "hard", category: "Bits", topicId: "bit-manipulation-hard",
    description: "Find the maximum XOR value of any subset of the array.",
    constraints: ["1 ≤ n ≤ 10⁵"],
    examples: [
      { input: "9 8 5", expectedOutput: "13" },
      { input: "1 2 3 4", expectedOutput: "7" },
    ],
    hiddenTests: [{ input: "0", expectedOutput: "0", isHidden: true }],
    starterCode: makeStarter(`arr = list(map(int, input().split()))\nbasis = []\nfor x in arr:\n    cur = x\n    for b in basis:\n        cur = min(cur, cur ^ b)\n    if cur > 0:\n        basis.append(cur)\nresult = 0\nfor b in basis:\n    result = max(result, result ^ b)\nprint(result)`),
    xpReward: 200,
  },
  {
    id: "total-hamming-distance", title: "Total Hamming Distance", difficulty: "hard", category: "Bits", topicId: "bit-manipulation-hard",
    description: "Find the total Hamming distance between all pairs of integers in the array.",
    constraints: ["1 ≤ n ≤ 10⁴"],
    examples: [
      { input: "4 14 2", expectedOutput: "6" },
    ],
    hiddenTests: [{ input: "1", expectedOutput: "0", isHidden: true }],
    starterCode: makeStarter(`nums = list(map(int, input().split()))\nn = len(nums)\ntotal = 0\nfor bit in range(32):\n    ones = sum(1 for x in nums if x & (1 << bit))\n    total += ones * (n - ones)\nprint(total)`),
    xpReward: 150,
  },

  // === String Hard ===
  {
    id: "kmp-search", title: "KMP Pattern Search", difficulty: "hard", category: "Strings", topicId: "string-hard",
    description: "Implement KMP algorithm. Print all starting indices where pattern occurs in text.",
    constraints: ["1 ≤ text.length ≤ 10⁶"],
    examples: [
      { input: "AABAACAADAABAABA\nAABA", expectedOutput: "0 9 12" },
    ],
    hiddenTests: [{ input: "aaa\na", expectedOutput: "0 1 2", isHidden: true }],
    starterCode: makeStarter(`text = input().strip()\npat = input().strip()\ndef kmp(text, pat):\n    n, m = len(text), len(pat)\n    lps = [0] * m\n    j = 0\n    for i in range(1, m):\n        while j and pat[i] != pat[j]: j = lps[j-1]\n        if pat[i] == pat[j]: j += 1\n        lps[i] = j\n    results = []\n    j = 0\n    for i in range(n):\n        while j and text[i] != pat[j]: j = lps[j-1]\n        if text[i] == pat[j]: j += 1\n        if j == m:\n            results.append(i - m + 1)\n            j = lps[j-1]\n    return results\nprint(' '.join(map(str, kmp(text, pat))))`),
    xpReward: 200,
  },
  {
    id: "z-algorithm", title: "Z-Algorithm", difficulty: "hard", category: "Strings", topicId: "string-hard",
    description: "Compute the Z-array of a string. Z[i] = length of longest substring starting at i that matches a prefix of the string.",
    constraints: ["1 ≤ s.length ≤ 10⁶"],
    examples: [
      { input: "aabxaa", expectedOutput: "6 1 0 0 2 1" },
    ],
    hiddenTests: [{ input: "a", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`s = input().strip()\nn = len(s)\nz = [0] * n; z[0] = n\nl = r = 0\nfor i in range(1, n):\n    if i < r: z[i] = min(r - i, z[i - l])\n    while i + z[i] < n and s[z[i]] == s[i + z[i]]: z[i] += 1\n    if i + z[i] > r: l, r = i, i + z[i]\nprint(' '.join(map(str, z)))`),
    xpReward: 150,
  },

  // === Matrix Advanced ===
  {
    id: "maximal-rectangle", title: "Maximal Rectangle", difficulty: "hard", category: "Matrix", topicId: "matrix-advanced",
    description: "Given a binary matrix, find the largest rectangle containing only 1's.\nFirst line: rows cols. Then the matrix.",
    constraints: ["1 ≤ rows, cols ≤ 200"],
    examples: [
      { input: "4 5\n10100\n10111\n11111\n10010", expectedOutput: "6" },
    ],
    hiddenTests: [{ input: "1 1\n0", expectedOutput: "0", isHidden: true }],
    starterCode: makeStarter(`r, c = map(int, input().split())\nmatrix = [input().strip() for _ in range(r)]\nheights = [0] * c\nmax_area = 0\nfor i in range(r):\n    for j in range(c):\n        heights[j] = heights[j] + 1 if matrix[i][j] == '1' else 0\n    stack = []\n    for j, h in enumerate(heights + [0]):\n        while stack and heights[stack[-1]] > h:\n            height = heights[stack.pop()]\n            width = j if not stack else j - stack[-1] - 1\n            max_area = max(max_area, height * width)\n        stack.append(j)\nprint(max_area)`),
    xpReward: 200,
  },
  {
    id: "matrix-chain-mult", title: "Matrix Chain Multiplication", difficulty: "hard", category: "Matrix", topicId: "matrix-advanced",
    description: "Find the minimum number of multiplications to multiply a chain of matrices.\nInput: dimensions array (p). Matrix i has dimensions p[i-1] × p[i].",
    constraints: ["2 ≤ n ≤ 100"],
    examples: [
      { input: "40 20 30 10 30", expectedOutput: "26000" },
      { input: "10 20 30", expectedOutput: "6000" },
    ],
    hiddenTests: [{ input: "10 30", expectedOutput: "0", isHidden: true }],
    starterCode: makeStarter(`p = list(map(int, input().split()))\nn = len(p) - 1\ndp = [[0]*n for _ in range(n)]\nfor length in range(2, n+1):\n    for i in range(n - length + 1):\n        j = i + length - 1\n        dp[i][j] = float('inf')\n        for k in range(i, j):\n            cost = dp[i][k] + dp[k+1][j] + p[i]*p[k+1]*p[j+1]\n            dp[i][j] = min(dp[i][j], cost)\nprint(dp[0][n-1])`),
    xpReward: 200,
  },

  // === Union Find ===
  {
    id: "union-find-basic", title: "Union-Find Connected Components", difficulty: "hard", category: "Union Find", topicId: "union-find",
    description: "Given n nodes and edges, find the number of connected components.\nFirst line: n edges. Next lines: u v.",
    constraints: ["1 ≤ n ≤ 10⁵"],
    examples: [
      { input: "5 3\n0 1\n1 2\n3 4", expectedOutput: "2" },
    ],
    hiddenTests: [{ input: "3 0", expectedOutput: "3", isHidden: true }],
    starterCode: makeStarter(`n, e = map(int, input().split())\nparent = list(range(n))\nrank = [0] * n\ndef find(x):\n    while parent[x] != x:\n        parent[x] = parent[parent[x]]\n        x = parent[x]\n    return x\ndef union(a, b):\n    a, b = find(a), find(b)\n    if a == b: return\n    if rank[a] < rank[b]: a, b = b, a\n    parent[b] = a\n    if rank[a] == rank[b]: rank[a] += 1\nfor _ in range(e):\n    u, v = map(int, input().split())\n    union(u, v)\nprint(len(set(find(i) for i in range(n))))`),
    xpReward: 150,
  },
  {
    id: "redundant-connection", title: "Redundant Connection", difficulty: "hard", category: "Union Find", topicId: "union-find",
    description: "Find the edge that can be removed to make the graph a tree.\nFirst line: n (edges = n). Next lines: u v.",
    constraints: ["3 ≤ n ≤ 1000"],
    examples: [
      { input: "3\n1 2\n1 3\n2 3", expectedOutput: "2 3" },
    ],
    hiddenTests: [{ input: "4\n1 2\n2 3\n3 4\n1 4", expectedOutput: "1 4", isHidden: true }],
    starterCode: makeStarter(`n = int(input())\nparent = list(range(n+1))\ndef find(x):\n    while parent[x] != x:\n        parent[x] = parent[parent[x]]\n        x = parent[x]\n    return x\nfor _ in range(n):\n    u, v = map(int, input().split())\n    if find(u) == find(v):\n        print(u, v)\n    else:\n        parent[find(u)] = find(v)`),
    xpReward: 150,
  },

  // === Advanced Greedy ===
  {
    id: "interval-scheduling-max", title: "Non-Overlapping Intervals", difficulty: "hard", category: "Greedy", topicId: "advanced-greedy",
    description: "Find the minimum number of intervals to remove to make the rest non-overlapping.\nFirst line: n. Next lines: start end.",
    constraints: ["1 ≤ n ≤ 10⁵"],
    examples: [
      { input: "4\n1 2\n2 3\n3 4\n1 3", expectedOutput: "1" },
    ],
    hiddenTests: [{ input: "3\n1 2\n1 2\n1 2", expectedOutput: "2", isHidden: true }],
    starterCode: makeStarter(`n = int(input())\nintervals = [tuple(map(int, input().split())) for _ in range(n)]\nintervals.sort(key=lambda x: x[1])\nend = float('-inf')\nkeep = 0\nfor s, e in intervals:\n    if s >= end:\n        keep += 1\n        end = e\nprint(n - keep)`),
    xpReward: 150,
  },
  {
    id: "task-scheduler", title: "Task Scheduler", difficulty: "hard", category: "Greedy", topicId: "advanced-greedy",
    description: "Given tasks (chars) and cooldown n, find the minimum intervals to execute all tasks.",
    constraints: ["1 ≤ tasks ≤ 10⁴"],
    examples: [
      { input: "AAABBBCCC\n2", expectedOutput: "9" },
      { input: "AAABBB\n2", expectedOutput: "8" },
    ],
    hiddenTests: [{ input: "A\n0", expectedOutput: "1", isHidden: true }],
    starterCode: makeStarter(`from collections import Counter\ntasks = input().strip()\ncooldown = int(input())\nfreq = Counter(tasks)\nmax_f = max(freq.values())\nmax_count = sum(1 for v in freq.values() if v == max_f)\nresult = max(len(tasks), (max_f - 1) * (cooldown + 1) + max_count)\nprint(result)`),
    xpReward: 150,
  },

  // === Advanced Sorting ===
  {
    id: "counting-sort", title: "Counting Sort", difficulty: "hard", category: "Sorting", topicId: "advanced-sorting",
    description: "Implement counting sort for non-negative integers.",
    constraints: ["1 ≤ n ≤ 10⁶", "0 ≤ arr[i] ≤ 10⁶"],
    examples: [
      { input: "4 2 2 8 3 3 1", expectedOutput: "1 2 2 3 3 4 8" },
    ],
    hiddenTests: [{ input: "0 0 0", expectedOutput: "0 0 0", isHidden: true }],
    starterCode: makeStarter(`arr = list(map(int, input().split()))\nif not arr: print(); exit()\nmax_val = max(arr)\ncount = [0] * (max_val + 1)\nfor x in arr: count[x] += 1\nresult = []\nfor i, c in enumerate(count):\n    result.extend([i] * c)\nprint(' '.join(map(str, result)))`),
    xpReward: 100,
  },
  {
    id: "custom-sort-comparator", title: "Custom Sort (Largest Number)", difficulty: "hard", category: "Sorting", topicId: "advanced-sorting",
    description: "Arrange numbers to form the largest possible number. Print the result.",
    constraints: ["1 ≤ n ≤ 100"],
    examples: [
      { input: "10 2", expectedOutput: "210" },
      { input: "3 30 34 5 9", expectedOutput: "9534330" },
    ],
    hiddenTests: [{ input: "0 0", expectedOutput: "0", isHidden: true }],
    starterCode: makeStarter(`from functools import cmp_to_key\nnums = input().split()\nnums.sort(key=cmp_to_key(lambda a, b: -1 if a+b > b+a else 1 if a+b < b+a else 0))\nresult = ''.join(nums)\nprint('0' if result[0] == '0' else result)`),
    xpReward: 150,
  },

  // === Advanced Math ===
  {
    id: "mod-inverse", title: "Modular Inverse", difficulty: "hard", category: "Math", topicId: "advanced-math",
    description: "Find the modular multiplicative inverse of a under mod m using extended Euclidean. Print -1 if none.",
    constraints: ["1 ≤ a, m ≤ 10⁹"],
    examples: [
      { input: "3 11", expectedOutput: "4" },
      { input: "10 17", expectedOutput: "12" },
    ],
    hiddenTests: [{ input: "2 4", expectedOutput: "-1", isHidden: true }],
    starterCode: makeStarter(`def extended_gcd(a, b):\n    if a == 0: return b, 0, 1\n    g, x, y = extended_gcd(b % a, a)\n    return g, y - (b // a) * x, x\na, m = map(int, input().split())\ng, x, _ = extended_gcd(a % m, m)\nif g != 1: print(-1)\nelse: print((x % m + m) % m)`),
    xpReward: 150,
  },
  {
    id: "euler-totient", title: "Euler's Totient Function", difficulty: "hard", category: "Math", topicId: "advanced-math",
    description: "Compute Euler's totient φ(n) — count of integers 1..n that are coprime with n.",
    constraints: ["1 ≤ n ≤ 10⁹"],
    examples: [
      { input: "10", expectedOutput: "4" },
      { input: "1", expectedOutput: "1" },
      { input: "36", expectedOutput: "12" },
    ],
    hiddenTests: [{ input: "7", expectedOutput: "6", isHidden: true }],
    starterCode: makeStarter(`n = int(input())\nresult = n\np = 2\ntemp = n\nwhile p * p <= temp:\n    if temp % p == 0:\n        while temp % p == 0: temp //= p\n        result -= result // p\n    p += 1\nif temp > 1: result -= result // temp\nprint(result)`),
    xpReward: 150,
  },

  // === System Design Mini ===
  {
    id: "lru-cache", title: "LRU Cache", difficulty: "hard", category: "Design", topicId: "system-design-mini",
    description: "Implement an LRU Cache with get/put operations in O(1).\nFirst line: capacity. Then operations.",
    constraints: ["1 ≤ capacity ≤ 3000"],
    examples: [
      { input: "2\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2\nput 4 4\nget 1\nget 3\nget 4", expectedOutput: "1\n-1\n-1\n3\n4" },
    ],
    hiddenTests: [{ input: "1\nput 2 1\nget 2\nput 3 2\nget 2\nget 3", expectedOutput: "1\n-1\n2", isHidden: true }],
    starterCode: makeStarter(`from collections import OrderedDict\nimport sys\nclass LRUCache:\n    def __init__(self, cap):\n        self.cap = cap\n        self.cache = OrderedDict()\n    def get(self, key):\n        if key not in self.cache: return -1\n        self.cache.move_to_end(key)\n        return self.cache[key]\n    def put(self, key, val):\n        if key in self.cache: self.cache.move_to_end(key)\n        self.cache[key] = val\n        if len(self.cache) > self.cap: self.cache.popitem(last=False)\ncap = int(input())\ncache = LRUCache(cap)\nfor line in sys.stdin:\n    parts = line.strip().split()\n    if parts[0] == 'get': print(cache.get(int(parts[1])))\n    elif parts[0] == 'put': cache.put(int(parts[1]), int(parts[2]))`),
    xpReward: 200,
  },
  {
    id: "rate-limiter", title: "Rate Limiter", difficulty: "hard", category: "Design", topicId: "system-design-mini",
    description: "Implement a rate limiter: allow at most k requests per window of w seconds.\nFirst line: k w. Then requests: timestamp.",
    constraints: ["1 ≤ k ≤ 10⁶"],
    examples: [
      { input: "2 5\n1\n2\n3\n6", expectedOutput: "true\ntrue\nfalse\ntrue" },
    ],
    hiddenTests: [{ input: "1 1\n1\n1", expectedOutput: "true\nfalse", isHidden: true }],
    starterCode: makeStarter(`from collections import deque\nimport sys\nk, w = map(int, input().split())\nwindow = deque()\nfor line in sys.stdin:\n    t = int(line.strip())\n    while window and window[0] <= t - w: window.popleft()\n    if len(window) < k:\n        window.append(t)\n        print("true")\n    else:\n        print("false")`),
    xpReward: 150,
  },
  {
    id: "hash-map-design", title: "Design HashMap", difficulty: "medium", category: "Design", topicId: "system-design-mini",
    description: "Implement a basic HashMap with put, get, and remove.\nCommands: put key value, get key, remove key.",
    constraints: ["0 ≤ key, value ≤ 10⁶"],
    examples: [
      { input: "put 1 1\nput 2 2\nget 1\nget 3\nput 2 1\nget 2\nremove 2\nget 2", expectedOutput: "1\n-1\n1\n-1" },
    ],
    hiddenTests: [{ input: "put 0 0\nget 0", expectedOutput: "0", isHidden: true }],
    starterCode: makeStarter(`import sys\nhm = {}\nfor line in sys.stdin:\n    parts = line.strip().split()\n    if parts[0] == 'put': hm[int(parts[1])] = int(parts[2])\n    elif parts[0] == 'get': print(hm.get(int(parts[1]), -1))\n    elif parts[0] == 'remove': hm.pop(int(parts[1]), None)`),
    xpReward: 100,
  },
];

// ═══════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════

export function getProblemsForTopic(topicId: string): CodingProblem[] {
  return codingProblems.filter(p => p.topicId === topicId);
}

export function getProblemsFiltered(difficulty?: string, search?: string): CodingProblem[] {
  let result = [...codingProblems];
  if (difficulty && difficulty !== "All") {
    result = result.filter(p => p.difficulty === difficulty.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }
  return result;
}
