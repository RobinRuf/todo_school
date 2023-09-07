import { signOut } from "next-auth/react";

const Header = () => {
  return (
    <div className="flex w-screen max-w-4xl justify-between px-10 text-white pt-5">
      <p className="text-blue-400 font-light italic">ToDo - Dashboard</p>
      <p className="hidden md:flex">ToDo suchen (coming soon)</p>
      <button
        className="text-white bg-blue-400/60 rounded-full px-4 py-1 hover:bg-blue-400/100 transition-transform transform hover:scale-110"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
