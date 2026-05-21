import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Star, Clock, Users, Award, ArrowRight, Check, ShoppingCart } from "lucide-react";
import { AppNav } from "@/components/AppNav";
import { CourseCard } from "@/components/CourseCard";
import { COURSES } from "@/lib/course-data";
import { useApp } from "@/lib/app-store";

export const Route = createFileRoute("/course/$id")({
  component: CoursePage,
});

function CoursePage() {
  const { id } = Route.useParams();
  const course = COURSES.find((c) => c.id === id);
  const { addToCart, cart } = useApp();
  const navigate = useNavigate();

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <AppNav />
        <div className="py-24 text-center">
          <h1 className="text-2xl font-bold">Course not found</h1>
          <Link to="/explore" className="text-primary hover:underline">← Back to explore</Link>
        </div>
      </div>
    );
  }

  const inCart = cart.some((c) => c.id === course.id);
  const nextCourses = (course.nextCourseIds ?? []).map((nid) => COURSES.find((c) => c.id === nid)).filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <AppNav />

      <div className="relative bg-animated-hero text-white overflow-hidden">
        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-[#1ab3b5]/30 blur-[80px] animate-float" />
        <div className="absolute bottom-10 right-1/3 h-64 w-64 rounded-full bg-[#DEEFE7]/15 blur-[70px] animate-float-slow" />
        <div className="absolute inset-0 opacity-20">
          <img src={course.image} alt="" className="w-full h-full object-cover blur-2xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-12 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 animate-in fade-in slide-in-from-left-4 duration-500">
            <p className="text-xs uppercase tracking-widest text-[#DEEFE7] font-semibold">{course.category}</p>
            <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">{course.title}</h1>
            <p className="mt-4 text-lg text-white/80 max-w-2xl leading-relaxed">{course.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm">
              <span className="flex items-center gap-1.5 text-amber-300 font-semibold"><Star className="h-4 w-4 fill-current" /> {course.rating} rating</span>
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {course.learners} learners</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {course.hours} hours</span>
              <span className="px-2.5 py-1 rounded-md bg-white/15 backdrop-blur text-xs font-bold uppercase tracking-wider">{course.level}</span>
            </div>
            <p className="mt-4 text-sm text-white/70">Offered by <span className="font-semibold text-white">{course.provider}</span></p>
          </div>

          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="rounded-3xl overflow-hidden bg-card text-foreground shadow-2xl">
              <img src={course.image} alt={course.title} className="aspect-video w-full object-cover" />
              <div className="p-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black">{course.price === 0 ? "Free" : `$${course.price}`}</span>
                  {course.price > 0 && <span className="text-sm text-muted-foreground line-through">${course.price + 30}</span>}
                </div>
                <button
                  onClick={() => { addToCart(course); navigate({ to: "/cart" }); }}
                  disabled={inCart}
                  className="mt-4 w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 active:scale-[0.98] transition shadow-lg shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {inCart ? <><Check className="h-4 w-4" /> Already in cart</> : <><ShoppingCart className="h-4 w-4" /> Add to cart</>}
                </button>
                <button onClick={() => { addToCart(course); navigate({ to: "/cart" }); }} className="mt-2 w-full h-11 rounded-xl border-2 border-foreground/15 hover:border-primary text-sm font-semibold transition">
                  Buy now →
                </button>
                <div className="mt-5 pt-5 border-t border-border/60 space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Lifetime access</p>
                  <p className="flex items-center gap-2"><Award className="h-4 w-4 text-primary" /> Shareable certificate</p>
                  <p className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> Community + mentor support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills you'll gain */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold mb-4">Skills you'll gain</h2>
        <div className="flex flex-wrap gap-2">
          {course.skills.map((s) => (
            <span key={s} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">{s}</span>
          ))}
        </div>

        {nextCourses.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center gap-2 mb-2">
              <ArrowRight className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Recommended next steps</h2>
            </div>
            <p className="text-muted-foreground text-sm mb-6">Your learning path continues here</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {nextCourses.map((c, i) => c && <CourseCard key={c.id} course={c} delay={i * 60} />)}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
