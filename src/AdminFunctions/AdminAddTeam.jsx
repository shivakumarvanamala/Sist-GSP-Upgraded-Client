import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Footer from "../shared/Footer";
import LoadingScreen from "../shared/Loader";
import Alert from "../shared/Alert";

import AdminNavbar from "./AdminNavbar";
// import sist_logo_login from "../assets/sist_logo_login.png";
// import log_out from "../assets/svgs/log_out.svg";

function AdminAddTeam() {
  const SERVERPATH = import.meta.env.VITE_SERVERPATH;

  const [facultyEmail, setFacultyEmail] = useState("");
  const [student1, setStudent1] = useState("");
  const [student2, setStudent2] = useState("");
  const [isTeamSize2, setIsTeamSize2] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [alertType, setAlertType] = useState();

  const navigate = useNavigate()

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
    setStudent1(parseInt(event.target.value));
  };

  const handleStudent2Change = (event) => {
    setStudent2(parseInt(event.target.value));
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
      password: "studentcse",
    };

    try {
      setIsLoading(true);
      const response = await axios.post(
        SERVERPATH + "/staffLogin/staffDashboard/selectStudent/" + facultyEmail,
        formData
      );
      if (response.data.message == "success") {
        setMessage(response.data.message);
        setError()
      }
      else {
        setError(response.data.message);

      }
      // setAlertMessage(response.data.message);
      setFacultyEmail("");
      setStudent1("");
      setStudent2("");
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

  return (
    <div className="App">
      {isLoading && <LoadingScreen />}
      <div
        className={`flex items-center justify-center ${alert ? "" : "hidden"} `}
      >
        <Alert type={alertType} message={alertMessage} />
      </div>

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

      <div className="admin_login_bg bg-cover bg-center flex items-center justify-center px-4 py-10">
        <div className="backdrop-filter bg-white/30 bg-opacity-60 shadow-2xl rounded-3xl p-10 w-full max-w-xl space-y-8 text-black">
          <h1 className="text-3xl font-bold text-center text-[#9e1c3f]">Add a Team</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              value={facultyEmail}
              onChange={handleInputChange}
              placeholder="Faculty Email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e1c3f] focus:outline-none"
            />

            <div className="flex items-center justify-start gap-3">
              <label htmlFor="teamSize" className="text-md font-semibold text-gray-700">
                Team Size (2 members)?
              </label>
              <input
                type="checkbox"
                id="teamSize"
                name="teamSize"
                checked={isTeamSize2}
                onChange={handleTeamSizeChange}
                className="h-4 w-4"
              />
            </div>

            <input
              type="text"
              value={student1}
              onChange={handleStudent1Change}
              placeholder="Student 1 Reg. No. (8-digits)"
              maxLength="8"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9e1c3f] focus:outline-none"
            />

            <input
              type="text"
              value={student2}
              onChange={handleStudent2Change}
              placeholder="Student 2 Reg. No. (8-digits)"
              maxLength="8"
              disabled={!isTeamSize2}
              required={isTeamSize2}
              className={`w-full px-4 py-2 border ${isTeamSize2 ? "border-gray-300" : "border-gray-200 opacity-50"
                } rounded-md focus:ring-2 focus:ring-[#9e1c3f] focus:outline-none`}
            />

            <button
              type="submit"
              className="w-full bg-[#9e1c3f] hover:bg-[#7b152f] text-white font-semibold py-2 rounded-md transition duration-300"
            >
              Add Team
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
      <footer
        className="w-full h-8 absolute bottom-0 bg-slate-100 flex items-center justify-center text-black mt-auto"
        onClick={() => setOpen(false)}
      >
        <b>&copy;</b>&nbsp;
        2025 Sathyabama University. All rights reserved.
      </footer>

    </div>
  );
}

export default AdminAddTeam;
