'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import Nav from "./nav";
import Ranking from "./ranking";
import Home from "./home";

import { supabase } from "./supabaseClient";
import { Session } from "@supabase/supabase-js";

export default function Page() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <main className="flex w-full flex-col font-urbanist">
      <Nav session={session} />
      <Home></Home>
    </main>
  );
}
