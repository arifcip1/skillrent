"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export interface UserProfile {
  id?: string;
  full_name: string;
  email: string;
  campus_email?: string;
  university?: string;
  role: "freelancer" | "client";
  is_verified?: boolean;
  avatar_url?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  setLocalProfile: (prof: UserProfile) => void;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  setLocalProfile: () => {},
  signOut: async () => {},
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const saveLocalProfile = (prof: UserProfile) => {
    setProfile(prof);
    if (typeof window !== "undefined") {
      localStorage.setItem("skillrent_user_profile", JSON.stringify(prof));
    }
  };

  const fetchProfile = async (userId: string, email: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (data && !error) {
        const p = data as UserProfile;
        saveLocalProfile(p);
      } else {
        // Fallback metadata profile
        const meta = user?.user_metadata || {};
        const p: UserProfile = {
          id: userId,
          full_name: meta.full_name || email.split("@")[0],
          email: email,
          campus_email: meta.campus_email,
          university: meta.university || "Universitas Indonesia",
          role: (meta.role as "freelancer" | "client") || "freelancer",
          is_verified: false,
        };
        saveLocalProfile(p);
      }
    } catch {
      // Ignore error
    }
  };

  const refreshProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setUser(session.user);
      await fetchProfile(session.user.id, session.user.email || "");
    } else {
      loadSavedLocalProfile();
    }
  };

  const loadSavedLocalProfile = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("skillrent_user_profile");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setProfile(parsed);
          return;
        } catch {}
      }
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id, session.user.email || "");
      } else {
        loadSavedLocalProfile();
      }
      setLoading(false);
    };

    initAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          await fetchProfile(session.user.id, session.user.email || "");
        } else {
          loadSavedLocalProfile();
        }
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("skillrent_user_profile");
      window.location.href = "/";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        setLocalProfile: saveLocalProfile,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
