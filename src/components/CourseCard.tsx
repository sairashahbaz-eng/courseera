import { Link } from "@tanstack/react-router";
import { Star, Clock, Users } from "lucide-react";
import type { Course } from "@/lib/course-data";

export function CourseCard({ course, delay = 0 }: { course: Course; delay?: number }) {
  return (
    <Link
      to="/course/$id"
      params={{ id: course.id }}
      className="group block rounded-2xl overflow-hidden bg-card border border-border/60 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img src={course.image} alt={course.title} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-white/95 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-foreground">
          {course.level}
        </span>
        {course.price === 0 && (
          <span className="absolute top-3 right-3 px-2 py-1 rounded-md bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider">Free</span>
        )}
      </div>
      <div className="p-4 space-y-2">
        <p className="text-xs text-muted-foreground font-medium">{course.provider}</p>
        <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">{course.title}</h3>
        <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
          <span className="flex items-center gap-1 text-amber-500 font-semibold">
            <Star className="h-3 w-3 fill-current" /> {course.rating}
          </span>
          <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {course.learners}</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course.hours}h</span>
        </div>
        <div className="pt-2 flex items-center justify-between border-t border-border/40">
          <span className="text-sm font-bold">{course.price === 0 ? "Free" : `$${course.price}`}</span>
          <span className="text-[11px] text-primary font-semibold group-hover:translate-x-0.5 transition-transform">View →</span>
        </div>
      </div>
    </Link>
  );
}
