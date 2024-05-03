import Image from "next/image";
import Nav from "./nav";
import Ranking from "./ranking";
import Home from "./home";
// import Login from "./login/login"

export default function Page() {
  return (
    <main className="flex w-full flex-col font-urbanist">
            <Nav></Nav>
            <Home></Home>
            {/* <Login></Login> */}
    </main>
  );
}
