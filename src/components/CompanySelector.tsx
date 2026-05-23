import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Company {
  name: string;
  lpaLow: number;
  lpaHigh: number;
  focus: string;
  color: string;
}

interface CompanyTier {
  label: string;
  lpa: string;
  color: string;
  companies: Company[];
}

const companyTiers: CompanyTier[] = [
  {
    label: "Tier 3 · Mass Service",
    lpa: "3–6 LPA",
    color: "hsl(var(--primary))",
    companies: [
      { name: "Tech Mahindra", lpaLow: 3.2, lpaHigh: 6, focus: "Aptitude Heavy", color: "#6b7280" },
      { name: "TCS", lpaLow: 3.5, lpaHigh: 7, focus: "NQT Aptitude", color: "#00f5ff" },
      { name: "Wipro", lpaLow: 3.5, lpaHigh: 6.5, focus: "WILP Training", color: "#10b981" },
      { name: "HCL Tech", lpaLow: 3.5, lpaHigh: 7, focus: "Service-Based", color: "#6b7280" },
      { name: "Infosys", lpaLow: 3.6, lpaHigh: 8, focus: "HackWithInfy Coding", color: "#8b5cf6" },
      { name: "Cognizant GenC", lpaLow: 4, lpaHigh: 7, focus: "Genesis Program", color: "#3b82f6" },
      { name: "Capgemini", lpaLow: 4, lpaHigh: 8, focus: "Aptitude + Coding", color: "#2563eb" },
      { name: "DXC Technology", lpaLow: 4, lpaHigh: 7, focus: "Service", color: "#7c3aed" },
      { name: "Mphasis", lpaLow: 4.2, lpaHigh: 8, focus: "Digital Services", color: "#4f46e5" },
      { name: "Mindtree", lpaLow: 4, lpaHigh: 8, focus: "Digital", color: "#059669" },
      { name: "LTIMindtree", lpaLow: 4.5, lpaHigh: 8, focus: "Full Stack", color: "#0ea5e9" },
      { name: "Hexaware", lpaLow: 4.5, lpaHigh: 9, focus: "Automation", color: "#14b8a6" },
    ],
  },
  {
    label: "Tier 2 · Digital / Service",
    lpa: "6–15 LPA",
    color: "#10b981",
    companies: [
      { name: "Accenture", lpaLow: 4.5, lpaHigh: 12, focus: "Applied Intelligence", color: "#a855f7" },
      { name: "L&T Infotech", lpaLow: 6, lpaHigh: 12, focus: "Digital Engineering", color: "#0284c7" },
      { name: "Zoho", lpaLow: 8, lpaHigh: 20, focus: "Full Stack", color: "#dc2626" },
      { name: "Paytm", lpaLow: 8, lpaHigh: 18, focus: "Payments", color: "#2563eb" },
      { name: "Freshworks", lpaLow: 10, lpaHigh: 25, focus: "SaaS", color: "#f97316" },
      { name: "Zomato", lpaLow: 10, lpaHigh: 22, focus: "Scale + ML", color: "#dc2626" },
    ],
  },
  {
    label: "Tier 1 · Product Leaders",
    lpa: "15–60 LPA",
    color: "#f59e0b",
    companies: [
      { name: "Razorpay", lpaLow: 12, lpaHigh: 25, focus: "Payments", color: "#2563eb" },
      { name: "ServiceNow", lpaLow: 12, lpaHigh: 25, focus: "ITSM", color: "#059669" },
      { name: "Deutsche Bank", lpaLow: 12, lpaHigh: 28, focus: "Risk + Quant", color: "#1d4ed8" },
      { name: "Cisco", lpaLow: 12, lpaHigh: 36, focus: "Networking", color: "#0891b2" },
      { name: "Swiggy", lpaLow: 12, lpaHigh: 25, focus: "Logistics", color: "#f97316" },
      { name: "Groww", lpaLow: 12, lpaHigh: 30, focus: "Investment", color: "#22c55e" },
      { name: "SAP Labs", lpaLow: 11, lpaHigh: 29, focus: "ERP", color: "#0ea5e9" },
      { name: "Adobe", lpaLow: 14, lpaHigh: 27, focus: "Creative Tech", color: "#ef4444" },
      { name: "PhonePe", lpaLow: 14, lpaHigh: 28, focus: "Fintech SDE", color: "#7c3aed" },
      { name: "Flipkart", lpaLow: 15, lpaHigh: 30, focus: "Ecommerce DSA", color: "#eab308" },
      { name: "Salesforce", lpaLow: 15, lpaHigh: 28, focus: "CRM Cloud", color: "#0ea5e9" },
      { name: "Intel", lpaLow: 15, lpaHigh: 28, focus: "Hardware + Software", color: "#2563eb" },
      { name: "JPMorgan", lpaLow: 15, lpaHigh: 35, focus: "Quant + Tech", color: "#1e3a5f" },
      { name: "Cred", lpaLow: 15, lpaHigh: 40, focus: "Fintech", color: "#a3a3a3" },
      { name: "Postman", lpaLow: 15, lpaHigh: 35, focus: "API Platform", color: "#f97316" },
      { name: "Amazon", lpaLow: 18, lpaHigh: 45, focus: "Leadership + Coding", color: "#ff00ff" },
      { name: "Goldman Sachs", lpaLow: 20, lpaHigh: 40, focus: "Quant + Tech", color: "#6366f1" },
      { name: "Microsoft", lpaLow: 20, lpaHigh: 50, focus: "Full Stack + Cloud", color: "#3b82f6" },
      { name: "Google", lpaLow: 25, lpaHigh: 55, focus: "Hard DSA + System Design", color: "#f59e0b" },
    ],
  },
];

