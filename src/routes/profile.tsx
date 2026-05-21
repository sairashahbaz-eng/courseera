import { createFileRoute, useNavigate, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, User, Calendar, BookOpen, Award, Mail, Phone, Plus, X } from "lucide-react";
import { useApp } from "@/lib/app-store";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user, saveProfile, profile } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState(profile?.name ?? "");
  const [dob, setDob] = useState(profile?.dob ?? "");
  const [education, setEducation] = useState(profile?.education ?? "");
  const [skills, setSkills] = useState<string[]>(profile?.skills ?? []);
  const [certs, setCerts] = useState<string[]>(profile?.certificates ?? []);
  const [email, setEmail] = useState(profile?.email ?? user?.email ?? "");
  const [contact, setContact] = useState(profile?.contact ?? user?.phone ?? "");
  const [skillInput, setSkillInput] = useState("");
  const [certInput, setCertInput] = useState("");

  if (!user) return <Navigate to="/auth" />;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveProfile({ name, dob, education, skills, certificates: certs, email, contact });
    navigate({ to: "/interests" });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 px-4">
      <div className="mx-auto max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-8">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-[#0d7a7c] flex items-center justify-center shadow-lg shadow-primary/30">
            <GraduationCap className="h-7 w-7 text-white" />
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">Tell us about you</h1>
          <p className="mt-2 text-sm text-muted-foreground">We'll tailor your learning path based on your background.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-3xl border border-border/60 p-6 sm:p-8 shadow-xl shadow-foreground/5 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field icon={User} label="Full name" value={name} onChange={setName} placeholder="Jane Doe" required />
            <Field icon={Calendar} label="Date of birth" type="date" value={dob} onChange={setDob} placeholder="" required />
          </div>
          <Field icon={BookOpen} label="Education" value={education} onChange={setEducation} placeholder="BSc Computer Science, MIT" required />

          <TagInput
            icon={Award}
            label="Current skills"
            tags={skills}
            setTags={setSkills}
            input={skillInput}
            setInput={setSkillInput}
            placeholder="e.g. Python, React, SQL"
          />

          <TagInput
            icon={Award}
            label="Certificates"
            tags={certs}
            setTags={setCerts}
            input={certInput}
            setInput={setCertInput}
            placeholder="e.g. AWS Solutions Architect"
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <Field icon={Mail} label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" required />
            <Field icon={Phone} label="Contact number" type="tel" value={contact} onChange={setContact} placeholder="+1 555 0123" required />
          </div>

          <button className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 active:scale-[0.98] transition shadow-lg shadow-primary/30">
            Continue →
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, type = "text", value, onChange, placeholder, required }: { icon: React.ComponentType<{ className?: string }>; label: string; type?: string; value: string; onChange: (v: string) => void; placeholder: string; required?: boolean }) {
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
          required={required}
          className="w-full h-11 pl-10 pr-3 rounded-xl bg-muted/60 border border-transparent focus:bg-background focus:border-primary outline-none text-sm transition"
        />
      </div>
    </div>
  );
}

function TagInput({ icon: Icon, label, tags, setTags, input, setInput, placeholder }: { icon: React.ComponentType<{ className?: string }>; label: string; tags: string[]; setTags: (t: string[]) => void; input: string; setInput: (v: string) => void; placeholder: string }) {
  function add() {
    const v = input.trim();
    if (!v || tags.includes(v)) return;
    setTags([...tags, v]);
    setInput("");
  }
  return (
    <div>
      <label className="text-xs font-semibold text-foreground/80">{label}</label>
      <div className="mt-1.5 relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
          placeholder={placeholder}
          className="w-full h-11 pl-10 pr-12 rounded-xl bg-muted/60 border border-transparent focus:bg-background focus:border-primary outline-none text-sm transition"
        />
        <button type="button" onClick={add} className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition">
          <Plus className="h-4 w-4" />
        </button>
      </div>
      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2 animate-in fade-in">
          {tags.map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {t}
              <button type="button" onClick={() => setTags(tags.filter((x) => x !== t))} className="h-4 w-4 rounded-full hover:bg-primary/20 flex items-center justify-center">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
