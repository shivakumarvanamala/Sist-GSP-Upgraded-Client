import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginNavBar from "./LoginNavBar";
import Footer from "./shared/Footer";

import LoadingScreen from "./shared/Loader";

export default function DuoRegisterForm() {
  const SERVERPATH = import.meta.env.VITE_SERVERPATH;

  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [isSecondMailVerified, setIsSecondMailVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState(false);

  const [receivedOTP, setReceivedOTP] = useState("");
  const [secondUserOTPContainer, setSecondUserOTPContainer] = useState(false);
  const [secondUserOTP, setSecondUserOTP] = useState("");
  const [otpError, setOtpError] = useState(false);


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
  const [secondUserEmail, setSecondUserEmail] = useState("");
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
    vacanciesData();
    checkPersonOneRegistered();
    // checkPersonTwoRegistered();
  }, [userEmail, guideMailId]);

  const vacanciesData = async () => {
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


  async function Submit(e) {
    e.preventDefault();

    setIsLoading(true);
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
          alert($`{userEmail} already Registered`);
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
                  $`{setUserEmail} already Registered\nIf not try after a minute.`
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
          <div className="bg-[#821c3f] m-4 rounded-lg  flex justify-center items-center  lg:py-18 py-12">
            <p className="font-bold text-white lg:text-4xl text-lg">CONFIRMATION DETAILS</p>
          </div>

          <div className="border-solid border-2 m-4 p-5">
            <div className="flex justify-center lg:space-y-0 space-y-2">
              <p className="lg:text-2xl text-xl font-bold pb-4">
                📝 Project Information
              </p>
            </div>

            <div className="lg:flex justify-evenly lg:space-y-0 space-y-2">
              <div className="lg:w-full lg:mx-12">
                <div>
                  <label>Project Title<span className="text-red-600">*</span></label>
                  <br></br>
                  <input
                    className="border-2 h-12 px-4 w-full bg-gray-200 mb-2"
                    type="text"
                    placeholder="Enter Title..."
                    value={projTitle}
                    required
                    onChange={(e) => setProjTitle(e.target.value)}
                  />
                </div>
              </div>

              <div className="lg:w-full lg:mx-12">
                <div>
                  <label>Project Domain<span className="text-red-600">*</span></label>
                  <br></br>
                  <input
                    className="border-2 h-12 px-4 w-full bg-gray-200 mb-4"
                    type="text"
                    placeholder="Enter Domain..."
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
                placeholder="Enter Describe here..."
                value={projDesc}
                onChange={(e) => setProjDesc(e.target.value)}
              />
            </div>
          </div>

          <div className="border-solid border-2 m-4 p-5">
            <div className="flex justify-center lg:space-y-0 space-y-2">
              <p className="lg:text-2xl text-xl font-bold pb-4">
                👩‍🎓 Team Member 1
              </p>
            </div>

            <div className="lg:flex justify-evenly lg:space-y-0 space-y-2">
              <div className="lg:w-full lg:mx-12">
                <div>
                  <label>Full Name</label>
                  <input
                    className="border-2 h-12 px-4 w-full bg-gray-200 mb-4 focus:outline-none focus:ring-0 cursor-default"
                    type="text"
                    placeholder="name"
                    value={userName}
                    required
                    readOnly
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
              </div>

              <div className="lg:w-full lg:mx-12">
                <div>
                  <label>Register Number</label>
                  <input
                    className="border-2  h-12 px-4 w-full bg-gray-200 mb-4 focus:outline-none focus:ring-0 cursor-default"
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
                  <label>Phone Number</label>
                  <input
                    className="border-2 h-12 px-4 w-full bg-gray-200 mb-4 focus:outline-none focus:ring-0 cursor-default"
                    type="number"
                    placeholder="phone"
                    value={userPhone}
                    required
                    readOnly
                    maxLength={10}
                    onChange={(e) => setUserPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="lg:w-full lg:mx-12">
                <div>
                  <label>Email</label>
                  <input
                    className="border-2 h-12 px-4 w-full bg-gray-200 mb-4 focus:outline-none focus:ring-0 cursor-default"
                    type="text"
                    value={userEmail}
                    readOnly
                  />
                </div>
              </div>

            </div>
          </div>

          <div className="border-solid border-2 m-4 p-5">
            <div className="flex justify-center lg:space-y-0 space-y-2">
              <p className="lg:text-2xl text-xl font-bold pb-4">
                👩‍🎓 Team Member 2
              </p>
            </div>

            <div className="lg:flex justify-evenly lg:space-y-0 space-y-2">
              <div className="lg:w-full lg:mx-12">
                <div>
                  <label>Full Name</label>
                  <input
                    className="border-2 h-12 px-4 w-full bg-gray-200 mb-4 focus:outline-none focus:ring-0 cursor-default"
                    type="text"
                    placeholder=""
                    value={secondUserName}
                    required
                    readOnly
                    onChange={(e) => setSecondUserName(e.target.value)}
                  />
                </div>
              </div>

              <div className="lg:w-full lg:mx-12">
                <div>
                  <label>Register Number</label>
                  <input
                    className="border-2 h-12 px-4 w-full bg-gray-200 mb-4 focus:outline-none focus:ring-0 cursor-default"
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
                    className="border-2 h-12 px-4 w-full bg-gray-200 mb-4 focus:outline-none focus:ring-0 cursor-default"
                    type="number"
                    placeholder=""
                    value={secondUserPhone}
                    readOnly
                    required
                    maxLength={10}
                    onChange={(e) => setSecondUserPhone(e.target.value)}
                  />
                </div>
              </div>


              <div className="lg:w-full lg:mx-12">
                <label className="font-medium">
                  Email <span className="text-red-600">*</span>
                </label>

                <div className="flex gap-2 items-center">
                  <input
                    className="border-2 h-12 px-4 w-full bg-gray-200 mb-4 "
                    type="email"
                    placeholder={verifyStatus ? "" : "Enter Your team member mailId to verify.."}
                    value={secondUserEmail}
                    required
                    readOnly={verifyStatus}
                    onChange={(e) => {
                      setSecondUserEmail(e.target.value);
                      setIsVerificationSuccess(false);
                      setVerifyStatus(false);
                    }}
                  />

                  {!isVerificationSuccess && (
                    <button
                      className="bg-red-900 text-white px-4 py-2 rounded-md mb-4 whitespace-nowrap"
                      onClick={checkSecondMailId}
                      disabled={verificationInitiated && (isVerifying || resendTimer > 0)}
                    >
                      {verificationInitiated
                        ? resendTimer > 0
                          ? `Resend (${resendTimer}s)`
                          : "Resend"
                        : "Verify"}
                    </button>
                  )}
                </div>

                {/* OTP input (conditional) */}
                {secondUserOTPContainer && (
                  <div className="flex gap-2 items-center mb-2">
                    <input
                      className="border-2 h-12 px-4 bg-gray-200 w-48 outline-none focus:ring-0 focus:outline-none"
                      type="number"
                      placeholder="Enter OTP"
                      value={secondUserOTP}
                      required
                      maxLength={6}
                      onChange={(e) => setSecondUserOTP(e.target.value)}
                    />
                    <button
                      className="bg-blue-600 text-white px-3 py-2 rounded-md"
                      type="submit"
                      onClick={() => {
                        if ((secondUserOTP) === String(receivedOTP) && secondUserOTP.length === 6) {
                          console.log("original otp", receivedOTP)
                          console.log("entered otp", secondUserOTP)
                          setIsVerifying(true);
                          setVerifyStatus(true);
                          setSecondUserOTPContainer(false);
                          setIsSecondMailVerified(true);
                          setIsVerificationSuccess(true);
                          setOtpError(false);
                        } else {
                          console.log("original otp", receivedOTP)
                          console.log("entered otp", secondUserOTP)
                          setOtpError(true);
                        }
                      }}
                    >
                      Verify OTP
                    </button>
                    {otpError && (
                      <p className="text-red-600 text-sm ml-2">❌ Invalid OTP. Try again.</p>
                    )}
                  </div>

                )}

                {/* Success Message */}
                <p
                  className={
                    verifyStatus
                      ? "visible text-green-600 text-sm font-medium"
                      : "hidden"
                  }
                >
                  ✅ Verified
                </p>
              </div>



            </div>

            {/* <div className="flex justify-around">
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

              </div>
            </div> */}

            {/* <div className="flex justify-around">
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
            </div> */}
          </div>

          <div className="border-solid border-2 m-4 p-5">
            <div className="flex justify-center lg:space-y-0 space-y-2">
              <p className="lg:text-2xl text-xl font-bold pb-4">
                🧑‍🏫 Guide Details
              </p>
            </div>

            <div className="lg:flex justify-evenly lg:space-y-0 space-y-2">
              <div className="lg:w-full lg:mx-12">
                <div>
                  <label>Guide Name</label>
                  <input
                    className="border-2 h-12 px-4 w-full bg-gray-200 mb-4 focus:outline-none focus:ring-0 cursor-default"
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
                    className="border-2 h-12 px-4 w-full bg-gray-200 mb-4 focus:outline-none focus:ring-0 cursor-default"
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

      </form>

      <Footer />
    </>
  );
}
