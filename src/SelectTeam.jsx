import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

import LoginNavBar from "./LoginNavBar";
import Footer from "./shared/Footer";

export default function SelectTeam() {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const SERVERPATH = import.meta.env.VITE_SERVERPATH;

  // useEffect(() => {
  //   const token = localStorage.getItem("token_for_first_time");

  //   if (token) {
  //     const decodedToken = jwtDecode(token);
  //     const expirationTime = decodedToken.exp * 1000;

  //     if (expirationTime < Date.now()) {
  //       localStorage.removeItem("token_for_first_time");
  //       navigate("/login");
  //     }
  //   } else {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token_for_first_time");
    const userEmail = localStorage.getItem("userEmail");

    if (token) {
      const headers = {
        Authorization: `${token}`,
      };
      const func = async () => {
        const response = await axios.get(
          SERVERPATH + "/checkAuthentication/" + userEmail,
          { headers }
        );
        if (response.data.message == "Authenticated") {
          // console.warn(("hiii"))
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("userEmail");
          navigate("/login");
        }
      };
      func();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      navigate("/login");
    }
  }, [navigate]);

  const handleButtonClick = (number) => {
    navigate(`${currentPath}/${number}`);
  };

  return (
    <>
      <LoginNavBar />
      <div className="login_bg">
        <div className="lg:w-1/4 md:w-2/4 s:w-2/4 xs:w-3/4 border bg-white bg-opacity-70 backdrop-filter p-6 rounded-lg shadow-lg flex flex-col items-center">
          <p className="p-4 font-semibold text-2xl">No of Team Members</p>
          <div className="flex flex-row space-x-10 px-10">
            <button
              onClick={() => handleButtonClick(1)}
              className="bg-red-900 text-white rounded-lg p-7 m-4 border-2 text-lg"
            >
              1
            </button>
            <button
              onClick={() => handleButtonClick(2)}
              className="bg-red-900 text-white rounded-lg p-7 m-4 border-2 text-lg"
            >
              2
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
