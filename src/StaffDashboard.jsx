import React from "react";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import log_out from "./assets/svgs/log_out.svg";
import lock from "./assets/svgs/lock.svg";
import hum_berger from "./assets/svgs/hum_berger.svg";
import { ProjectCard } from "./ProjectCard";
import { projectDetails } from "./projectDetails";
import LoadingScreen from "./shared/Loader";
import { MdPostAdd } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";

const StaffDashboard = () => {
  const SERVERPATH = import.meta.env.VITE_SERVERPATH;

  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const userEmail = localStorage.getItem("guideMailId");
  // const tkn = localStorage.getItem("token")
  // const token = "token"

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("guideMailId");

    if (token) {
      const headers = {
        Authorization: `${token}`,
      };
      const func = async () => {
        setIsLoading(true);
        const response = await axios.get(
          SERVERPATH + "/checkAuthentication/" + userEmail,
          { headers }
        );
        setIsLoading(false);
        if (response.data.message == "Authenticated") {
          // navigate("/dashboard");
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("guideMailId");
          navigate("/staff_login");
        }
      };
      func();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      navigate("/login");
    }

    fetchStudentsData();
  }, []);

  const [error, setError] = useState();
  const [studentsData, setStudentsData] = useState([
    {
      team: "",
      projectId: "",
      studentOneImg: "",
      studentTwoImg: "",
      regNoOne: "",
      studentOne: "",
      regNoTwo: "",
      studentTwo: "",
      section: "",
      p2section: "",
      projectTitle: "",
    },
  ]);
  const [guideImg, setGuideImg] = useState();
  const fetchStudentsData = async () => {
    try {
      const userEmail = localStorage.getItem("guideMailId");
      setIsLoading(true);
      const response = await axios.post(
        SERVERPATH + "/staffLogin/getStudentsData/" + userEmail
      );
      setIsLoading(false);
      // console.warn(response.data);
      setStudentsData(response.data.allStudentsData);
      setGuideImg(response.data.guideImg);
      localStorage.setItem("guideImg", response.data.guideImg);
    } catch (error) {
      setError(error.message || "An error occurred while fetching data.");
    }
  };

  function getDirectLinkFromShareableLink(shareableLink) {
    try {
      const fileIdMatch = shareableLink.match(/\/uc\?id=(.*?)(&|$)/);
      if (fileIdMatch && fileIdMatch[1]) {
        const fileId = fileIdMatch[1];
        return `https://drive.google.com/thumbnail?id=${fileId}`;
      } else {
        throw new Error("Invalid shareable link format");
      }
    } catch (error) {
      // console.error("Error processing shareable link:", error.message);
      return null;
    }
  }

  const staffLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("guideMailId");
    // Redirect to login page
    navigate("/staff_login");
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      {/*  <div className="w-fit flex flex-col gap-4"> */}
      <header className="h-fit bg-[#831238] flex items-center justify-between px-6 md:px-16 mb-5">
        <div className="flex justify-center items-center sm:max-md:justify-self-start ">
          <a href="#">
            <img
              className="h-12 my-3 float-start"
              src="https://erp.sathyabama.ac.in/assets/images/sathyabama_header-logo-A++.jpg"
              alt="logo"
            />
          </a>
        </div>

        <div
          className="relative flex items-center space-x-2 cursor-pointer"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <img
            className=" w-12 h-12 rounded-full border-2 z-0"
            src={getDirectLinkFromShareableLink(guideImg)}
            alt="Faculty"
          />
          <div className="hidden md:flex md:items-center md:justify-center relative">
            <h3 className="text-white">{userEmail}</h3>
            &nbsp;&nbsp;&nbsp;
            <span
              className={`rounded-full flex items-center justify-center ${
                open ? "" : "animate-bounce"
              }`}
              onClick={() => {
                setOpen(!open);
              }}
            >
              <svg
                className="h-8 w-8 text-gray-100"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            {open && (
              <div className="hidden absolute md:top-[3rem] md:right-[2px] h-fit w-[10rem] bg-white text-black shadow-2xl  md:flex md:flex-col md:justify-center md:items-center md:gap-[3px] z-50">
                <div className=" w-full text-[0.8rem] text-[#6C757D] font-semibold h-1/5 bg-slate-100">
                  &nbsp;&nbsp;&nbsp; Welcome!
                </div>
                <div className="w-full flex items-center justify-center h-2/5 bg-slate-100 text-[#6C757D]  hover:bg-slate-200">
                  <a
                    href={`/staff_dashboard/change_password`}
                    className="w-full flex justify-start items-center gap-1 pl-2"
                  >
                    <img className="h-4 w-4" src={lock} alt="Lock" />
                    Change Password
                  </a>
                </div>

                {/* Option to add problem statements */}
                <div className="w-full flex items-center justify-center h-2/5 bg-slate-100 text-[#6C757D]  hover:bg-slate-200">
                  <a
                    href={`/staff_dashboard/add_problem_statement`}
                    className="w-full flex justify-start items-center gap-1 pl-2"
                  >
                    {/* <img className="h-4 w-4" src={lock} alt="Lock" /> */}
                    <MdPostAdd className="size-8 p-0" />
                    Add Problem Statement
                  </a>
                </div>
                {/* Option to add problem statements */}

                {/* Option to select Student */}
                {/* <div className="w-full flex items-center justify-center h-2/5 bg-slate-100 text-[#6C757D]  hover:bg-slate-200">
                <a
                  href={`/staff_dashboard/select_student`}
                  className="w-full flex justify-start items-center gap-1 pl-2"
                >
                  <FaUserPlus className='size-4 p-0' />
                  Select Student
                </a>
              </div> */}
                {/* Option to aSelect Student */}

                <div className="w-full flex justify-center items-center h-2/5 bg-slate-100 text-[#6C757D] hover:bg-slate-200">
                  <a
                    onClick={staffLogout}
                    className=" w-full flex justify-start items-center gap-1 pl-2"
                  >
                    <img className="h-4 w-4" src={log_out} alt="LogOut" />
                    Log Out
                  </a>
                </div>
              </div>
            )}
          </div>
          {/* HumBerger icon for sm to md*/}
          <div className="h-8 w-8 md:hidden relative">
            <img src={hum_berger} alt="HumBerger" />
          </div>
          {open && (
            <div className="absolute top-[3.75rem] right-[-20px] h-[9rem] w-[10rem] md:hidden bg-white text-black shadow-2xl  flex flex-col justify-center items-center gap-[3px] z-50 ">
              <div className=" w-full text-[0.8rem] text-[#6C757D] font-semibold h-1/5 bg-slate-100">
                &nbsp;&nbsp;&nbsp; Welcome!
              </div>
              <div className="w-full flex items-center justify-center h-2/5 bg-slate-100 text-[#6C757D]  hover:bg-slate-200">
                <a
                  href={`/staff_dashboard/change_password`}
                  className="w-full flex justify-start items-center gap-1 pl-2"
                >
                  <img className="h-4 w-4" src={lock} alt="Lock" />
                  Change Password
                </a>
              </div>

              {/* Option to add problem statements */}
              <div className="w-full flex items-center justify-center h-2/5 bg-slate-100 text-[#6C757D]  hover:bg-slate-200">
                <a
                  href={`/staff_dashboard/add_problem_statement`}
                  className="w-full flex justify-start items-center gap-1 pl-2"
                >
                  {/* <img className="h-4 w-4" src={lock} alt="Lock" /> */}
                  <MdPostAdd className="size-8 p-0" />
                  Add Problem Statement
                </a>
              </div>
              {/* Option to add problem statements */}

              {/* Option to select Student */}
              {/* <div className="w-full flex items-center justify-center h-2/5 bg-slate-100 text-[#6C757D]  hover:bg-slate-200">
                <a
                  href={`/staff_dashboard/select_student`}
                  className="w-full flex justify-start items-center gap-1 pl-2"
                >
                  <FaUserPlus className='size-4 p-0' />
                  Select Student
                </a>
              </div> */}
              {/* Option to aSelect Student */}

              <div className="w-full flex justify-center items-center h-2/5 bg-slate-100 text-[#6C757D] hover:bg-slate-200">
                <a
                  href="/"
                  className=" w-full flex justify-start items-center gap-1 pl-2"
                >
                  <img className="h-4 w-4" src={log_out} alt="LogOut" />
                  Log Out
                </a>
              </div>
            </div>
          )}
        </div>
      </header>
      {/* <div className="w-fit mx-auto" onClick={() => setOpen(false)}>
        <div className="w-fit mx-16 lg:mx-24 md:mx-20 sm:mx-24 flex flex-wrap gap-x-12 gap-y-8 justify-start items-center rounded">
          {projectDetails.map((project, id) => (
            <ProjectCard
              key={id}
              teamLeadImg={project.teamLeadImg}
              id={project.projectId}
              registerNoOne={project.registerNoOne}
              studentOne={project.studentOne}
              registerNoTwo={project.registerNoTwo}
              studentTwo={project.studentTwo}
              title={project.projectTitle}
            />
          ))}
        </div>
      </div> */}

      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <main
            className="w-[90%] mx-auto flex-grow place-items-center justify-center flex  flex-wrap gap-8 mb-5"
            onClick={() => setOpen(false)}
          >
            {studentsData.length != 0 ? (
              studentsData.map((project) => (
                <ProjectCard
                  key={project.projectId}
                  team={project.team}
                  studentOneImg={project.studentOneImg}
                  studentTwoImg={project.studentTwoImg}
                  projectId={project.projectId}
                  regNoOne={project.regNoOne}
                  studentOne={project.studentOne}
                  regNoTwo={project.regNoTwo}
                  studentTwo={project.studentTwo}
                  projectTitle={project.projectTitle}
                  projectDomain={project.projectDomain}
                />
              ))
            ) : (
              <p className="font-bold text-2xl">
                *Students yet to be selected.
              </p>
            )}
          </main>
        </div>

        <footer
          className="w-full h-8 bg-slate-100 flex items-center justify-center text-black "
          onClick={() => setOpen(false)}
        >
          <b>&copy;</b>&nbsp;
          {new Date().getFullYear()} Sathyabama University. All rights reserved.
        </footer>
      </div>
      {/* </div> */}
    </>
  );
};

export default StaffDashboard;
