'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const tagEmojis: { [key: string]: { emojiUrl: string; }; } = {
  'Artificial Intelligence': { emojiUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Robot.png' },
  'Seeking Support': { emojiUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Two%20Hearts.png' },
  'Launched': { emojiUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png' },
  'In Progress': { emojiUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Flying%20Saucer.png' },
  'Early Stages': { emojiUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Two%20Hearts.png' },
  'Seeking Teammates': { emojiUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Handshake.png' },
};

export default function Ranking() {
  const [selectedInterval, setSelectedInterval] = useState('This Week');
  const [projects, setProjects] = useState([] as any[]);

  const handleIntervalChange = (interval: string) => {
    setSelectedInterval(interval);
    // You can perform any other logic here based on the selected interval
  };

  useEffect(() => {
    // FIXME: Triggers twice, just react things
    supabase
      .from('projects')
      .select()
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching projects:', error.message);
          return;
        }
        setProjects(data);
      });
  }, []);

  // Array of sample projects with tags
  // /*
  const testprojects = [
    {
      id: 1,
      title: 'Meaning',
      subtitle: 'AI screen time coach',
      tags: ['@kissane', 'Seeking Support', 'Artificial Intelligence', 'Launched'],
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
        {testprojects.map((project, index) => (
          <div key={project.id} className="shadow-sm transition-all md:hover:scale-[101%] flex flex-col justify-center items-center rounded-2xl border-paper-2 bg-paper hover:cursor">
            <div className='flex items-center justify-between w-full md:p-8 p-4 rounded-2xl'>

            {/* <div className="flex w-full rounded-lg justify-between items-center"> */}
              <div className="text-left md:pl-0 pl-2">
                
                  <div className="text-xl font-bold">{project.title}</div>
                  <div className="text-lg font-medium text-paper-3">{project.subtitle}</div>
                  {/* <div className="mt-1 font-semibold text-paper-3">{project.description}</div> */}
                
                    {/* Mapping over project tags and rendering them */}
                    {/* <span className="inline-block rounded-full text-sm text-paper-3 mr-2 align-middle">{project.tags}</span> */}
                    {/* {project.tags.map((tag, index) => {

                      return (
                        <span key={index} className="inline-block rounded-full text-sm text-paper-3 mr-2 align-middle">
                          <div className="flex justify-center items-center h-8 px-4 py-2 rounded-full bg-paper-2">
                            {tagEmojis[tag] && <img src={tagEmojis[tag]?.emojiUrl} alt={tag} className='w-4 h-4 aspect-square mr-2' />}
                            {tag}
                          </div>
                        </span>
                      );
                    })} */}
              
              {/* </div> */}
              

            </div>
            <button className={`text-paper-3 h-16 w-16 rounded-lg border-[0px] flex justify-center items-center flex-col transition-all hover:border-0 border-cardinal md:hover:scale-[120%] ${false ? 'text-white bg-cardinal ' : 'bg-paper text-paper-3 hover:text-cardinal'}`}>
                {/* <img className="w-8 h-8" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Axe.png" alt="Axe" /> */}
                <img className=" w-8 h-8" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Evergreen%20Tree.png" alt="Evergreen Tree" />
                <p className=''>523</p>
              </button>
          </div>
            <div className='relative p-6 pt-0'>
            <img className='bg-paper-2 w-full aspect-square rounded-lg' src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"></img>
            {selectedInterval !== 'Newest' && (
  <div className={`absolute top-2 left-8 rounded-sm flex justify-center items-center w-12 h-12 ${index === 0 ? 'bg-gradient-to-b from-[#FFBC51] to-[#FFDE6E] text-[#FFF7DA]' : index === 1 ? 'bg-gradient-to-tr from-[#E4ECF0] to-[#EAF8FF] text-paper-3 ' : index === 2 ? 'bg-gradient-to-tr from-[#F4914A] to-[#FFB37C] text-[#C77B5B]' : 'bg-paper-2 text-paper-3 '}`}>
    <p className="font-medium">#{index + 1}</p>
  </div>
)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
