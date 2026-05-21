import { Link, useNavigate } from "@tanstack/react-router";
import { GraduationCap, ShoppingCart, Search, Compass, Award, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/lib/app-store";

export function AppNav({ onSearch }: { onSearch?: (q: string) => void }) {
  const { user, cart, signOut } = useApp();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center gap-4">
        <Link to="/home" className="flex items-center gap-2 group shrink-0">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-[#0d7a7c] flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:inline">CourseMind</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <Link to="/home" className="px-3 py-2 rounded-lg hover:bg-muted transition">Home</Link>
          <Link to="/explore" className="px-3 py-2 rounded-lg hover:bg-muted transition flex items-center gap-1.5">
            <Compass className="h-4 w-4" /> Explore
          </Link>
          <Link to="/degrees" className="px-3 py-2 rounded-lg hover:bg-muted transition flex items-center gap-1.5">
            <Award className="h-4 w-4" /> Degrees
          </Link>
        </nav>

        <form
          onSubmit={(e) => { e.preventDefault(); onSearch?.(q); if (!onSearch) navigate({ to: "/explore" }); }}
          className="flex-1 max-w-md hidden sm:flex items-center gap-2 bg-muted/60 rounded-full px-4 h-10 focus-within:ring-2 ring-primary/40 transition"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="What do you want to learn today?"
            className="bg-transparent outline-none flex-1 text-sm placeholder:text-muted-foreground"
          />
          {q && <span className="text-xs text-muted-foreground hidden lg:inline">Press Enter ↵</span>}
        </form>

        <div className="ml-auto flex items-center gap-2">
          <Link to="/cart" className="relative p-2 rounded-lg hover:bg-muted transition">
            <ShoppingCart className="h-5 w-5" />
            {cart.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-5 min-w-5 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center animate-in zoom-in">
                {cart.length}
              </span>
            )}
          </Link>
          {user ? (
            <button onClick={() => { signOut(); navigate({ to: "/auth" }); }} className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm hover:bg-muted transition">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          ) : (
            <Link to="/auth" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition">Sign in</Link>
          )}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg hover:bg-muted">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/60 px-4 py-3 space-y-1 bg-background animate-in slide-in-from-top-2">
          <Link to="/home" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-muted">Home</Link>
          <Link to="/explore" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-muted">Explore</Link>
          <Link to="/degrees" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-muted">Degrees</Link>
          <Link to="/cart" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-muted">Cart ({cart.length})</Link>
        </div>
      )}
    </header>
  );
}
