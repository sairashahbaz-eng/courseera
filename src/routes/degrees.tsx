import { createFileRoute } from "@tanstack/react-router";
import { MapPin, TrendingUp, GraduationCap } from "lucide-react";
import { AppNav } from "@/components/AppNav";
import { UNIVERSITIES, TRENDING } from "@/lib/course-data";

export const Route = createFileRoute("/degrees")({
  component: DegreesPage,
});

function DegreesPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppNav />

      <section className="relative overflow-hidden bg-animated-warm text-white py-16">
        <div className="absolute top-5 left-10 h-64 w-64 rounded-full bg-[#1ab3b5]/35 blur-[70px] animate-float" />
        <div className="absolute bottom-5 right-10 h-56 w-56 rounded-full bg-[#DEEFE7]/20 blur-[60px] animate-float-slow" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 animate-in fade-in slide-in-from-bottom-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#DEEFE7]">Degrees & Certifications</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-black tracking-tight">Earn a degree from world-class universities</h1>
          <p className="mt-3 text-white/70 max-w-xl">Fully online, accredited bachelor's and master's degrees. Apply once, study from anywhere.</p>
        </div>
      </section>

      {/* Trending */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Trending hot topics</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {TRENDING.map((t, i) => (
            <span
              key={t}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 text-sm font-medium text-foreground hover:from-primary hover:to-[#0d7a7c] hover:text-white transition-all cursor-pointer animate-in fade-in"
              style={{ animationDelay: `${i * 50}ms`, animationFillMode: "both" }}
            >
              🔥 {t}
            </span>
          ))}
        </div>
      </section>

      {/* Universities */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
        <h2 className="text-xl font-bold mb-6">Top universities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {UNIVERSITIES.map((u, i) => (
            <div
              key={u.name}
              className="group rounded-3xl overflow-hidden bg-card border border-border/60 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={u.image} alt={u.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="text-lg font-bold">{u.name}</h3>
                  <p className="text-xs text-white/80 flex items-center gap-1 mt-0.5"><MapPin className="h-3 w-3" /> {u.country}</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Offered degrees</p>
                <ul className="space-y-1.5">
                  {u.degrees.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm">
                      <GraduationCap className="h-4 w-4 text-primary shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
                <button className="mt-4 w-full h-10 rounded-xl bg-primary/10 text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition">
                  Apply now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
