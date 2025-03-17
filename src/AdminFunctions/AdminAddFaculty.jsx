import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingScreen from "../shared/Loader";
import sist_logo_login from "../assets/sist_logo_login.png";
import log_out from "../assets/svgs/log_out.svg";

function AdminAddFaculty() {
  const SERVERPATH = import.meta.env.VITE_SERVERPATH;

  const [facultyName, setFacultyName] = useState("");
  const [facultyEmail, setFacultyEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminMailId = localStorage.getItem("adminMailId");

    if (token) {
      const headers = { Authorization: `${token}` };
      const func = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            SERVERPATH + "/checkAuthentication/" + adminMailId,
            { headers }
          );
          if (response.data.message !== "Authenticated") {
            localStorage.removeItem("token");
            localStorage.removeItem("adminMailId");
            navigate("/");
          }
        } catch (error) {
          console.error("Authentication check failed", error);
          localStorage.removeItem("token");
          localStorage.removeItem("adminMailId");
          navigate("/");
        }
        setIsLoading(false);
      };
      func();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("adminMailId");
      navigate("/");
    }
  }, [location, navigate]);

  const adminLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminMailId");
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    const formData = {
      name: facultyName,
      email: facultyEmail,
      department: department,
      password: password,
    };

    try {
      setIsLoading(true);
      const response = await axios.post(
        SERVERPATH + "/admin/add_faculty",
        formData
      );
      setMessage(response.data.message);
      setFacultyName("");
      setFacultyEmail("");
      setDepartment("");
      setPassword("");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Something went wrong.");
      } else {
        setError("Failed to connect to the server.");
      }
    }
    setIsLoading(false);
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
              &#9660;
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

      <div className="login_bg px-10 flex justify-center items-center min-h-screen">
        <div className="lg:w-1/4 md:w-2/4 s:w-2/4 xs:w-3/4 border p-4 bg-white bg-opacity-50 backdrop-filter rounded-lg shadow-lg">
          <div className="block">
            <div className="flex justify-center">
              <h1 className="p-4 font-semibold text-2xl text-center">
                Add Faculty
              </h1>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input
                type="text"
                value={facultyName}
                onChange={(e) => setFacultyName(e.target.value)}
                placeholder="Enter Faculty Name"
                required
                className="border rounded-md p-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-red-900 focus:outline-none"
              />
              <input
                type="email"
                value={facultyEmail}
                onChange={(e) => setFacultyEmail(e.target.value)}
                placeholder="Enter Faculty Email"
                required
                className="border rounded-md p-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-red-900 focus:outline-none"
              />
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Enter Department"
                required
                className="border rounded-md p-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-red-900 focus:outline-none"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
                className="border rounded-md p-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-red-900 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-red-900 text-white px-6 py-2 rounded-md text-lg hover:bg-red-700 transition duration-300"
              >
                Add Faculty
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

export default AdminAddFaculty;
