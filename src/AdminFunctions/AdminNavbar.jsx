import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import sist_logo_login from "../assets/sist_logo_login.png";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const adminLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminMailId");
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const adminEmail = localStorage.getItem("adminMailId") || "admin@sist.edu";

  return (
    <nav className="bg-gradient-to-r from-[#9e1c3f] to-[#b91c3c] text-white shadow-xl relative z-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-2">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center group">
            <a
              href="/admin"
              className="flex items-center space-x-3 hover:opacity-90 transition-all duration-300 transform hover:scale-105"
            >
              <div className="relative">
                <img
                  src={sist_logo_login}
                  alt="SIST Logo"
                  className="h-10 w-auto drop-shadow-md"
                />
              </div>
              {/* <div className="hidden sm:block">
                <h1 className="text-xl font-bold tracking-wide">SIST Admin</h1>
                <p className="text-xs text-white/80 -mt-1">Management Portal</p>
              </div> */}
            </a>
          </div>

          {/* Admin Profile Section */}
          <div className="relative">
            <button
              ref={buttonRef}
              onClick={toggleDropdown}
              className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 group"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              {/* Admin Avatar */}
              <div className="relative">
                <div className="h-8 w-8 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center border border-white/30">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                {/* <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div> */}
              </div>

              {/* Admin Info */}
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold">Administrator</p>
                <p className="text-xs text-white/80 truncate max-w-32">{adminEmail}</p>
              </div>

              {/* Dropdown Arrow */}
              <svg
                className={`h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''} group-hover:scale-110`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <>
                {/* Backdrop for mobile */}
                <div className="fixed inset-0 z-40 md:hidden" onClick={() => setIsDropdownOpen(false)} />

                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden transform transition-all duration-300 animate-in slide-in-from-top-2"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-[#9e1c3f] to-[#b91c3c] px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30">
                        <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="text-white">
                        <h3 className="font-semibold text-lg">Administrator</h3>
                        <p className="text-white/90 text-sm">{adminEmail}</p>
                        {/* <div className="flex items-center mt-1">
                          <div className="h-2 w-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                          <span className="text-xs text-white/80">Active Session</span>
                        </div> */}
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    {/* <div className="px-4 py-2">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Account</p>
                    </div> */}

                    {/* <button className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 group">
                      <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                        <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium">Profile Settings</p>
                        <p className="text-xs text-gray-500">Manage your account</p>
                      </div>
                    </button> */}

                    {/* <button className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 group">
                      <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors">
                        <svg className="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium">System Settings</p>
                        <p className="text-xs text-gray-500">Configure preferences</p>
                      </div>
                    </button> */}

                    {/* Divider */}
                    {/* <div className="my-2 border-t border-gray-100"></div> */}

                    {/* Logout Button */}
                    <button
                      onClick={adminLogout}
                      className="w-full flex items-center px-6 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 group"
                    >
                      <div className="h-8 w-8 bg-red-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-200 transition-colors">
                        <svg className="h-4 w-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold">Sign Out</p>
                        <p className="text-xs text-gray-500">End your session</p>
                      </div>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;