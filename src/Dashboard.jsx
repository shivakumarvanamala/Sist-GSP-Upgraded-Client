// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import sist_logo_login from "./assets/sist_logo_login.png";
// import log_out from "./assets/svgs/log_out.svg";
// import LoadingScreen from "./shared/Loader";
// import Alert from "./shared/Alert";
// import { TfiHelpAlt } from "react-icons/tfi";
// import lock from "./assets/svgs/lock.svg";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const userEmail = localStorage.getItem("userEmail");
//   const teamId = localStorage.getItem("teamId");

//   const [guideComments, setGuideComments] = useState([]);
//   const [guideComments2, setGuideComments2] = useState([]);

//   const SERVERPATH = import.meta.env.VITE_SERVERPATH;

//   const [isLoading, setIsLoading] = useState(false);
//   const [alert, setAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState();
//   const [alertType, setAlertType] = useState();
//   const [StudentData, setStudentData] = useState([
//     {
//       name: null,
//       team: null,
//       regNo: null,
//       phoneNo: null,
//       section: null,
//       p2name: null,
//       p2regNo: null,
//       p2phoneNo: null,
//       p2section: null,
//       editProjectDetails: null,
//       selectedGuide: null,
//       selectedGuideMailId: null,
//       teamId: null,
//     },
//   ]);
//   const [studentImg1, setStudentImg1] = useState(
//     "https://drive.google.com/uc?id=1XQIbsTt0GuT2PIqXFSmQXYux0Jcb543i"
//   );
//   const [studentImg2, setStudentImg2] = useState(
//     "https://drive.google.com/uc?id=1XQIbsTt0GuT2PIqXFSmQXYux0Jcb543i"
//   );
//   const [problemStatements, setProblemStatements] = useState([]);
//   const [projectDetails, setProjectDetails] = useState([
//     {
//       projectTitle: null,
//       projectDesc: null,
//       projectDomain: null,
//       projectType: null,
//     },
//   ]);
//   const [isEditable, setIsEditable] = useState(false);
//   const [editedProjectDetails, setEditedProjectDetails] = useState({
//     projectTitle: projectDetails[0]["projectTitle"],
//     projectDomain: projectDetails[0]["projectDomain"],
//     projectDesc: projectDetails[0]["projectDesc"]
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [editProjectDetails, setEditProjectDetails] = useState();
//   const toggleEdit = () => {
//     // Clear editedProjectDetails when entering edit mode
//     if (!isEditable) {
//       setEditedProjectDetails({
//         projectTitle: projectDetails[0]["projectTitle"],
//         projectDomain: projectDetails[0]["projectDomain"],
//         projectDesc: projectDetails[0]["projectDesc"],
//         projectType: null,
//       });
//     }
//     setIsEditable(!isEditable);
//   };
//   const handleInputChange = (e) => {
//     setShowMsg(true);
//     const { name, value } = e.target;
//     setEditedProjectDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };
//   const handleUpdateProjectDetails = async () => {
//     try {
//       if (
//         !editedProjectDetails.projectTitle ||
//         !editedProjectDetails.projectDomain ||
//         !editedProjectDetails.projectDesc
//       ) {
//         setAlert(true);
//         // setAlertMessage("Select Your Project Category");
//         setAlertType("fail");
//         alertDelay();
//         return;
//       } else {
//         setIsSubmitting(true);

//         const updatedData = {
//           projectTitle: editedProjectDetails.projectTitle,
//           projectDesc: editedProjectDetails.projectDesc,
//           projectDomain: editedProjectDetails.projectDomain
//         };

//         const data = {
//           updatedData: updatedData,
//           student: "p1",
//           teamId: teamId,
//         };

//         setIsLoading(true);
//         const response = await axios.post(
//           `${SERVERPATH}/studentLogin/updateProjectDetails/${userEmail}`,
//           data
//         );
//         setIsLoading(false);
//         if (response.data.message === "Success") {
//           setAlert(true);
//           setAlertMessage("Project Details Updated Successfully!");
//           setAlertType("success");
//         } else {
//           setAlert(true);
//           setAlertMessage("Failed to Update Project Details!");
//           setAlertType("fail");
//         }
//         alertDelay();
//         setEditProjectDetails(false);
//         setIsEditable(false);
//       }
//     } catch (error) {
//     } finally {
//       setIsSubmitting(false);
//     }
//   };


