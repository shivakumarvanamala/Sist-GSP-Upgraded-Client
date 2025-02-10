import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../shared/Footer";
import LoginNavBar from "../LoginNavBar";
import jwtDecode from "jwt-decode";
import LoadingScreen from "../shared/Loader";
import sist_logo_login from "../assets/sist_logo_login.png";
import { TfiHelpAlt } from "react-icons/tfi";
import log_out from "../assets/svgs/log_out.svg";

function AdminDeleteTeam() {
  const SERVERPATH = import.meta.env.VITE_SERVERPATH;

  const [teamId, setTeamId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    setTeamId(event.target.value);
  };

  const validateTeamId = (id) => {
    const regex = /^CSE-(\d{2})-(\d{4})$/;
    const match = id.match(regex);

    if (!match) return false;

    const year = parseInt(match[1], 10);
    const number = parseInt(match[2], 10);
    const currentYearLastTwo = new Date().getFullYear() % 100;

    return year === currentYearLastTwo && number < 1700;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!teamId) {
      setError(
        'Team ID must be in the format CSE-yy-NNNN, where "yy" is the current year and "NNNN" is less than 1700.'
      );
      return;
    }

    setError("");

    try {
      setIsLoading(true);
      const response = await axios.post(SERVERPATH + "/deleteTeam", {
        teamId: teamId,
      });
      console.log(teamId);
      setMessage(response.data.message);
      setTeamId("");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Something went wrong.");
      } else {
        setMessage("Failed to connect to the server.");
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

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

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

  const adminLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("adminMailId");
    // Redirect to login page
    navigate("/");
  };

  return (
    <div className="App">
      {isLoading && <LoadingScreen />}

      <nav className="bg-[#9e1c3f] text-white p-4">
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
              &#9660; {/* Down arrow */}
            </button>
            {isDropdownOpen && (
              <div className="absolute top-10 right-0 bg-white text-gray-800 p-2 rounded shadow-md z-10">
                <div className="flex flex-row justify-center space-x-2 items-center hover:bg-gray-200"></div>

                <div className="flex flex-row justify-center items-center hover:bg-gray-200">
                  <img className="h-4 w-4" src={log_out} alt="LogOut" />
                  <button onClick={adminLogout} className="block p-2 ">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="login_bg px-10 xs:px-10 flex justify-center items-center min-h-screen">
        <div className="lg:w-1/4 md:w-2/4 s:w-2/4 xs:w-3/4 border p-4 bg-white bg-opacity-50 backdrop-filter rounded-lg shadow-lg">
          <div className="block">
            <div className="flex justify-center">
              <h1 className="p-4 font-semibold text-2xl text-center">
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
            {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
            {message && (
              <p className="mt-4 text-green-600 text-center">{message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDeleteTeam;
