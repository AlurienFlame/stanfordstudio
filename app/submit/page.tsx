"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Session } from '@supabase/supabase-js';
import Nav from "../nav";


// Upload file using standard upload
async function uploadFile(file: File): Promise<void> {
  const { data, error } = await supabase.storage.from('bucket_name').upload('file_path', file);
  if (error) {
    console.error('Error uploading file:', error.message);
    return;
  }
}

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
  const [desc, setDesc] = useState('');
  const [stage, setStage] = useState('');
  const [link, setLink] = useState('');
  const [link_title, setLinkTitle] = useState('');
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
        link_title,
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
    <main className="flex w-full bg-paper flex-col font-urbanist items-center">
      <Nav session={session} />


      <div className='flex flex-col justify-center items-center h-full w-full py-12 md:py-24'>

      <p className='text-3xl pb-4'>Submit Your Project</p>
        <div className='h-[2px] w-4/5 bg-paper-2 '></div>
        <div className='mt-4 bg-paper-2 rounded-lg p-6 w-[90%] md:max-w-[600px]'>
          <p className='text-center text-paper-3'>
          Your SUID will be visible.<br/>
          You must be the creator of the project.<br/>
          Spam or inappropiate content will result in permanent ban.
          </p>
        </div>


      <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] md:max-w-[600px]'>
        <p className='font-medium pb-1 pt-4'>Title<span className='text-cardinal'>*</span></p>
        <input
          className='w-full rounded-3xl p-2 border-paper-3 border-[1px] h-[48px] text-center'
          type="text"
          placeholder="Stanford Studio (30 chars max)"
          required={true}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={30}
        />
        <p className='font-medium pb-1 pt-4'>Subtitle<span className='text-cardinal'>*</span></p>
        <textarea
        className='w-full rounded-3xl p-2 border-paper-3 border-[1px] h-[100px] text-center resize-none'
        placeholder="The place to share and find Stanford projects. (60 chars max)"
        maxLength={60}
        onChange={(e) => {
            setSubtitle(e.target.value);
        }}
      />
      <p className='font-medium pb-1 pt-4'>Description<span className='text-cardinal'>*</span></p>
        <textarea
        className='w-full rounded-3xl p-2 border-paper-3 border-[1px] h-[200px]  text-center resize-none'
        placeholder="(200 chars max)"
        maxLength={200}
        onChange={(e) => {
            setDesc(e.target.value);
        }}
      />

{/* <p className='font-medium pb-1 pt-4'>Project Icon</p> */}

<p className='font-medium pb-1 pt-4'>Images</p>

        {/* TODO: list of image urls */}

<p className='font-medium pb-1 pt-4'>Stage</p>
        <select
          className='w-full rounded-3xl p-2 border-paper-3 border-[1px] h-[48px] text-center'
          defaultValue=""
          onChange={(e) => setStage(e.target.value)}
        >
          <option value="" disabled>Project Stage</option>
          <option value="1">Idea</option>
          <option value="2">Prototype</option>
          <option value="3">Launched</option>
        </select>

        <p className='font-medium pb-1 pt-4'>Link</p>
        <input
          className='w-full rounded-3xl p-2 border-paper-3 border-[1px] h-[48px] text-center'
          type="text"
          placeholder="https://www.google.com/"
          onChange={(e) => setLink(e.target.value)}
        />
        <p className='font-medium pb-1 pt-4'>Link Text</p>
        <input
          className='w-full rounded-3xl p-2 border-paper-3 border-[1px] h-[48px] text-center'
          type="text"
          placeholder="My Website"
          onChange={(e) => setLinkTitle(e.target.value)}
        />


        <p className='font-medium pb-1 pt-4'>Tags</p>
        <input
          className='w-full rounded-3xl p-2 border-paper-3 border-[1px] h-[48px] text-center'
          type="text"
          placeholder="Tags, comma, separated"
          onChange={(e) => setTags(e.target.value)}
        />
        <button disabled={loading}
        className='w-full rounded-3xl p-2 bg-cardinal h-[48px] text-center text-white mt-4'
        >
          {loading ? <span>Loading</span> : <span>Submit</span>}
        </button>
      </form>
{/* 

<div>
  <p>Preview</p>
  <div>
    <p>{title} - {subtitle}</p>
    <p>{desc}</p>
    <a href={link} target="_blank">{linkname}</a>
  </div>
</div> */}


    </div>


    </main>
  );
}

export default Page;