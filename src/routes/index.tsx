import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { GraduationCap, Sparkles } from "lucide-react";
import { useApp } from "@/lib/app-store";

export const Route = createFileRoute("/")({
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  const { user } = useApp();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => {
      navigate({ to: user ? "/home" : "/auth" });
    }, 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [navigate, user]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#002333] via-[#0d3a4a] to-[#159A9C] flex items-center justify-center overflow-hidden">
      {/* Animated blobs */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/30 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#DEEFE7]/20 blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }} />

      <div className="relative text-center">
        <div className={`mx-auto mb-6 transition-all duration-700 ${phase >= 0 ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
          <div className="relative inline-flex">
            <div className="absolute inset-0 rounded-3xl bg-primary blur-2xl opacity-60 animate-pulse" />
            <div className="relative h-24 w-24 rounded-3xl bg-gradient-to-br from-white to-[#DEEFE7] flex items-center justify-center shadow-2xl">
              <GraduationCap className="h-12 w-12 text-[#002333]" />
              <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-amber-300 animate-pulse" />
            </div>
          </div>
        </div>
        <h1 className={`text-5xl sm:text-6xl font-black tracking-tight text-white transition-all duration-700 delay-200 ${phase >= 0 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          Course<span className="text-[#DEEFE7]">Mind</span>
        </h1>
        <p className={`mt-3 text-white/70 text-sm sm:text-base transition-all duration-700 delay-500 ${phase >= 1 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          Your AI learning companion
        </p>
        <div className={`mt-8 flex justify-center gap-1.5 transition-opacity duration-500 ${phase >= 2 ? "opacity-100" : "opacity-0"}`}>
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-white/80 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
