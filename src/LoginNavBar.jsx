import React, { useState } from "react";
import { FiMenu } from "react-icons/fi"; // Assuming you want to use the Feather icon pack

import sist_logo_login from "./assets/sist_logo_login.png";

const LoginNavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <nav className="flex items-center justify-between bg-[#9e1c3f] p-10 py-5">
        <div className="flex items-center">
          <a href="/">
            <img
              src={sist_logo_login}
              alt="Logo"
              className="object-scale-down h-35 w-80 px-3 pt-3"
            />
          </a>
        </div>

        <div
          className={`lg:flex items-center space-x-10 text-white ${
            showMenu ? "hidden" : "hidden"
          }`}
        >
          <a className=" text-white " href="/login">
            Student Login
          </a>
          <a className="text-white" href="/staff_login">
            Faculty Login
          </a>
          <a className="text-white" href="/admin_login">
            Admin
          </a>
          <a className="text-white" href="/">
            About
          </a>

          <p
            className="cursor-pointer"
            onClick={() => {
              window.open(
                "https://mail.google.com/mail/?view=cm&fs=1&to=guideselection.cse@sathyabama.ac.in"
              );
            }}
          >
            {" "}
            Support
          </p>
        </div>
        <div className="lg:hidden flex items-center">
          <button
            onClick={handleMenuToggle}
            className="text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#9e1c3f] focus:ring-white"
          >
            <FiMenu size={36} />
          </button>
        </div>
      </nav>
      {showMenu && (
        <div
          className={`lg:hidden flex flex-col items-center bg-[#9e1c3f] text-white ${
            showMenu ? "" : "hidden"
          }`}
        >
          <a className="py-3" href="/login">
            Student Login
          </a>
          <a className="py-3" href="/staff_login">
            Faculty Login
          </a>
          <a className="py-3" href="/admin_login">
            Admin
          </a>
          <a className="py-3" href="/">
            About
          </a>

          <p
            className="cursor-pointer"
            onClick={() => {
              window.open(
                "https://mail.google.com/mail/?view=cm&fs=1&to=guideselection.cse@sathyabama.ac.in"
              );
            }}
          >
            {" "}
            Support
          </p>
        </div>
      )}
    </>
  );
};

export default LoginNavBar;

// import React, { useState } from "react";
// import { FiMenu, FiX } from "react-icons/fi";
// import {
//   FaUserGraduate,
//   FaChalkboardTeacher,
//   FaUserShield,
//   FaInfoCircle,
//   FaHeadset,
// } from "react-icons/fa";
// import sist_logo_login from "./assets/sist_logo_login.png";

// const LoginNavBar = () => {
//   const [showMenu, setShowMenu] = useState(false);

//   return (
//     <nav className="bg-[#9e1c3f] p-4 shadow-md">
//       <div className="container mx-auto flex items-center justify-between">
//         {/* Logo */}
//         <a href="/">
//           <img src={sist_logo_login} alt="Logo" className="h-16" />
//         </a>

//         {/* Desktop Menu */}
//         <div className="hidden lg:flex space-x-8 font-medium">
//           <a
//             href="/login"
//             className="font-bold bg-gradient-to-r from-white to-gray-200 text-[#9e1c3f] px-4 py-0 rounded-xl shadow-lg hover:from-gray-100 transition flex items-center space-x-2"
//           >
//             <FaUserGraduate /> <span>Student Login</span>
//           </a>
//           <a
//             href="/staff_login"
//             className="font-bold bg-gradient-to-r from-white to-gray-200 text-[#9e1c3f] px-6 py-3 rounded-xl shadow-lg hover:from-gray-100 transition flex items-center space-x-2"
//           >
//             <FaChalkboardTeacher /> <span>Faculty Login</span>
//           </a>
//           <a
//             href="/admin_login"
//             className="font-bold bg-gradient-to-r from-white to-gray-200 text-[#9e1c3f] px-6 py-3 rounded-xl shadow-lg hover:from-gray-100 transition flex items-center space-x-2"
//           >
//             <FaUserShield /> <span>Admin</span>
//           </a>
//           <a
//             href="/"
//             className="font-bold bg-gradient-to-r from-white to-gray-200 text-[#9e1c3f] px-6 py-3 rounded-xl shadow-lg hover:from-gray-100 transition flex items-center space-x-2"
//           >
//             <FaInfoCircle /> <span>About</span>
//           </a>
//           <p
//             className="font-bold cursor-pointer bg-gradient-to-r from-white to-gray-200 text-[#9e1c3f] px-6 py-3 rounded-xl shadow-lg hover:from-gray-100 transition flex items-center space-x-2"
//             onClick={() =>
//               window.open(
//                 "https://mail.google.com/mail/?view=cm&fs=1&to=guideselection.cse@sathyabama.ac.in",
//                 "_blank"
//               )
//             }
//           >
//             <FaHeadset /> <span>Support</span>
//           </p>
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="lg:hidden text-white"
//           onClick={() => setShowMenu(!showMenu)}
//         >
//           {showMenu ? <FiX size={28} /> : <FiMenu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-[#9e1c3f] text-white p-5 transform ${
//           showMenu ? "translate-x-0" : "translate-x-full"
//         } transition-transform duration-300 ease-in-out shadow-lg`}
//       >
//         <button
//           className="absolute top-5 right-5 text-white"
//           onClick={() => setShowMenu(false)}
//         >
//           <FiX size={28} />
//         </button>
//         <div className="mt-10 flex flex-col space-y-6 text-lg">
//           <a
//             href="/login"
//             className="bg-white text-[#9e1c3f] px-6 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition flex items-center space-x-2"
//           >
//             <FaUserGraduate /> <span>Student Login</span>
//           </a>
//           <a
//             href="/staff_login"
//             className="bg-white text-[#9e1c3f] px-6 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition flex items-center space-x-2"
//           >
//             <FaChalkboardTeacher /> <span>Faculty Login</span>
//           </a>
//           <a
//             href="/admin_login"
//             className="bg-white text-[#9e1c3f] px-6 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition flex items-center space-x-2"
//           >
//             <FaUserShield /> <span>Admin</span>
//           </a>
//           <a
//             href="/"
//             className="bg-white text-[#9e1c3f] px-6 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition flex items-center space-x-2"
//           >
//             <FaInfoCircle /> <span>About</span>
//           </a>
//           <p
//             className="cursor-pointer bg-white text-[#9e1c3f] px-6 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition flex items-center space-x-2"
//             onClick={() =>
//               window.open(
//                 "https://mail.google.com/mail/?view=cm&fs=1&to=guideselection.cse@sathyabama.ac.in",
//                 "_blank"
//               )
//             }
//           >
//             <FaHeadset /> <span>Support</span>
//           </p>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default LoginNavBar;
