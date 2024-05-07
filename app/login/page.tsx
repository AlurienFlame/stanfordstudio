'use client';

import { supabase } from '../supabaseClient';
import Nav from "../nav";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    // FIXME: Pretty sure a savvy user could still login with a non-stanford email,
    // since we're only checking client-side.
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert(error.message);
    } else {
      alert('Check your email for the login link!');
    }
    setLoading(false);
  };



// FOR NAV
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
    <main className="flex w-full bg-paper-2 h-full flex-col font-urbanist items-center">
      <Nav session={session} />
      <div className='flex justify-center items-center flex-col bg-white rounded-[24px] p-[24px] w-2/3'>
        <p className='text-3xl'>Login</p>
        <div className='h-[2px] w-4/5 bg-paper-2'></div>
        <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
            pattern=".+@stanford\.edu$"
          />
        </div>
        <p> Must be an @stanford.edu email. </p>
        <div>
          <button disabled={loading}>
            {loading ? <span>Loading</span> : <span>Send magic link</span>}
          </button>
        </div>
      </form>
      </div>
      
    </main>
  );
}
