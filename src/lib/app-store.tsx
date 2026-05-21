import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Course } from "./course-data";

export type User = {
  email: string;
  password: string;
  phone: string;
};

export type Profile = {
  name: string;
  dob: string;
  education: string;
  skills: string[];
  certificates: string[];
  email: string;
  contact: string;
};

type Store = {
  hydrated: boolean;
  user: User | null;
  profile: Profile | null;
  interests: string[];
  cart: Course[];

  signUp: (u: User) => { error?: string };
  signIn: (email: string, password: string) => { error?: string };
  signOut: () => void;

  saveProfile: (p: Profile) => void;
  setInterests: (i: string[]) => void;

  addToCart: (c: Course) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const Ctx = createContext<Store | null>(null);

const KEY = "css_state_v1"; // course-suggestor state

type Persisted = {
  users: User[];
  currentEmail: string | null;
  profiles: Record<string, Profile>;
  interests: Record<string, string[]>;
  carts: Record<string, Course[]>;
};

function load(): Persisted {
  if (typeof window === "undefined") return { users: [], currentEmail: null, profiles: {}, interests: {}, carts: {} };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { users: [], currentEmail: null, profiles: {}, interests: {}, carts: {} };
    return JSON.parse(raw);
  } catch {
    return { users: [], currentEmail: null, profiles: {}, interests: {}, carts: {} };
  }
}

function save(s: Persisted) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(s));
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>({ users: [], currentEmail: null, profiles: {}, interests: {}, carts: {} });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(load());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) save(state);
  }, [state, hydrated]);

  const email = state.currentEmail;
  const user = email ? state.users.find((u) => u.email === email) ?? null : null;
  const profile = email ? state.profiles[email] ?? null : null;
  const interests = email ? state.interests[email] ?? [] : [];
  const cart = email ? state.carts[email] ?? [] : [];

  const store: Store = {
    hydrated,
    user,
    profile,
    interests,
    cart,
    signUp: (u) => {
      if (state.users.some((x) => x.email === u.email)) return { error: "Account already exists. Try logging in." };
      setState((s) => ({ ...s, users: [...s.users, u], currentEmail: u.email }));
      return {};
    },
    signIn: (em, pw) => {
      const found = state.users.find((u) => u.email === em && u.password === pw);
      if (!found) return { error: "Invalid username or password" };
      setState((s) => ({ ...s, currentEmail: em }));
      return {};
    },
    signOut: () => setState((s) => ({ ...s, currentEmail: null })),
    saveProfile: (p) => {
      if (!email) return;
      setState((s) => ({ ...s, profiles: { ...s.profiles, [email]: p } }));
    },
    setInterests: (i) => {
      if (!email) return;
      setState((s) => ({ ...s, interests: { ...s.interests, [email]: i } }));
    },
    addToCart: (c) => {
      if (!email) return;
      setState((s) => {
        const existing = s.carts[email] ?? [];
        if (existing.some((x) => x.id === c.id)) return s;
        return { ...s, carts: { ...s.carts, [email]: [...existing, c] } };
      });
    },
    removeFromCart: (id) => {
      if (!email) return;
      setState((s) => ({ ...s, carts: { ...s.carts, [email]: (s.carts[email] ?? []).filter((x) => x.id !== id) } }));
    },
    clearCart: () => {
      if (!email) return;
      setState((s) => ({ ...s, carts: { ...s.carts, [email]: [] } }));
    },
  };

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp must be inside AppProvider");
  return v;
}
