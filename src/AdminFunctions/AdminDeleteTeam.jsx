import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { FiChevronDown } from "react-icons/fi";
// import { HiOutlineLogout } from "react-icons/hi";
import axios from "axios";

import AdminNavbar from "./AdminNavbar";
import LoadingScreen from "../shared/Loader";

// import sist_logo_login from "../assets/sist_logo_login.png";
// import log_out from "../assets/svgs/log_out.svg";



function AdminDeleteTeam() {
  const SERVERPATH = import.meta.env.VITE_SERVERPATH;

  const [teamId, setTeamId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate()

  const handleInputChange = (event) => {
    setTeamId(event.target.value);
  };

  const validateTeamId = (id) => {
    const regex = /^CSE-(\d{2})-(\d{4})$/;
    const match = id.match(regex);

    if (!match) return false;

    const year = parseInt(match[1], 10);
    // const number = parseInt(match[2], 10);
    const currentYearLastTwo = new Date().getFullYear() % 100;

    return year === (currentYearLastTwo + 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!teamId || !validateTeamId(teamId)) {
      setError(
        'Team ID must be in the format CSE-yy-NNNN, where "yy" is the current final year batch.'
      );
      return;
    }


    setError("");

    try {
      setIsLoading(true);
      const response = await axios.post(SERVERPATH + "/admin/deleteTeam", {
        teamId: teamId,
      });
      console.log(teamId);
      setMessage(response.data.message);
      setTeamId("");
    } catch (error) {
      if (error.response) {
        // setMessage(error.response.data.message || "Something went wrong.");
        setError(error.response.data.message || "Something went wrong.");
      } else {
        // setMessage("Failed to connect to the server.");
        setError("Failed to connect to the server.");
      }
    }
    setIsLoading(false);
  };

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
  }, [location]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);


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
              <img
                src={sist_logo_login}
                alt="Logo"
                className="h-12 w-auto float-start"
              />
            </a>
          </div>
          <div className="flex items-center relative">
            <button
              onClick={toggleDropdown}
              className="text-sm font-semibold rounded text-white focus:outline-none"
            >
              <svg className="h-8 w-8 text-gray-100" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>            </button>
            {isDropdownOpen && (
              <div className="absolute top-12 right-0 w-44 bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-xl z-20 transition-all duration-300 ease-in-out">
                <button
                  onClick={adminLogout}
                  className="w-full px-5 py-3 text-sm text-gray-700 font-semibold hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors duration-200 text-left"
                >
                  Logout
                </button>
              </div>
            )}

          </div>
        </div>
      </nav> */}

      {/* <nav className="bg-[#9e1c3f] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <a href="/">
              <img
                src={sist_logo_login}
                alt="Logo"
                className="h-12 w-auto float-start"
              />
            </a>
          </div>
          <div className="flex items-center relative">
            <button
              onClick={toggleDropdown}
              className="text-sm font-semibold rounded text-white focus:outline-none"
            >
              <svg className={`h-8 w-8 text-gray-100 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""
                }`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-14 right-0 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50 fade-in-up">
                <button
                  onClick={adminLogout}
                  className="w-full px-5 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-100 hover:text-red-600 transition-all duration-200 tracking-wide"
                >
                  Logout
                </button>
              </div>
            )}




          </div>
        </div>
      </nav> */}
      <AdminNavbar />

      <div className="admin_login_bg px-10 xs:px-10 flex justify-center items-center ">
        <div className="lg:w-1/4 md:w-2/4 s:w-2/4 xs:w-3/4 border p-4 bg-white bg-opacity-50 backdrop-filter rounded-lg shadow-lg">
          <div className="block">
            <div className="flex justify-center">
              <h1 className="text-3xl font-bold text-center text-[#9e1c3f]">
                Enter Team ID
              </h1>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <label className="flex flex-col">
                <input
                  type="text"
                  value={teamId}
                  onChange={handleInputChange}
                  placeholder="Enter Team ID (CSE-yy-NNNN)"
                  required
                  className="border rounded-md p-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-red-900 focus:outline-none"
                />
              </label>
              <button
                type="submit"
                className="bg-red-900 text-white px-6 py-2 rounded-md text-lg hover:bg-red-700 transition duration-300"
              >
                Delete
              </button>
            </form>
            {/* Status Messages */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-700 text-center font-medium flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              </div>
            )}

            {message && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-green-700 text-center font-medium flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {message}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer
        className="w-full h-8 absolute bottom-0 bg-slate-100 flex items-center justify-center text-black mt-auto"
        onClick={() => setOpen(false)}
      >
        <b>&copy;</b>&nbsp;
        2025 Sathyabama University. All rights reserved.
      </footer>
    </>
  );
}

export default AdminDeleteTeam;
