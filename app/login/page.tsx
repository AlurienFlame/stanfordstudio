'use client';

import { useState } from 'react';
import { supabase } from '../supabaseClient';

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

  return (
    <main className="flex w-full flex-col font-urbanist">
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
    </main>
  );
}
