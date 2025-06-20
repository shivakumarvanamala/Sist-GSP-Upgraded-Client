import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import sist_logo_login from "./assets/sist_logo_login.png";
import log_out from "./assets/svgs/log_out.svg";
import LoadingScreen from "./shared/Loader";
import Alert from "./shared/Alert";
import { TfiHelpAlt } from "react-icons/tfi";
import lock from "./assets/svgs/lock.svg";

const Dashboard = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const teamId = localStorage.getItem("teamId");

  const [guideComments, setGuideComments] = useState([]);
  const [guideComments2, setGuideComments2] = useState([]);

  //  const [Teamid,setTeamid]=useState();

  // Function to handle input changes for guide comments

  const SERVERPATH = import.meta.env.VITE_SERVERPATH;

  const [isLoading, setisLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [alertType, setAlertType] = useState();

  // Simulate user data
  const studentDetails = {
    studentMail: userEmail || "bogesh@gmail.com",
  };

  const [projectStatus, setProjectStatus] = useState({
    documentation: false,
    ppt: false,
    guideApproval: false,
    researchPaper: {
      approval: false,
      communicated: false,
      accepted: false,
      payment: false,
    },
  });

  const [StudentData, setStudentData] = useState([
    {
      name: null,
      team: null,
      regNo: null,
      phoneNo: null,
      section: null,
      p2name: null,
      p2regNo: null,
      p2phoneNo: null,
      p2section: null,
      editProjectDetails: null,
      selectedGuide: null,
      selectedGuideMailId: null,
      teamId: null,
    },
  ]);
  const [studentImg1, setstudentimg1] = useState(
    "https://drive.google.com/uc?id=1XQIbsTt0GuT2PIqXFSmQXYux0Jcb543i"
  );
  const [studentImg2, setstudentimg2] = useState(
    "https://drive.google.com/uc?id=1XQIbsTt0GuT2PIqXFSmQXYux0Jcb543i"
  );

  const [problemStatements, setproblemStatements] = useState([]);

  const [projectDetails, setprojectDetails] = useState([
    {
      projectTitle: null,
      projectDesc: null,
      projectDomain: null,
      projectType: null,
    },
  ]);

  const [projectDetails2, setprojectDetails2] = useState([
    {
      projectTitle: null,
      projectDesc: null,
      projectDomain: null,
      projectType: null,
    },
  ]);

  const [projectType, setprojectType] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [editedProjectDetails, setEditedProjectDetails] = useState({
    projectTitle: projectDetails[0]["projectTitle"],
    projectDomain: projectDetails[0]["projectDomain"],
    projectDesc: projectDetails[0]["projectDesc"],
    projectType: projectType,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editProjectDetails, seteditProjectDetails] = useState();
  const toggleEdit = () => {
    // Clear editedProjectDetails when entering edit mode
    if (!isEditable) {
      setEditedProjectDetails({
        projectTitle: projectDetails[0]["projectTitle"],
        projectDomain: projectDetails[0]["projectDomain"],
        projectDesc: projectDetails[0]["projectDesc"],
        projectType: null,
      });
    }
    setIsEditable(!isEditable);
  };
  const handleInputChange = (e) => {
    setShowmsg(true);
    const { name, value } = e.target;
    setEditedProjectDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleUpdateProjectDetails = async () => {
    try {
      if (
        !editedProjectDetails.projectTitle ||
        !editedProjectDetails.projectDomain ||
        !editedProjectDetails.projectDesc ||
        !projectType
      ) {
        // console.warn("hii")

        // alert('Please fill in all the fields before submitting.');
        setAlert(true);
        setAlertMessage("Select Your Project Category");
        setAlertType("fail");
        alertDelay();
        return;
      } else {
        setIsSubmitting(true);

        const updatedData = {
          projectTitle: editedProjectDetails.projectTitle,
          projectDesc: editedProjectDetails.projectDesc,
          projectDomain: editedProjectDetails.projectDomain,
          projectType: projectType,
        };

        const data = {
          updatedData: updatedData,
          student: "p1",
          teamId: teamId,
        };

        setisLoading(true);
        const response = await axios.post(
          `${SERVERPATH}/studentLogin/updateProjectDetails/${userEmail}`,
          data
        );
        setisLoading(false);
        // console.warn(response.data);

        if (response.data.message === "Success") {
          setAlert(true);
          setAlertMessage("Project Details Updated Successfully!");
          setAlertType("success");
        } else {
          setAlert(true);
          setAlertMessage("Failed to Update Project Details!");
          setAlertType("fail");
        }
        alertDelay();

        // setProjectDetails([editedProjectDetails]);
        // setIsEditable(false);

        // Refresh the page after successful submission
        // window.location.reload();
        seteditProjectDetails(false);
        setIsEditable(false);
      }
    } catch (error) {
      // console.error('Error updating project details:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Student2 UseStates
  const [projectType2, setprojectType2] = useState(null);
  const [isEditable2, setIsEditable2] = useState(false);
  const [editedProjectDetails2, setEditedProjectDetails2] = useState({
    projectTitle: projectDetails2[0]["projectTitle"] || null,
    projectDomain: projectDetails2[0]["projectDomain"] || null,
    projectDesc: projectDetails2[0]["projectDesc"] || null,
    projectType: projectType || null,
  });
  const [isSubmitting2, setIsSubmitting2] = useState(false);
  const [editProjectDetails2, seteditProjectDetails2] = useState();
  const toggleEdit2 = () => {
    // Clear editedProjectDetails when entering edit mode
    if (!isEditable2) {
      setEditedProjectDetails2({
        projectTitle: projectDetails2[0]["projectTitle"],
        projectDomain: projectDetails2[0]["projectDomain"],
        projectDesc: projectDetails2[0]["projectDesc"],
        projectType: null,
      });
    }
    setIsEditable2(!isEditable2);
  };
  const handleInputChange2 = (e) => {
    setShowmsg(true);
    const { name, value } = e.target;
    setEditedProjectDetails2((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleUpdateProjectDetails2 = async () => {
    console.warn("hi");
    try {
      if (
        !editedProjectDetails2.projectTitle ||
        !editedProjectDetails2.projectDomain ||
        !editedProjectDetails2.projectDesc ||
        !projectType2
      ) {
        setAlert(true);
        setAlertMessage("Select Your Project Category");
        setAlertType("fail");
        alertDelay();
        return;
      }

      setIsSubmitting2(true);

      const updatedData = {
        p2projectTitle: editedProjectDetails2.projectTitle,
        p2projectDesc: editedProjectDetails2.projectDesc,
        p2projectDomain: editedProjectDetails2.projectDomain,
        p2projectType: projectType2,
      };

      const data = { updatedData: updatedData, student: "p2", teamId: teamId };

      setisLoading(true);
      const response = await axios.post(
        `${SERVERPATH}/studentLogin/updateProjectDetails/${userEmail}`,
        data
      );
      setisLoading(false);
      // console.warn(response.data);

      if (response.data.message === "Success") {
        setAlert(true);
        setAlertMessage("Project Details Updated Successfully!");
        setAlertType("success");
      } else {
        setAlert(true);
        setAlertMessage("Failed to Update Project Details!");
        setAlertType("fail");
      }
      alertDelay();

      // setProjectDetails([editedProjectDetails]);
      // setIsEditable(false);

      // Refresh the page after successful submission
      // window.location.reload();
      seteditProjectDetails2(false);
      setIsEditable2(false);
    } catch (error) {
      // console.error('Error updating project details:', error);
    } finally {
      setIsSubmitting2(false);
    }
  };

  const [documentation, setDocumentation] = useState([
    {
      researchPaper: null,
      documentation: null,
      ppt: null,
    },
  ]);
  const [guideImg, setGuideimg] = useState(
    "https://drive.google.com/uc?id=1XQIbsTt0GuT2PIqXFSmQXYux0Jcb543i"
  );

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

  const [guideMailId, setGuideMailId] = useState("");

  // UseEffect to decode JWT token (if applicable)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("userEmail");
    const teamId = localStorage.getItem("teamid");

    if (token) {
      const headers = {
        Authorization: `${token}`,
      };
      const func = async () => {
        setisLoading(true);
        const response = await axios.get(
          SERVERPATH + "/checkAuthentication/" + userEmail,
          { headers }
        );
        setisLoading(false);
        if (response.data.message == "Authenticated") {
          // console.warn(("hiii"))
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("teamId");

          navigate("/login");
        }
      };
      func();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("teamId");

      navigate("/login");
    }
  }, []);

  // UseEffect to fetch the user's name from the server
  useEffect(() => {
    const fetchUserName = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          setisLoading(true);
          const teamId = localStorage.getItem("teamId");

          const response = await axios.post(
            `${SERVERPATH}/studentLogin/getStudentData/${teamId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setisLoading(false);
          // console.warn(response.data)

          // Assuming the server response contains a property named 'userName'
          setStudentData(response.data.studentData);
          setproblemStatements(response.data.problemStatements);

          // console.warn(guideMailId)
          // console.warn(StudentData);
          seteditProjectDetails(
            response.data.studentData[0].editProjectDetails
          );
          seteditProjectDetails2(
            response.data.studentData[0].editProjectDetails2
          );

          setprojectDetails(response.data.projectDetails);
          setprojectDetails2(response.data.projectDetails2);
          setEditedProjectDetails({
            projectDesc: projectDetails[0]["projectDesc"],
            projectDomain: projectDetails[0]["projectDomain"],
            projectTitle: projectDetails[0]["projectTitle"],
          });
          setProjectStatus(response.data.projectStatus[0]);
          // console.warn(response.data.projectStatus);
          setDocumentation(response.data.documentation);
          setGuideimg(response.data.guideImage);
          setGuideComments(response.data.comments);
          setGuideComments2(response.data.comments2);

          // setTeamid(response.data.teamId);
          // console.warn(guideComments);
          // console.warn(projectStatus);
          setstudentimg1(response.data.studentImage1);
          setstudentimg2(response.data.studentImage2);
        } catch (error) {
          // console.error("Error fetching user details:", error);
        }
      } else {
        // Redirect to login if no token is found
        navigate("/login");
      }
    };

    // Call the fetchUserName function
    fetchUserName();
  }, [alertMessage]);

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleHelp = () => {
    // Redirect to the help page or perform other help-related actions
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=guideselection.cse@sathyabama.ac.in"
    );
  };
  const studentLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("teamId");
    // Redirect to login page
    navigate("/login");
  };

  const [projectpptFile, setProjectPPTFile] = useState(null);
  const [projectDocFile, setProjectDocFile] = useState(null);
  const [researchPaperFile, setResearchPaperFile] = useState(null);

  const sendPptFile = async () => {
    const data = new FormData();
    data.append("ppt", projectpptFile);
    data.append("teamId", StudentData[0]["teamId"]);
    if (projectpptFile) {
      setisLoading(true);
      const res = await axios.put(
        SERVERPATH + "/studentLogin/uploadppt/" + StudentData[0]["teamId"],
        data
      );
      setisLoading(false);
      setAlert(true);
      // console.warn(res.data)
      if (res.data.message === "Success") {
        setAlertMessage("PPT Uploaded Successfully!");
        setAlertType("success");
      } else {
        setAlertMessage("Failed to Upload PPT!");
        setAlertType("fail");
      }
      alertDelay();
    }
  };

  const sendDocFile = async () => {
    const data = new FormData();
    data.append("documentation", projectDocFile);
    data.append("teamId", StudentData[0]["teamId"]);
    if (projectDocFile) {
      setisLoading(true);
      const res = await axios.put(
        SERVERPATH + "/studentLogin/uploaddoc/" + StudentData[0]["teamId"],
        data
      );
      setisLoading(false);
      setAlert(true);
      // console.warn(res.data)
      if (res.data.message === "Success") {
        setAlertMessage("Document Uploaded Successfully!");
        setAlertType("success");
      } else {
        setAlertMessage("Failed to Upload Document!");
        setAlertType("fail");
      }
      alertDelay();
    }
  };

  const sendRspaperFile = async () => {
    const data = new FormData();
    data.append("researchPaper", researchPaperFile);
    if (researchPaperFile) {
      data.append("teamId", StudentData[0]["teamId"]);
      setisLoading(true);
      const res = await axios.put(
        SERVERPATH + "/studentLogin/uploadrspaper/" + StudentData[0]["teamId"],
        data
      );
      setisLoading(false);
      setAlert(true);
      // console.warn(res.data)
      if (res.data.message === "Success") {
        setAlertMessage("Research Paper Uploaded Successfully!");
        setAlertType("success");
      } else {
        setAlertMessage("Failed to Upload Research Paper!");
        setAlertType("fail");
      }
      alertDelay();
    }
  };

  const alertDelay = () => {
    setTimeout(() => {
      setAlert(false);
      setAlertMessage("");
    }, 3000); // 3000 milliseconds = 3 seconds
  };

  const [showMsg, setShowmsg] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div
        className={`flex items-center justify-center ${alert ? "" : "hidden"} `}
      >
        <Alert type={alertType} message={alertMessage} />
      </div>
      <div className="">
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
              <div className="mr-4">Welcome, {StudentData[0]["teamId"]}</div>
              <button
                onClick={toggleDropdown}
                className="text-sm font-semibold rounded text-white focus:outline-none"
              >
                &#9660; {/* Down arrow */}
              </button>
              {isDropdownOpen && (
                <div className="absolute top-10 right-0 bg-white text-gray-800 p-2 rounded shadow-md z-10">
                  <div className="flex flex-row justify-center space-x-2 items-center hover:bg-gray-200">
                    <TfiHelpAlt height={4} width={4} />
                    <button onClick={handleHelp} className="block p-2 ">
                      Help
                    </button>
                  </div>
                  <div className="w-full flex items-center justify-center h-2/5 hover:bg-slate-200">
                    <a
                      href={`/dashboard/student_Password_change`}
                      className="w-full flex justify-start items-center gap-1 p-2"
                    >
                      <img className="h-4 w-4" src={lock} alt="Lock" />
                      Change Password
                    </a>
                  </div>
                  <div className="flex flex-row justify-center items-center hover:bg-gray-200">
                    <img className="h-4 w-4" src={log_out} alt="LogOut" />
                    <button onClick={studentLogout} className="block p-2 ">
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>

        <div className="flex items-center justify-center">
          <div className="container mx-auto p-4 flex flex-wrap gap-4 w-fit items-center justify-center">
            {/* First Card - Student 1 */}
            <div className="bg-white rounded-xl shadow-xl mb-4 overflow-hidden min-w-96 min-h-80">
              <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
                <h1 className="text-2xl font-bold text-center">Student 1</h1>
              </div>
              <img
                src={getDirectLinkFromShareableLinkStudent(studentImg1)}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <div className="p-4">
                <p className="text-lg font-semibold text-gray-700">
                  Name: {StudentData[0]["name"]}
                </p>
                <p className="text-lg text-gray-600">
                  Reg No: {StudentData[0]["regNo"]}
                </p>
                <p className="text-lg text-gray-600 ">
                  Section: {StudentData[0]["section"]}
                </p>
              </div>
            </div>

            {/* Second Card - Student 2 (if exists) */}
            {StudentData[0]["p2name"] && (
              <div className="bg-white rounded-xl shadow-xl mb-4 overflow-hidden min-w-96 min-h-80">
                <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
                  <h1 className="text-2xl font-bold text-center">Student 2</h1>
                </div>
                <img
                  src={getDirectLinkFromShareableLinkStudent(studentImg2)}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <div className="p-4">
                  <p className="text-lg font-semibold text-gray-700">
                    Name: {StudentData[0]["p2name"]}
                  </p>
                  <p className="text-lg text-gray-600">
                    Reg No: {StudentData[0]["p2regNo"]}
                  </p>
                  <p className="text-lg text-gray-600">
                    Section: {StudentData[0]["p2section"]}
                  </p>
                </div>
                {/* Add other details for the second student here */}
              </div>
            )}

            {/* Third Card - Guide */}
            <div className="group">
              <div className=" h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="inset-0">
                  <div className="bg-white rounded-xl shadow-xl mb-4 overflow-hidden min-w-96 min-h-80">
                    <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
                      <h1 className="text-2xl font-bold text-center">
                        Guide Details
                      </h1>
                    </div>
                    <img
                      src={getDirectLinkFromShareableLink(guideImg)}
                      alt="Profile"
                      className="w-32 h-32 rounded-full mx-auto mb-4"
                    />
                    <div className="p-4">
                      <p className="text-lg text-gray-600 text-center">
                        Name: {StudentData[0]["selectedGuide"]}
                      </p>
                      <p className="text-lg text-gray-600 text-center">
                        Email: {StudentData[0]["selectedGuideMailId"]}
                      </p>
                      <a className="underline mt-2 text-sm text-blue-600 ">
                        View Problem Statements
                      </a>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-xl bg-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <div className="bg-white rounded-xl shadow-xl mb-4 overflow-hidden min-w-96 min-h-80 ">
                    <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
                      <h1 className="text-2xl font-bold text-center">
                        Problem Statements
                      </h1>
                    </div>
                    <div className="px-4 overflow-y-scroll max-h-64">
                      <div className=" min-h-12 h-auto md:px-8 my-4 w-full ">
                        {problemStatements.length > 0 ? (
                          problemStatements.map((item, index) => {
                            return (
                              <p className="p-2 font-semibold capitalize">
                                {parseInt(index) + 1} . {item}
                              </p>
                            );
                          })
                        ) : (
                          <p className="p-2 text-3xl capitalize font-bold">
                            No Problem Statements To Show!
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-4 bg-white rounded-xl shadow-xl mb-4 overflow-hidden">
          <h1 className="bg-[#9e1c3f] text-white p-4 rounded-t-xl mb-4 font-semibold">
            Student-1 Project Details
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mx-2">
            {/* Title */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Title:
              </label>
              <input
                type="text"
                name="projectTitle"
                value={
                  isEditable
                    ? editedProjectDetails.projectTitle
                    : projectDetails[0]["projectTitle"]
                }
                // value = {isEditable? projectDetails[0]['projectTitle'] : projectDetails[0]['projectTitle']}
                // defaultValue={projectDetails[0]['projectTitle']}
                content={projectDetails[0]["projectTitle"]}
                contentEditable
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                style={{ backgroundColor: "#f0f0f0", color: "#333" }}
                readOnly={!isEditable}
                onClick={() => {
                  setShowmsg(true);
                }}
                title={`${
                  editProjectDetails || showMsg
                    ? "Click on Edit button below"
                    : ""
                }`}
              />
            </div>

            {/* Domain */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Domain:
              </label>
              <input
                type="text"
                name="projectDomain"
                value={
                  isEditable
                    ? editedProjectDetails.projectDomain
                    : projectDetails[0]["projectDomain"]
                }
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                style={{ backgroundColor: "#f0f0f0", color: "#333" }}
                readOnly={!isEditable}
              />
            </div>

            {/* Project Option  */}
            {isEditable && (
              <div>
                <button
                  type="button"
                  className="inline-flex w-fit justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={() => {
                    setShowMenu(!showMenu);
                  }}
                >
                  {projectType ? projectType : "Category"}
                  <svg
                    className="-mr-1 h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                {showMenu && (
                  <div
                    className=" w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabindex="-1"
                  >
                    <div className="py-1" role="none">
                      <button
                        onClick={() => {
                          setShowMenu(!showMenu);
                          setprojectType("HCL PT2 Internship");
                        }}
                        className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                      >
                        HCL PT2 Internship
                      </button>
                      <button
                        onClick={() => {
                          setShowMenu(!showMenu);
                          setprojectType("Pride Certification");
                        }}
                        className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                      >
                        Pride Certification
                      </button>
                      <button
                        onClick={() => {
                          setShowMenu(!showMenu);
                          setprojectType("NPTEL");
                        }}
                        className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                      >
                        NPTEL
                      </button>
                      <button
                        onClick={() => {
                          setShowMenu(!showMenu);
                          setprojectType("Own Project");
                        }}
                        className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                      >
                        Own Project
                      </button>
                      <button
                        onClick={() => {
                          setShowMenu(!showMenu);
                          setprojectType("Oracle Internship");
                        }}
                        className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                      >
                        Oracle Internship
                      </button>
                      <button
                        onClick={() => {
                          setShowMenu(!showMenu);
                          setprojectType("Private/Government Internship");
                        }}
                        className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                      >
                        Private/Government Internship
                      </button>
                      <button
                        onClick={() => {
                          setShowMenu(!showMenu);
                          setprojectType("HCL System Engineering");
                        }}
                        className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                      >
                        {" "}
                        HCL System Engineering
                      </button>
                      <button
                        onClick={() => {
                          setShowMenu(!showMenu);
                          setprojectType("Any Other");
                        }}
                        className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                      >
                        Any Other
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* Project Option  */}
          </div>

          {/* Description */}
          <div className="py-4 mx-2">
            <label className="block text-lg font-semibold text-gray-700">
              Description:
            </label>
            <textarea
              name="projectDesc"
              value={
                isEditable
                  ? editedProjectDetails.projectDesc
                  : projectDetails[0]["projectDesc"]
              }
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 h-36"
              style={{ backgroundColor: "#f0f0f0", color: "#333" }}
              readOnly={!isEditable}
            />
          </div>
          <br></br>

          {editProjectDetails ? (
            <div className="flex justify-center space-x-4 mb-4">
              <button
                onClick={toggleEdit}
                className="bg-blue-500 text-white px-4  py-3 rounded focus:outline-none"
              >
                {isEditable ? "Cancel" : "Edit"}
              </button>
              {isEditable && !isSubmitting && (
                <button
                  onClick={handleUpdateProjectDetails}
                  className="bg-blue-500 text-white p-2 rounded focus:outline-none"
                >
                  Submit
                </button>
              )}
            </div>
          ) : (
            <p></p>
          )}
        </div>

        {/* Person2 Project Details */}
        {StudentData[0]["p2name"] && (
          <div className="mx-4 bg-white rounded-xl shadow-xl mb-4 overflow-hidden">
            <h1 className="bg-[#9e1c3f] text-white p-4 rounded-t-xl mb-4 font-semibold">
              Student-2 Project Details
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mx-2">
              {/* Title */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Title:
                </label>
                <input
                  type="text"
                  name="projectTitle"
                  value={
                    isEditable2
                      ? editedProjectDetails2.projectTitle
                      : projectDetails2[0]["projectTitle"]
                  }
                  // value = {isEditable? projectDetails[0]['projectTitle'] : projectDetails[0]['projectTitle']}
                  // defaultValue={projectDetails[0]['projectTitle']}
                  content={projectDetails2[0]["projectTitle"]}
                  contentEditable
                  onChange={handleInputChange2}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                  style={{ backgroundColor: "#f0f0f0", color: "#333" }}
                  readOnly={!isEditable2}
                  onClick={() => {
                    setShowmsg(true);
                  }}
                  title={`${
                    editProjectDetails2 || showMsg
                      ? "Click on Edit button below"
                      : ""
                  }`}
                />
              </div>

              {/* Domain */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Domain:
                </label>
                <input
                  type="text"
                  name="projectDomain"
                  value={
                    isEditable2
                      ? editedProjectDetails2.projectDomain
                      : projectDetails2[0]["projectDomain"]
                  }
                  onChange={handleInputChange2}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                  style={{ backgroundColor: "#f0f0f0", color: "#333" }}
                  readOnly={!isEditable2}
                />
              </div>

              {/* Project Option  */}
              {isEditable2 && (
                <div>
                  <button
                    type="button"
                    className="inline-flex w-fit justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={() => {
                      setShowMenu(!showMenu);
                    }}
                  >
                    {projectType2 ? projectType2 : "Category"}
                    <svg
                      className="-mr-1 h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  {showMenu && (
                    <div
                      className=" w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabindex="-1"
                    >
                      <div className="py-1" role="none">
                        <button
                          onClick={() => {
                            setShowMenu(!showMenu);
                            setprojectType2("HCL PT2 Internship");
                          }}
                          className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                        >
                          HCL PT2 Internship
                        </button>
                        <button
                          onClick={() => {
                            setShowMenu(!showMenu);
                            setprojectType2("Pride Certification");
                          }}
                          className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                        >
                          Pride Certification
                        </button>
                        <button
                          onClick={() => {
                            setShowMenu(!showMenu);
                            setprojectType2("NPTEL");
                          }}
                          className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                        >
                          NPTEL
                        </button>
                        <button
                          onClick={() => {
                            setShowMenu(!showMenu);
                            setprojectType2("Own Project");
                          }}
                          className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                        >
                          Own Project
                        </button>
                        <button
                          onClick={() => {
                            setShowMenu(!showMenu);
                            setprojectType2("Oracle Internship");
                          }}
                          className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                        >
                          Oracle Internship
                        </button>
                        <button
                          onClick={() => {
                            setShowMenu(!showMenu);
                            setprojectType2("Private/Government Internship");
                          }}
                          className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                        >
                          Private/Government Internship
                        </button>
                        <button
                          onClick={() => {
                            setShowMenu(!showMenu);
                            setprojectType2("HCL System Engineering");
                          }}
                          className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                        >
                          {" "}
                          HCL System Engineering
                        </button>
                        <button
                          onClick={() => {
                            setShowMenu(!showMenu);
                            setprojectType2("Any Other");
                          }}
                          className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                        >
                          Any Other
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* Project Option  */}
            </div>

            {/* Description */}
            <div className="py-4 mx-2">
              <label className="block text-lg font-semibold text-gray-700">
                Description:
              </label>
              <textarea
                name="projectDesc"
                value={
                  isEditable2
                    ? editedProjectDetails2.projectDesc
                    : projectDetails2[0]["projectDesc"]
                }
                onChange={handleInputChange2}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 h-36"
                style={{ backgroundColor: "#f0f0f0", color: "#333" }}
                readOnly={!isEditable2}
              />
            </div>
            <br></br>

            {editProjectDetails2 ? (
              <div className="flex justify-center space-x-4 mb-4">
                <button
                  onClick={toggleEdit2}
                  className="bg-blue-500 text-white px-4  py-3 rounded focus:outline-none"
                >
                  {isEditable2 ? "Cancel" : "Edit"}
                </button>
                {isEditable2 && !isSubmitting2 && (
                  <button
                    onClick={handleUpdateProjectDetails2}
                    className="bg-blue-500 text-white p-2 rounded focus:outline-none"
                  >
                    Submit
                  </button>
                )}
              </div>
            ) : (
              <p></p>
            )}
          </div>
        )}
        {/* Person2 Project Details */}

        {/* <div>
      {StudentData[0].editProjectDetails ? (
        <div className="mx-4 bg-white rounded-xl shadow-xl mb-4 overflow-hidden">
          <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded focus:outline-none">
            Submit
          </button>
        </div>
      ) : (
        <button onClick={handleEditClick} className="bg-blue-500 text-white p-2 rounded focus:outline-none">
          Edit Project Details
        </button>
      )}
    </div> */}

        <div className="mx-4 bg-white rounded-xl shadow-xl mb-4 overflow-hidden">
          <h1 className="bg-[#9e1c3f] text-white p-4 rounded-t-xl mb-4 font-semibold">
            Project Status
          </h1>

          <h1 className="text-3xl font-bold text-gray-800 mb-4 my-2 mx-3">
            Guide Approval status
          </h1>

          <div className="flex flex-col md:flex-row md:items-start md:gap-4 mx-3">
            {/* Guide Approval */}
            <button
              onClick={() => toggleStatus("guideApproval")}
              className={`text-lg font-bold p-2 rounded mb-2 md:mb-0 ${
                projectStatus.guideApproval
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              Guide Approval
            </button>

            {/* Documentation */}
            <button
              onClick={() => toggleStatus("documentation")}
              className={`text-lg font-bold p-2 rounded mb-2 md:mb-0 ${
                projectStatus.documentation
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              Documentation
            </button>

            {/* PPT */}
            <button
              onClick={() => toggleStatus("ppt")}
              className={`text-lg font-bold p-2 rounded ${
                projectStatus.ppt
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              PPT
            </button>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4 my-2 mx-3">
              Research paper status
            </h1>
            <div className="flex flex-col md:flex-row md:items-start md:gap-4 mx-3 my-3">
              {/* Approval */}
              <button
                onClick={() => toggleStatus("researchPaper")}
                className={`text-lg font-bold p-2 rounded mb-2 md:mb-0 ${
                  projectStatus.researchPaper.approval
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                Approval
              </button>

              {/* Communicated */}
              <button
                onClick={() => toggleStatus("researchPaper")}
                className={`text-lg font-bold p-2 rounded mb-2 md:mb-0 ${
                  projectStatus.researchPaper.communicated
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                Communicated
              </button>

              {/* Accepted */}
              <button
                onClick={() => toggleStatus("researchPaper")}
                className={`text-lg font-bold p-2 rounded mb-2 md:mb-0 ${
                  projectStatus.researchPaper.accepted
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                Accepted
              </button>

              {/* Payment */}
              <button
                onClick={() => toggleStatus("researchPaper")}
                className={`text-lg font-bold p-2 rounded mb-2 md:mb-0 ${
                  projectStatus.researchPaper.payment
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                Payment
              </button>
            </div>
          </div>
        </div>

        <div className="mx-4 hidden bg-white rounded-xl shadow-xl mb-4 overflow-hidden">
          <h1 className="bg-[#9e1c3f] text-white p-4 rounded-t-xl mb-4 font-semibold">
            Project Submissions
          </h1>
          <div className="flex flex-col gap-4 m-4 md:flex-row md:items-center">
            <div className="mb-4 md:flex md:items-center flex-grow">
              <div className="flex flex-col">
                <h4 className="text-lg font-semibold mb-2">
                  <b>PPT document</b>
                </h4>
                <div className="flex space-x-4 items-center">
                  {documentation[0]["ppt"] === null ||
                  documentation[0]["ppt"] === "" ? (
                    <input
                      type="file"
                      accept=".ppt, .pptx"
                      onChange={(e) => {
                        setProjectPPTFile(e.target.files[0]);
                      }}
                      className="w-full p-2 border rounded focus:outline-none focus:border-red-500 bg-[#9e1c3f] text-white"
                    />
                  ) : (
                    <p></p>
                  )}
                </div>
                <br></br>
                {documentation[0]["ppt"] === null ||
                documentation[0]["ppt"] === "" ? (
                  <button
                    onClick={sendPptFile}
                    className="p-3 mb-2 mx-2 bg-[#977e3d] text-white rounded transition duration-300 w-full md:w-auto"
                  >
                    Upload
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      window.open(documentation[0]["ppt"], "_blank")
                    }
                    className="p-3 mb-2 mx-2 bg-[#C08261] text-white rounded transition duration-300 w-full md:w-auto"
                  >
                    Open PPT
                  </button>
                )}
                {/* <p>{documentation.documentation}</p> */}
              </div>
            </div>
            <div className="mb-4 md:flex md:items-center flex-grow">
              <div className="flex flex-col">
                <h4 className="text-lg font-semibold mb-2">
                  <b>Project document</b>
                </h4>
                <div className="flex space-x-4 items-center">
                  {documentation[0]["documentation"] === null ||
                  documentation[0]["documentation"] === "" ? (
                    <input
                      type="file"
                      accept=".doc, .docx, .pdf"
                      onChange={(e) => {
                        setProjectDocFile(e.target.files[0]);
                      }}
                      className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 bg-[#9e1c3f] text-white"
                    />
                  ) : (
                    <p></p>
                  )}
                </div>
                <br></br>
                {documentation[0]["documentation"] === null ||
                documentation[0]["documentation"] === "" ? (
                  <button
                    onClick={sendDocFile}
                    className="p-3 mb-2 mx-2 bg-[#977e3d] text-white rounded transition duration-300 w-full md:w-auto"
                  >
                    Upload
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      window.open(documentation[0]["documentation"], "_blank")
                    }
                    className="p-3 mb-2 mx-2 bg-[#C08261] text-white rounded transition duration-300 w-full md:w-auto"
                  >
                    Open Document
                  </button>
                )}
              </div>
            </div>
            <div className="mb-4 md:flex md:items-center flex-grow">
              <div className="flex flex-col">
                <h4 className="text-lg font-semibold mb-2">
                  <b>Research paper document</b>
                </h4>
                {/* {documentation[0]["researchPaper"]} */}
                <div className="flex space-x-4 items-center">
                  {documentation[0]["researchPaper"] === null ||
                  documentation[0]["researchPaper"] === "" ? (
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => {
                        setResearchPaperFile(e.target.files[0]);
                      }}
                      className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 bg-[#9e1c3f] text-white"
                    />
                  ) : (
                    <p></p>
                  )}
                </div>
                <br></br>
                {documentation[0]["researchPaper"] === null ||
                documentation[0]["researchPaper"] === "" ? (
                  <button
                    onClick={sendRspaperFile}
                    className="p-3 mb-2 mx-2 bg-[#977e3d] text-white rounded transition duration-300 w-full md:w-auto"
                  >
                    Upload
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      window.open(documentation[0]["researchPaper"], "_blank")
                    }
                    className="p-3 mb-2 mx-2 bg-[#C08261] text-white rounded transition duration-300 w-full md:w-auto"
                  >
                    Open Research Paper
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center"></div>
        </div>

        <div className="mx-4 bg-white rounded-xl shadow-xl mb-4 ">
          <h1 className="bg-[#9e1c3f] text-white p-4 rounded-t-xl mb-4 font-semibold">
            Guide Feedback on student 1 Project
          </h1>
          <div className="overflow-auto m-2 max-h-60">
            {" "}
            {/* Adjust max height as needed */}
            {guideComments[0] ? (
              guideComments.map((comment, index) => {
                const date = Object.keys(comment)[0];
                const text = comment[date];
                return (
                  <div className="bg-gray-200 p-3 rounded mb-2" key={index}>
                    <p className="text-sm text-gray-600">Date: {date}</p>
                    <p className="text-base text-gray-800">Comment: {text}</p>
                  </div>
                );
              })
            ) : (
              <p className="p-4 flex justify-center">No comments yet</p>
            )}
          </div>
        </div>

        {StudentData[0]["p2name"] && (
          <div className="mx-4 bg-white rounded-xl shadow-xl mb-4 ">
            <h1 className="bg-[#9e1c3f] text-white p-4 rounded-t-xl mb-4 font-semibold">
              Guide Feedback on Student 2 Project
            </h1>
            <div className="overflow-auto m-2 max-h-60">
              {" "}
              {/* Adjust max height as needed */}
              {guideComments2[0] ? (
                guideComments2.map((comment, index) => {
                  const date = Object.keys(comment)[0];
                  const text = comment[date];
                  return (
                    <div className="bg-gray-200 p-3 rounded mb-2" key={index}>
                      <p className="text-sm text-gray-600">Date: {date}</p>
                      <p className="text-base text-gray-800">Comment: {text}</p>
                    </div>
                  );
                })
              ) : (
                <p className="p-4 flex justify-center">No comments yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
  
  
  
  
  
//   return (
//   <>
//   <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 ${alert ? "" : "hidden"}`}>
//     <Alert type={alertType} message={alertMessage} />
//   </div>

//   <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//     {isLoading && <LoadingScreen />}

//     {/* Modern Navigation */}
//     <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg sticky top-0 z-40">
//       <div className="container mx-auto px-6 py-4">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center space-x-4">
//             <a href="/" className="flex items-center space-x-3">
//               <img src={sist_logo_login} alt="Logo" className="h-10 w-auto" />
//               <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                 Dashboard
//               </span>
//             </a>
//           </div>

//           <div className="flex items-center space-x-4">
//             <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-white text-sm font-medium">
//               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//               <span>Team {StudentData[0]["teamId"]}</span>
//             </div>

//             <div className="relative">
//               <button
//                 onClick={toggleDropdown}
//                 className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-200 shadow-sm border border-white/40"
//               >
//                 <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
//                   {StudentData[0]["teamId"].charAt(0)}
//                 </div>
//                 <svg className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                 </svg>
//               </button>

//               {isDropdownOpen && (
//                 <div className="absolute top-12 right-0 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/40 py-2 z-50">
//                   <button onClick={handleHelp} className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-indigo-50 transition-colors duration-200">
//                     <TfiHelpAlt className="w-4 h-4 text-indigo-600" />
//                     <span className="text-gray-700">Help</span>
//                   </button>
//                   <a href={`/dashboard/student_Password_change`} className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-indigo-50 transition-colors duration-200">
//                     <img className="w-4 h-4" src={lock} alt="Lock" />
//                     <span className="text-gray-700">Change Password</span>
//                   </a>
//                   <button onClick={studentLogout} className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-colors duration-200 border-t border-gray-100 mt-2">
//                     <img className="w-4 h-4" src={log_out} alt="LogOut" />
//                     <span className="text-red-600">Logout</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>

//     <div className="container mx-auto px-6 py-8">
//       {/* Student Cards Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
//         {/* Student 1 Card */}
//         <div className="group">
//           <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
//             <div className="h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative">
//               <div className="absolute inset-0 bg-black/10"></div>
//               <div className="absolute bottom-4 left-6">
//                 <h3 className="text-white text-xl font-bold">Student 1</h3>
//               </div>
//             </div>

//             <div className="p-6 -mt-16 relative z-10">
//               <div className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-white shadow-lg overflow-hidden">
//                 <img
//                   src={getDirectLinkFromShareableLinkStudent(studentImg1)}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               <div className="text-center space-y-2">
//                 <h4 className="text-lg font-bold text-gray-800">{StudentData[0]["name"]}</h4>
//                 <p className="text-sm text-gray-600 font-mono bg-gray-100 px-3 py-1 rounded-full inline-block">
//                   {StudentData[0]["regNo"]}
//                 </p>
//                 <p className="text-sm text-indigo-600 font-medium">
//                   Section {StudentData[0]["section"]}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Student 2 Card */}
//         {StudentData[0]["p2name"] && (
//           <div className="group">
//             <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
//               <div className="h-32 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 relative">
//                 <div className="absolute inset-0 bg-black/10"></div>
//                 <div className="absolute bottom-4 left-6">
//                   <h3 className="text-white text-xl font-bold">Student 2</h3>
//                 </div>
//               </div>

//               <div className="p-6 -mt-16 relative z-10">
//                 <div className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-white shadow-lg overflow-hidden">
//                   <img
//                     src={getDirectLinkFromShareableLinkStudent(studentImg2)}
//                     alt="Profile"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>

//                 <div className="text-center space-y-2">
//                   <h4 className="text-lg font-bold text-gray-800">{StudentData[0]["p2name"]}</h4>
//                   <p className="text-sm text-gray-600 font-mono bg-gray-100 px-3 py-1 rounded-full inline-block">
//                     {StudentData[0]["p2regNo"]}
//                   </p>
//                   <p className="text-sm text-teal-600 font-medium">
//                     Section {StudentData[0]["p2section"]}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Guide Card with Flip Effect */}
//         <div className="group perspective-1000">
//           <div className="relative h-full w-full rounded-2xl transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
//             {/* Front Side */}
//             <div className="absolute inset-0 [backface-visibility:hidden]">
//               <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden h-full">
//                 <div className="h-32 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 relative">
//                   <div className="absolute inset-0 bg-black/10"></div>
//                   <div className="absolute bottom-4 left-6">
//                     <h3 className="text-white text-xl font-bold">Guide Details</h3>
//                   </div>
//                 </div>

//                 <div className="p-6 -mt-16 relative z-10">
//                   <div className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-white shadow-lg overflow-hidden">
//                     <img
//                       src={getDirectLinkFromShareableLink(guideImg)}
//                       alt="Guide"
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   <div className="text-center space-y-3">
//                     <h4 className="text-lg font-bold text-gray-800">{StudentData[0]["selectedGuide"]}</h4>
//                     <p className="text-sm text-gray-600 break-all">{StudentData[0]["selectedGuideMailId"]}</p>
//                     <div className="inline-flex items-center space-x-2 text-sm text-orange-600 hover:text-orange-700 cursor-pointer font-medium">
//                       <span>Hover to view problems</span>
//                       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Back Side */}
//             <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
//               <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden h-full">
//                 <div className="h-32 bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 relative">
//                   <div className="absolute inset-0 bg-black/10"></div>
//                   <div className="absolute bottom-4 left-6">
//                     <h3 className="text-white text-xl font-bold">Problem Statements</h3>
//                   </div>
//                 </div>

//                 <div className="p-6 -mt-8">
//                   <div className="max-h-48 overflow-y-auto space-y-3 custom-scrollbar">
//                     {problemStatements.length > 0 ? (
//                       problemStatements.map((item, index) => (
//                         <div key={index} className="flex items-start space-x-3 p-3 bg-white/50 rounded-lg">
//                           <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-violet-500 to-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
//                             {parseInt(index) + 1}
//                           </span>
//                           <p className="text-sm text-gray-700 capitalize leading-relaxed">{item}</p>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="text-center py-8">
//                         <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
//                           <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                           </svg>
//                         </div>
//                         <p className="text-gray-500 font-medium">No Problem Statements Available</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Project Details Sections */}
//       <div className="space-y-8">
//         {/* Student 1 Project Details */}
//         <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
//           <div className="h-20 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center px-8">
//             <h2 className="text-white text-2xl font-bold">Student 1 Project Details</h2>
//           </div>

//           <div className="p-8">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Project Title</label>
//                 <input
//                   type="text"
//                   name="projectTitle"
//                   value={isEditable ? editedProjectDetails.projectTitle : projectDetails[0]["projectTitle"]}
//                   onChange={handleInputChange}
//                   className="w-full p-4 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
//                   readOnly={!isEditable}
//                   onClick={() => setShowmsg(true)}
//                   title={`${editProjectDetails || showMsg ? "Click on Edit button below" : ""}`}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Domain</label>
//                 <input
//                   type="text"
//                   name="projectDomain"
//                   value={isEditable ? editedProjectDetails.projectDomain : projectDetails[0]["projectDomain"]}
//                   onChange={handleInputChange}
//                   className="w-full p-4 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
//                   readOnly={!isEditable}
//                 />
//               </div>

//               {isEditable && (
//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Category</label>
//                   <div className="relative">
//                     <button
//                       type="button"
//                       onClick={() => setShowMenu(!showMenu)}
//                       className="w-full p-4 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-left flex items-center justify-between transition-all duration-200"
//                     >
//                       <span>{projectType || "Select Category"}</span>
//                       <svg className={`w-5 h-5 transition-transform duration-200 ${showMenu ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                       </svg>
//                     </button>

//                     {showMenu && (
//                       <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
//                         {["HCL PT2 Internship", "Pride Certification", "NPTEL", "Own Project", "Oracle Internship", "Private/Government Internship", "HCL System Engineering", "Any Other"].map((option) => (
//                           <button
//                             key={option}
//                             onClick={() => {
//                               setShowMenu(false);
//                               setprojectType(option);
//                             }}
//                             className="w-full px-4 py-3 text-left hover:bg-indigo-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
//                           >
//                             {option}
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="space-y-2 mb-8">
//               <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Project Description</label>
//               <textarea
//                 name="projectDesc"
//                 value={isEditable ? editedProjectDetails.projectDesc : projectDetails[0]["projectDesc"]}
//                 onChange={handleInputChange}
//                 className="w-full p-4 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 h-32 resize-none"
//                 readOnly={!isEditable}
//               />
//             </div>

//             {editProjectDetails && (
//               <div className="flex justify-center space-x-4">
//                 <button
//                   onClick={toggleEdit}
//                   className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl"
//                 >
//                   {isEditable ? "Cancel" : "Edit"}
//                 </button>
//                 {isEditable && !isSubmitting && (
//                   <button
//                     onClick={handleUpdateProjectDetails}
//                     className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
//                   >
//                     Submit Changes
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Student 2 Project Details */}
//         {StudentData[0]["p2name"] && (
//           <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
//             <div className="h-20 bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center px-8">
//               <h2 className="text-white text-2xl font-bold">Student 2 Project Details</h2>
//             </div>

//             <div className="p-8">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Project Title</label>
//                   <input
//                     type="text"
//                     name="projectTitle"
//                     value={isEditable2 ? editedProjectDetails2.projectTitle : projectDetails2[0]["projectTitle"]}
//                     onChange={handleInputChange2}
//                     className="w-full p-4 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
//                     readOnly={!isEditable2}
//                     onClick={() => setShowmsg(true)}
//                     title={`${editProjectDetails2 || showMsg ? "Click on Edit button below" : ""}`}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Domain</label>
//                   <input
//                     type="text"
//                     name="projectDomain"
//                     value={isEditable2 ? editedProjectDetails2.projectDomain : projectDetails2[0]["projectDomain"]}
//                     onChange={handleInputChange2}
//                     className="w-full p-4 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
//                     readOnly={!isEditable2}
//                   />
//                 </div>

//                 {isEditable2 && (
//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Category</label>
//                     <div className="relative">
//                       <button
//                         type="button"
//                         onClick={() => setShowMenu(!showMenu)}
//                         className="w-full p-4 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-left flex items-center justify-between transition-all duration-200"
//                       >
//                         <span>{projectType2 || "Select Category"}</span>
//                         <svg className={`w-5 h-5 transition-transform duration-200 ${showMenu ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                         </svg>
//                       </button>

//                       {showMenu && (
//                         <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
//                           {["HCL PT2 Internship", "Pride Certification", "NPTEL", "Own Project", "Oracle Internship", "Private/Government Internship", "HCL System Engineering", "Any Other"].map((option) => (
//                             <button
//                               key={option}
//                               onClick={() => {
//                                 setShowMenu(false);
//                                 setprojectType2(option);
//                               }}
//                               className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
//                             >
//                               {option}
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="space-y-2 mb-8">
//                 <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Project Description</label>
//                 <textarea
//                   name="projectDesc"
//                   value={isEditable2 ? editedProjectDetails2.projectDesc : projectDetails2[0]["projectDesc"]}
//                   onChange={handleInputChange2}
//                   className="w-full p-4 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 h-32 resize-none"
//                   readOnly={!isEditable2}
//                 />
//               </div>

//               {editProjectDetails2 && (
//                 <div className="flex justify-center space-x-4">
//                   <button
//                     onClick={toggleEdit2}
//                     className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl"
//                   >
//                     {isEditable2 ? "Cancel" : "Edit"}
//                   </button>
//                   {isEditable2 && !isSubmitting2 && (
//                     <button
//                       onClick={handleUpdateProjectDetails2}
//                       className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
//                     >
//                       Submit Changes
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

// <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
//         <div className="max-w-7xl mx-auto space-y-8">
          
//           {/* Project Status Section */}
//           <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
//             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
//               <h1 className="text-2xl font-bold text-white flex items-center gap-3">
//                 <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
//                   </svg>
//                 </div>
//                 Project Status Overview
//               </h1>
//             </div>

//             <div className="p-8 space-y-8">
//               {/* Guide Approval Section */}
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
//                   <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
//                   Guide Approval Status
//                 </h2>
                
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <button
//                     onClick={() => toggleStatus("guideApproval")}
//                     className={`group relative overflow-hidden rounded-xl p-6 font-semibold transition-all duration-300 transform hover:scale-105 ${
//                       projectStatus.guideApproval
//                         ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-green-200"
//                         : "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-200"
//                     }`}
//                   >
//                     <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
//                     <div className="flex items-center justify-center gap-3">
//                       {projectStatus.guideApproval ? (
//                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
//                         </svg>
//                       ) : (
//                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
//                         </svg>
//                       )}
//                       Guide Approval
//                     </div>
//                   </button>

//                   <button
//                     onClick={() => toggleStatus("documentation")}
//                     className={`group relative overflow-hidden rounded-xl p-6 font-semibold transition-all duration-300 transform hover:scale-105 ${
//                       projectStatus.documentation
//                         ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-green-200"
//                         : "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-200"
//                     }`}
//                   >
//                     <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
//                     <div className="flex items-center justify-center gap-3">
//                       {projectStatus.documentation ? (
//                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
//                         </svg>
//                       ) : (
//                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
//                         </svg>
//                       )}
//                       Documentation
//                     </div>
//                   </button>

//                   <button
//                     onClick={() => toggleStatus("ppt")}
//                     className={`group relative overflow-hidden rounded-xl p-6 font-semibold transition-all duration-300 transform hover:scale-105 ${
//                       projectStatus.ppt
//                         ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-green-200"
//                         : "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-200"
//                     }`}
//                   >
//                     <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
//                     <div className="flex items-center justify-center gap-3">
//                       {projectStatus.ppt ? (
//                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
//                         </svg>
//                       ) : (
//                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
//                         </svg>
//                       )}
//                       PPT
//                     </div>
//                   </button>
//                 </div>
//               </div>

//               {/* Research Paper Section */}
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
//                   <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
//                   Research Paper Status
//                 </h2>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                   <button
//                     onClick={() => toggleStatus("researchPaper")}
//                     className={`group relative overflow-hidden rounded-xl p-6 font-semibold transition-all duration-300 transform hover:scale-105 ${
//                       projectStatus.researchPaper.approval
//                         ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-green-200"
//                         : "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-200"
//                     }`}
//                   >
//                     <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
//                     <div className="flex items-center justify-center gap-3">
//                       {projectStatus.researchPaper.approval ? (
//                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
//                         </svg>
//                       ) : (
//                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
//                         </svg>
//                       )}
//                       Approval
//                     </div>
//                   </button>

//                   <button
//                     onClick={() => toggleStatus("researchPaper")}
//                     className={`group relative overflow-hidden rounded-xl p-6 font-semibold transition-all duration-300 transform hover:scale-105 ${
//                       projectStatus.researchPaper.communicated
//                         ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-green-200"
//                         : "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-200"
//                     }`}
//                   >
//                     <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
//                     <div className="flex items-center justify-center gap-3">
//                       {projectStatus.researchPaper.communicated ? (
//                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
//                         </svg>
//                       ) : (
//                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
//                         </svg>
//                       )}
//                       Communicated
//                     </div>
//                   </button>

//                   <button
//                     onClick={() => toggleStatus("researchPaper")}
//                     className={`group relative overflow-hidden rounded-xl p-6 font-semibold transition-all duration-300 transform hover:scale-105 ${
//                       projectStatus.researchPaper.accepted
//                         ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-green-200"
//                         : "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-200"
//                     }`}
//                   >
//                     <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
//                     <div className="flex items-center justify-center gap-3">
//                       {projectStatus.researchPaper.accepted ? (
//                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
//                         </svg>
//                       ) : (
//                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
//                         </svg>
//                       )}
//                       Accepted
//                     </div>
//                   </button>

//                   <button
//                     onClick={() => toggleStatus("researchPaper")}
//                     className={`group relative overflow-hidden rounded-xl p-6 font-semibold transition-all duration-300 transform hover:scale-105 ${
//                       projectStatus.researchPaper.payment
//                         ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-green-200"
//                         : "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-200"
//                     }`}
//                   >
//                     <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
//                     <div className="flex items-center justify-center gap-3">
//                       {projectStatus.researchPaper.payment ? (
//                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
//                         </svg>
//                       ) : (
//                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
//                         </svg>
//                       )}
//                       Payment
//                     </div>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Project Submissions Section */}
//           <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hidden">
//             <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-6">
//               <h1 className="text-2xl font-bold text-white flex items-center gap-3">
//                 <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
//                   </svg>
//                 </div>
//                 Project Submissions
//               </h1>
//             </div>
            
//             <div className="p-8">
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 {/* PPT Upload */}
//                 <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
//                   <div className="flex items-center gap-3 mb-4">
//                     <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
//                       <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
//                       </svg>
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-800">PPT Document</h3>
//                   </div>
                  
//                   {documentation[0]["ppt"] === null || documentation[0]["ppt"] === "" ? (
//                     <div className="space-y-4">
//                       <input
//                         type="file"
//                         accept=".ppt, .pptx"
//                         onChange={(e) => {
//                           setProjectPPTFile(e.target.files[0]);
//                         }}
//                         className="w-full p-3 border-2 border-dashed border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                       />
//                       <button
//                         onClick={sendPptFile}
//                         className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
//                       >
//                         Upload PPT
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => window.open(documentation[0]["ppt"], "_blank")}
//                       className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
//                     >
//                       Open PPT
//                     </button>
//                   )}
//                 </div>

//                 {/* Document Upload */}
//                 <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
//                   <div className="flex items-center gap-3 mb-4">
//                     <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
//                       <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
//                       </svg>
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-800">Project Document</h3>
//                   </div>
                  
//                   {documentation[0]["documentation"] === null || documentation[0]["documentation"] === "" ? (
//                     <div className="space-y-4">
//                       <input
//                         type="file"
//                         accept=".doc, .docx, .pdf"
//                         onChange={(e) => {
//                           setProjectDocFile(e.target.files[0]);
//                         }}
//                         className="w-full p-3 border-2 border-dashed border-green-300 rounded-lg focus:outline-none focus:border-green-500 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
//                       />
//                       <button
//                         onClick={sendDocFile}
//                         className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
//                       >
//                         Upload Document
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => window.open(documentation[0]["documentation"], "_blank")}
//                       className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
//                     >
//                       Open Document
//                     </button>
//                   )}
//                 </div>

//                 {/* Research Paper Upload */}
//                 <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
//                   <div className="flex items-center gap-3 mb-4">
//                     <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
//                       <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
//                       </svg>
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-800">Research Paper</h3>
//                   </div>
                  
//                   {documentation[0]["researchPaper"] === null || documentation[0]["researchPaper"] === "" ? (
//                     <div className="space-y-4">
//                       <input
//                         type="file"
//                         accept=".pdf"
//                         onChange={(e) => {
//                           setResearchPaperFile(e.target.files[0]);
//                         }}
//                         className="w-full p-3 border-2 border-dashed border-purple-300 rounded-lg focus:outline-none focus:border-purple-500 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
//                       />
//                       <button
//                         onClick={sendRspaperFile}
//                         className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
//                       >
//                         Upload Research Paper
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => window.open(documentation[0]["researchPaper"], "_blank")}
//                       className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
//                     >
//                       Open Research Paper
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//           </> )