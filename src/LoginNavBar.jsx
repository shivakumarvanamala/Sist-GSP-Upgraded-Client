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
          className={`lg:flex items-center space-x-10 text-white ${showMenu ? "hidden" : "hidden"
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
          className={`lg:hidden flex flex-col items-center bg-[#9e1c3f] text-white ${showMenu ? "" : "hidden"
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


// import React, { useState, useEffect } from "react";
// import sist_logo_login from "./assets/sist_logo_login.png";

// const LoginNavBar = () => {
//   const [showMenu, setShowMenu] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   const handleMenuToggle = () => {
//     setShowMenu(!showMenu);
//   };

//   // Handle scroll effect for navbar
//   useEffect(() => {
//     const handleScroll = () => {
//       const isScrolled = window.scrollY > 10;
//       setScrolled(isScrolled);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close mobile menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (showMenu && !event.target.closest('.mobile-menu-container')) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [showMenu]);

//   const navLinks = [
//     { href: "/login", text: "Student Login", icon: "👨‍🎓" },
//     { href: "/staff_login", text: "Faculty Login", icon: "👨‍🏫" },
//     { href: "/admin_login", text: "Admin", icon: "⚙️" },
//     { href: "/", text: "About", icon: "ℹ️" }
//   ];

//   const handleSupportClick = () => {
//     window.open(
//       "https://mail.google.com/mail/?view=cm&fs=1&to=guideselection.cse@sathyabama.ac.in"
//     );
//   };

//   return (
//     <>
//       <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
//           ? 'bg-[#9e1c3f]/95 backdrop-blur-lg shadow-2xl'
//           : 'bg-gradient-to-r from-[#9e1c3f] via-[#b91c3c] to-[#9e1c3f]'
//         }`}>
//         {/* Animated background overlay */}
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse opacity-50"></div>

//         <div className="relative container mx-auto px-6 lg:px-8">
//           <div className="flex items-center justify-between py-4 lg:py-6">
//             {/* Logo Section */}
//             <div className="flex items-center group">
//               <a href="/" className="relative overflow-hidden rounded-xl p-2 transition-all duration-300 hover:bg-white/10">
//                 <img
//                   src={sist_logo_login}
//                   alt="SIST Logo"
//                   className="h-12 lg:h-16 w-auto object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 group-hover:animate-shimmer"></div>
//               </a>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex items-center space-x-1">
//               {navLinks.map((link, index) => (
//                 <a
//                   key={index}
//                   href={link.href}
//                   className="group relative px-6 py-3 text-white font-medium transition-all duration-300 hover:text-white/90"
//                 >
//                   <span className="relative z-10 flex items-center space-x-2">
//                     <span className="text-lg">{link.icon}</span>
//                     <span>{link.text}</span>
//                   </span>

//                   {/* Hover effect background */}
//                   <div className="absolute inset-0 bg-white/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>

//                   {/* Bottom border animation */}
//                   <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white rounded-full group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300"></div>
//                 </a>
//               ))}

//               {/* Support Button */}
//               <button
//                 onClick={handleSupportClick}
//                 className="group relative px-6 py-3 ml-4 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 text-white font-semibold transition-all duration-300 hover:bg-white/30 hover:scale-105 hover:shadow-xl"
//               >
//                 <span className="flex items-center space-x-2">
//                   <span className="text-lg">💬</span>
//                   <span>Support</span>
//                 </span>

//                 {/* Glow effect */}
//                 <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
//               </button>
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="lg:hidden mobile-menu-container">
//               <button
//                 onClick={handleMenuToggle}
//                 className="relative p-3 text-white focus:outline-none group"
//                 aria-label="Toggle menu"
//               >
//                 <div className="absolute inset-0 bg-white/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200"></div>
//                 <div className="relative space-y-1.5">
//                   <div className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${showMenu ? 'rotate-45 translate-y-2' : ''}`}></div>
//                   <div className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${showMenu ? 'opacity-0' : ''}`}></div>
//                   <div className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${showMenu ? '-rotate-45 -translate-y-2' : ''}`}></div>
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu Overlay */}
//       {showMenu && (
//         <div className="fixed inset-0 z-40 lg:hidden">
//           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowMenu(false)}></div>
//         </div>
//       )}

//       {/* Mobile Menu */}
//       <div className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-gradient-to-b from-[#9e1c3f] to-[#7c1e3a] transform transition-transform duration-500 ease-out z-50 lg:hidden mobile-menu-container ${showMenu ? 'translate-x-0' : 'translate-x-full'
//         }`}>
//         {/* Close Button */}
//         <div className="flex justify-end p-6">
//           <button
//             onClick={() => setShowMenu(false)}
//             className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         {/* Menu Header */}
//         <div className="px-6 pb-6">
//           <div className="text-center">
//             <img
//               src={sist_logo_login}
//               alt="SIST Logo"
//               className="h-16 mx-auto mb-4 drop-shadow-lg"
//             />
//             <h2 className="text-white text-xl font-bold">Navigation Menu</h2>
//             <div className="w-16 h-1 bg-white/30 rounded-full mx-auto mt-2"></div>
//           </div>
//         </div>

//         {/* Menu Items */}
//         <div className="px-6 space-y-2">
//           {navLinks.map((link, index) => (
//             <a
//               key={index}
//               href={link.href}
//               onClick={() => setShowMenu(false)}
//               className="group flex items-center space-x-4 p-4 text-white rounded-xl transition-all duration-300 hover:bg-white/20 hover:translate-x-2"
//               style={{ animationDelay: `${index * 100}ms` }}
//             >
//               <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
//                 <span className="text-lg">{link.icon}</span>
//               </div>
//               <span className="font-medium">{link.text}</span>
//               <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//                 </svg>
//               </div>
//             </a>
//           ))}

//           {/* Support Button Mobile */}
//           <button
//             onClick={handleSupportClick}
//             className="group w-full flex items-center space-x-4 p-4 text-white rounded-xl transition-all duration-300 hover:bg-white/20 hover:translate-x-2 mt-6"
//           >
//             <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
//               <span className="text-lg">💬</span>
//             </div>
//             <span className="font-medium">Support</span>
//             <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//               </svg>
//             </div>
//           </button>
//         </div>

//         {/* Footer */}
//         <div className="absolute bottom-6 left-6 right-6">
//           <div className="text-center text-white/60 text-sm">
//             <p>© 2024 SIST</p>
//             <p>Sathyabama Institute</p>
//           </div>
//         </div>
//       </div>

//       {/* Spacer for fixed navbar */}
//       <div className="h-20 lg:h-24"></div>

//       {/* Custom styles for animations */}
//       <style jsx>{`
//         @keyframes shimmer {
//           0% { transform: translateX(-100%) skewX(-12deg); }
//           100% { transform: translateX(200%) skewX(-12deg); }
//         }
//         .animate-shimmer {
//           animation: shimmer 1.5s ease-in-out;
//         }
//       `}</style>
//     </>
//   );
// };

// export default LoginNavBar;


// import React, { useState, useEffect } from "react";
// import sist_logo_login from "./assets/sist_logo_login.png";

// const LoginNavBar = () => {
//   const [showMenu, setShowMenu] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   const handleMenuToggle = () => {
//     setShowMenu(!showMenu);
//   };

//   // Handle scroll effect for navbar
//   useEffect(() => {
//     const handleScroll = () => {
//       const isScrolled = window.scrollY > 20;
//       setScrolled(isScrolled);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close mobile menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (showMenu && !event.target.closest('.mobile-menu-container')) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [showMenu]);

//   const navLinks = [
//     { href: "/login", text: "Student Login" },
//     { href: "/staff_login", text: "Faculty Login" },
//     { href: "/admin_login", text: "Admin Portal" },
//     { href: "/", text: "About Us" }
//   ];

//   const handleSupportClick = () => {
//     window.open(
//       "https://mail.google.com/mail/?view=cm&fs=1&to=guideselection.cse@sathyabama.ac.in"
//     );
//   };

//   return (
//     <>
//       <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
//           ? 'bg-white shadow-lg border-b border-gray-100'
//           : 'bg-[#9e1c3f]'
//         }`}>

//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="flex items-center justify-between h-20">

//             {/* Logo Section */}
//             <div className="flex items-center">
//               <a href="/" className="flex items-center space-x-3 group">
//                 <img
//                   src={sist_logo_login}
//                   alt="SIST Logo"
//                   className="h-12 lg:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
//                 />
//                 <div className={`hidden sm:block transition-colors duration-300 ${scrolled ? 'text-[#9e1c3f]' : 'text-white'
//                   }`}>
//                   <h1 className="text-lg font-bold">SIST</h1>
//                   <p className="text-xs opacity-80 -mt-1">Sathyabama Institute</p>
//                 </div>
//               </a>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex items-center space-x-8">
//               {navLinks.map((link, index) => (
//                 <a
//                   key={index}
//                   href={link.href}
//                   className={`relative px-3 py-2 font-medium transition-all duration-200 group ${scrolled
//                       ? 'text-gray-700 hover:text-[#9e1c3f]'
//                       : 'text-white hover:text-white/90'
//                     }`}
//                 >
//                   {link.text}
//                   <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full ${scrolled ? 'bg-[#9e1c3f]' : 'bg-white'
//                     }`}></span>
//                 </a>
//               ))}

//               {/* Support Button */}
//               <button
//                 onClick={handleSupportClick}
//                 className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 border ${scrolled
//                     ? 'bg-[#9e1c3f] text-white border-[#9e1c3f] hover:bg-[#8b1538] hover:border-[#8b1538]'
//                     : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
//                   }`}
//               >
//                 Support
//               </button>
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="lg:hidden mobile-menu-container">
//               <button
//                 onClick={handleMenuToggle}
//                 className={`p-2 rounded-lg transition-all duration-200 ${scrolled
//                     ? 'text-gray-700 hover:bg-gray-100'
//                     : 'text-white hover:bg-white/10'
//                   }`}
//                 aria-label="Toggle menu"
//               >
//                 <div className="w-6 h-6 flex flex-col justify-center space-y-1">
//                   <span className={`block w-full h-0.5 bg-current transform transition-all duration-200 ${showMenu ? 'rotate-45 translate-y-1.5' : ''
//                     }`}></span>
//                   <span className={`block w-full h-0.5 bg-current transition-all duration-200 ${showMenu ? 'opacity-0' : ''
//                     }`}></span>
//                   <span className={`block w-full h-0.5 bg-current transform transition-all duration-200 ${showMenu ? '-rotate-45 -translate-y-1.5' : ''
//                     }`}></span>
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu Overlay */}
//       <div className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-200 ${showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
//         }`} onClick={() => setShowMenu(false)}></div>

