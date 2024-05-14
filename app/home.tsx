import React, { useState } from 'react';
import Ranking from "./ranking";

export default function Home() {
  const [showSection, setShowSection] = useState(true);

  const handleHideSection = () => {
    setShowSection(false);
  };

  return (
    <main className="flex w-full flex-col font-urbanist bg-paper-1">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="max-w-[1800px] w-11/12 justify-center flex flex-col items-center">

          {showSection && (
            <div className="shadow-sm w-full bg-paper rounded-2xl mt-12 py-12 px-12 flex justify-between items-center">
              <div className="flex items-center">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Waving%20Hand.png" alt="Waving Hand" className="aspect-square w-16 h-16 mb-2 hidden md:block" />
                <div className="md:ml-8">
                  <p className="text-xl font-bold text-paper-6">Welcome to Stanford Studio!</p>
                  <p className="text-paper-3 mt-2 text-regular">The best place to launch and discover new Stanford projects.</p>
                </div>
              </div>
              <button onClick={handleHideSection}>
                <div className="flex items-center justify-center rounded-full bg-paper-2 h-[48px] w-[48px] text-paper-3 font-bold text-sm">X</div>
              </button>
            </div>
          )}

          <Ranking />
        </div>
      </div>
    </main>
  );
}
