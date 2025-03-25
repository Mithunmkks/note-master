"use client";

import { supabase } from "@/utils/supabaseClient";

const signInWithGoogle = async () => {
  console.log("Sign-in button clicked"); // ✅ Debugging log

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: "http://localhost:3000" }, 
  });

  if (error) {
    console.error("Error signing in:", error.message);
  } else {
    console.log("Redirecting to Google...");
  }
};

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Login</h1>
      <button
        onClick={signInWithGoogle}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
}
