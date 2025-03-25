"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import Image from "next/image";

export default function Dashboard() {
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
        return;
      }

      if (data?.user) {
        setUser({
          name: data.user.user_metadata.full_name,
          avatar: data.user.user_metadata.avatar_url,
        });
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* ✅ Profile & Welcome Message on the Top Left */}
      <header className="fixed top-4 left-4 flex items-center gap-4 z-50">
        {user ? (
          <>
            <Image
              src={user.avatar || "/default-avatar.png"}
              alt="Profile"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full"
            />
            <span className="text-lg font-semibold">Welcome, {user.name}!</span>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </header>

      {/* ✅ Main Content Below */}
      <div className="flex justify-center items-center mt-20">
        <h1 className="text-2xl font-bold">Dashboard Content Here</h1>
      </div>
    </div>
  );
}
