import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "./shared/Footer";
// import LoginNavBar from "./LoginNavBar";
// import jwtDecode from "jwt-decode";
import LoadingScreen from "./shared/Loader";
import sist_logo_login from "./assets/sist_logo_login.png";
// import { TfiHelpAlt } from "react-icons/tfi";
import log_out from "./assets/svgs/log_out.svg";

const Admin = () => {
  const SERVERPATH = import.meta.env.VITE_SERVERPATH;

  const navigate = useNavigate();
  // const location = useLocation();

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
    console.log(token);
    console.log(adminMailId);
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
        console.log(response.data);
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

  const adminLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("adminMailId");
    // Redirect to login page
    navigate("/");
  };

  return (
    <>
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

      <div className="login_bg px-10 xs:px-10">
        <div className="lg:w-1/4 md:w-2/4 s:w-2/4 xs:w-3/4 border p-4 bg-white bg-opacity-40 backdrop-filter rounded-lg shadow-lg">
          <div className={"block"}>
            <div className={" flex justify-center"}>
              <h1 className="p-4 font-semibold text-2xl">ADMIN</h1>
            </div>
            <div className="justify-center">
              <div className=" flex flex-col justify-center">
                <a
                  href="/admin/add_team"
                  className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg text-center"
                >
                  Add Team
                </a>
              </div>
              <div className=" flex flex-col justify-center">
                <a
                  href="/admin/delete_team"
                  className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg text-center"
                >
                  Delete Team
                </a>
              </div>

              <div className=" flex flex-col justify-center">
                <a
                  href="/admin/add_faculty"
                  className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg text-center"
                >
                  Add Faculty
                </a>
              </div>

              <div className=" flex flex-col justify-center">
                <a
                  href="/admin/update_faculty_vacancies"
                  className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg text-center"
                >
                  Update Faculty Vacancies
                </a>
                {/* <button
                    className={'bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg'}
                    type="submit"
                  >
                    Update Faculty Vacancies
                  </button> */}
              </div>

              <div className=" flex flex-col justify-center">
                <a
                  href="/admin/get_faculty_details"
                  className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg text-center"
                >
                  Get Faculty Details
                </a>
                {/* <button
                    className={'bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg'}
                    type="submit"
                  >
                    Get Faculty Details
                  </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