//   const [guideImg, setGuideImg] = useState("");

//   function getDirectLinkFromShareableLink(shareableLink) {
//     try {
//       const fileIdMatch = shareableLink.match(/\/uc\?id=(.*?)(&|$)/);
//       if (fileIdMatch && fileIdMatch[1]) {
//         const fileId = fileIdMatch[1];
//         return `https://drive.google.com/thumbnail?id=${fileId}`;
//       } else {
//         throw new Error("Invalid shareable link format");
//       }
//     } catch (error) {
//       // console.error("Error processing shareable link:", error.message);
//       return null;
//     }
//   }

//   function getDirectLinkFromShareableLinkStudent(shareableLink) {
//     try {
//       const fileIdMatch = shareableLink.match(/\/file\/d\/(.*?)\//);
//       if (fileIdMatch && fileIdMatch[1]) {
//         const fileId = fileIdMatch[1];
//         return `https://drive.google.com/thumbnail?id=${fileId}`;
//       } else {
//         throw new Error("Invalid shareable link format");
//       }
//     } catch (error) {
//       // console.error("Error processing shareable link:", error.message);
//       return null;
//     }
//   }

//   const [guideMailId, setGuideMailId] = useState("");

//   // UseEffect to decode JWT token (if applicable)
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const userEmail = localStorage.getItem("userEmail");
//     const teamId = localStorage.getItem("teamId");

//     if (token) {
//       const headers = {
//         Authorization: `${token}`,
//       };
//       const func = async () => {
//         setIsLoading(true);
//         const response = await axios.get(
//           SERVERPATH + "/checkAuthentication/" + userEmail,
//           { headers }
//         );
//         setIsLoading(false);
//         if (response.data.message == "Authenticated") {
//         } else {
//           localStorage.removeItem("token");
//           localStorage.removeItem("userEmail");
//           localStorage.removeItem("teamId");

//           navigate("/login");
//         }
//       };
//       func();
//     } else {
//       localStorage.removeItem("token");
//       localStorage.removeItem("userEmail");
//       localStorage.removeItem("teamId");

//       navigate("/login");
//     }
//   }, []);

//   // UseEffect to fetch the user's name from the server
//   useEffect(() => {
//     const fetchUserName = async () => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         try {
//           setIsLoading(true);
//           const teamId = localStorage.getItem("teamId");

//           const response = await axios.post(
//             `${SERVERPATH}/studentLogin/getStudentData/${teamId}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           setIsLoading(false);
//           setStudentData(response.data.studentData);
//           setProblemStatements(response.data.problemStatements);
//           setEditProjectDetails(
//             response.data.studentData[0].editProjectDetails
//           );


//           setProjectDetails(response.data.projectDetails);
//           setEditedProjectDetails({
//             projectDesc: projectDetails[0]["projectDesc"],
//             projectDomain: projectDetails[0]["projectDomain"],
//             projectTitle: projectDetails[0]["projectTitle"],
//           });
//           setProjectStatus(response.data.projectStatus[0]);
//           setDocumentation(response.data.documentation);
//           setGuideImg(response.data.guideImage);
//           setGuideComments(response.data.comments);
//           setGuideComments2(response.data.comments2);

//           setStudentImg1(response.data.studentImage1);
//           setStudentImg2(response.data.studentImage2);
//         } catch (error) {
//           // console.error("Error fetching user details:", error);
//         }
//       } else {
//         // Redirect to login if no token is found
//         navigate("/login");
//       }
//     };

//     fetchUserName();
//   }, [alertMessage]);

//   const [isDropdownOpen, setDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setDropdownOpen(!isDropdownOpen);
//   };

//   const handleHelp = () => {
//     // Redirect to the help page or perform other help-related actions
//     window.open(
//       "https://mail.google.com/mail/?view=cm&fs=1&to=guideselection.cse@sathyabama.ac.in"
//     );
//   };
//   const studentLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("teamId");
//     navigate("/login");
//   };


//   const alertDelay = () => {
//     setTimeout(() => {
//       setAlert(false);
//       setAlertMessage("");
//     }, 3000); // 3000 milliseconds = 3 seconds
//   };

