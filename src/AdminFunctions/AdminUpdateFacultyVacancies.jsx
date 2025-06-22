import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingScreen from "../shared/Loader";
// import sist_logo_login from "../assets/sist_logo_login.png";
// import log_out from "../assets/svgs/log_out.svg";

import AdminNavbar from "./AdminNavbar";

function AdminUpdateFacultyVacancies() {
  const SERVERPATH = import.meta.env.VITE_SERVERPATH;

  const [faculty, setFaculty] = useState("");
  const [vacancies, setVacancies] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [isDropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // const toggleDropdown = () => {
  //   setDropdownOpen(!isDropdownOpen);
  // };

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

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);


  // const adminLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("adminMailId");
  //   navigate("/");
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    const formData = {
      faculty: faculty,
      vacancies: vacancies,
    };

    try {
      setIsLoading(true);
      const response = await axios.post(
        SERVERPATH + "/admin/update_faculty_vacancies",
        formData
      );
      setMessage(response.data.message);
      setFaculty("");
      setVacancies("");
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
      </nav> */}

      <AdminNavbar />
      <div className="login_bg px-10 flex justify-center items-center min-h-screen">
        <div className="lg:w-1/4 md:w-2/4 s:w-2/4 xs:w-3/4 border p-4 bg-white bg-opacity-50 backdrop-filter rounded-lg shadow-lg">
          <div className="block">
            <div className="flex justify-center">
              <h1 className="p-4 font-semibold text-2xl text-center">
                Add Faculty Vacancies
              </h1>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input
                type="text"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                placeholder="Enter Faculty Mail Id"
                required
                className="border rounded-md p-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-red-900 focus:outline-none"
              />
              <input
                type="number"
                value={vacancies}
                onChange={(e) => setVacancies(e.target.value)}
                placeholder="Add Number of Vacancies"
                required
                className="border rounded-md p-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-red-900 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-red-900 text-white px-6 py-2 rounded-md text-lg hover:bg-red-700 transition duration-300"
              >
                Add Vacancies
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
    </div>
  );
}

export default AdminUpdateFacultyVacancies;
