"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Session } from '@supabase/supabase-js';

function Page() {
  // TODO: Figure out how to DRY supabase session logic
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [stage, setStage] = useState('');
  const [link, setLink] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    if (!session) {
      alert('You need to be logged in to submit a project');
      setLoading(false);
      return;
    }

    const { error } = await supabase.from('projects').insert(
      {
        title,
        subtitle,
        author: session?.user.email?.split('@')[0],
        user_id: session?.user.id,
        stage,
        link,
        tags
      }
    );

    if (error) {
      alert(error.message);
    } else {
      // TODO: redirect to project page instead of home
      window.location.href = '/';
    }
    setLoading(false);
  };

  return (
    <main className="flex w-full flex-col font-urbanist">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project name"
          required={true}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Project subtitle"
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <p>Note: your SUNet ID will be publicly visible!</p>
        <select
          defaultValue=""
          onChange={(e) => setStage(e.target.value)}
        >
          <option value="" disabled>Project Stage</option>
          <option value="1">Idea</option>
          <option value="2">Prototype</option>
          <option value="3">Launched</option>
        </select>
        <input
          type="text"
          placeholder="Project URL"
          onChange={(e) => setLink(e.target.value)}
        />
        {/* TODO: list of image urls */}
        <input
          type="text"
          placeholder="Tags, comma, separated"
          onChange={(e) => setTags(e.target.value)}
        />
        <button disabled={loading}>
          {loading ? <span>Loading</span> : <span>Submit</span>}
        </button>
      </form>
    </main>
  );
}

export default Page;