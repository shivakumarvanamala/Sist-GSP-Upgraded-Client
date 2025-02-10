import axios from "axios";
import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginNavBar from "./LoginNavBar";
import Footer from "./shared/Footer";

import LoadingScreen from "./shared/Loader";

export default function DuoRegisterForm() {
  const SERVERPATH = import.meta.env.VITE_SERVERPATH;

  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [isSecondMailVerified, setIsSecondMailVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isOTPVerifying, setIsOTPVerifying] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState(false);

  const [receivedOTP, setReceivedOTP] = useState("");
  const [secondUserOTPContainer, setSecondUserOTPContainer] = useState(false);
  const [secondUserOTP, setSecondUserOTP] = useState("");

  const [projTitle, setProjTitle] = useState("");
  const [projDomain, setProjDomain] = useState("");
  const [projDesc, setProjDesc] = useState("");

  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [userRegNo, setUserRegNo] = useState(localStorage.getItem("userRegNo"));
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));
  const userSection = localStorage.getItem("userSection");
  const [userPhone, setUserPhone] = useState(
    localStorage.getItem("userPhoneNo")
  );

  const [secondUserName, setSecondUserName] = useState("");
  const [secondUserRegNo, setSecondUserRegNo] = useState("");
  const [secondUserEmail, setSecondUserEmail] = useState("123@gmail.com");
  const [secondUserPhone, setSecondUserPhone] = useState("");
  const [secondUserSection, setSecondUserSection] = useState("");

  const [guideName, setGuideName] = useState(localStorage.getItem("GuideName"));
  const [guideMailId, setGuideMailId] = useState(
    localStorage.getItem("GuideMailId")
  );

  const [getVacancies, setGetVacancies] = useState("");
  const [isPersonOneNotRegistered, setIsPersonOneNotRegistered] = useState("");
  const [isPersonTwoNotRegistered, setIsPersonTwoNotRegistered] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [isVerificationSuccess, setIsVerificationSuccess] = useState(false);
  const [verificationInitiated, setVerificationInitiated] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  const startResendTimer = () => {
    setIsVerifying(true);
    setResendTimer(30); // Set the initial timer value
    const interval = setInterval(() => {
      setResendTimer((prevTimer) => prevTimer - 1);
    }, 1000); // Decrease the timer every second

    // Stop the timer after 30 seconds
    setTimeout(() => {
      clearInterval(interval);
      setIsVerifying(false); // Enable the verify button
    }, 30000);
  };

  // useEffect(() => {
  //   const checkToken = async () => {
  //     const token = localStorage.getItem("token_for_first_time");

  //     if (token) {
  //       const decodedToken = jwtDecode(token);
  //       const expirationTime = decodedToken.exp * 1000;

  //       if (expirationTime < Date.now()) {
  //         localStorage.removeItem("token");
  //         localStorage.removeItem("GuideName");
  //         localStorage.removeItem("GuideMailId");
  //         navigate("/login");
  //       }
  //     } else {
  //       navigate("/login");
  //     }
  //   };
  //   checkToken();
  // }, [guideMailId, navigate]);

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

  useEffect(() => {
    // Call getData() when the component mounts or when guideMailId changes
    getData();
    checkPersonOneRegistered();
    // checkPersonTwoRegistered();
  }, [userEmail, guideMailId]);

  const getData = async () => {
    try {
      const response = await axios.get(
        SERVERPATH + "/check_vacancies/" + guideMailId
      );
      setGetVacancies(response.data);
      //   console.warn(getVacancies)
    } catch (err) {
      console.warn(err);
    }
  };

  const checkSecondMailId = async () => {
    setIsLoading(true);
    if (secondUserEmail && userEmail != secondUserEmail) {
      try {
        setIsVerifying(true);
        setVerificationInitiated(true);

        const response = await axios.get(
          SERVERPATH + "/check_second_mail/" + secondUserEmail
        );
        // console.warn(response.data);
        if (response.data.firstTime) {
          startResendTimer();
          setReceivedOTP(response.data.otp);
          setSecondUserOTPContainer(true);
          setIsSecondMailVerified(true);
          setSecondUserName(response.data.name);
          setSecondUserPhone(response.data.phoneNo);
          setSecondUserSection(response.data.section);
          setSecondUserRegNo(response.data.regNo);
        } else if (response.data.data == "mail not found") {
          setVerificationInitiated(false);
          setIsLoading(false);
          alert("Mail not found");
          setIsVerifying(false);
        } else if (!response.data.firstTime) {
          setVerificationInitiated(false);
          setIsLoading(false);
          alert("Account already Registered");
          setIsVerifying(false);
        }
      } catch (err) {
        setIsLoading(false);
        console.warn(err);
        setIsVerifying(false);
      } finally {
        setIsVerifying(false);
      }

      setIsLoading(false);
    } else {
      alert("No duplicate entries allowed!");
      setIsLoading(false);
    }
  };

  const checkPersonOneRegistered = async () => {
    try {
      const response = await axios.get(SERVERPATH + "/api/check/" + userEmail);
      // console.warn(response.data);
      setIsPersonOneNotRegistered(response.data.first_time);
    } catch (err) {
      console.warn("not found");
    }
  };

  // const checkPersonTwoRegistered = async () => {
  //   try {
  //     const response = await axios.get(
  //       SERVERPATH + "/api/check/" + secondUserEmail
  //     );
  //     console.warn(response.data);
  //     setIsPersonTwoNotRegistered(response.data.first_time);
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  const checkSecondOtp = (e) => {
    e.preventDefault();
    // if (receivedOTP==secondUserOTP)
    // {
    //     setIsVerifying(true)
    //     setVerifyStatus(true)
    //     setSecondUserOTPContainer(false)
    //     setIsSecondMailVerified(true)
    // }
    // else{
    //     alert("Wrong otp")
    // }
  };

  async function Submit(e) {
    e.preventDefault();

    setIsLoading(true);

    // console.warn("isSecondMailVerified   "+isSecondMailVerified)
    // console.warn("isPersonOneNotRegistered   "+isPersonOneNotRegistered)
    // console.warn("getVacancies   "+getVacancies["vacancies"])

    if (
      parseInt(getVacancies["vacancies"]) > 0 &&
      isSecondMailVerified &&
      // isPersonTwoNotRegistered &&
      isPersonOneNotRegistered
    ) {
      try {
        const response1 = await axios.put(SERVERPATH + "/add_registered_data", {
          email: userEmail,
          password: localStorage.getItem("newPassword"),
          guideMailId: guideMailId,
          update_vacancies_data: false,
        });
        // console.warn(response1.data);
        if (response1.data["message"] === "No Vacancies") {
          setIsPersonOneNotRegistered(false);
          alert("No Vacancies");
        } else if (response1.data["error"] === "Email already registered") {
          setIsPersonOneNotRegistered(false);
          alert("Account already Registered");
          navigate("/");
          // console.warn(isPersonOneNotRegistered);
        } else if (
          response1.data["error"] === "An error occurred during registration"
        ) {
          alert("You have done something wrong!");
          navigate("/");
        } else if (
          response1.data["message"] === "User registered successfully"
        ) {
          const data5 = {
            email: secondUserEmail,
            password: localStorage.getItem("newPassword"),
            guideMailId: guideMailId,
            update_vacancies_data: true,
          };
          axios
            .put(SERVERPATH + "/add_registered_data", data5)
            .then((response) => {
              console.log(response.data);
              if (response1.data["message"] === "No Vacancies") {
                setIsPersonOneNotRegistered(false);
                alert("No Vacancies");
              } else if (response.data["error"] == "Email already registered") {
                setIsPersonTwoNotRegistered(false);
                axios.post(SERVERPATH + "/rollback_registered_data", {
                  email: userEmail,
                  guideMailId: guideMailId,
                });
                alert(
                  "Second Member Account already Registered\nIf not try after a minute."
                );
                navigate("/");
                // console.warn(isNotRegistered);
              } else if (
                response.data["error"] ==
                "An error occurred during registration"
              ) {
                alert("You have done something wrong!");
                navigate("/");
              } else if (
                response.data["message"] == "User registered successfully"
              ) {
                const data = {
                  collection_name: userRegNo,
                  data: {
                    team: true,
                    name: userName,
                    regNo: userRegNo,
                    phoneNo: userPhone,
                    mailId: userEmail,
                    section: userSection,
                    p2name: secondUserName,
                    p2regNo: secondUserRegNo,
                    p2phoneNo: secondUserPhone,
                    p2mailId: secondUserEmail,
                    p2section: secondUserSection,
                    projectTitle: projTitle,
                    projectDesc: projDesc,
                    projectDomain: projDomain,
                    selectedGuide: guideName,
                    selectedGuideMailId: guideMailId,
                    password: localStorage.getItem("newPassword"),
                  },
                };

                // Send the data to the Flask route using Axios
                axios
                  .post(
                    SERVERPATH +
                      "/create_collection/" +
                      userEmail +
                      "/" +
                      secondUserEmail,
                    data,
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  )
                  .then((response) => {
                    console.log(response.data);
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });

                const data2 = {
                  collection_name: "users",
                  filter_data: { email: userEmail },
                  updated_data: {
                    password: localStorage.getItem("newPassword"),
                    firstTime: false,
                    regNo: userRegNo,
                  },
                };

                // Send the data to the Flask update route using Axios
                axios
                  .put(SERVERPATH + "/update_data", data2, {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                  .then((response) => {
                    console.log(response.data);
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });

                const data4 = {
                  collection_name: "users",
                  filter_data: { email: secondUserEmail },
                  updated_data: {
                    password: localStorage.getItem("newPassword"),
                    firstTime: false,
                    regNo: secondUserRegNo,
                  },
                };

                // Send the data to the Flask update route using Axios
                axios
                  .put(SERVERPATH + "/update_data", data4, {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                  .then((response) => {
                    console.log(response.data);
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });

                // const data3 = {
                //   collection_name: "facultylist",
                //   filter_data: { "University EMAIL ID": guideMailId },
                //   updated_data: {
                //     "TOTAL BATCHES": parseInt(getVacancies["vacancies"]) - 1,
                //   },
                //   student_mailId : userEmail
                // };

                // // Send the data to the Flask update route using Axios
                // axios
                //   .put(SERVERPATH + "/update_vacancies_data", data3, {
                //     headers: {
                //       "Content-Type": "application/json",
                //     },
                //   })
                //   .then((response) => {
                //     console.log(response.data);
                //   })
                //   .catch((error) => {
                //     console.error("Error:", error);
                //   });

                // alert("Success")
                navigate(currentPath + "/success");
                setIsLoading(false);
              } else {
                alert("Something done wrong");
              }
            });
        } else {
          alert("something done wrong");
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    } else if (!isSecondMailVerified) {
      alert("verify second member email");
    } else if (!isPersonOneNotRegistered) {
      alert("Team member 1 has already registered");
      // } else if (!isPersonTwoNotRegistered) {
      // alert("Team member 2 has already registered");
    } else {
      alert("No Vacancy Select Another Staff");
    }
    setIsLoading(false);
  }

  return (
    <>
      {isLoading && <LoadingScreen />}
      <LoginNavBar />

      {/* <h1>REGISTRATION FORM</h1> */}

      <form onSubmit={Submit}>
        <div className="m-4 border-solid border-2 rounded-lg">
          <div className="bg-[#330716] m-4 rounded-lg  flex justify-center items-center font-bold text-white lg:text-4xl text-lg lg:py-24 py-20">
            <p>Confirmation Details</p>
          </div>

          <div className="border-solid border-2 m-4 p-5">
            <div className="flex justify-center lg:space-y-0 space-y-2">
              <p className="lg:text-2xl text-xl font-bold pb-4">
                Project Information
              </p>
            </div>

            <div className="lg:flex justify-evenly lg:space-y-0 space-y-2">
              <div className="lg:w-full lg:mx-12">
                <div>
                  <label>Project Title</label>
                  <br></br>
                  <input
                    className="border-2 h-12 px-4 w-full bg-gray-200 mb-2"
                    type="text"
                    placeholder="Title..."
                    value={projTitle}
                    required
                    onChange={(e) => setProjTitle(e.target.value)}
                  />
                </div>
              </div>

              <div className="lg:w-full lg:mx-12">
                <div>
                  <label>Project Domain</label>
                  <br></br>
                  <input
                    className="border-2 h-12 px-4 w-full bg-gray-200 mb-4"
                    type="text"
                    placeholder="Domain..."
                    value={projDomain}
                    required
                    onChange={(e) => setProjDomain(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="lg:mx-12">
              <label>Project Description</label>
              <br></br>
              <textarea
                className="border-2 p-4 w-full bg-gray-200"
                rows="4"
                type="text"
                placeholder="Describe here..."
                value={projDesc}
                required
                onChange={(e) => setProjDesc(e.target.value)}
              />
            </div>
          </div>

          <div className="border-solid border-2 m-4 p-5">
            <div className="flex justify-center lg:space-y-0 space-y-2">
              <p className="lg:text-2xl text-xl font-bold pb-4">
                Team Member 1
              </p>
            </div>

            <div className="lg:flex justify-evenly lg:space-y-0 space-y-2">
              <div className="lg:w-full lg:mx-12">
                <div>
                  <label>Full Name</label>
                  <input
                    className="border-2 h-12 px-4 w-full bg-gray-200 mb-4"
                    type="text"
                    placeholder="name"
                    value={userName}
                    required
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
              </div>

              <div className="lg:w-full lg:mx-12">
                <div>
                  <label>Register Number</label>
                  <input
                    className="border-2  h-12 px-4 w-full bg-gray-200 mb-4"
                    type="number"
                    placeholder="reg no"
                    value={userRegNo}
                    readOnly
                    // onChange={(e) => setUserRegNo(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="lg:flex justify-evenly lg:space-y-0 space-y-2">
              <div className="lg:w-full lg:mx-12">
                <div>
                  <label>Email</label>
                  <input
                    className="border-2 h-12 px-4 w-full bg-gray-200 mb-4"
                    type="text"
                    value={userEmail}
                    readOnly
                  />
                </div>
              </div>

              <div className="lg:w-full lg:mx-12">
                <div>
                  <label>Phone Number</label>
                  <input
                    className="border-2 h-12 px-4 w-full bg-gray-200 mb-4"
                    type="number"
                    placeholder="phone"
                    value={userPhone}
                    required
                    maxLength={10}
                    onChange={(e) => setUserPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-solid border-2 m-4 p-5">
            <div className="flex justify-center lg:space-y-0 space-y-2">
              <p className="lg:text-2xl text-xl font-bold pb-4">
                Team Member 2
              </p>
            </div>

            <div className="lg:flex justify-evenly lg:space-y-0 space-y-2">
              <div className="lg:w-full lg:mx-12">
                <div>
                  <label>Full Name</label>
                  <input
                    className="border-2 h-12 px-4 w-full bg-gray-200 mb-4"
                    type="text"
                    placeholder=""
                    value={secondUserName}
                    required
                    onChange={(e) => setSecondUserName(e.target.value)}
                  />
                </div>
              </div>

              <div className="lg:w-full lg:mx-12">
                <div>
                  <label>Register Number</label>
                  <input
                    className="border-2 h-12 px-4 w-full bg-gray-200 mb-4 "
                    type="number"
                    placeholder=""
                    value={secondUserRegNo}
                    readOnly
                    // onChange={(e) => setSecondUserRegNo(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="lg:flex justify-evenly lg:space-y-0 space-y-2">
              <div className="lg:w-full lg:mx-12">
                <div>
                  <label>Phone Number</label>
                  <input
                    className="border-2 h-12 px-4 w-full bg-gray-200 mb-4"
                    type="number"
                    placeholder=""
                    value={secondUserPhone}
                    required
                    maxLength={10}
                    onChange={(e) => setSecondUserPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="lg:w-full lg:mx-12">
                <div>
                  <label>Email</label>
                  {verifyStatus ? (
                    <input
                      className="border-2 h-12 px-4 w-full bg-gray-200 mb-4"
                      type="email"
                      placeholder=""
                      value={secondUserEmail}
                      required
                      readOnly
                      onChange={(e) => setSecondUserEmail(e.target.value)}
                    />
                  ) : (
                    <input
                      className="border-2 h-12 px-4 w-full bg-gray-200 mb-4"
                      type="email"
                      placeholder=""
                      value={secondUserEmail}
                      required
                      onChange={(e) => setSecondUserEmail(e.target.value)}
                    />
                  )}

                  <p className={verifyStatus ? "visible text-lg" : "hidden"}>
                    <b>VERIFIED</b>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-around">
              <div className={secondUserOTPContainer ? "visible" : "hidden"}>
                <input
                  className="border-2 h-12 px-4 w-min bg-gray-200 m-4"
                  type="number"
                  placeholder="Enter OTP"
                  value={secondUserOTP}
                  required
                  onChange={(e) => {
                    setSecondUserOTP(e.target.value);
                    if (receivedOTP == e.target.value) {
                      setIsVerifying(true);
                      setVerifyStatus(true);
                      setSecondUserOTPContainer(false);
                      setIsSecondMailVerified(true);
                      setIsVerificationSuccess(true);
                    }
                  }}
                />

                {/* <button className="p-4 bg-red-700 text-white text-lg"
        onClick={checkSecondOtp}
        disabled={isotpVerifying}>
        submit</button> */}
              </div>
            </div>

            <div className="flex justify-around">
              <div className={isVerificationSuccess ? "hidden" : "block"}>
                <button
                  className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg"
                  onClick={checkSecondMailId}
                  disabled={
                    verificationInitiated && (isVerifying || resendTimer > 0)
                  }
                >
                  {verificationInitiated
                    ? resendTimer > 0
                      ? `Resend in ${resendTimer}s`
                      : "Resend"
                    : "Verify"}
                </button>
              </div>
            </div>
          </div>

          <div className="border-solid border-2 m-4 p-5">
            <div className="flex justify-center lg:space-y-0 space-y-2">
              <p className="lg:text-2xl text-xl font-bold pb-4">
                Guide Details
              </p>
            </div>

            <div className="lg:flex justify-evenly lg:space-y-0 space-y-2">
              <div className="lg:w-full lg:mx-12">
                <div>
                  <label>Guide Name</label>
                  <input
                    className="border-2 h-12 px-4 w-full bg-gray-200 mb-4"
                    type="text"
                    value={guideName}
                    readOnly
                  />
                </div>
              </div>

              <div className="lg:w-full lg:mx-12">
                <div>
                  <label>Guide Email Id</label>
                  <input
                    className="border-2 h-12 px-4 w-full bg-gray-200 mb-4"
                    type="text"
                    value={guideMailId}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-around pb-5">
            <button
              type="submit"
              className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg"
            >
              {isLoading ? "Loading..." : "SUBMIT"}
            </button>
          </div>
        </div>

        {/* <div className="ProjectInformation border-2 "> */}
        {/* <h1>Project Information</h1> */}

        {/* <label>Project Title</label>
          <input
            className="border-2"
            type="text"
            placeholder=""
            value={projTitle}
            required
            onChange={(e) => setProjTitle(e.target.value)}
          /> */}
        {/* <br></br> */}

        {/* <label>Project Domain</label>
          <input
            className="border-2 "
            type="text"
            placeholder=""
            value={projDomain}
            required
            onChange={(e) => setProjDomain(e.target.value)}
          /> */}
        {/* <br></br> */}

        {/* <label>Project Description</label>
          <input
            className="border-2"
            type="text"
            placeholder=""
            value={projDesc}
            required
            onChange={(e) => setProjDesc(e.target.value)}
          /> */}
        {/* </div> */}

        {/* <div className="TeamInfo border-2 "> */}
        {/* <h1>Team Member 1</h1> */}

        {/* <label>Full Name</label>
          <input
            className="border-2"
            type="text"
            placeholder=""
            value={userName}
            required
            onChange={(e) => setUserName(e.target.value)}
          /> */}
        {/* <br></br> */}

        {/* <label>Register Number</label>
          <input
            className="border-2 "
            type="number"
            placeholder=""
            value={userRegNo}
            required
            onChange={(e) => setUserRegNo(e.target.value)}
          /> */}
        {/* <br></br> */}

        {/* <label>Email</label>
          <input className="border-2" type="text" value={userEmail} readOnly />
          <br></br> */}

        {/* <label>Phone Number</label>
          <input
            className="border-2"
            type="tel"
            placeholder=""
            value={userPhone}
            required
            onChange={(e) => setUserPhone(e.target.value)}
          /> */}
        {/* </div> */}

        {/* <div className="TeamInfo border-2 "> */}
        {/* <h1>Team Member 2</h1> */}

        {/* <label>Full Name</label>
          <input
            className="border-2"
            type="text"
            placeholder=""
            value={secondUserName}
            required
            onChange={(e) => setSecondUserName(e.target.value)}
          /> */}
        {/* <br></br> */}

        {/* <label>Register Number</label>
          <input
            className="border-2 "
            type="number"
            placeholder=""
            value={secondUserRegNo}
            required
            onChange={(e) => setSecondUserRegNo(e.target.value)}
          /> */}
        {/* <br></br> */}

        {/* <label>Phone Number</label>
          <input
            className="border-2"
            type="tel"
            placeholder=""
            value={secondUserPhone}
            required
            onChange={(e) => setSecondUserPhone(e.target.value)}
          /> */}
        {/* <br></br> */}

        {/* <label>Email</label>
          <input
            className="border-2"
            type="email"
            placeholder=""
            value={secondUserEmail}
            required
            onChange={(e) => setSecondUserEmail(e.target.value)}
          />  */}
        {/* <button className="p-4 bg-red-700 text-white text-lg"
           onClick={checkSecondMailId}
           disabled={isVerifying}>
           verify</button> */}
        {/* <br></br> */}
        {/* <p className={verifyStatus ? "visible":"hidden"}><b>verified</b></p> */}

        {/* <div className={secondUserOTPContainer ? "visible":"hidden"}>


          <input
            className="border-2"
            type="number"
            placeholder="Enter OTP"
            value={secondUserOTP}
            required
            onChange={(e) => setSecondUserOTP(e.target.value)}
          />
          <button className="p-4 bg-red-700 text-white text-lg"
           onClick={checkSecondOtp}
           disabled={isotpVerifying}>
           submit</button>
            

          </div>     */}

        {/* </div> */}

        {/* <div className="Guide Details">
          <h1>Guide Details</h1>
          <label>Guide Name</label>
          <input className="border-2" type="text" value={guideName} readOnly />
          <br></br>

          <label>Guide Email Id</label>
          <input
            className="border-2"
            type="text"
            value={guideMailId}
            readOnly
          /> */}
        {/* </div> */}
        {/* <button type="submit"  className="h-10 p-2 bg-red-600 text-black">SUBMIT</button> */}
      </form>

      <Footer />
    </>
  );
}
