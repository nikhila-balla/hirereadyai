import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, Send, Terminal, CheckCircle, XCircle, Loader2, Search } from "lucide-react";
import Editor from "@monaco-editor/react";
import GlassCard from "@/components/GlassCard";
import {
  codingTopics,
  getTopicsFiltered,
  getProblemsForTopic,
  languageOptions,
  getMonacoLanguage,
  levelFilters,
  type CodingProblem,
  type CodingTopic,
  type LanguageId,
} from "@/data/codingProblems";
import { useBattlePass } from "@/hooks/useBattlePass";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PISTON_API = "https://emkc.org/api/v2/piston/execute";

interface TestResult {
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
  isHidden?: boolean;
}

const levelColors = {
  basic: { bg: "bg-neon-green/10", text: "text-neon-green", border: "border-neon-green/30" },
  intermediate: { bg: "bg-neon-orange/10", text: "text-neon-orange", border: "border-neon-orange/30" },
  advanced: { bg: "bg-destructive/10", text: "text-destructive", border: "border-destructive/30" },
};

export default function CodingPlayground() {
  const { user } = useAuth();
  const { awardXP } = useBattlePass();

  // Navigation: topics → problems → editor
  const [selectedTopic, setSelectedTopic] = useState<CodingTopic | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<CodingProblem | null>(null);
  const [language, setLanguage] = useState<LanguageId>("python");
  const [code, setCode] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [output, setOutput] = useState("");
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [allPassed, setAllPassed] = useState(false);

  const topics = getTopicsFiltered(levelFilter, searchQuery);

  const openTopic = (t: CodingTopic) => {
    setSelectedTopic(t);
    setSelectedProblem(null);
  };

  const openProblem = (p: CodingProblem) => {
    setSelectedProblem(p);
    setCode(p.starterCode[language] || "");
    setOutput("");
    setTestResults([]);
    setAllPassed(false);
  };

  const switchLanguage = (lang: LanguageId) => {
    setLanguage(lang);
    if (selectedProblem) setCode(selectedProblem.starterCode[lang] || "");
  };

  const executeCode = useCallback(async (stdin: string): Promise<string> => {
    const langInfo = languageOptions.find((l) => l.id === language)!;
    const res = await fetch(PISTON_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: langInfo.pistonLang, version: langInfo.version, files: [{ content: code }], stdin }),
    });
    const data = await res.json();
    if (data.run?.stderr) throw new Error(data.run.stderr);
    return (data.run?.stdout || "").trim();
  }, [code, language]);

  const handleRun = async () => {
    if (!selectedProblem) return;
    setRunning(true); setOutput(""); setTestResults([]);
    try {
      const result = await executeCode(selectedProblem.examples[0].input);
      setOutput(result);
    } catch (err) { setOutput(`Error:\n${err instanceof Error ? err.message : String(err)}`); }
    setRunning(false);
  };

  const handleSubmit = async () => {
    if (!selectedProblem) return;
    setSubmitting(true); setOutput("");
    const allTests = [...selectedProblem.examples, ...selectedProblem.hiddenTests];
    const results: TestResult[] = [];
    let passed = 0;
    for (const test of allTests) {
      try {
        const actual = await executeCode(test.input);
        const ok = actual.trim() === test.expectedOutput.trim();
        if (ok) passed++;
        results.push({ input: test.isHidden ? "Hidden" : test.input, expected: test.isHidden ? "Hidden" : test.expectedOutput, actual: test.isHidden ? (ok ? "✓" : "✗") : actual, passed: ok, isHidden: test.isHidden });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        results.push({ input: test.isHidden ? "Hidden" : test.input, expected: test.isHidden ? "Hidden" : test.expectedOutput, actual: msg.slice(0, 100), passed: false, isHidden: test.isHidden });
      }
    }
    setTestResults(results);
    const all = passed === allTests.length;
    setAllPassed(all);
    if (all && user) {
      const xp = await awardXP("coding", selectedProblem.xpReward, selectedProblem.xpReward);
      try {
        await supabase.from("practice_results").insert({ user_id: user.id, category: "coding", topic: selectedTopic?.title || selectedProblem.category, score: passed, total_questions: allTests.length, xp_earned: xp });
        toast.success(`🎉 All tests passed! +${xp} XP`);
      } catch { toast.error("Failed to save results"); }
    } else if (!all) { toast.error(`${passed}/${allTests.length} tests passed`); }
    setSubmitting(false);
  };

  // ── Problem Editor View ──
  if (selectedProblem) {
    return (
      <div className="flex flex-col h-[calc(100vh-6rem)]">
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card/50">
          <div className="flex items-center gap-3">
            <button onClick={() => setSelectedProblem(null)} className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"><ArrowLeft className="w-4 h-4" /></button>
            <h2 className="font-heading font-bold text-sm text-foreground">{selectedProblem.title}</h2>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-display ${selectedProblem.difficulty === "easy" ? "bg-neon-green/10 text-neon-green" : selectedProblem.difficulty === "medium" ? "bg-neon-orange/10 text-neon-orange" : "bg-destructive/10 text-destructive"}`}>{selectedProblem.difficulty.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-2">
            {languageOptions.map((l) => (
              <button key={l.id} onClick={() => switchLanguage(l.id)} className={`text-xs px-3 py-1.5 rounded-lg font-display transition-all ${language === l.id ? "bg-primary/15 text-primary border border-primary/30" : "text-muted-foreground hover:text-foreground border border-transparent hover:bg-muted/30"}`}>{l.label}</button>
            ))}
          </div>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="w-[380px] border-r border-border overflow-y-auto p-4 space-y-4 bg-card/30">
            <div><h3 className="font-heading font-bold text-foreground mb-2">Description</h3><p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{selectedProblem.description}</p></div>
            <div><h4 className="font-heading font-semibold text-foreground text-sm mb-1">Constraints</h4><ul className="text-xs text-muted-foreground space-y-1">{selectedProblem.constraints.map((c, i) => <li key={i} className="flex items-start gap-1"><span className="text-primary">•</span> {c}</li>)}</ul></div>
            <div><h4 className="font-heading font-semibold text-foreground text-sm mb-2">Examples</h4>{selectedProblem.examples.map((ex, i) => (
              <div key={i} className="mb-3 rounded-lg bg-muted/20 border border-border p-3">
                <p className="text-[10px] text-muted-foreground mb-1 font-display">Example {i + 1}</p>
                <div className="text-xs font-mono"><p className="text-muted-foreground"><span className="text-primary">Input:</span> {ex.input.replace(/\n/g, " | ")}</p><p className="text-muted-foreground"><span className="text-neon-green">Output:</span> {ex.expectedOutput}</p></div>
              </div>
            ))}</div>
            {selectedProblem.xpReward && <div className="text-xs text-muted-foreground flex items-center gap-1">🏆 Reward: <span className="text-primary font-display font-bold">+{selectedProblem.xpReward} XP</span></div>}
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex-1 min-h-0">
              <Editor height="100%" language={getMonacoLanguage(language)} value={code} onChange={(v) => setCode(v || "")} theme="vs-dark" options={{ fontSize: 14, minimap: { enabled: false }, padding: { top: 12 }, scrollBeyondLastLine: false, lineNumbers: "on", automaticLayout: true }} />
            </div>
            <div className="border-t border-border bg-card/50">
              <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-muted-foreground" /><span className="text-xs font-display text-muted-foreground">Console</span>
                  {testResults.length > 0 && <span className={`text-[10px] px-2 py-0.5 rounded-full font-display ${allPassed ? "bg-neon-green/10 text-neon-green" : "bg-destructive/10 text-destructive"}`}>{allPassed ? "ALL PASSED" : `${testResults.filter(t => t.passed).length}/${testResults.length} PASSED`}</span>}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={handleRun} disabled={running || submitting} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-display bg-muted/30 border border-border hover:bg-muted/50 text-foreground transition-colors disabled:opacity-50">{running ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}Run</button>
                  <button onClick={handleSubmit} disabled={running || submitting} className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-display font-bold text-primary-foreground hover:scale-105 transition-transform disabled:opacity-50" style={{ background: "var(--gradient-cyber)" }}>{submitting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}Submit</button>
                </div>
              </div>
              <div className="h-36 overflow-y-auto p-3 font-mono text-xs">
                {testResults.length > 0 ? (
                  <div className="space-y-2">{testResults.map((t, i) => (
                    <div key={i} className={`flex items-start gap-2 p-2 rounded-lg ${t.passed ? "bg-neon-green/5" : "bg-destructive/5"}`}>
                      {t.passed ? <CheckCircle className="w-3.5 h-3.5 text-neon-green mt-0.5 shrink-0" /> : <XCircle className="w-3.5 h-3.5 text-destructive mt-0.5 shrink-0" />}
                      <div className="text-muted-foreground"><span className="font-display">{t.isHidden ? `Hidden Test ${i + 1}` : `Test ${i + 1}`}: </span>{t.isHidden ? <span className={t.passed ? "text-neon-green" : "text-destructive"}>{t.passed ? "Passed" : "Failed"}</span> : <><span className="text-foreground">{t.actual}</span>{!t.passed && <span className="text-destructive"> (expected: {t.expected})</span>}</>}</div>
                    </div>
                  ))}</div>
                ) : output ? <pre className="text-muted-foreground whitespace-pre-wrap">{output}</pre> : <p className="text-muted-foreground/50">Click Run to test with the first example, or Submit to run all test cases.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Problems List for a Topic ──
  if (selectedTopic) {
    const problems = getProblemsForTopic(selectedTopic.id);
    const lc = levelColors[selectedTopic.level];
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setSelectedTopic(null)} className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"><ArrowLeft className="w-4 h-4" /></button>
          <h2 className="text-xl font-heading font-bold text-foreground">{selectedTopic.title}</h2>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-display ${lc.bg} ${lc.text}`}>{selectedTopic.level.toUpperCase()}</span>
          <span className="text-xs text-muted-foreground ml-auto">{problems.length} problems</span>
        </div>
        <p className="text-sm text-muted-foreground mb-6">{selectedTopic.description}</p>
        <div className="flex gap-2 mb-6">
          {languageOptions.map((l) => (
            <button key={l.id} onClick={() => setLanguage(l.id)} className={`text-xs px-3 py-1.5 rounded-lg font-display transition-all ${language === l.id ? "bg-primary/15 text-primary border border-primary/30" : "text-muted-foreground hover:text-foreground border border-transparent hover:bg-muted/30"}`}>{l.label}</button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <AnimatePresence mode="popLayout">
            {problems.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.03 }}>
                <button onClick={() => openProblem(p)} className="w-full p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all text-left group">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-heading font-semibold text-foreground group-hover:text-primary transition-colors">{i + 1}. {p.title}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-display ${p.difficulty === "easy" ? "bg-neon-green/10 text-neon-green" : p.difficulty === "medium" ? "bg-neon-orange/10 text-neon-orange" : "bg-destructive/10 text-destructive"}`}>{p.difficulty.toUpperCase()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">{p.category}</span>
                    <span className="text-[11px] text-primary font-display">+{p.xpReward} XP</span>
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {problems.length === 0 && <div className="text-center py-12"><p className="text-muted-foreground text-sm">No problems for this topic yet.</p></div>}
      </div>
    );
  }

  // ── Topics Grid ──
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search topics..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors" />
        </div>
        <div className="flex gap-1.5">
          {levelFilters.map((d) => (
            <button key={d} onClick={() => setLevelFilter(d)} className={`px-3 py-2 rounded-lg text-xs font-display font-medium transition-all ${levelFilter === d ? d === "Basic" ? "bg-neon-green/15 text-neon-green border border-neon-green/30" : d === "Intermediate" ? "bg-neon-orange/15 text-neon-orange border border-neon-orange/30" : d === "Advanced" ? "bg-destructive/15 text-destructive border border-destructive/30" : "bg-primary/15 text-primary border border-primary/30" : "text-muted-foreground hover:text-foreground border border-transparent hover:bg-muted/30"}`}>{d}</button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <AnimatePresence mode="popLayout">
          {topics.map((t, i) => {
            const lc = levelColors[t.level];
            return (
              <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.03 }}>
                <button onClick={() => openTopic(t)} className="w-full p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all text-left group">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-heading font-semibold text-foreground group-hover:text-primary transition-colors">{t.title}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-display ${lc.bg} ${lc.text}`}>{t.level.toUpperCase()}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mb-2 line-clamp-2">{t.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">{t.problemCount} problems</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-display">Open →</span>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {topics.length === 0 && <div className="text-center py-12"><p className="text-muted-foreground text-sm">No topics match your filters.</p></div>}
    </div>
  );
}
