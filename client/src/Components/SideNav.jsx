import React, { useState } from "react";
import { FaInfinity } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig.js"


export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      // Sign out from Firebase
      await auth.signOut();
  
      // Clear access token cookie
      document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
      // Clear all user-related data from localStorage
      localStorage.removeItem("user"); // Remove specific user key
      localStorage.clear(); // Clear everything from localStorage (optional, if no other data is needed)
  
      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };


  return (
    <>
      <button
        onClick={toggleSidebar}
        aria-controls="sidebar"
        type="button"
        className="fixed top-4 left-4 z-50 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only font-manrope">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="sidebar"
        className={`fixed top-0 left-0 z-40 w-72 h-screen transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="flex flex-col justify-between h-full bg-[#1B2028] py-8 px-6">
          <div className="h-full py-4 overflow-y-auto">
            <Link to={"/homepage"} onClick={closeSidebar}>
              <div className="flex text-white items-center gap-3 mt-4">
                <FaInfinity className="h-8 w-8 text-emerald-400" />
                <h1 className="text-2xl font-manrope">Loremipsum</h1>
              </div>
            </Link>
            <div className="mt-14 font-manrope">
              <ul className="space-y-6 font-medium w-full">
                <li>
                  <div className="flex items-center border rounded-lg px-3 py-3">
                    <svg
                      className="w-5 h-5 text-[#9E9E9E]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                    <span className="ms-3 text-[#9E9E9E] font-manrope">
                      Search (Ctrl+/)
                    </span>
                  </div>
                </li>
                <li>
                  <Link
                    to="/homepage"
                    className="text-gray-900 rounded-lg group"
                    onClick={closeSidebar}
                  >
                    <div
                      className={`flex items-center rounded-lg px-3 py-3 font-manrope ${isActiveLink("/homepage")
                          ? "bg-[#06D6A0] text-[#1E1E1E]"
                          : "text-[#9E9E9E] hover:text-white"
                        }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        ></path>
                      </svg>
                      <span className="ms-3 ">Overview</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/data"
                    className="text-gray-900 group"
                    onClick={closeSidebar}
                  >
                    <div
                      className={`flex items-center rounded-xl px-3 py-3 ${isActiveLink("/data")
                          ? "bg-[#06D6A0] text-[#1E1E1E]"
                          : "text-[#9E9E9E] hover:text-white"
                        }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                        ></path>
                      </svg>
                      <span className="ms-3 font-manrope">Data</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="text-gray-900 group"
                    onClick={closeSidebar}
                  >
                    <div
                      className={`flex items-center rounded-xl px-3 py-3 ${isActiveLink("/jobs")
                          ? "bg-[#06D6A0] text-[#1E1E1E]"
                          : "text-[#9E9E9E] hover:text-white"
                        }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        ></path>
                      </svg>
                      <span className="ms-3 font-manrope">Jobs</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="text-gray-900 rounded-lg group"
                    onClick={closeSidebar}
                  >
                    <div
                      className={`flex items-center rounded-xl px-3 py-3 w-full ${isActiveLink("/profile")
                          ? "bg-[#06D6A0] text-[#1E1E1E]"
                          : "text-[#9E9E9E] hover:text-white"
                        }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                      <span className="ms-3 font-manrope">Profile</span>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Link to="/" onClick={closeSidebar}>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 rotate-180 text-[#9E9E9E]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
              <h1
                className="text-[#9E9E9E] font-manrope"
                onClick={handleLogout}
              >
                Logout
              </h1>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}
