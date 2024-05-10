"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Session } from '@supabase/supabase-js';
import Nav from "../nav";




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
    <main className="flex w-full bg-paper-2 h-screen flex-col font-urbanist items-center">
      <Nav session={session} />


      <div className='flex justify-center items-center h-full w-full'>
      <div className='flex justify-center items-center flex-col bg-white rounded-[24px] p-[72px] w-1/3'>

      <p className='text-3xl pb-4'>Submit Your Project</p>
        <div className='h-[2px] w-4/5 bg-paper-2 '></div>
        <p className='pt-4 text-paper-3'>Your SUID will be visable.</p>


      <form onSubmit={handleSubmit} className='flex flex-col items-center'>
        <p className='font-medium pb-1 pt-4'>Project Title</p>
        <input
          className='w-[280px] rounded-lg p-2 border-paper-3 border-[1px] h-[48px] text-center'
          type="text"
          placeholder="Super Epic Project"
          required={true}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className='font-medium pb-1 pt-4'>Project Subtitle</p>
        <input
          className='w-[280px] rounded-lg p-2 border-paper-3 border-[1px] h-[48px] text-center'
          type="text"
          placeholder="The Everything App"
          onChange={(e) => setSubtitle(e.target.value)}
        />

<p className='font-medium pb-1 pt-4'>Project Stage</p>
        <select
          className='w-[280px] rounded-lg p-2 border-paper-3 border-[1px] h-[48px] text-center'
          defaultValue=""
          onChange={(e) => setStage(e.target.value)}
        >
          <option value="" disabled>Project Stage</option>
          <option value="1">Idea</option>
          <option value="2">Prototype</option>
          <option value="3">Launched</option>
        </select>

        <p className='font-medium pb-1 pt-4'>Project Link</p>
        <input
          className='w-[280px] rounded-lg p-2 border-paper-3 border-[1px] h-[48px] text-center'
          type="text"
          placeholder="https://www.google.com/"
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

    </div>
    </div>



    </main>
  );
}

export default Page;