//   const [showMsg, setShowMsg] = useState(false);

//   return (
//     <>
//       <div
//         className={`flex items-center justify-center ${alert ? "" : "hidden"} `}
//       >
//         <Alert type={alertType} message={alertMessage} />
//       </div>
//       <div className="">
//         {isLoading && <LoadingScreen />}
//         <nav className="bg-[#9e1c3f] text-white p-4">
//           <div className="container mx-auto flex justify-between items-center">
//             <div className="flex items-center">
//               <a href="/">
//                 <img
//                   src={sist_logo_login}
//                   alt="Logo"
//                   className="h-12 w-auto float-start"
//                 />
//               </a>
//             </div>
//             <div className="flex items-center relative">
//               <div className="mr-4">Welcome, {StudentData[0]["teamId"]}</div>
//               <button
//                 onClick={toggleDropdown}
//                 className="text-sm font-semibold rounded text-white focus:outline-none"
//               >
//                 &#9660; {/* Down arrow */}
//               </button>
//               {isDropdownOpen && (
//                 <div className="absolute top-10 right-0 bg-white text-gray-800 p-2 rounded shadow-md z-10">
//                   <div className="flex flex-row justify-center space-x-2 items-center hover:bg-gray-200">
//                     <TfiHelpAlt height={4} width={4} />
//                     <button onClick={handleHelp} className="block p-2 ">
//                       Help
//                     </button>
//                   </div>
//                   <div className="w-full flex items-center justify-center h-2/5 hover:bg-slate-200">
//                     <a
//                       href={`/dashboard/student_Password_change`}
//                       className="w-full flex justify-start items-center gap-1 p-2"
//                     >
//                       <img className="h-4 w-4" src={lock} alt="Lock" />
//                       Change Password
//                     </a>
//                   </div>
//                   <div className="flex flex-row justify-center items-center hover:bg-gray-200">
//                     <img className="h-4 w-4" src={log_out} alt="LogOut" />
//                     <button onClick={studentLogout} className="block p-2 ">
//                       Logout
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </nav>

//         <div className="flex items-center justify-center">
//           <div className="container mx-auto p-4 flex flex-wrap gap-4 w-fit items-center justify-center">
//             {/* First Card - Student 1 */}
//             <div className="bg-white rounded-xl shadow-xl mb-4 overflow-hidden min-w-96 min-h-80">
//               <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
//                 <h1 className="text-2xl font-bold text-center">Student 1</h1>
//               </div>
//               <img
//                 src={getDirectLinkFromShareableLinkStudent(studentImg1)}
//                 alt="Profile"
//                 className="w-32 h-32 rounded-full mx-auto mb-4"
//               />
//               <div className="p-4">
//                 <p className="text-lg font-semibold text-gray-700">
//                   Name: {StudentData[0]["name"]}
//                 </p>
//                 <p className="text-lg text-gray-600">
//                   Reg No: {StudentData[0]["regNo"]}
//                 </p>
//                 <p className="text-lg text-gray-600 ">
//                   Section: {StudentData[0]["section"]}
//                 </p>
//               </div>
//             </div>

