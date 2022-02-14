//NextJS import
import type { NextPage } from "next";
import Head from "next/head";

//React import
import { useEffect, useRef } from "react";

//Depedencies import
import gsap from "gsap";

//Components import
import SignInForm from "../components/signInForm/signInForm";

const Home: NextPage = () => {
  //Logo animation
  useEffect(() => {
    gsap.fromTo(
      ".letter",
      { y: "100%" },
      { y: 0, duration: 0.2, delay: 0.5, stagger: 0.1 }
    );
  }, []);

  //Login form animation
  useEffect(() => {
    gsap.fromTo(
      ".login-wrapper",
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );
  }, []);

  return (
    <div className="w-screen h-screen ">
      <Head>
        <title>BAU Time</title>
        <meta name="description" content="A portal for BAU units" />
      </Head>
      {/* Title */}
      <h1 className="font-bold text-[1.5rem] ml-5 pt-2 logo overflow-hidden">
        <span className="inline-block letter">B</span>
        <span className="inline-block letter">A</span>
        <span className="inline-block letter">U</span>
        <span className="inline-block letter">T</span>
        <span className="inline-block letter">i</span>
        <span className="inline-block letter">m</span>
        <span className="inline-block letter">e.</span>
      </h1>

      {/* Body Wrapper */}
      <div className="w-full h-[90vh] flex justify-center items-center">
        <SignInForm />
      </div>
    </div>
  );
};

export default Home;
