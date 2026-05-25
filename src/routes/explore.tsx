import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Filter } from "lucide-react";
import { AppNav } from "@/components/AppNav";
import { CourseCard } from "@/components/CourseCard";
import { COURSES, INTERESTS } from "@/lib/course-data";

export const Route = createFileRoute("/explore")({
  component: ExplorePage,
});

function ExplorePage() {
  const [cat, setCat] = useState<string>("All");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    return COURSES.filter((c) => {
      if (cat !== "All" && c.category !== cat) return false;
      if (q && !(c.title.toLowerCase().includes(q.toLowerCase()) || c.skills.some((s) => s.toLowerCase().includes(q.toLowerCase())))) return false;
      return true;
    });
  }, [cat, q]);

  return (
    <div className="min-h-screen bg-background">
      <AppNav onSearch={setQ} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="animate-in fade-in slide-in-from-top-4">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Explore courses</h1>
          <p className="mt-2 text-muted-foreground">{COURSES.length} courses · {INTERESTS.length} categories · curated daily</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 items-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mr-1">
            <Filter className="h-3.5 w-3.5" />
          </span>
          {["All", ...INTERESTS].map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                cat === c
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                  : "bg-muted hover:bg-muted/70 text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {q && <p className="mt-4 text-sm text-muted-foreground">Showing results for "<span className="font-semibold text-foreground">{q}</span>"</p>}

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {list.map((c, i) => <CourseCard key={c.id} course={c} delay={i * 30} />)}
        </div>

        {list.length === 0 && (
          <div className="py-24 text-center text-muted-foreground">No courses match your filters.</div>
        )}
      </div>
    </div>
  );
}