//             {/* Second Card - Student 2 (if exists) */}
//             {StudentData[0]["p2name"] && (
//               <div className="bg-white rounded-xl shadow-xl mb-4 overflow-hidden min-w-96 min-h-80">
//                 <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
//                   <h1 className="text-2xl font-bold text-center">Student 2</h1>
//                 </div>
//                 <img
//                   src={getDirectLinkFromShareableLinkStudent(studentImg2) || "/student_fallback_image.jpeg"}
//                   alt="Profile"
//                   className="w-32 h-32 rounded-full mx-auto mb-4"
//                 />
//                 <div className="p-4">
//                   <p className="text-lg font-semibold text-gray-700">
//                     Name: {StudentData[0]["p2name"]}
//                   </p>
//                   <p className="text-lg text-gray-600">
//                     Reg No: {StudentData[0]["p2regNo"]}
//                   </p>
//                   <p className="text-lg text-gray-600">
//                     Section: {StudentData[0]["p2section"]}
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Third Card - Guide */}
//             <div className="group">
//               <div className=" h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
//                 <div className="inset-0">
//                   <div className="bg-white rounded-xl shadow-xl mb-4 overflow-hidden min-w-96 min-h-80">
//                     <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
//                       <h1 className="text-2xl font-bold text-center">
//                         Guide Details
//                       </h1>
//                     </div>
//                     <img
//                       src={getDirectLinkFromShareableLink(guideImg) || "/faculty_fallback_image.jpeg"}
//                       alt="Profile"
//                       className="w-32 h-32 rounded-full mx-auto mb-4"
//                     />
//                     <div className="p-4">
//                       <p className="text-lg text-gray-600 text-center">
//                         Name: {StudentData[0]["selectedGuide"]}
//                       </p>
//                       <p className="text-lg text-gray-600 text-center">
//                         Email: {StudentData[0]["selectedGuideMailId"]}
//                       </p>
//                       <a className="underline mt-2 text-sm text-blue-600 ">
//                         View Problem Statements
//                       </a>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="absolute inset-0 rounded-xl bg-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
//                   <div className="bg-white rounded-xl shadow-xl mb-4 overflow-hidden min-w-96 min-h-80 ">
//                     <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
//                       <h1 className="text-2xl font-bold text-center">
//                         Problem Statements
//                       </h1>
//                     </div>
//                     <div className="px-4 overflow-y-scroll max-h-64">
//                       <div className=" min-h-12 h-auto md:px-8 my-4 w-full ">
//                         {problemStatements.length > 0 ? (
//                           problemStatements.map((item, index) => {
//                             return (
//                               <p className="p-2 font-semibold capitalize">
//                                 {parseInt(index) + 1} . {item}
//                               </p>
//                             );
//                           })
//                         ) : (
//                           <p className="p-2 text-3xl capitalize font-bold">
//                             No Problem Statements To Show!
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mx-4 bg-white rounded-xl shadow-xl mb-4 overflow-hidden">
//           <h1 className="bg-[#9e1c3f] text-white p-4 rounded-t-xl mb-4 font-semibold">
//             Project Details
//           </h1>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mx-2">
//             {/* Title */}
//             <div>
//               <label className="block text-lg font-semibold text-gray-700 mb-2">
//                 Title:
//               </label>
//               <input
//                 type="text"
//                 name="projectTitle"
//                 value={
//                   isEditable
//                     ? editedProjectDetails.projectTitle
//                     : projectDetails[0]["projectTitle"]
//                 }
//                 content={projectDetails[0]["projectTitle"]}
//                 contentEditable
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
//                 style={{ backgroundColor: "#f0f0f0", color: "#333" }}
//                 readOnly={!isEditable}
//                 onClick={() => {
//                   setShowMsg(true);
//                 }}
//                 title={`${editProjectDetails || showMsg
//                   ? "Click on Edit button below"
//                   : ""
//                   }`}
//               />
//             </div>

//             {/* Domain */}
//             <div>
//               <label className="block text-lg font-semibold text-gray-700 mb-2">
//                 Domain:
//               </label>
//               <input
//                 type="text"
//                 name="projectDomain"
//                 value={
//                   isEditable
//                     ? editedProjectDetails.projectDomain
//                     : projectDetails[0]["projectDomain"]
//                 }
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
//                 style={{ backgroundColor: "#f0f0f0", color: "#333" }}
//                 readOnly={!isEditable}
//               />
//             </div>
//           </div>

//           {/* Description */}
//           <div className="py-4 mx-2">
//             <label className="block text-lg font-semibold text-gray-700">
//               Description:
//             </label>
//             <textarea
//               name="projectDesc"
//               value={
//                 isEditable
//                   ? editedProjectDetails.projectDesc
//                   : projectDetails[0]["projectDesc"]
//               }
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 h-36"
//               style={{ backgroundColor: "#f0f0f0", color: "#333" }}
//               readOnly={!isEditable}
//             />
//           </div>
//           <br></br>

//           {editProjectDetails ? (
//             <div className="flex justify-center space-x-4 mb-4">
//               <button
//                 onClick={toggleEdit}
//                 className="bg-blue-500 text-white px-4  py-3 rounded focus:outline-none"
//               >
//                 {isEditable ? "Cancel" : "Edit"}
//               </button>
//               {isEditable && !isSubmitting && (
//                 <button
//                   onClick={handleUpdateProjectDetails}
//                   className="bg-blue-500 text-white p-2 rounded focus:outline-none"
//                 >
//                   Submit
//                 </button>
//               )}
//             </div>
//           ) : (
//             <p></p>
//           )}
//         </div>


