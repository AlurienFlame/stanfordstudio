'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { describe } from 'node:test';
import { Session } from '@supabase/supabase-js';

export default function Ranking({ session }: { session: Session | null; }) {
  const [selectedInterval, setSelectedInterval] = useState('This Week');
  const [projects, setProjects] = useState([] as any[]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedProjectComments, setSelectedProjectComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('' as string);
  

  const handleIntervalChange = (interval: string) => {
    setSelectedInterval(interval);
    refreshProjects(interval);
  };

  const refreshProjects = async (interval: string = selectedInterval) => {
    let query = supabase.from('projects').select();

    if (interval === 'Newest') {
      query = query.order('created_at', { ascending: false });
    } else {
      let fromDate;
      if (interval === 'This Week') {
        fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 7);
      } else if (interval === 'This Month') {
        fromDate = new Date();
        fromDate.setMonth(fromDate.getMonth() - 1);
      }
      if (fromDate) {
        query = query.gte('created_at', fromDate.toISOString());
      }
    }

    const { data: fetchedProjects, error } = await query;
    if (error) {
      console.error('Error fetching projects:', error.message);
      return;
    }

    // for each project, load its image
    await Promise.all(fetchedProjects.map(async project => {
      if (!project.image) {
        return;
      }
      const { data: imageMatches } = await supabase
        .storage
        .from('images')
        .getPublicUrl(project.image);
      if (imageMatches) {
        project.image = imageMatches.publicUrl;
      }
    }));

    const projectsWithUpvotes = await Promise.all(fetchedProjects.map(async project => {
      const { data: upvoteMatches, error } = await supabase
        .from('upvotes')
        .select('*', { count: 'exact' })
        .eq('project_id', project.id);
      if (error) {
        console.error('Error counting upvotes:', error.message);
        return project;
      }

      let userHasUpvoted = false;
      if (session) {
        const { data: userUpvote, error } = await supabase
          .from('upvotes')
          .select('*')
          .eq('project_id', project.id)
          .eq('user_id', session.user.id);
        if (error) {
          console.error('Error checking user upvote:', error.message);
        } else {
          userHasUpvoted = userUpvote.length > 0;
        }
      }

      return { ...project, upvotes: upvoteMatches?.length || 0, userHasUpvoted };
    }));

    if (interval !== 'Newest') {
      projectsWithUpvotes.sort((a, b) => b.upvotes - a.upvotes);
    }

    setProjects(projectsWithUpvotes);
  };

  useEffect(() => {
    refreshProjects();
  }, [session]);

  const handleClick = (project: any) => {
    setSelectedProject(project);
    fetchCommentsFor(project.id);
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  const postComment = () => {
    supabase
      .from('comments')
      .insert([{ 
          project_id: selectedProject.id,
          author_id: session?.user.id,
          content: newComment,
          author_name: session?.user.email?.split('@')[0],
        }])
      .then(({ data, error }) => {
        if (error) {
          console.error('Error posting comment:', error.message);
          return;
        }
        fetchCommentsFor(selectedProject.id);
      });

      setNewComment('');
  };

  const fetchCommentsFor = (project_id: number) => {
    supabase
      .from('comments')
      .select()
      .eq('project_id', project_id)
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching comments:', error.message);
          return;
        }
        setSelectedProjectComments(data);
      });
  }

  const upvote = (project_id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (!session) {
      alert('You need to be logged in to upvote a project');
      return;
    }

    (async () => {
      const { data: existingUpvote, error } = await supabase
        .from('upvotes')
        .select()
        .eq('user_id', session?.user.id)
        .eq('project_id', project_id);

      if (error) {
        console.error('Error checking upvote:', error.message);
        return;
      }

      if (existingUpvote.length > 0) {
        const { data, error } = await supabase
          .from('upvotes')
          .delete()
          .eq('user_id', session?.user.id)
          .eq('project_id', project_id);
        if (error) {
          console.error('Error removing upvote:', error.message);
          return;
        }
      } else {
        const { data, error } = await supabase
          .from("upvotes")
          .insert([
            { user_id: session?.user.id, project_id }
          ]);
        if (error) {
          console.error('Error upvoting:', error.message);
          return;
        }
      }
      refreshProjects();
    })();
  }

  // Array of sample projects with tags
  // /*
  const testprojects = [
    {
      id: 1,
      title: 'Meaning',
      subtitle: 'AI screen time coach',
      tags: ['@kissane', 'Seeking Support', 'Artificial Intelligence', 'Launched'],
      description: 'This is a description.',
    },
    {
      id: 2,
      title: 'Thing',
      subtitle: 'Wow',
      tags: ['Seeking Teammates', 'In Progress', 'Free Version'],
    },
    {
      id: 3,
      title: 'Project',
      subtitle: 'Thing',
      tags: ['Tag A', 'Tag B'],
    },
    {
      id: 4,
      title: 'Project',
      subtitle: 'Thing',
      tags: ['Tag X', 'Tag Y', 'Tag Z'],
    },
    {
      id: 5,
      title: 'Project',
      subtitle: 'Thing',
      tags: ['Tag Alpha', 'Tag Beta', 'Tag Gamma'],
    },
  ];
  // */

  return (
    <div className="w-full">
      <div className="w-full flex md:flex-row flex-col md:justify-between items-center border-solid border-paper-2 mt-12">
        <div className="flex items-center">
          <p className="text-3xl font-bold md:pb-0 pb-4">
            {
              selectedInterval === 'Newest' ? 'Newest Projects' :
                selectedInterval === 'This Week' ? 'Top Projects This Week' :
                  selectedInterval === 'This Month' ? 'Top Projects This Month' :
                    selectedInterval === 'All Time' ? 'Top Projects All Time' : ''}
          </p>
        </div>

        <div className="grid md:grid-cols-4 grid-cols-2 items-center gap-2">
          {['Newest', 'This Week', 'This Month', 'All Time'].map((interval) => (
            <button
              key={interval}
              onClick={() => handleIntervalChange(interval)}
              className={`py-3 w-[120px] rounded-full font-medium text-center ${selectedInterval === interval ? 'text-paper-6 bg-paper' : 'text-paper-3 bg-paper-2'
                }`}
            >
              {interval}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 pt-8 gap-8">
        {projects.map((project, index) => (
          <button 
            key={project.id} 
            className="shadow-sm transition-all md:hover:scale-[101%] flex flex-col justify-center items-center rounded-2xl border-paper-2 bg-paper hover:cursor" 
            onClick={() => {
              setNewComment('');
              handleClick(project);
            }}
          >
            <div className='flex items-center justify-between w-full md:p-8 p-4 rounded-2xl'>
              <div className="text-left md:pl-0 pl-2">
                <div className="text-xl font-bold">{project.title}</div>
                <div className="text-lg font-medium text-paper-3">{project.subtitle}</div>
              </div>
              <button className={` h-16 w-16 rounded-lg border-[0px] flex justify-center items-center flex-col transition-all hover:border-0 border-cardinal md:hover:scale-[120%] ${project.userHasUpvoted ? ' text-cardinal font-bold' : 'bg-paper text-paper-3 hover:text-cardinal'}`} onClick={(event) => upvote(project.id, event)} >
                <img className=" w-8 h-8" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Evergreen%20Tree.png" alt="Evergreen Tree" />
                <p className=''>{project.upvotes ?? "?"}</p>
              </button>
            </div>
            <div className='relative p-6 pt-0'>
              <div className='aspect-square flex justify-center items-center bg-paper-2 rounded-lg'>
              <img className='bg-paper-2 w-full aspect rounded-lg' src={project.image || "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"}></img>
              </div>
              {selectedInterval !== 'Newest' && (
                <div className={`absolute top-2 left-8 rounded-sm flex justify-center items-center w-12 h-12 ${index === 0 ? 'bg-gradient-to-b from-[#FFBC51] to-[#FFDE6E] text-[#FFF7DA]' : index === 1 ? 'bg-gradient-to-tr from-[#E4ECF0] to-[#EAF8FF] text-paper-3 ' : index === 2 ? 'bg-gradient-to-tr from-[#F4914A] to-[#FFB37C] text-[#C77B5B]' : 'bg-paper-2 text-paper-3 '}`}>
                  <p className="font-medium">#{index + 1}</p>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleClose}>
          <div className="bg-white rounded-lg p-8 relative overflow-y-auto max-h-[600px] max-w-[500px] m-4" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-8 right-8 bg-paper-2 h-[32px] w-[32px] text-paper-3 font-bold text-sm rounded-full" onClick={handleClose}>X</button>
            <button className="absolute top-8 right-20 bg-paper-2 h-[32px] w-[32px] text-paper-3 font-bold text-sm rounded-full" onClick={()=>{alert("Your report has been submitted!")}} >🚩</button>
            <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
            <div className="flex justify-between items-end">
              <p className="text-xl mt-2 font-medium text-paper-3">{selectedProject.subtitle}</p>
              {/* <button >🚩</button> */}
            </div>
            <div className='flex justify-between'>
              <p className="text-lg mt-2 text-black">@{selectedProject.author}</p>
              <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="text-lg mt-2 text-blue-500">{selectedProject.link_title}</a>
            </div>

            {/* <div className='h-[2px] w-full bg-paper-2 mt-4 mb-2'></div> */}
            <div className="my-4">
              <img className='bg-none w-full rounded-lg' src={selectedProject.image || "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"} alt={selectedProject.title} />
            </div>
            <p className="text-sm mt-2 text-paper-3 w-full text-center">{selectedProject.stage == 1 ? "Idea" : selectedProject.stage == 2 ? "Prototype" : selectedProject.stage == 3 ? "Launched" : ""}</p>
            <p className="text-lg mt-2 text-black  w-full text-center" >{selectedProject.description}</p>
            <p className="text-sm mt-2 text-paper-3  w-full text-center" >{selectedProject.tags}</p>
            <div className='h-[2px] w-full bg-paper-2 mt-4 mb-2'></div>
            <div className="flex flex-col">
              { session && (
                <div className="flex flex-col items-center">
                <textarea
                  className="w-full h-24 mt-2 rounded-lg p-4 border-paper-3 border-[1px] text-center"
                  placeholder="Add a comment"
                  onChange={(e) => {
                    if (e.target.value.length <= 200) {
                      setNewComment(e.target.value);
                    }
                  }}
                  value={newComment}
                />
                <button
                  className="bg-cardinal text-paper-1 font-medium rounded-lg p-2 mt-2 w-full"
                  onClick={() => {
                    if (newComment.length <= 200) {
                      postComment();
                    } else {
                      alert("Comment cannot be over 200 characters");
                    }
                  }}
                >
                  Submit
                </button>
              </div>
              
              )}
              { selectedProjectComments.map((comment) => (
                <div key={comment.id} className='p-4 mt-2 border-paper-2 border-2 rounded-lg'>
                  <b className='text-[12px]'>{comment.author_name}</b>
                  <p className="">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
