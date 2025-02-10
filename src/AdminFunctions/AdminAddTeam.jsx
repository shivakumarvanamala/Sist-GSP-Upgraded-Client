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

function AdminAddTeam() {
  const SERVERPATH = import.meta.env.VITE_SERVERPATH;

  const [facultyEmail, setFacultyEmail] = useState("");
  const [student1, setStudent1] = useState("");
  const [student2, setStudent2] = useState("");
  const [isTeamSize2, setIsTeamSize2] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleTeamSizeChange = (event) => {
    setIsTeamSize2(event.target.checked);
    if (!event.target.checked) {
      setStudent2("");
    }
  };

  const handleInputChange = (event) => {
    setFacultyEmail(event.target.value);
  };

  const handleStudent1Change = (event) => {
    setStudent1(event.target.value);
  };

  const handleStudent2Change = (event) => {
    setStudent2(event.target.value);
  };

  const validateStudentId = (id) => {
    const regex = /^\d{8}$/;
    return regex.test(id);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the student IDs
    if (!validateStudentId(student1)) {
      setError("Student 1 registration number must be exactly 8 digits.");
      return;
    }

    if (isTeamSize2 && !validateStudentId(student2)) {
      setError("Student 2 registration number must be exactly 8 digits.");
      return;
    }

    setError("");

    const formData = {
      team: isTeamSize2,
      selectedGuide: facultyEmail,
      regNo: student1,
      p2regNo: isTeamSize2 ? student2 : null,
      password: "abcd",
    };

    try {
      setIsLoading(true);
      const response = await axios.post(
        SERVERPATH + "/staffLogin/staffDashboard/selectStudent/" + facultyEmail,
        formData
      );
      setMessage(response.data.message);
      setFacultyEmail("");
      setStudent1("");
      setStudent2("");
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
        if (response.data.message === "Authenticated") {
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
    localStorage.removeItem("token");
    localStorage.removeItem("adminMailId");
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
                <div className="flex flex-row justify-center items-center hover:bg-gray-200">
                  <img className="h-4 w-4" src={log_out} alt="LogOut" />
                  <button onClick={adminLogout} className="block p-2">
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
                Add a Team
              </h1>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <label className="flex flex-col">
                <input
                  type="email"
                  value={facultyEmail}
                  onChange={handleInputChange}
                  placeholder="Enter Faculty Email"
                  required
                  className="border rounded-md p-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-red-900 focus:outline-none"
                />
              </label>

              <div className="flex items-center space-x-2">
                <label htmlFor="teamSize" className="text-sm">
                  Team Size (2):
                </label>
                <input
                  type="checkbox"
                  id="teamSize"
                  name="teamSize"
                  checked={isTeamSize2}
                  onChange={handleTeamSizeChange}
                />
              </div>

              <label className="flex flex-col">
                <input
                  type="text"
                  value={student1}
                  onChange={handleStudent1Change}
                  placeholder="Enter 8-digit Student 1 Registration Number"
                  maxLength="8"
                  required
                  className="border rounded-md p-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-red-900 focus:outline-none"
                />
              </label>

              <label className="flex flex-col">
                <input
                  type="text"
                  value={student2}
                  onChange={handleStudent2Change}
                  placeholder="Enter 8-digit Student 2 Registration Number"
                  maxLength="8"
                  disabled={!isTeamSize2}
                  required={isTeamSize2}
                  className="border rounded-md p-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-red-900 focus:outline-none"
                />
              </label>

              <button
                type="submit"
                className="bg-red-900 text-white px-6 py-2 rounded-md text-lg hover:bg-red-700 transition duration-300"
              >
                Add Team
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

export default AdminAddTeam;
