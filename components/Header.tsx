import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";

const Header = () => {
  const [searchActive, setSearchActive] = useState(false);

  return (
    <div className="flex w-screen max-w-4xl justify-between px-10 text-white pt-5 items-center">
      <p className="text-blue-400 font-light italic">ToDo - Dashboard</p>
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
        <div className="relative flex items-center bg-gray-800 rounded-full">
          <button
            className={`flex items-center rounded-full px-3 py-2 hover:bg-blue-400/100 transition-transform transform hover:scale-110 ${
              searchActive ? "rounded-r-none bg-gray-800" : "bg-blue-400/60"
            }`}
            onClick={() => setSearchActive((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
          {searchActive && (
            <input
              type="text"
              className="pl-2 py-2 w-60 bg-gray-800 text-white rounded-r-full focus:ring-0 outline-none transition-width duration-300"
            />
          )}
        </div>
      </div>
      <button
        className="text-white bg-blue-400/60 rounded-full px-4 py-1 hover:bg-blue-400/100 transition-transform transform hover:scale-110"
        onClick={() => signOut()}
      >
        <FontAwesomeIcon icon={faSignOutAlt} title="Logout" />
      </button>
    </div>
  );
};

export default Header;
