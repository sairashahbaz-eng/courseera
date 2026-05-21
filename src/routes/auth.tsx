import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, Mail, Lock, Phone, ArrowRight } from "lucide-react";
import { useApp } from "@/lib/app-store";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const { signIn, signUp } = useApp();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (mode === "signup") {
      if (!email || !password || !phone) { setError("All fields are required"); return; }
      const { error } = signUp({ email, password, phone });
      if (error) { setError(error); return; }
      navigate({ to: "/profile" });
    } else {
      const { error } = signIn(email, password);
      if (error) { setError(error); return; }
      navigate({ to: "/home" });
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-[#002333] via-[#0d3a4a] to-[#159A9C] items-center justify-center p-12">
        <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-[#DEEFE7]/20 blur-3xl animate-pulse" />
        <div className="relative text-white max-w-md animate-in fade-in slide-in-from-left-8 duration-700">
          <Link to="/" className="inline-flex items-center gap-3 mb-10">
            <div className="h-12 w-12 rounded-2xl bg-white/95 flex items-center justify-center shadow-xl">
              <GraduationCap className="h-7 w-7 text-[#002333]" />
            </div>
            <span className="text-2xl font-black">CourseMind</span>
          </Link>
          <h2 className="text-4xl font-bold leading-tight">Learn smarter.<br />Grow faster.</h2>
          <p className="mt-4 text-white/70 leading-relaxed">
            Personalized course paths from Stanford, Yale, Google, Meta & 200+ partners — picked just for you.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {["AI-powered recommendations", "Track skills & certificates", "Build career paths"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#DEEFE7]" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-sm animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-[#0d7a7c] flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg">CourseMind</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "login" ? "Sign in to continue your journey" : "Start exploring 100+ courses today"}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <Field icon={Mail} label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
            <Field icon={Lock} label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
            {mode === "signup" && (
              <Field icon={Phone} label="Phone number" type="tel" value={phone} onChange={setPhone} placeholder="+1 555 0123" />
            )}

            {error && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/30 px-3 py-2 text-xs text-destructive font-medium animate-in fade-in">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 active:scale-[0.98] transition flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
            >
              {mode === "login" ? "Sign in" : "Create account"} <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "login" ? "New to CourseMind?" : "Already have an account?"}{" "}
            <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }} className="text-primary font-semibold hover:underline">
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, type, value, onChange, placeholder }: { icon: React.ComponentType<{ className?: string }>; label: string; type: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div>
      <label className="text-xs font-semibold text-foreground/80">{label}</label>
      <div className="mt-1.5 relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required
          className="w-full h-11 pl-10 pr-3 rounded-xl bg-muted/60 border border-transparent focus:bg-background focus:border-primary outline-none text-sm transition"
        />
      </div>
    </div>
  );
}