interface CompanySelectorProps {
  onSelectionChange?: (selected: string[]) => void;
}

const CompanySelector = ({ onSelectionChange }: CompanySelectorProps) => {
  const { user } = useAuth();
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("company_selection")
      .select("company_name")
      .eq("user_id", user.id)
      .then(({ data }) => {
        if (data) {
          const names = data.map((d) => d.company_name);
          setSelected(names);
          onSelectionChange?.(names);
        }
      });
  }, [user, onSelectionChange]);

  const toggle = async (name: string) => {
    if (!user) return;
    const isSelected = selected.includes(name);

    if (isSelected) {
      await supabase.from("company_selection").delete().eq("user_id", user.id).eq("company_name", name);
      const next = selected.filter((s) => s !== name);
      setSelected(next);
      onSelectionChange?.(next);
    } else {
      await supabase.from("company_selection").insert({ user_id: user.id, company_name: name });
      const next = [...selected, name];
      setSelected(next);
      onSelectionChange?.(next);
      toast.success(`${name} added to your targets!`);
    }
  };

  const formatLpa = (low: number, high: number) =>
    low >= 10 ? `${low}–${high}L` : `${low}–${high}L`;

  return (
    <div className="space-y-5 max-h-[50vh] overflow-y-auto pr-1 scrollbar-thin">
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {selected.map((s) => (
            <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary font-display">
              {s}
            </span>
          ))}
        </div>
      )}

      {companyTiers.map((tier) => (
        <div key={tier.label}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-display font-bold text-muted-foreground uppercase tracking-wider">{tier.label}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-display">{tier.lpa}</span>
            <span className="text-[10px] text-muted-foreground">({tier.companies.length})</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {tier.companies.map((c, i) => {
              const active = selected.includes(c.name);
              return (
                <motion.button
                  key={c.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.02 }}
                  onClick={() => toggle(c.name)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    active
                      ? "border-primary/40 bg-primary/5 shadow-[0_0_12px_hsl(var(--primary)/0.15)]"
                      : "border-border hover:border-primary/20 glass-card"
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Building2 className="w-3 h-3 shrink-0" style={{ color: c.color }} />
                      <span className="text-xs font-heading font-bold text-foreground truncate">{c.name}</span>
                    </div>
                    {active && <Check className="w-3 h-3 text-neon-green shrink-0" />}
                  </div>
                  <p className="text-[9px] text-muted-foreground truncate">{c.focus}</p>
                  <p className="text-[10px] font-display text-primary mt-0.5">~{formatLpa(c.lpaLow, c.lpaHigh)}</p>
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompanySelector;
