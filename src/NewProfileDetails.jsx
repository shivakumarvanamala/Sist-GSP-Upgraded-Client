import { useState, useEffect } from "react";
import axios from "axios";
import tick_mark from "./assets/svgs/tick_mark.svg";
import cross_mark from "./assets/svgs/cross_mark.png";
import link from "./assets/svgs/link.svg";

import hum_berger from "./assets/svgs/hum_berger.svg";

import home from "./assets/svgs/home.svg";
import log_out from "./assets/svgs/log_out.svg";
import { useNavigate } from "react-router-dom";
import back_arrow from "./assets/svgs/back_arrow.svg";
// import StaffDashboard from "./StaffDashboard";
import LoadingScreen from "./shared/Loader";
import Alert from "./shared/Alert";

export const NewProfileDetails = () => {
  const SERVERPATH = import.meta.env.VITE_SERVERPATH;

  const [isLoading, setisLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [alertType, setAlertType] = useState();

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [projectDetails, setProjectDetails] = useState({
    team: true,
    projectId: "CSE-25-0000",
    projectTitle: "Guide selection portal",
    projectDomain: "Web technology",
    studentOneImg:
      "https://thumbs.dreamstime.com/b/man-profile-cartoon-smiling-vector-illustration-graphic-design-135443492.jpg",
    studentOneRegNo: "41000001",
    studentOneSection: "A1",
    studentOneName: "Student one name",
    studentTwoImg:
      "https://thumbs.dreamstime.com/b/man-profile-cartoon-smiling-vector-illustration-graphic-design-135443492.jpg",
    studentTwoRegNo: "41000002",
    studentTwoSection: "B1",
    studentTwoName: "Student two name",
  });

  const [projectMarks, setProjectMarks] = useState({
    studentOneMarks: "0",
    studentTwoMarks: "0",
  });

  const [links, setLinks] = useState({
    documentation: "",
    ppt: "",
    researchPaper: "",
  });

  const [documentation, setDocumentation] = useState("notYetValidated");
  const [ppt, setPpt] = useState("notYetValidated");
  const [researchPaper, setResearchPaper] = useState("notYetValidated");
  const [guideApproval, setGuideApproval] = useState("notYetValidated");

  const [isChecked, setIsChecked] = useState({
    communicated: false,
    accepted: false,
    paymentDone: false,
  });

  const [comments, setComments] = useState({
    prevComments: "",
    addComments: "",
  });

  const handleAddComments = (eve) => {
    (prev) =>
      setComments({
        ...comments,
        [eve.target.name]: eve.target.value,
      });
    // console.log(comments.addComments);
    // console.log(eve.target.value);
    // console.log(eve.target.name, eve.target.value);
  };

  const [comments2, setComments2] = useState({
    prevComments: "",
    addComments: "",
  });

  const handleAddComments2 = (eve) => {
    (prev) =>
      setComments2({
        ...comments,
        [eve.target.name]: eve.target.value,
      });
  };

  const handleProjectMarks = (eve) => {
    (projectMarks) =>
      setProjectMarks({
        ...projectMarks,
        [eve.target.name]: [eve.target.value],
      });
    // console.log(eve.target.name, eve.target.value);
  };

  const teamId = localStorage.getItem("projectId");
  const guidemailId = localStorage.getItem("guideMailId");
  useEffect(() => {
    const teamId = localStorage.getItem("projectId");
    const fetchData = async () => {
      try {
        setisLoading(true);
        const response = await axios.post(
          `${SERVERPATH}/staffLogin/getProfileData/${teamId}`
        );
        setisLoading(false);
        // console.warn(response.data)
        setProjectDetails(response.data.projectDetails);
        setProjectMarks(response.data.projectMarks);
        setLinks(response.data.links);
        // console.warn(links)
        setDocumentation(response.data.documentation.documentation);
        setPpt(response.data.ppt.ppt);
        setResearchPaper(response.data.researchPaper.researchPaper.approval);
        setGuideApproval(!response.data.guideApproval.guideApproval);
        setIsChecked(response.data.isChecked.researchPaper);

        seteditedDocumentationApproval(
          response.data.documentation.documentation
        );
        seteditedPptApproval(response.data.ppt.ppt);
        seteditedResearchApproval(
          response.data.researchPaper.researchPaper.approval
        );
        seteditedCommunicationApproval(
          response.data.isChecked.researchPaper.communicated
        );
        seteditedPaymentApproval(
          response.data.isChecked.researchPaper.paymentDone
        );
        seteditedAcceptedApproval(
          response.data.isChecked.researchPaper.accepted
        );
        seteditedGuideApproval(response.data.guideApproval.guideApproval);
        seteditedStudentOneMarks(response.data.projectMarks.studentOneMarks);
        seteditedStudentTwoMarks(
          response.data.projectMarks.studentTwoMarks || null
        );
        const formattedComments = response.data.comments.map((item) => {
          if (item.date && item.comment) {
            return { date: item.date, comment: item.comment };
          }
          const key = Object.keys(item)[0];
          if (key) {
            return { date: key, comment: item[key] || "" };
          }

          return { date: "", comment: "" };
        });

        const formattedComments2 = response.data.comments2.map((item) => {
          if (item.date && item.comment) {
            return { date: item.date, comment: item.comment };
          }
          const key = Object.keys(item)[0];
          if (key) {
            return { date: key, comment: item[key] || "" };
          }

          return { date: "", comment: "" };
        });

        // console.warn('Formatted Comments:', formattedComments);

        setComments({ prevComments: formattedComments });
        setComments2({ prevComments: formattedComments2 });
      } catch (error) {
        console.error("Error fetching team details:", error.message);
        // Handle the error as needed
      }
    };

    fetchData();
  }, [alertMessage]);

  const handleFinalSubmit = async () => {
    const editedData = {
      editedDocumentationApproval: editedDocumentationApproval,
      editedPptApproval: editedPptApproval,
      editedResearchApproval: editedResearchApproval,
      editedCommunicationApproval: editedCommunicationApproval,
      editedPaymentApproval: editedPaymentApproval,
      editedAcceptedApproval: editedAcceptedApproval,
      editedGuideApproval: editedGuideApproval,
      editedStudentOneMarks: editedStudentOneMarks,
      editedStudentTwoMarks: editedStudentTwoMarks,
      editedComments: editedComments,
      editedComments2: editedComments2,
    };
    setisLoading(true);
    const response = await axios.post(
      SERVERPATH + "/staffLogin/profiledetails/updatestatusDetails/" + teamId,
      editedData
    );
    setisLoading(false);
    // console.warn(response.data);
    // console.warn(editedData);
    setAlert(true);
    // console.warn(res.data)
    if (response.data.message === "Success") {
      setAlertMessage("Submitted Successfully!");
      setAlertType("success");
    } else {
      setAlertMessage("Failed to Submit!");
      setAlertType("fail");
    }
    alertDelay();
    setComments({ ...comments, addComments: "" });
    setComments2({ ...comments, addComments: "" });
    seteditedComments("");
    seteditedComments2("");
  };

  const alertDelay = () => {
    setTimeout(() => {
      setAlert(false);
      setAlertMessage("");
    }, 3000); // 3000 milliseconds = 3 seconds
  };

  const [editedDocumentationApproval, seteditedDocumentationApproval] =
    useState();
  const [editedPptApproval, seteditedPptApproval] = useState();
  const [editedResearchApproval, seteditedResearchApproval] = useState();
  const [editedCommunicationApproval, seteditedCommunicationApproval] =
    useState();
  const [editedPaymentApproval, seteditedPaymentApproval] = useState();
  const [editedAcceptedApproval, seteditedAcceptedApproval] = useState();
  const [editedGuideApproval, seteditedGuideApproval] = useState();
  const [editedStudentOneMarks, seteditedStudentOneMarks] = useState();
  const [editedStudentTwoMarks, seteditedStudentTwoMarks] = useState();
  const [editedComments, seteditedComments] = useState();

  const [editedComments2, seteditedComments2] = useState();

  function getDirectLinkFromShareableLinkStudent(shareableLink) {
    try {
      const fileIdMatch = shareableLink.match(/\/file\/d\/(.*?)\//);
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
    localStorage.removeItem("projectId");
    // Redirect to login page
    navigate("/staff_login");
  };
  const removeprojectid = () => {
    localStorage.removeItem("projectId");
    navigate("/staff_dashboard");
  };

  const guideImg = localStorage.getItem("guideImg");
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

  return (
    <>
      {isLoading && <LoadingScreen />}

      <div
        className={`flex items-center justify-center ${alert ? "" : "hidden"} `}
      >
        <Alert type={alertType} message={alertMessage} />
      </div>

      <header className="h-fit bg-[#831238] flex items-center justify-between px-6 md:px-16">
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
            <h3 className="text-white">{guidemailId}</h3>
            &nbsp;&nbsp;&nbsp;
            <span
              className="rounded-full flex items-center justify-center"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <svg
                className="h-5 w-5 text-gray-100"
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
              <div className="hidden absolute md:top-[3rem] md:right-[2px] h-[9rem] w-[10rem] bg-white text-black shadow-2xl  md:flex md:flex-col md:justify-center md:items-center md:gap-[3px] z-50">
                <div className=" w-full text-[0.8rem] text-[#6C757D] font-semibold h-1/5 bg-slate-100">
                  &nbsp;&nbsp;&nbsp; Welcome!
                </div>
                <div className="w-full flex items-center justify-center h-2/5 bg-slate-100 text-[#6C757D]  hover:bg-slate-200">
                  <a
                    href="/staff_dashboard"
                    className="w-full flex justify-start items-center gap-1 pl-2"
                  >
                    <img className="h-4 w-4" src={home} alt="Home" />
                    Home
                  </a>
                </div>
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
                  href="/staff_dashboard"
                  className="w-full flex justify-start items-center gap-1 pl-2"
                >
                  <img className="h-4 w-4" src={home} alt="Home" />
                  Home
                </a>
              </div>
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

      <div className="flex items-center justify-center">
        <div className="container mx-auto p-4 flex flex-wrap gap-4 w-fit items-center justify-center">
          {/* student1  */}
          <div className="bg-white rounded-xl shadow-xl mb-4 overflow-hidden  min-h-80">
            <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
              <h1 className="text-2xl font-bold text-center">Student 1</h1>
            </div>
            <img
              src={getDirectLinkFromShareableLinkStudent(
                projectDetails.studentOneImg
              )}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <div className="p-4">
              <p className="text-lg font-semibold text-gray-700">
                Name: {projectDetails.studentOneName}
              </p>
              <p className="text-lg text-gray-600">
                Reg No: {projectDetails.studentOneRegNo}
              </p>
              <p className="text-lg text-gray-600 ">
                Section: {projectDetails.studentOneSection}
              </p>
            </div>
          </div>

          {/* student2  */}
          {projectDetails.team && (
            <div className="bg-white rounded-xl shadow-xl mb-4 overflow-hidden min-h-80">
              <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
                <h1 className="text-2xl font-bold text-center">Student 2</h1>
              </div>
              <img
                src={getDirectLinkFromShareableLinkStudent(
                  projectDetails.studentTwoImg
                )}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <div className="p-4">
                <p className="text-lg font-semibold text-gray-700">
                  Name: {projectDetails.studentTwoName}
                </p>
                <p className="text-lg text-gray-600">
                  Reg No: {projectDetails.studentTwoRegNo}
                </p>
                <p className="text-lg text-gray-600">
                  Section: {projectDetails.studentTwoSection}
                </p>
              </div>
            </div>
          )}

          {/* Project details  */}
          <div className="bg-white rounded-xl shadow-xl mb-4 overflow-hidden min-w-72 min-h-80">
            <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
              <h1 className="text-2xl font-bold text-center">
                Project Details
              </h1>
            </div>
            <div className="hidden p-4 pt-8 flex-col">
              <p className="text-lg font-semibold text-gray-700 flex justify-center">
                {projectDetails.projectId}
              </p>
              <p className="text-lg text-gray-600 flex justify-center">
                {projectDetails.projectTitle}
              </p>
              <p className="text-lg text-gray-600 flex justify-center">
                {projectDetails.projectDomain}
              </p>
            </div>
            <p className="text-2xl text-gray-600 flex justify-center text-center font-bold text-black">
              Professional Training - 2<br></br>Feedback
            </p>

            <div className="w-80% h-fit mt-2 flex justify-center items-center pt-6 px-5">
              <a
                href="/staff_dashboard/profile_details/team_profile"
                className="w-[90%] h-[2.5rem] mb-3 flex items-center justify-center bg-[#d06a0f] rounded-md font-semibold text-white hover:scale-[1.01] active:scale-[0.99] hover:shadow-[0px_0px_10px_gray]  "
              >
                Student-1 Project Details
              </a>
            </div>

            <div className="w-80% h-fit mt-2 flex justify-center items-center pt-6 px-5">
              <a
                href="/staff_dashboard/profile_details/team_profile2"
                className="w-[90%] h-[2.5rem] mb-3 flex items-center justify-center bg-[#d06a0f] rounded-md font-semibold text-white hover:scale-[1.01] active:scale-[0.99] hover:shadow-[0px_0px_10px_gray]  "
              >
                Student-2 Project Details
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:fixed md:w-fit md:h-full md:left-1 md:top-[5rem] md:flex md:items-center md:justify-center md:cursor-pointer">
        <a href="/staff_dashboard" className="w-fit h-fit">
          <img
            className="bg-slate-200 m-4 p-2 w-10 rounded-full hover:bg-slate-300 hover:shadow-md"
            src={back_arrow}
            alt="⬅️"
            title="Go back"
          ></img>
        </a>
      </div>

      {/* update conatainer  */}
      <div className="flex flex-wrap items-center justify-center space-x-2">
        <div className="container mx-auto flex flex-wrap md:flex-row w-full items-center justify-center space-x-2">
          {/* left two container  */}
          <div className=" hidden flex flex-col lg:flex-row">
            {/* project status  */}
            <div className="flex flex-col px-2">
              {/* documentation  */}
              <div className="bg-white rounded-xl shadow-xl mb-4 overflow-hidden min-w-72 min-h-40">
                <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
                  <h1 className="text-2xl font-bold text-center px-2">
                    Project Status
                  </h1>
                </div>
                <div className="text-[#831238] text-xl flex items-center justify-center font-medium gap-2">
                  <a
                    href={links.documentation}
                    target="blank"
                    className="flex items-center gap-1"
                    title="Open Drive link"
                  >
                    <h3 className="hover:text-blue-800 hover:underline cursor-pointer">
                      Documentation
                    </h3>
                    <img src={link} alt="link" className="h-3 w-3" />
                  </a>
                  {documentation === true && (
                    <img src={tick_mark} className="h-6 w-6" />
                  )}
                  {documentation === false && (
                    <img src={cross_mark} className="h-6 w-6" />
                  )}
                </div>
                <div className="flex justify-center space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setDocumentation(true);
                      seteditedDocumentationApproval(true);
                    }}
                    className="bg-green-500 w-24 h-10 rounded-3xl text-white font-medium hover:shadow-[0px_0px_10px_gray] hover:scale-105"
                    style={{
                      boxShadow:
                        documentation === true
                          ? "0 0 10px rgba(0, 0, 0, 0.8)"
                          : "none",
                      backgroundColor: documentation === false ? "gray" : "",
                    }}
                  >
                    {documentation === true ? "Approved" : "Approve"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDocumentation(false);
                      seteditedDocumentationApproval(false);
                    }}
                    className="bg-red-500 w-24 h-10 rounded-3xl text-white font-medium hover:shadow-[0px_0px_10px_gray] hover:scale-105"
                    style={{
                      boxShadow:
                        documentation === false
                          ? "0 0 10px rgba(0, 0, 0, 0.8)"
                          : "none",
                      backgroundColor: documentation === true ? "gray" : "",
                    }}
                  >
                    {/* {documentation === false ? "Rejected" : "Reject"} */}
                    {documentation === false ? "Reject" : "Reject"}
                  </button>
                </div>
              </div>
              {/* ppt  */}
              <div className="bg-white rounded-xl shadow-xl mb-4 overflow-hidden min-w-72 min-h-40">
                <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
                  <h1 className="text-2xl font-bold text-center px-2">
                    PPT Status
                  </h1>
                </div>
                <div className="text-[#831238] text-xl flex items-center justify-center font-medium gap-2">
                  <a
                    href={links.ppt}
                    target="blank"
                    className="flex items-center gap-1"
                    title="Open Drive link"
                  >
                    <h3 className="hover:text-blue-800 hover:underline cursor-pointer">
                      PPT
                    </h3>
                    <img src={link} alt="link" className="h-3 w-3" />
                  </a>
                  {ppt === true && <img src={tick_mark} className="h-6 w-6" />}
                  {ppt === false && (
                    <img src={cross_mark} className="h-6 w-6" />
                  )}
                </div>
                <div className="flex justify-center space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPpt(true);
                      seteditedPptApproval(true);
                    }}
                    className="bg-green-500 w-24 h-10 rounded-3xl text-white font-medium hover:shadow-[0px_0px_10px_gray] hover:scale-105"
                    style={{
                      boxShadow:
                        ppt === true ? "0 0 10px rgba(0, 0, 0, 0.8)" : "none",
                      backgroundColor: ppt === false ? "gray" : "",
                    }}
                  >
                    {ppt === true ? "Approved" : "Approve"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPpt(false);
                      seteditedPptApproval(false);
                    }}
                    className="bg-red-500 w-24 h-10 rounded-3xl text-white font-medium hover:shadow-[0px_0px_10px_gray] hover:scale-105"
                    style={{
                      boxShadow:
                        ppt === false ? "0 0 10px rgba(0, 0, 0, 0.8)" : "none",
                      backgroundColor: ppt === true ? "gray" : "",
                    }}
                  >
                    {/* {ppt === false ? "Rejected" : "Reject"} */}
                    {ppt === false ? "Reject" : "Reject"}
                  </button>
                </div>
              </div>
            </div>
            {/* Research paper  */}
            <div className="bg-white rounded-xl shadow-xl mb-4 overflow-hidden min-w-72 min-h-80">
              <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
                <h1 className="text-2xl font-bold text-center px-2">
                  Research Status
                </h1>
              </div>
              <div className="text-[#831238]  text-xl flex items-center justify-center font-medium">
                <a
                  href={links.researchPaper}
                  target="blank"
                  className="flex items-center gap-1"
                  title="Open Drive link"
                >
                  <h3 className="hover:text-blue-800 hover:underline cursor-pointer">
                    Research Paper
                  </h3>
                  <img src={link} alt="link" className="h-3 w-3" />
                </a>
                {researchPaper === true && (
                  <img src={tick_mark} className="h-6 w-6" />
                )}
                {researchPaper === false && (
                  <img src={cross_mark} className="h-6 w-6" />
                )}
              </div>
              <div className="flex justify-center pt-6">
                <ul className="flex flex-col gap-4 mb-8">
                  <li className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isChecked.communicated}
                      onChange={(event) => {
                        seteditedCommunicationApproval(event.target.checked);
                        setIsChecked({
                          ...isChecked,
                          communicated: event.target.checked,
                        });
                      }}
                      id="communicated"
                      name="communicated"
                      className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                    />
                    <label
                      htmlFor="communicated"
                      className="cursor-pointer font-medium"
                      onClick={(prev) =>
                        setIsChecked({
                          ...prev,
                          communicated: !prev.communicated,
                        })
                      }
                    >
                      Communicated
                    </label>
                  </li>
                  {/* <input type="checkbox"/> */}
                  <li className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isChecked.accepted}
                      onChange={(event) => {
                        seteditedAcceptedApproval(event.target.checked);
                        setIsChecked({
                          ...isChecked,
                          accepted: event.target.checked,
                        });
                      }}
                      id="accepted"
                      name="accepted"
                      className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                    />
                    <label
                      htmlFor="accepted"
                      className="cursor-pointer font-medium"
                      onClick={(prev) =>
                        setIsChecked({
                          ...prev,
                          accepted: !prev.accepted,
                        })
                      }
                    >
                      Accepted
                    </label>
                  </li>
                  <li className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isChecked.paymentDone}
                      onChange={(event) => {
                        seteditedPaymentApproval(event.target.checked);
                        setIsChecked({
                          ...isChecked,
                          paymentDone: event.target.checked,
                        });
                      }}
                      id="paymentDone"
                      name="paymentDone"
                      className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                    />
                    <label
                      htmlFor="paymentDone"
                      className="cursor-pointer font-medium"
                      onClick={(prev) =>
                        setIsChecked({
                          ...prev,
                          paymentDone: !prev.paymentDone,
                        })
                      }
                    >
                      Payment Done
                    </label>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setResearchPaper(true);
                    seteditedResearchApproval(true);
                  }}
                  className="bg-green-500 w-24 h-10 rounded-3xl text-white font-medium hover:shadow-[0px_0px_10px_gray] hover:scale-105"
                  style={{
                    boxShadow:
                      researchPaper === true
                        ? "0 0 10px rgba(0, 0, 0, 0.8)"
                        : "none",
                    backgroundColor: researchPaper === false ? "gray" : "",
                  }}
                >
                  {researchPaper === true ? "Approved" : "Approve"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setResearchPaper(false);
                    seteditedResearchApproval(false);
                  }}
                  className="bg-red-500 w-24 h-10 rounded-3xl text-white font-medium hover:shadow-[0px_0px_10px_gray] hover:scale-105"
                  style={{
                    boxShadow:
                      researchPaper === false
                        ? "0 0 10px rgba(0, 0, 0, 0.8)"
                        : "none",
                    backgroundColor: researchPaper === true ? "gray" : "",
                  }}
                >
                  {/* {researchPaper === false ? "Rejected" : "Reject"} */}
                  {researchPaper === false ? "Reject" : "Reject"}
                </button>
              </div>
            </div>
          </div>

          {/* right two containers  */}
          <div className="flex flex-col lg:flex-row space-x-2">
            {/* Project marks  */}
            <div className="bg-white rounded-xl shadow-xl mb-4 overflow-hidden min-w-72 min-h-80">
              <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
                <h1 className="text-2xl font-bold text-center px-2">
                  Project Status
                </h1>
              </div>

              <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full h-1/2 flex justify-center items-center break-before-all text-lg font-semibold ">
                  {projectDetails.studentOneRegNo}
                </div>

                <div className="mb-5 w-full h-1/2 flex flex-col justify-center items-center break-before-all">
                  <h3 className="p-2">
                    Assigned Marks: {projectMarks.studentOneMarks}
                  </h3>
                  <div>
                    <label htmlFor="studentOneMarks" className="font-normal">
                      Enter Marks: &nbsp;
                    </label>
                    <input
                      className="text-center bg-[#e2e8f0]"
                      placeholder="Marks"
                      type="number"
                      id="studentOneMarks"
                      name="studentOneMarks"
                      defaultValue={projectMarks.studentOneMarks}
                      onChange={(eve) => {
                        handleProjectMarks(eve);
                        seteditedStudentOneMarks(eve.target.value);
                      }}
                      required
                      style={{
                        WebkitAppearance: "none",
                        MozAppearance: "textfield",
                        appearance: "none",
                      }}
                      min="0"
                      max="15"
                      maxLength="2"
                    />
                  </div>
                  <span className="font-normal"> &#40;Out of 15&#41;</span>
                </div>
              </div>

              {projectDetails.team && (
                <div className="w-full flex flex-col justify-center items-center ">
                  <div className="w-full h-1/2 flex justify-center items-center break-before-all text-lg font-semibold">
                    {projectDetails.studentTwoRegNo}
                  </div>

                  <div className="mb-5 w-full h-1/2 flex flex-col justify-center items-center break-before-all">
                    <h3 className="p-2">
                      Assigned Marks: {projectMarks.studentTwoMarks}
                    </h3>
                    <div>
                      <label htmlFor="studentTwoMarks" className="font-normal">
                        Enter Marks: &nbsp;
                      </label>
                      <input
                        className="text-center bg-[#e2e8f0]"
                        placeholder="Marks"
                        type="number"
                        id="studentTwoMarks"
                        name="studentTwoMarks"
                        defaultValue={projectMarks.studentTwoMarks}
                        onChange={(eve) => {
                          handleProjectMarks(eve);
                          seteditedStudentTwoMarks(eve.target.value);
                        }}
                        required
                        style={{
                          WebkitAppearance: "none",
                          MozAppearance: "textfield",
                          appearance: "none",
                        }}
                        min="0"
                        max="15"
                        maxLength="2"
                      />
                    </div>
                    <span className="font-normal"> &#40;Out of 15&#41;</span>
                  </div>
                </div>
              )}
            </div>
            {/* Comments  */}
            <div className="bg-white rounded-xl shadow-xl mb-4 min-w-72 max-w-72 min-h-80 max-w-96 max-h-96">
              <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
                <h1 className="text-2xl font-bold text-center px-4">
                  Feedback on Student-1 Project
                </h1>
              </div>
              <div className="flex flex-col  h-full">
                <div className="overflow-auto h-fit">
                  <div className="p-2 mb-1 text-lg  whitespace-pre-wrap overflow-y-scroll h-52">
                    {/* Display previous comments */}
                    {comments.prevComments &&
                      comments.prevComments.map((comment, index) => (
                        <div key={index} className="mb-2">
                          <div className="flex flex-col ">
                            <p className="flex justify-end text-xs">
                              {comment.date}
                            </p>
                            <div className="flex justify-end">
                              <p className="bg-slate-300 rounded-xl p-2">
                                {comment.comment}
                              </p>
                            </div>
                          </div>
                          {/* <span className="font-bold">{comment.date}:</span> {comment.comment} */}
                        </div>
                      ))}
                  </div>
                </div>
                <div className="flex flex-col items-center p-2">
                  <textarea
                    className="flex-grow w-full resize-none max-h-36 rounded-3xl pt-2  px-4 border-2 border-gray-300 outline-none bg-[#e2e8f0] "
                    id="addComments"
                    name="addComments"
                    placeholder="Type a message..."
                    value={comments.addComments}
                    onChange={(eve) => {
                      handleAddComments(eve);
                      seteditedComments(eve.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className=" bg-white rounded-xl shadow-xl mb-4 min-w-72 max-w-72 min-h-80 max-w-96 max-h-96">
              <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
                <h1 className="text-2xl font-bold text-center px-4">
                  Feedback on Student-2 Project
                </h1>
              </div>
              <div className="flex flex-col  h-full">
                <div className="overflow-auto h-fit">
                  <div className="p-2 mb-1 text-lg  whitespace-pre-wrap overflow-y-scroll h-52">
                    {/* Display previous comments */}
                    {comments2.prevComments &&
                      comments2.prevComments.map((comment, index) => (
                        <div key={index} className="mb-2">
                          <div className="flex flex-col ">
                            <p className="flex justify-end text-xs">
                              {comment.date}
                            </p>
                            <div className="flex justify-end">
                              <p className="bg-slate-300 rounded-xl p-2">
                                {comment.comment}
                              </p>
                            </div>
                          </div>
                          {/* <span className="font-bold">{comment.date}:</span> {comment.comment} */}
                        </div>
                      ))}
                  </div>
                </div>
                <div className="flex flex-col items-center p-2">
                  <textarea
                    className="flex-grow w-full resize-none max-h-36 rounded-3xl pt-2  px-4 border-2 border-gray-300 outline-none bg-[#e2e8f0] "
                    id="addComments2"
                    name="addComments2"
                    placeholder="Type a message..."
                    value={comments2.addComments}
                    onChange={(eve) => {
                      handleAddComments2(eve);
                      seteditedComments2(eve.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit button  */}
      <section
        className="w-[96%] md:w-[90%] mx-auto h-fit flex flex-col md:flex-row md:space-x-4 justify-center items-center my-4"
        onClick={() => setOpen(false)}
      >
        <a href="/staff_dashboard">
          <button
            className="bg-blue-600  h-10 p-2 rounded-3xl text-white font-semibold hidden md:block mb-1 hover:shadow-[0px_0px_10px_gray] hover:scale-105"
            href="/staff_dashboard"
          >
            Dashboard
          </button>
        </a>
        <button
          className="bg-blue-600 w-24 h-10 rounded-3xl text-white font-semibold mb-1 hover:shadow-[0px_0px_10px_gray] hover:scale-105"
          onClick={handleFinalSubmit}
        >
          Submit
        </button>
      </section>
      {/* footer  */}
      <footer className="w-full h-fit bg-slate-100 text-black text-center ">
        &copy; {new Date().getFullYear()} Sathyabama University. All rights
        reserved.
      </footer>
    </>
  );
};
