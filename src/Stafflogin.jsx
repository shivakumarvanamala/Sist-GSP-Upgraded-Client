import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

import Footer from "./shared/Footer";
import LoginNavBar from "./LoginNavBar";
import LoadingScreen from "./shared/Loader";

const StaffLogin = () => {
  const SERVERPATH = import.meta.env.VITE_SERVERPATH;

  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [Error1, setError1] = useState();

  const alertDelay = () => {
    setTimeout(() => {
      setError1("");
    }, 3000); // 3000 milliseconds = 3 seconds
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("userEmail");

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
          localStorage.removeItem("userEmail");
          navigate("/staff_login");
        }
      };
      func();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      // navigate("/login");
    }
  }, [location]);

  const handleStaffLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // console.log(formData)

      const response = await axios.post(
        `${SERVERPATH}/staffLogin/check/${formData.email}/password`,
        { passcode: formData["password"] }
      );
      setIsLoading(false);
      // console.log(response.data)

      if (response.data.is_account_available === "true") {
        setIsLoading(false);
        if (response.data.Is_Password_Correct === "true") {
          const token = response.data.token;
          localStorage.setItem("token", token);
          localStorage.setItem("guideMailId", formData.email);
          navigate("/staff_dashboard");
        } else {
          // alert("Password is not correct");
          setError1("Incorrect Password!");
          alertDelay();
        }
      } else {
        // alert("Enter a valid user account");
        setError1("Enter a valid user details!");
        alertDelay();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <LoginNavBar />

      <div className="login_bg px-10 xs:px-10">
        <div className="lg:w-1/4 md:w-2/4 s:w-2/4 xs:w-3/4 border p-4 bg-white bg-opacity-40 backdrop-filter rounded-lg shadow-lg">
          <div >
            <div className=" flex justify-center">
              <h1 className="p-4 font-semibold text-2xl">FACULTY LOGIN</h1>
            </div>
            <div className="justify-center">
              <form onSubmit={handleStaffLogin}>
                <input
                  className="border-2 border-solid border-black rounded-lg px-2 h-12 my-4 w-full"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <input
                  className="border-2 border-solid border-black rounded-lg h-12 px-2 my-4 w-full"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <div className=" flex flex-col justify-center">
                  <button
                    className={
                      "bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg"
                    }
                    type="submit"
                  >
                    Submit
                  </button>
                  <div className="flex justify-around pb-2">
                    {Error1 && (
                      <p
                        style={{ color: "black" }}
                        className="font-bold text-lg"
                      >
                        {Error1}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StaffLogin;










// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import Footer from "./shared/Footer";
// import LoginNavBar from "./LoginNavBar";
// import jwtDecode from "jwt-decode";
// import LoadingScreen from "./shared/Loader";

// const StaffLogin = () => {
//   const SERVERPATH = import.meta.env.VITE_SERVERPATH;

//   const navigate = useNavigate();
//   const location = useLocation();

//   const [formData, setFormData] = useState({ email: "", password: "" });
//   // const [verifyOTP, setVerifyOTP] = useState(false);
//   // const [receivedOTP, setReceivedOTP] = useState(0);
//   // const [userOTP, setUserOTP] = useState(0);
//   // const [usertoken, setUsertoken] = useState("");
//   // const [openNewPasswordContainer, setOpenNewPasswordContainer] =
//   //   useState(false);
//   // const [newPassword, setNewPassword] = useState("");
//   // const [newConfirmPassword, setNewConfirmPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [openLogin, setOpenLogin] = useState(true);
//   const [Error1, setError1] = useState();

//   const alertDelay = () => {
//     setTimeout(() => {
//       setError1("");
//     }, 3000); // 3000 milliseconds = 3 seconds
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const userEmail = localStorage.getItem("userEmail");

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
//           // navigate("/dashboard");
//         } else {
//           localStorage.removeItem("token");
//           localStorage.removeItem("userEmail");
//           navigate("/staff_login");
//         }
//       };
//       func();
//     } else {
//       localStorage.removeItem("token");
//       localStorage.removeItem("userEmail");
//       // navigate("/login");
//     }
//   }, [location]);

//   const handleStaffLogin = async (e) => {
//     e.preventDefault();
//     try {
//       setIsLoading(true);

//       const response = await axios.post(
//         `${SERVERPATH}/staffLogin/check/${formData.email}/password`,
//         { passcode: formData["password"] }
//       );
//       setIsLoading(false);

//       if (response.data.is_account_available === "true") {
//         setIsLoading(false);
//         if (response.data.Is_Password_Correct === "true") {
//           const token = response.data.token;
//           localStorage.setItem("token", token);
//           localStorage.setItem("guideMailId", formData.email);
//           navigate("/staff_dashboard");
//         } else {
//           // alert("Password is not correct");
//           setError1("Incorrect Password!");
//           alertDelay();
//         }
//       } else {
//         // alert("Enter a valid user account");
//         setError1("Enter a valid user details!");
//         alertDelay();
//       }
//     } catch (error) {
//       console.warn(error);
//     }
//   };

//   return (
//     <>
//       {isLoading && <LoadingScreen />}
//       <LoginNavBar />

//       <div className="login_bg px-10 xs:px-10">
//         <div className="lg:w-1/4 md:w-2/4 s:w-2/4 xs:w-3/4 border p-4 bg-white bg-opacity-40 backdrop-filter rounded-lg shadow-lg">
//           <div className={openLogin ? "block" : "hidden"}>
//             <div className={openLogin ? " flex justify-center" : "hidden"}>
//               <h1 className="p-4 font-semibold text-2xl">FACULTY LOGIN</h1>
//             </div>
//             <div className="justify-center">
//               <form onSubmit={handleStaffLogin}>
//                 <input
//                   className="border-2 border-solid border-black rounded-lg px-2 h-12 my-4 w-full"
//                   type="email"
//                   placeholder="Email"
//                   value={formData.email}
//                   required
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                 />
//                 <input
//                   className="border-2 border-solid border-black rounded-lg h-12 px-2 my-4 w-full"
//                   type="password"
//                   placeholder="Password"
//                   value={formData.password}
//                   required
//                   onChange={(e) =>
//                     setFormData({ ...formData, password: e.target.value })
//                   }
//                 />
//                 <div className=" flex flex-col justify-center">
//                   <button
//                     className={
//                       "bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg"
//                     }
//                     type="submit"
//                   >
//                     Submit
//                   </button>
//                   <div className="flex justify-around pb-2">
//                     {Error1 && (
//                       <p
//                         style={{ color: "black" }}
//                         className="font-bold text-lg"
//                       >
//                         {Error1}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default StaffLogin;
