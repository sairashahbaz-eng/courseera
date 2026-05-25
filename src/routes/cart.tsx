import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2, ShoppingCart, CreditCard, Check, Sparkles } from "lucide-react";
import { AppNav } from "@/components/AppNav";
import { useApp } from "@/lib/app-store";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const { cart, removeFromCart, clearCart, user, profile } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState(profile?.name ?? "");
  const [email, setEmail] = useState(profile?.email ?? user?.email ?? "");
  const [method, setMethod] = useState<"card" | "paypal" | "applepay">("card");
  const [done, setDone] = useState(false);

  const subtotal = cart.reduce((s, c) => s + c.price, 0);
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax;

  function checkout(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
    setTimeout(() => { clearCart(); navigate({ to: "/home" }); }, 2200);
  }

  if (done) {
    return (
      <div className="min-h-screen bg-background">
        <AppNav />
        <div className="mx-auto max-w-md px-4 py-24 text-center animate-in fade-in zoom-in">
          <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-primary to-[#0d7a7c] flex items-center justify-center shadow-2xl shadow-primary/40 animate-pulse">
            <Check className="h-10 w-10 text-white" strokeWidth={3} />
          </div>
          <h1 className="mt-6 text-3xl font-black">Order confirmed!</h1>
          <p className="mt-2 text-muted-foreground">Your courses are unlocked. Redirecting you home…</p>
          <Sparkles className="mx-auto mt-6 h-8 w-8 text-amber-400 animate-spin" style={{ animationDuration: "3s" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Your cart</h1>
        <p className="mt-1 text-muted-foreground">{cart.length} {cart.length === 1 ? "course" : "courses"}</p>

        {cart.length === 0 ? (
          <div className="mt-12 rounded-3xl bg-card border border-dashed border-border p-16 text-center">
            <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h2 className="mt-4 text-xl font-bold">Your cart is empty</h2>
            <p className="mt-2 text-sm text-muted-foreground">Browse our catalog to add some courses.</p>
            <Link to="/explore" className="mt-6 inline-block px-6 h-11 leading-[2.75rem] rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition">
              Explore courses →
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              {cart.map((c, i) => (
                <div
                  key={c.id}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/60 animate-in fade-in slide-in-from-left-4"
                  style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}
                >
                  <img src={c.image} alt={c.title} className="h-20 w-28 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">{c.provider}</p>
                    <h3 className="font-semibold text-sm truncate">{c.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{c.level} · {c.hours}h</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{c.price === 0 ? "Free" : `$${c.price}`}</p>
                    <button onClick={() => removeFromCart(c.id)} className="mt-1 text-xs text-destructive hover:underline inline-flex items-center gap-1">
                      <Trash2 className="h-3 w-3" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout */}
            <form onSubmit={checkout} className="rounded-3xl bg-card border border-border/60 p-6 h-fit lg:sticky lg:top-20 animate-in fade-in slide-in-from-right-4">
              <h2 className="font-bold text-lg">Order summary</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Tax (8%)</span><span>${tax}</span></div>
                <div className="flex justify-between border-t border-border/60 pt-3 mt-3"><span className="font-bold">Total</span><span className="font-black text-lg">${total}</span></div>
              </div>

              <div className="mt-6 space-y-3">
                <div>
                  <label className="text-xs font-semibold">Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 w-full h-10 px-3 rounded-xl bg-muted/60 outline-none focus:bg-background border border-transparent focus:border-primary text-sm transition" />
                </div>
                <div>
                  <label className="text-xs font-semibold">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 w-full h-10 px-3 rounded-xl bg-muted/60 outline-none focus:bg-background border border-transparent focus:border-primary text-sm transition" />
                </div>
                <div>
                  <label className="text-xs font-semibold">Payment method</label>
                  <div className="mt-1.5 grid grid-cols-3 gap-2">
                    {([
                      { id: "card", label: "Card" },
                      { id: "paypal", label: "PayPal" },
                      { id: "applepay", label: "Apple Pay" },
                    ] as const).map((m) => (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => setMethod(m.id)}
                        className={`h-10 rounded-xl text-xs font-semibold border transition ${method === m.id ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted/40 hover:bg-muted"}`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button className="mt-6 w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 active:scale-[0.98] transition shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
                <CreditCard className="h-4 w-4" /> Pay ${total}
              </button>
              <p className="mt-3 text-[11px] text-muted-foreground text-center">Secure checkout · 30-day refund</p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
