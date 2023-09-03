"use client";
import { useEffect } from "react";
import { signIn } from "next-auth/react";
import Typed from "typed.js";

const Login = () => {
  useEffect(() => {
    const options = {
      strings: [
        "Elevate your efficiency.",
        "Unlock your productivity potential.",
        "Master your day, every day.",
        "Your to-do list, but better.",
        "The No.1 ToDo App",
        "At no cost to you.",
        "Start now for free!",
      ],
      typeSpeed: 80,
      backSpeed: 40,
      loop: true,
      showCursor: false,
    };

    const typed = new Typed(".typewriter", options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col justify-center h-screen">
      <h1 className="text-5xl text-white text-center h-32 px-2 glowing-text typewriter"></h1>
      <div className="flex justify-center">
        <button
          className="py-4 px-20 bg-blue-400 mt-20 rounded-full text-white shadow-lg hover:bg-blue-400/80 transition-transform transform hover:scale-110"
          onClick={() => signIn("google")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