//         <div className="mx-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="bg-white rounded-xl shadow-xl mb-4">
//               <h1 className="bg-[#9e1c3f] text-white p-4 rounded-t-xl mb-4 font-semibold">
//                 Guide Feedback on {StudentData[0]["regNo"]} Project:
//               </h1>
//               <div className="overflow-auto m-2 max-h-60">
//                 {/* Adjust max height as needed */}
//                 {guideComments[0] ? (
//                   guideComments.map((comment, index) => {
//                     const date = Object.keys(comment)[0];
//                     const text = comment[date];
//                     return (
//                       <div className="bg-gray-200 p-3 rounded mb-2" key={index}>
//                         <p className="text-sm text-gray-600">Date: {date}</p>
//                         <p className="text-base text-gray-800">Comment: {text}</p>
//                       </div>
//                     );
//                   })
//                 ) : (
//                   <p className="p-4 flex justify-center">No comments yet</p>
//                 )}
//               </div>
//             </div>

//             {StudentData[0]["p2name"] && (
//               <div className="bg-white rounded-xl shadow-xl mb-4">
//                 <h1 className="bg-[#9e1c3f] text-white p-4 rounded-t-xl mb-4 font-semibold">
//                   Guide Feedback on {StudentData[0]["p2regNo"]} Project:

//                 </h1>
//                 <div className="overflow-auto m-2 max-h-60">
//                   {/* Adjust max height as needed */}
//                   {guideComments2[0] ? (
//                     guideComments2.map((comment, index) => {
//                       const date = Object.keys(comment)[0];
//                       const text = comment[date];
//                       return (
//                         <div className="bg-gray-200 p-3 rounded mb-2" key={index}>
//                           <p className="text-sm text-gray-600">Date: {date}</p>
//                           <p className="text-base text-gray-800">Comment: {text}</p>
//                         </div>
//                       );
//                     })
//                   ) : (
//                     <p className="p-4 flex justify-center">No comments yet</p>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//       </div>
//     </>
//   );
// };

// export default Dashboard;



import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import sist_logo_login from "./assets/sist_logo_login.png";
import log_out from "./assets/svgs/log_out.svg";
import LoadingScreen from "./shared/Loader";
import Alert from "./shared/Alert";
import { TfiHelpAlt } from "react-icons/tfi";
import lock from "./assets/svgs/lock.svg";
import student_fallback_image from "./assets/student_fallback_image.jpg"