//       {/* Mobile Menu */}
//       <div className={`fixed top-20 left-4 right-4 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 lg:hidden mobile-menu-container transform transition-all duration-200 origin-top ${showMenu ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
//         }`}>

//         {/* Menu Header */}
//         <div className="px-6 py-4 border-b border-gray-100">
//           <div className="flex items-center space-x-3">
//             <img
//               src={sist_logo_login}
//               alt="SIST Logo"
//               className="h-8 w-auto"
//             />
//             <div>
//               <h3 className="font-semibold text-gray-900">Navigation</h3>
//               <p className="text-sm text-gray-600">Quick access to portals</p>
//             </div>
//           </div>
//         </div>

//         {/* Menu Items */}
//         <div className="py-2">
//           {navLinks.map((link, index) => (
//             <a
//               key={index}
//               href={link.href}
//               onClick={() => setShowMenu(false)}
//               className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#9e1c3f] transition-colors duration-150"
//             >
//               <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
//                 <div className="w-2 h-2 bg-[#9e1c3f] rounded-full"></div>
//               </div>
//               <span className="font-medium">{link.text}</span>
//             </a>
//           ))}

//           {/* Support Button Mobile */}
//           <div className="px-6 py-3 border-t border-gray-100 mt-2">
//             <button
//               onClick={() => {
//                 handleSupportClick();
//                 setShowMenu(false);
//               }}
//               className="w-full flex items-center justify-center px-4 py-3 bg-[#9e1c3f] text-white rounded-lg hover:bg-[#8b1538] transition-colors duration-150"
//             >
//               <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//               Contact Support
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Spacer for fixed navbar */}
//       <div className="h-20"></div>
//     </>
//   );
// };

// export default LoginNavBar;