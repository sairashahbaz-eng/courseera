import { createFileRoute, useNavigate, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Check } from "lucide-react";
import { useApp } from "@/lib/app-store";
import { INTERESTS } from "@/lib/course-data";

export const Route = createFileRoute("/interests")({
  component: InterestsPage,
});

const ICONS: Record<string, string> = {
  "Data Science": "📊", "Machine Learning": "🤖", "Web Development": "🌐",
  "Mobile Development": "📱", "Cloud Computing": "☁️", "Cybersecurity": "🛡️",
  "AI & Deep Learning": "🧠", "Business & Management": "💼", "Design & UX": "🎨",
  "Marketing": "📣", "Finance": "💰", "Personal Development": "✨",
};

function InterestsPage() {
  const { user, interests, setInterests } = useApp();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>(interests);

  if (!hydrated) return null;

if (!user) return <Navigate to="/auth" />;

  function toggle(i: string) {
    setSelected((s) => s.includes(i) ? s.filter((x) => x !== i) : [...s, i]);
  }

  function save() {
    setInterests(selected);
    navigate({ to: "/home" });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background py-12 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-10 animate-in fade-in slide-in-from-top-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Sparkles className="h-3.5 w-3.5" /> Personalize your feed
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">What sparks your curiosity?</h1>
          <p className="mt-3 text-muted-foreground">Pick at least 3 — we'll curate your homepage around them.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {INTERESTS.map((i, idx) => {
            const active = selected.includes(i);
            return (
              <button
                key={i}
                onClick={() => toggle(i)}
                className={`relative aspect-square rounded-2xl p-4 text-left transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 ${
                  active
                    ? "bg-gradient-to-br from-primary to-[#0d7a7c] text-white shadow-xl shadow-primary/30 scale-[1.02]"
                    : "bg-card border border-border/60 hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg"
                }`}
                style={{ animationDelay: `${idx * 50}ms`, animationFillMode: "both" }}
              >
                <div className="text-3xl mb-2">{ICONS[i]}</div>
                <div className="font-semibold text-sm leading-tight">{i}</div>
                {active && (
                  <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-white text-primary flex items-center justify-center animate-in zoom-in">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-in fade-in" style={{ animationDelay: "400ms", animationFillMode: "both" }}>
          <button
            onClick={save}
            disabled={selected.length < 3}
            className="h-12 px-8 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 active:scale-[0.98] transition shadow-lg shadow-primary/30 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {selected.length < 3 ? `Select ${3 - selected.length} more` : `Continue with ${selected.length} interests →`}
          </button>
          <button onClick={() => navigate({ to: "/home" })} className="text-sm text-muted-foreground hover:text-foreground transition">
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
