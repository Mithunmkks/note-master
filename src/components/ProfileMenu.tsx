"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function ProfileMenu({ user }: { user: { name: string; avatar: string } }) {
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login"; // Redirect to login page after logout
  };

  return (
    <div className="relative inline-block text-left">
      {/* Profile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800 transition"
      >
        <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full" />
        <span className="text-white text-sm font-medium">{user.name}</span>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-900 text-white rounded-md shadow-lg p-3 z-50">
          <p className="text-sm px-2 py-1">{user.name}</p>
          <button
            onClick={handleLogout}
            className="block w-full text-left text-sm px-2 py-1 mt-2 hover:bg-gray-800 rounded-md"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
