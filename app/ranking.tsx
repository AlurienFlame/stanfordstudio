'use client'
import React, { useState } from 'react';

const tagEmojis: { [key: string]: { emojiUrl: string} } = {
    'Artificial Intelligence': { emojiUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Robot.png'},
    'Seeking Support': { emojiUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Two%20Hearts.png'},
    'Launched': { emojiUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png'},
    'In Progress': { emojiUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Flying%20Saucer.png'},
    'Early Stages': { emojiUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Two%20Hearts.png'},
    'Seeking Teammates': { emojiUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Handshake.png'},
};

export default function Ranking() {
  const [selectedInterval, setSelectedInterval] = useState('This Week');

  const handleIntervalChange = (interval: string) => {
    setSelectedInterval(interval);
    // You can perform any other logic here based on the selected interval
  };

  // Array of sample projects with tags
// Array of sample projects with tags
const projects = [
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
  

  return (
    <div className="w-full">
      <div className="w-full flex justify-between border-b-2 border-solid border-paper-2 mt-12 pb-4">
        <div className="flex items-center">
        <p className="text-3xl font-bold">
      {
      selectedInterval === 'Newest' ? 'Newest Projects' :
      selectedInterval === 'This Week' ? 'Top Projects This Week' :
      selectedInterval === 'This Month' ? 'Top Projects This Month' :
      selectedInterval === 'All Time' ? 'Top Projects All Time' : ''}
    </p>
        </div>

        <div className="flex justify-end items-center gap-2">
          {['Newest', 'This Week', 'This Month', 'All Time'].map((interval) => (
            <p
              key={interval}
              onClick={() => handleIntervalChange(interval)}
              className={`py-3 w-[120px] bg-paper-2 rounded-lg font-medium text-center ${
                selectedInterval === interval ? 'text-paper-6' : 'text-paper-3'
              }`}
            >
              {interval}
            </p>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        {projects.map((project, index) => (
          <div key={project.id} className="flex justify-center items-center mt-4 rounded-lg border-paper-2 bg-paper transition-all hover:bg-gradient-to-tr from-[#FDFDFD] to-[#F0F1F7] hover:cursor">
            <div className={`rounded-lg mr-6 ml-6 flex justify-center items-center w-16 h-16 ${index === 0 ? 'bg-gradient-to-tr from-[#FFBC51] to-[#FFDE6E] text-[#FFF7DA]' : index === 1 ? 'bg-gradient-to-tr from-[#E4ECF0] to-[#EAF8FF] text-paper-3 ' : index === 2 ? 'bg-gradient-to-tr from-[#F4914A] to-[#FFB37C] text-[#C77B5B]' : 'bg-paper-2 text-paper-3 '}`}>
              <p className="font-medium">#{index + 1}</p>
            </div>
            <div className="flex w-full rounded-lg justify-between items-center">
              <div className="flex my-6 justify-center items-center">
                <div className="bg-paper-3 h-20 w-20 rounded-lg">
                    
                </div>
                <div className="ml-6">
                  <div className="text-xl font-bold">{project.title} - {project.subtitle}</div>
                  {/* <div className="mt-1 font-semibold text-paper-3">{project.description}</div> */}
                  <div className='mt-2'>
                    {/* Mapping over project tags and rendering them */}
                    {project.tags.map((tag, index) => {
    
    return (
        <span key={index} className="inline-block rounded-full text-sm text-paper-3 mr-2 align-middle">
            <div className="flex justify-center items-center h-8 px-4 py-2 rounded-full bg-paper-2">
                {tagEmojis[tag] && <img src={tagEmojis[tag]?.emojiUrl} alt={tag} className='w-4 h-4 aspect-square mr-2' />}
                {tag}
            </div>
        </span>
    );
})}






                  </div>
                </div>
              </div>
              <div className={`text-paper-3 h-16 w-16 my-6 mr-6 rounded-lg border-[0px] flex justify-center items-center flex-col transition-all hover:border-0 border-cardinal hover:scale-105 ${false ? 'text-white bg-cardinal ' : 'bg-paper text-paper-3 hover:text-cardinal'}`}>
    {/* <img className="w-8 h-8" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Axe.png" alt="Axe" /> */}
    <img className="w-8 h-8" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Evergreen%20Tree.png" alt="Evergreen Tree"/>
    <p className=''>523</p>
</div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
