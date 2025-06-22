import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Footer from "./shared/Footer";
import LoadingScreen from "./shared/Loader";
// import sist_logo_login from "./assets/sist_logo_login.png";
// import log_out from "./assets/svgs/log_out.svg";

import AdminNavbar from "./AdminFunctions/AdminNavbar";

const Admin = () => {
  const SERVERPATH = import.meta.env.VITE_SERVERPATH;

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [Error1, setError1] = useState();

  const alertDelay = () => {
    setTimeout(() => {
      setError1("");
    }, 3000); // 3000 milliseconds = 3 seconds
  };

  // const [isDropdownOpen, setDropdownOpen] = useState(false);

  // const toggleDropdown = () => {
  //   setDropdownOpen(!isDropdownOpen);
  // };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminMailId = localStorage.getItem("adminMailId");
    // console.log(token);
    // console.log(adminMailId);
    if (token) {
      const headers = {
        Authorization: `${token}`,
      };
      const func = async () => {
        setIsLoading(true);
        const response = await axios.get(
          SERVERPATH + "/checkAuthentication/" + adminMailId,
          { headers }
        );
        // console.log(response.data);
        setIsLoading(false);
        if (response.data.message == "Authenticated") {
          //   navigate("/admin");
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("adminMailId");
          navigate("/");
        }
      };
      func();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("adminMailId");
      navigate("/");
    }
  }, []);

  // const adminLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("adminMailId");
  //   navigate("/");
  // };


  return (
    <>
      {isLoading && <LoadingScreen />}

      {/* <nav className="bg-[#9e1c3f] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <a href="/">
              <img src={sist_logo_login} alt="Logo" className="h-12 w-auto" />
            </a>
          </div>
          <div className="flex items-center relative">
            <button onClick={toggleDropdown} className="focus:outline-none">
              <svg className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-10 right-0 bg-white text-gray-800 p-2 rounded shadow-md z-10">
                <div className="flex items-center gap-2 hover:bg-gray-200 px-3 py-1 rounded">
                  <img className="h-4 w-4" src={log_out} alt="LogOut" />
                  <button onClick={adminLogout} className="text-sm">Logout</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav> */}
      <AdminNavbar />

      <body className="w-full flex items-center justify-center px-4 admin_login_bg">
        <div className="backdrop-filter  bg-white bg-opacity-40 shadow-2xl rounded-3xl p-10 w-full max-w-xl space-y-8 text-white">
          <h1 className="text-3xl font-bold text-center text-[#9e1c3f]">Admin Panel </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <a href="/admin/add_team" className="bg-red-700 hover:bg-red-800 text-white px-6 py-4 rounded-md my-2 text-lg transition-all text-center shadow-md font-semibold backdrop-blur-sm hover:scale-105 hover:shadow-lg">➕ Add Team</a>
            <a href="/admin/delete_team" className="bg-red-700 hover:bg-red-800 text-white px-6 py-4 rounded-md my-2 text-lg transition-all text-center shadow-md font-semibold backdrop-blur-sm hover:scale-105 hover:shadow-lg">❌ Delete Team</a>
            <a href="/admin/add_faculty" className="bg-red-700 hover:bg-red-800 text-white px-6 py-4 rounded-md my-2 text-lg transition-all text-center shadow-md font-semibold backdrop-blur-sm hover:scale-105 hover:shadow-lg">👨‍🏫 Add Faculty</a>
            <a href="/admin/update_faculty_vacancies" className="bg-red-700 hover:bg-red-800 text-white px-6 py-4 rounded-md my-2 text-lg transition-all text-center shadow-md font-semibold backdrop-blur-sm hover:scale-105 hover:shadow-lg">📊 Add Vacancies</a>
            <a href="/admin/get_faculty_details" className="bg-red-700 hover:bg-red-800 text-white px-6 py-4 rounded-md my-2 text-lg transition-all text-center shadow-md font-semibold backdrop-blur-sm hover:scale-105 hover:shadow-lg col-span-1 sm:col-span-2">📋 All Faculty Details</a>
          </div>
        </div>

      </body>
      {/* <Footer /> */}
      <footer className="w-full h-fit bg-slate-100 text-black text-center ">
        &copy; {new Date().getFullYear()} Sathyabama University. All rights
        reserved.
      </footer>
    </>


  );
};

export default Admin;
