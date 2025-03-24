"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.push("/dashboard"); // Redirect if already logged in
      }
    });
  }, []);

  async function signInWithGoogle() {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/dashboard` },
      });

      if (error) {
        console.error("Google login error:", error);
        alert("Login failed! Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-all">
      {/* ✅ Centered Card for Login */}
      <div className="card w-96 text-center">
        <h1 className="text-3xl font-bold mb-6">
          Welcome to Notes App
        </h1>

        <button
          onClick={signInWithGoogle}
          disabled={loading}
          className="button button-primary w-full"
        >
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
}