const Dashboard = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const teamId = localStorage.getItem("teamId");

  const [guideComments, setGuideComments] = useState([]);
  const [guideComments2, setGuideComments2] = useState([]);

  const SERVERPATH = import.meta.env.VITE_SERVERPATH;

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);
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
  const [studentImg1, setStudentImg1] = useState(
    "https://drive.google.com/uc?id=1XQIbsTt0GuT2PIqXFSmQXYux0Jcb543i"
  );
  const [studentImg2, setStudentImg2] = useState(
    "https://drive.google.com/uc?id=1XQIbsTt0GuT2PIqXFSmQXYux0Jcb543i"
  );
  const [problemStatements, setProblemStatements] = useState([]);
  const [projectDetails, setProjectDetails] = useState([
    {
      projectTitle: null,
      projectDesc: null,
      projectDomain: null,
      projectType: null,
    },
  ]);
  const [isEditable, setIsEditable] = useState(false);
  const [editedProjectDetails, setEditedProjectDetails] = useState({
    projectTitle: projectDetails[0]["projectTitle"],
    projectDomain: projectDetails[0]["projectDomain"],
    projectDesc: projectDetails[0]["projectDesc"]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editProjectDetails, setEditProjectDetails] = useState();
  const [projectStatus, setProjectStatus] = useState();
  const [documentation, setDocumentation] = useState();

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
    setShowMsg(true);
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
        !editedProjectDetails.projectDesc
      ) {
        setAlert(true);
        // setAlertMessage("Select Your Project Category");
        setAlertType("fail");
        alertDelay();
        return;
      } else {
        setIsSubmitting(true);

        const updatedData = {
          projectTitle: editedProjectDetails.projectTitle,
          projectDesc: editedProjectDetails.projectDesc,
          projectDomain: editedProjectDetails.projectDomain
        };

        const data = {
          updatedData: updatedData,
          student: "p1",
          teamId: teamId,
        };

        setIsLoading(true);
        const response = await axios.post(
          `${SERVERPATH}/studentLogin/updateProjectDetails/${userEmail}`,
          data
        );
        setIsLoading(false);
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
        setEditProjectDetails(false);
        setIsEditable(false);
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const [guideImg, setGuideImg] = useState("");

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
    const teamId = localStorage.getItem("teamId");

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
          setIsLoading(true);
          const teamId = localStorage.getItem("teamId");

          const response = await axios.post(
            `${SERVERPATH}/studentLogin/getStudentData/${teamId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setIsLoading(false);
          setStudentData(response.data.studentData);
          setProblemStatements(response.data.problemStatements);
          setEditProjectDetails(
            response.data.studentData[0].editProjectDetails
          );


          setProjectDetails(response.data.projectDetails);
          setEditedProjectDetails({
            projectDesc: projectDetails[0]["projectDesc"],
            projectDomain: projectDetails[0]["projectDomain"],
            projectTitle: projectDetails[0]["projectTitle"],
          });
          setProjectStatus(response.data.projectStatus[0]);
          setDocumentation(response.data.documentation);
          setGuideImg(response.data.guideImage);
          setGuideComments(response.data.comments);
          setGuideComments2(response.data.comments2);

          setStudentImg1(response.data.studentImage1);
          setStudentImg2(response.data.studentImage2);
        } catch (error) {
          // console.error("Error fetching user details:", error);
        }
      } else {
        // Redirect to login if no token is found
        navigate("/login");
      }
    };

    fetchUserName();
  }, [alertMessage]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

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
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("teamId");
    navigate("/login");
  };

  const alertDelay = () => {
    setTimeout(() => {
      setAlert(false);
      setAlertMessage("");
    }, 3000); // 3000 milliseconds = 3 seconds
  };

  const [showMsg, setShowMsg] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Alert */}
      {alert && (
        <div className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${alert ? "translate-x-0" : "translate-x-full"}`}>
          <Alert type={alertType} message={alert} />
        </div>
      )}

      {/* Loading Screen */}
      {isLoading && <LoadingScreen />}

      {/* Enhanced Navigation */}
      <nav className="bg-gradient-to-r from-[#9e1c3f] to-[#b91c3c] shadow-2xl border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <a href="/" className="group">
                <img
                  src={sist_logo_login}
                  alt="Logo"
                  className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
                />
              </a>
              {/* <div className="hidden md:block">
                <h1 className="text-2xl font-bold text-white">Student Dashboard</h1>
              </div> */}
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-white font-medium">
                Welcome, <span className="font-bold text-rose-200">{StudentData[0]["teamId"]}</span>
              </div>
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm"
                >
                  <span>Menu</span>
                  <svg className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                    <div className="p-2">
                      <button
                        onClick={handleHelp}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-xl transition-all duration-200"
                      >
                        <TfiHelpAlt className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">Help & Support</span>
                      </button>
                      <a
                        href="/dashboard/student_Password_change"
                        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-amber-50 rounded-xl transition-all duration-200"
                      >
                        <img className="w-5 h-5" src={lock} alt="Lock" />
                        <span className="font-medium">Change Password</span>
                      </a>
                      <button
                        onClick={studentLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 rounded-xl transition-all duration-200"
                      >
                        <img className="w-5 h-5" src={log_out} alt="Logout" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Student Cards Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Team Members
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {/* Student 1 Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-3xl w-80 h-96">
                <div className="bg-[#9e1c3f] text-white py-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
                  <h3 className="text-2xl font-bold text-center relative z-10">Student 1</h3>
                </div>

                <div className="p-6 text-center">
                  <div className="relative inline-block mb-6">
                    <div className="absolute -inset-2 rounded-full"></div>
                    <img
                      // src={getDirectLinkFromShareableLinkStudent(studentImg1) || "/student_fallback_image.jpeg"}
                      // src="/student_fallback_image.jpeg"
                      src={student_fallback_image}
                      alt="Profile"
                      className="relative w-24 h-24 rounded-full mx-auto shadow-lg object-cover"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-sm text-gray-500 font-medium">Name</p>
                      <p className="text-lg font-bold text-gray-800">{StudentData[0]["name"]}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-sm text-gray-500 font-medium">Registration No</p>
                      <p className="text-lg font-bold text-gray-800">{StudentData[0]["regNo"]}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-sm text-gray-500 font-medium">Section</p>
                      <p className="text-lg font-bold text-gray-800">{StudentData[0]["section"]}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Student 2 Card */}
            {StudentData[0]["p2name"] && (
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-3xl w-80 h-96">
                  <div className="bg-[#9e1c3f] text-white py-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
                    <h3 className="text-2xl font-bold text-center relative z-10">Student 2</h3>
                  </div>

                  <div className="p-6 text-center">
                    <div className="relative inline-block mb-6">
                      <div className="absolute rounded-full"></div>
                      <img
                        // src={getDirectLinkFromShareableLinkStudent(studentImg2) || "/student_fallback_image.jpeg"}
                        // src="/student_fallback_image.jpeg"
                        src={student_fallback_image}
                        alt="Profile"
                        className="relative w-24 h-24 rounded-full mx-auto shadow-lg object-cover"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-sm text-gray-500 font-medium">Name</p>
                        <p className="text-lg font-bold text-gray-800">{StudentData[0]["p2name"]}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-sm text-gray-500 font-medium">Registration No</p>
                        <p className="text-lg font-bold text-gray-800">{StudentData[0]["p2regNo"]}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-sm text-gray-500 font-medium">Section</p>
                        <p className="text-lg font-bold text-gray-800">{StudentData[0]["p2section"]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Guide Card with Flip Animation */}
            <div className="group relative perspective-1000">
              <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-80 h-96 transform-style-preserve-3d transition-transform duration-700 group-hover:rotate-y-180">
                {/* Front of card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="bg-white rounded-3xl shadow-2xl overflow-hidden h-full">
                    <div className="bg-[#9e1c3f] text-white py-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
                      <h3 className="text-2xl font-bold text-center relative z-10">Guide Details</h3>
                    </div>

                    <div className="p-6 text-center">
                      <div className="relative inline-block mb-6">
                        <div className="absolute -inset-2 rounded-full"></div>
                        <img
                          src={getDirectLinkFromShareableLink(guideImg) || "/faculty_fallback_image.jpeg"}
                          alt="Profile"
                          className="relative w-24 h-24 rounded-full mx-auto shadow-lg object-cover"
                        />
                      </div>

                      <div className="space-y-3">
                        <div className="bg-gray-50 rounded-xl p-3">
                          <p className="text-sm text-gray-500 font-medium">Name</p>
                          <p className="text-lg font-bold text-gray-800">{StudentData[0]["selectedGuide"]}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3">
                          <p className="text-sm text-gray-500 font-medium">Email</p>
                          <p className="text-sm font-bold text-gray-800 break-all">{StudentData[0]["selectedGuideMailId"]}</p>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-blue-600 font-medium">Hover to view problem statements</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 backface-hidden rotate-y-180">
                  <div className="bg-white rounded-3xl shadow-2xl overflow-hidden h-full">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
                      <h3 className="text-2xl font-bold text-center relative z-10">Problem Statements</h3>
                    </div>

                    <div className="p-4 h-80 overflow-y-auto">
                      {problemStatements.length > 0 ? (
                        <div className="space-y-3">
                          {problemStatements.map((item, index) => (
                            <div key={index} className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border-l-4 border-purple-500">
                              <div className="flex items-start space-x-3">
                                <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                                  {index + 1}
                                </div>
                                <p className="text-gray-800 font-medium leading-relaxed">{item}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <div className="text-6xl mb-4">📋</div>
                            <p className="text-xl font-bold text-gray-600">No Problem Statements</p>
                            <p className="text-gray-500">Available to show</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Details Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Project Details
          </h2>
          <div className="group relative max-w-6xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-[#9e1c3f] text-white py-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                <h3 className="text-2xl font-bold text-center relative z-10">Project Information</h3>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <label className="block text-lg font-bold text-gray-700">
                      Project Title
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="projectTitle"
                        value={isEditable ? editedProjectDetails.projectTitle : projectDetails[0]["projectTitle"]}
                        onChange={handleInputChange}
                        className={`w-full p-4 rounded-2xl border-2 `}
                        readOnly={!isEditable}
                        onClick={() => setShowMsg(true)}
                        title={`${editProjectDetails || showMsg ? "Click on Edit button below" : ""}`}
                      />
                    </div>
                  </div>

                  {/* Domain */}
                  <div className="space-y-2">
                    <label className="block text-lg font-bold text-gray-700">
                      Project Domain
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="projectDomain"
                        value={isEditable ? editedProjectDetails.projectDomain : projectDetails[0]["projectDomain"]}
                        onChange={handleInputChange}
                        className={`w-full p-4 rounded-2xl border-2`}
                        readOnly={!isEditable}
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2 mb-8">
                  <label className="block text-lg font-bold text-gray-700">
                    Project Description
                  </label>
                  <textarea
                    name="projectDesc"
                    value={isEditable ? editedProjectDetails.projectDesc : projectDetails[0]["projectDesc"]}
                    onChange={handleInputChange}
                    className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 h-32 resize-none focus:outline-none`}
                    readOnly={!isEditable}
                  />
                </div>

                {/* Action Buttons */}
                {editProjectDetails && (
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={toggleEdit}
                      className={`px-8 py-3 rounded-2xl font-bold text-white transition-all duration-300 transform hover:scale-105 ${isEditable
                        ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl"
                        : "bg-[#9e1c3f] hover:bg-gradient-to-r hover:from-rose-600 hover:to-pink-600 shadow-lg hover:shadow-xl"
                        }`}
                    >
                      {isEditable ? "Cancel" : "Edit Project"}
                    </button>
                    {isEditable && !isSubmitting && (
                      <button
                        onClick={handleUpdateProjectDetails}
                        className="px-8 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        Save Changes
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Guide Feedback
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Student 1 Feedback */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden h-96">
                <div className="bg-[#9e1c3f] text-white py-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
                  <h3 className="text-xl font-bold text-center relative z-10">
                    Feedback for {StudentData[0]["regNo"]}
                  </h3>
                </div>

                <div className="p-6 h-80 overflow-y-auto">
                  {guideComments[0] ? (
                    <div className="space-y-4">
                      {guideComments.map((comment, index) => {
                        const date = Object.keys(comment)[0];
                        const text = comment[date];
                        return (
                          <div key={index} className="bg-gradient-to-r from-rose-500 to-pink-500 p-4 rounded-xl border-l-4  transform transition-all duration-300 hover:scale-105">
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="w-3 h-3 rounded-full"></div>
                              <p className="text-sm font-bold text-orange-600">{date}</p>
                            </div>
                            <p className="text-gray-800 leading-relaxed">{text}</p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="text-6xl mb-4">💬</div>
                        <p className="text-xl font-bold text-gray-600">No Feedback Yet</p>
                        <p className="text-gray-500">Your guide will provide feedback here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Student 2 Feedback */}
            {StudentData[0]["p2name"] && (
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden h-96">
                  <div className="bg-[#9e1c3f] text-white py-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
                    <h3 className="text-xl font-bold text-center relative z-10">
                      Feedback for {StudentData[0]["p2regNo"]}
                    </h3>
                  </div>

                  <div className="p-6 h-80 overflow-y-auto">
                    {guideComments2[0] ? (
                      <div className="space-y-4">
                        {guideComments2.map((comment, index) => {
                          const date = Object.keys(comment)[0];
                          const text = comment[date];
                          return (
                            <div key={index} className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-xl border-l-4 border-teal-500 transform transition-all duration-300 hover:scale-105">
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                                <p className="text-sm font-bold text-teal-600">{date}</p>
                              </div>
                              <p className="text-gray-800 leading-relaxed">{text}</p>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="text-6xl mb-4">💬</div>
                          <p className="text-xl font-bold text-gray-600">No Feedback Yet</p>
                          <p className="text-gray-500">Your guide will provide feedback here</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom CSS for 3D effects */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .animate-in {
          animation: slideIn 0.2s ease-out;
        }
        .slide-in-from-top-2 {
          transform: translateY(-8px);
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;