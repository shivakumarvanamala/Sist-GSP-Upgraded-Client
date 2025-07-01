import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import LoginNavBar from "./LoginNavBar";
import Footer from "./shared/Footer";

import LoadingScreen from "./shared/Loader";

export default function SingleRegisterForm() {
  const SERVERPATH = import.meta.env.VITE_SERVERPATH;

  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [projTitle, setProjTitle] = useState("");
  const [projDomain, setProjDomain] = useState("");
  const [projDesc, setProjDesc] = useState("");

  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [userRegNo, setUserRegNo] = useState(localStorage.getItem("userRegNo"));
  const userEmail = localStorage.getItem("userEmail");
  const userSection = localStorage.getItem("userSection");

  const [userPhone, setUserPhone] = useState(
    localStorage.getItem("userPhoneNo")
  );

  const guideName = localStorage.getItem("GuideName");
  const guideMailId = localStorage.getItem("GuideMailId");

  const [getVacancies, setGetVacancies] = useState("");
  const [isNotRegistered, setIsNotRegistered] = useState("");

  const [isLoading, setIsLoading] = useState(false);

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
    checkRegistered();
  }, []);


  const vacanciesData = async () => {
    try {
      const response = await axios.get(
        SERVERPATH + "/check_vacancies/" + guideMailId
      );
      setGetVacancies(response.data);
    } catch (err) {
      console.warn(err);
    }
  };

  const checkRegistered = async () => {
    try {
      const response = await axios.get(SERVERPATH + "/api/check/" + userEmail);
      setIsNotRegistered(response.data.first_time);
    } catch (err) {
      console.warn(err);
    }
  };

  const Submit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    // console.warn("1")
    if (parseInt(getVacancies["vacancies"]) > 0 && isNotRegistered) {
      const data4 = {
        email: userEmail,
        password: localStorage.getItem("newPassword"),
        guideMailId: guideMailId,
        update_vacancies_data: true,
      };
      // console.warn("2")
      try {
        const response = await axios.put(
          SERVERPATH + "/add_registered_data",
          data4
        );
        // console.warn(response.data);
        if (response.data["message"] === "No Vacancies") {
          setIsNotRegistered(false);
          alert("No Vacancies");
        } else if (response.data["error"] === "Email already registered") {
          setIsNotRegistered(false);
          alert("Account already Registered");
        } else if (
          response.data["message"] === "User registered successfully"
        ) {
          const data = {
            collection_name: userRegNo, // Replace 'my_collection' with the desired collection name
            registered_data: {
              team: false,
              name: userName,
              regNo: userRegNo,
              phoneNo: userPhone,
              mailId: userEmail,
              section: userSection,
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
            .post(SERVERPATH + "/create_collection/" + userEmail, data, {
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

          const data2 = {
            collection_name: "users", // Replace 'my_collection' with the desired collection name
            filter_data: { email: userEmail }, // Replace with the filter to identify the data you want to update
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

          // const data3 = {
          //   collection_name: "facultylist", // Replace 'my_collection' with the desired collection name
          //   filter_data: { "University EMAIL ID": guideMailId }, // Replace with the filter to identify the data you want to update
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
        }
      } catch (error) {
        console.warn(error, "Account Already Registered");
        setIsNotRegistered(false);
        alert("Account already Registered");
      }
    } else if (!isNotRegistered) {
      alert("Account is already registered");
    } else {
      alert("No Vacancy Select Another Staff");
    }

    setIsLoading(false);
  };

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
                📝 Project Information              </p>
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
                👩‍🎓 Student Details
              </p>
            </div>

            <div className="lg:flex justify-evenly lg:space-y-0 space-y-2">
              <div className="lg:w-full lg:mx-12">
                <div>
                  <label>Full Name</label>
                  <input
                    className="border-2 h-12 px-4 w-full bg-gray-200 mb-4 focus:outline-none focus:ring-0 cursor-default"
                    type="text"
                    placeholder="Name"
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
                    className="border-2 h-12 px-4 w-full bg-gray-200 mb-6 focus:outline-none focus:ring-0 cursor-default"
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
                🧑‍🏫 Guide Details              </p>
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
