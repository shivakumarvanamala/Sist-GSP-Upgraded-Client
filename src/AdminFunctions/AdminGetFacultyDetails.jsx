import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingScreen from "../shared/Loader";
import sist_logo_login from "../assets/sist_logo_login.png";
import log_out from "../assets/svgs/log_out.svg";

function AdminGetFacultyDetails() {
  const SERVERPATH = import.meta.env.VITE_SERVERPATH;

  const [facultyList, setFacultyList] = useState([]);
  const [error, setError] = useState("");
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
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const authResponse = await axios.get(
            `${SERVERPATH}/checkAuthentication/${adminMailId}`,
            { headers }
          );
          if (authResponse.data.message !== "Authenticated") {
            localStorage.removeItem("token");
            localStorage.removeItem("adminMailId");
            navigate("/");
          }

          const response = await axios.get(
            `${SERVERPATH}/admin/get_faculty_details`,
            { headers }
          );
          setFacultyList(response.data.faculty);
        } catch (error) {
          console.error("Error fetching faculty details", error);
          setError("Failed to fetch faculty details.");
        }
        setIsLoading(false);
      };
      fetchData();
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
        <div className="lg:w-3/4 md:w-4/5 s:w-4/5 xs:w-3/4 border p-4 bg-white bg-opacity-50 backdrop-filter rounded-lg shadow-lg">
          <div className="block">
            <div className="flex justify-center">
              <h1 className="p-4 font-semibold text-2xl text-center">
                Faculty Details
              </h1>
            </div>
            {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Department</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Phone</th>
                </tr>
              </thead>
              <tbody>
                {facultyList.map((faculty, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{faculty.name}</td>
                    <td className="border px-4 py-2">{faculty.department}</td>
                    <td className="border px-4 py-2">{faculty.email}</td>
                    <td className="border px-4 py-2">{faculty.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminGetFacultyDetails;
