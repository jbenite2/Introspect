import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const logOutButton = () => {
    router.push("/");
  };

  useEffect(() => {
    // Check if the screen width is less than or equal to 640px
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="flex items-center justify-between flex-wrap bg--gradient-to-tr from-purple-200 to-blue-900 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <a href="/dashboard">
          <span className="font-bold text-3xl">Introspect</span>
        </a>
      </div>
      <div className="w-full block lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          {isMobile && (
            <button
              onClick={toggleMenu}
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-purple-500 hover:bg-white mt-4 lg:mt-0"
            >
              Menu
            </button>
          )}
          {!isMobile && (
            <div className="lg:inline-block">
              <a
                href="/about"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
              >
                About
              </a>
              <a
                href="/survey/instructions"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
              >
                Survey
              </a>
              <a
                href="#"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white"
              >
                Analytics
              </a>
            </div>
          )}
          {menuOpen && (
            <div className="lg:inline-block">
              <a
                href="/about"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
              >
                About
              </a>
              <a
                href="/survey/instructions"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
              >
                Survey
              </a>
              <a
                href="/analytics"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white"
              >
                Analytics
              </a>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={logOutButton}
            className="inline-block text-base px-4 py-2 ml-0 lg:ml-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-purple-500 hover:bg-white mt-4 lg:mt-0"

          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
