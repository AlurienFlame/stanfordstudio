import Image from "next/image";
import Nav from "./nav";
import Ranking from "./ranking";

export default function Home() {
  return (
    <main className="flex w-full flex-col font-urbanist">
            <Nav></Nav>
            <div className="w-full flex flex-col justify-center items-center">
              <div className="max-w-[1800px] w-11/12 justify-center flex flex-col items-center">
                <div className="w-full bg-paper-2 rounded-lg mt-12 py-12 px-12 flex items-center">
                  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Waving%20Hand.png" alt="Waving Hand" className="aspect-square w-16 h-16 mb-2"/>
                  <div className="ml-8">
                  <p className="text-xl font-bold text-paper-6">Welcome to Stanford Studio!</p>
                  <p className="text-paper-3 mt-2 text-regular">The best place to launch and discover new Stanford projects.</p>
                  </div>
                </div>
                <Ranking></Ranking>
              </div>
            </div>
    </main>
  );
}