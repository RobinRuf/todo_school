"use client"
import { useEffect } from "react"
import { signIn } from "next-auth/react";
import Typed from 'typed.js';

const Login = () => {

  useEffect(() => {
    const options = {
        strings: ["Die Nr. 1 der ToDo-Apps!", "Logge dich kostenlos ein.", "Alle Aufgaben auf einen Blick.", "Direkt loslegen.", 'Nutten ficken?', 'Nur wann wird welche gefickt?', "Jetzt ToDo anlegen!"],
        typeSpeed: 80,
        backSpeed: 40,
        loop: true
    };

    const typed = new Typed('.typewriter', options);

    return () => {
        typed.destroy();
    };
}, []);

  return (
    <div className="flex flex-col justify-center h-screen">
      <h1 className="text-5xl text-white text-center glowing-text typewriter">
      </h1>
      <div className="flex justify-center">
      <button className="py-4 px-20 bg-blue-400 mt-20 rounded-full text-white shadow-lg hover:bg-blue-400/80 transition-transform transform hover:scale-110" onClick={() => signIn("google")}>
        Einloggen
      </button>
      </div>
    </div>
  );
};

export default Login;
