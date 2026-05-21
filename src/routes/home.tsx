import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Sparkles, TrendingUp, ChevronDown, ArrowRight, Search, Star, Users, BookOpen, Award, Zap } from "lucide-react";
import { AppNav } from "@/components/AppNav";
import { CourseCard } from "@/components/CourseCard";
import { useApp } from "@/lib/app-store";
import { COURSES, PLANS, FAQS, TRENDING, recommend } from "@/lib/course-data";

export const Route = createFileRoute("/home")({
  component: HomePage,
});

function HomePage() {
  const { user, interests, profile } = useApp();
  const navigate = useNavigate();
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (user && interests.length === 0) {
      const t = setTimeout(() => setShowInterestModal(true), 600);
      return () => clearTimeout(t);
    }
  }, [user, interests.length]);

  const rec = useMemo(() => recommend(interests), [interests]);
  const filtered = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return COURSES.filter((c) => c.title.toLowerCase().includes(q) || c.skills.some((s) => s.toLowerCase().includes(q)) || c.category.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="min-h-screen bg-background">
      <AppNav onSearch={setSearch} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-animated-hero text-white">
        <div className="absolute top-10 -left-10 h-[22rem] w-[22rem] rounded-full bg-[#1ab3b5]/40 blur-[80px] animate-float" />
        <div className="absolute bottom-10 right-10 h-[20rem] w-[20rem] rounded-full bg-[#DEEFE7]/20 blur-[80px] animate-float-slow" />
        <div className="absolute top-1/2 left-1/3 h-64 w-64 rounded-full bg-[#0d7a7c]/30 blur-[70px] animate-blob-morph animate-float" style={{ animationDuration: "16s" }} />
        <div className="absolute top-20 right-1/4 h-32 w-32 rounded-full bg-[#159A9C]/30 blur-2xl animate-orbit" style={{ animationDuration: "22s" }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-6 duration-700">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" /> AI-curated for {profile?.name?.split(" ")[0] ?? "you"}
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight">
              Find your next<br />
              <span className="bg-gradient-to-r from-[#DEEFE7] to-amber-200 bg-clip-text text-transparent">learning breakthrough.</span>
            </h1>
            <p className="mt-5 text-lg text-white/70 max-w-xl">
              Personalized course paths from world-class universities. Match your skills, build your future.
            </p>

            {/* Search */}
            <div className="mt-8 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for 'Machine Learning', 'React', 'UX'…"
                  className="w-full h-14 pl-12 pr-32 rounded-2xl bg-white/95 text-foreground placeholder:text-muted-foreground text-sm font-medium outline-none focus:ring-4 ring-white/30 transition"
                />
                <button className="absolute right-2 top-2 h-10 px-5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition">
                  Search
                </button>
              </div>
              {search && filtered && (
                <div className="absolute mt-2 max-w-xl w-full rounded-2xl bg-card border border-border shadow-2xl p-2 max-h-80 overflow-auto z-20 animate-in fade-in slide-in-from-top-2">
                  {filtered.length === 0 ? (
                    <p className="p-4 text-sm text-muted-foreground">No matches for "{search}"</p>
                  ) : filtered.slice(0, 6).map((c) => (
                    <button key={c.id} onClick={() => navigate({ to: "/course/$id", params: { id: c.id } })} className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-muted text-left transition">
                      <img src={c.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{c.title}</p>
                        <p className="text-xs text-muted-foreground">{c.provider} · {c.level}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-xs text-white/60 mr-2 self-center">Trending:</span>
              {TRENDING.slice(0, 5).map((t) => (
                <button key={t} onClick={() => setSearch(t)} className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium border border-white/20 transition">
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
            {[
              { v: "200+", l: "Top Universities" },
              { v: "5,000+", l: "Courses" },
              { v: "12M+", l: "Active Learners" },
              { v: "94%", l: "Career Outcome" },
            ].map((s, i) => (
              <div key={s.l} className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-4 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${300 + i * 100}ms`, animationFillMode: "both" }}>
                <p className="text-3xl font-black bg-gradient-to-br from-white to-[#DEEFE7] bg-clip-text text-transparent">{s.v}</p>
                <p className="text-xs text-white/60 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended (interest-based) */}
      {rec.primary.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                <Sparkles className="h-3.5 w-3.5" /> For you
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight">Recommended based on your interests</h2>
            </div>
            <Link to="/interests" className="text-sm font-semibold text-primary hover:underline hidden sm:inline">Update interests →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {rec.primary.map((c, i) => <CourseCard key={c.id} course={c} delay={i * 60} />)}
          </div>
        </section>
      )}

      {/* Advanced progression */}
      {rec.advanced.length > 0 && (
        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex items-end justify-between mb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                  <TrendingUp className="h-3.5 w-3.5" /> Level up
                </span>
                <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight">Advanced paths to take next</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {rec.advanced.map((c, i) => <CourseCard key={c.id} course={c} delay={i * 60} />)}
            </div>
          </div>
        </section>
      )}

      {/* Other courses */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Explore more</span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight">Other courses you might love</h2>
          </div>
          <Link to="/explore" className="text-sm font-semibold text-primary hover:underline">Browse all →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rec.other.map((c, i) => <CourseCard key={c.id} course={c} delay={i * 60} />)}
        </div>
      </section>

      {/* About */}
      <section className="bg-gradient-to-br from-[#002333] to-[#0d3a4a] text-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div className="animate-in fade-in slide-in-from-left-4 duration-700">
            <span className="text-xs font-bold uppercase tracking-widest text-[#DEEFE7]">About CourseMind</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight">Learning that adapts to <span className="text-[#DEEFE7]">your</span> trajectory.</h2>
            <p className="mt-5 text-white/70 leading-relaxed">
              We analyze your skills, certificates and career goals to build a personalized progression — not a one-size-fits-all catalog. Whether you're starting Python or shipping LLMs to production, CourseMind shows you the next best step.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { i: BookOpen, t: "Skill graph", d: "Map your skills to the right courses" },
                { i: Award, t: "Certificates", d: "Earn shareable credentials" },
                { i: Zap, t: "AI recs", d: "Updated as you progress" },
                { i: Users, t: "Community", d: "Learn alongside 12M+ people" },
              ].map((x, i) => (
                <div key={x.t} className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}>
                  <x.i className="h-6 w-6 text-[#DEEFE7]" />
                  <p className="mt-2 font-semibold text-sm">{x.t}</p>
                  <p className="text-xs text-white/60">{x.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-in fade-in slide-in-from-right-4 duration-700">
            <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full" />
            <div className="relative grid grid-cols-2 gap-3">
              {COURSES.slice(0, 4).map((c, i) => (
                <div key={c.id} className="rounded-2xl overflow-hidden bg-white/5 backdrop-blur border border-white/10 hover:scale-105 transition" style={{ transform: `translateY(${i % 2 === 0 ? "0" : "20px"})` }}>
                  <img src={c.image} alt="" className="w-full aspect-square object-cover" />
                  <div className="p-3">
                    <p className="text-xs font-semibold truncate">{c.title}</p>
                    <p className="text-[10px] text-white/60 mt-0.5 flex items-center gap-1">
                      <Star className="h-2.5 w-2.5 fill-amber-300 text-amber-300" /> {c.rating}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Pricing</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">Pick the plan that grows with you</h2>
          <p className="mt-3 text-muted-foreground">Cancel anytime. No hidden fees.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {PLANS.map((p, i) => (
            <div
              key={p.id}
              className={`relative rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 ${
                p.highlight
                  ? "bg-gradient-to-br from-primary to-[#0d7a7c] text-white shadow-2xl shadow-primary/40 scale-105"
                  : "bg-card border border-border/60 hover:shadow-2xl"
              }`}
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-amber-300 text-[#002333] text-[10px] font-bold uppercase tracking-wider">
                  Most popular
                </span>
              )}
              <h3 className="font-bold text-lg">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-black">${p.price}</span>
                <span className={`text-sm ${p.highlight ? "text-white/70" : "text-muted-foreground"}`}>/{p.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className={`mt-0.5 inline-flex h-4 w-4 shrink-0 rounded-full items-center justify-center ${p.highlight ? "bg-white/20" : "bg-primary/10 text-primary"}`}>
                      <ArrowRight className="h-2.5 w-2.5" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`mt-8 w-full h-11 rounded-xl font-semibold transition active:scale-[0.98] ${p.highlight ? "bg-white text-primary hover:opacity-90" : "bg-foreground text-background hover:opacity-90"}`}>
                {p.price === 0 ? "Get started" : "Start free trial"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-20">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">FAQ</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">Frequently asked questions</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <button
              key={i}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full text-left rounded-2xl bg-card border border-border/60 hover:border-primary/40 p-5 transition-all"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold text-sm sm:text-base">{f.q}</h3>
                <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
              </div>
              <div className={`grid transition-all duration-300 ${openFaq === i ? "grid-rows-[1fr] mt-3 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <p className="overflow-hidden text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-muted/20 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 CourseMind — Built for learners, by learners.</p>
          <div className="flex gap-6">
            <Link to="/explore">Explore</Link>
            <Link to="/degrees">Degrees</Link>
            <Link to="/cart">Cart</Link>
          </div>
        </div>
      </footer>

      {/* Interests modal */}
      {showInterestModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-card rounded-3xl max-w-md w-full p-8 text-center animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-[#0d7a7c] flex items-center justify-center shadow-lg shadow-primary/30">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <h3 className="mt-4 text-2xl font-bold">Pick your interests</h3>
            <p className="mt-2 text-sm text-muted-foreground">We'll personalize your homepage with courses you'll actually want to take.</p>
            <div className="mt-6 flex gap-3 justify-center">
              <button onClick={() => setShowInterestModal(false)} className="px-5 h-10 rounded-xl text-sm text-muted-foreground hover:bg-muted transition">Later</button>
              <button onClick={() => navigate({ to: "/interests" })} className="px-6 h-10 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition shadow-lg shadow-primary/30">
                Choose interests →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
