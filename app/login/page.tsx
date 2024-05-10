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
    const { error } = await supabase.auth.signInWithOtp({ email, options: {
      emailRedirectTo: process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000/"
    } });

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
    <main className="flex w-full bg-paper-2 h-screen flex-col font-urbanist items-center">
      <Nav session={session} />
      <div className='flex justify-center items-center h-full w-full'>
      <div className='flex justify-center items-center flex-col bg-white rounded-[24px] p-[72px] w-1/3'>
        <p className='text-3xl pb-4'>Login</p>
        <div className='h-[2px] w-4/5 bg-paper-2 '></div>
        <p className='py-4 text-paper-3'>@stanford.edu email required.</p>
        <form onSubmit={handleLogin} className=' flex flex-col justify-center items-center'>
        <div className='w-[280px] rounded-lg text-center'>
          <input
            type="email"
            placeholder="mtl@stanford.edu"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
            pattern=".+@stanford\.edu$"
            className='p-2 w-full rounded-lg border-paper-3 border-[1px] h-[48px] text-center'
          />
        </div>
        <div className='pt-2'>
          <button disabled={loading} className="text-paper py-3 w-[280px] bg-cardinal rounded-lg font-bold text-center">
            {loading ? <span>Loading</span> : <span>Send Login Link</span>}
          </button>
        </div>
      </form>
      </div>
      </div>
      
    </main>
  );
}
