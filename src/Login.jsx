import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";

import "./index.css";

import LoginNavBar from "./LoginNavBar";
import Footer from "./shared/Footer";

import LoadingScreen from "./shared/Loader";

const Login = () => {
  const SERVERPATH = import.meta.env.VITE_SERVERPATH;

  const navigate = useNavigate();
  // const location = useLocation();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const [verifyOTP, setVerifyOTP] = useState(false);

  const [receivedOTP, setReceivedOTP] = useState(0);
  const [userOTP, setUserOTP] = useState(0);
  const [userToken, setUserToken] = useState("");
  const [openNewPasswordContainer, setOpenNewPasswordContainer] =
    useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [Error1, setError1] = useState();
  const [Error2, setError2] = useState();
  const [Error3, setError3] = useState();

  // FRONTEND

  const [loginOpen, setLoginOpen] = useState(true);

  // useEffect(() => {
  //   const token = localStorage.getItem("token_for_first_time");
  //   if (location.pathname === "/login" && token) {
  //     localStorage.removeItem("token_for_first_time");
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("GuideName");
  //     localStorage.removeItem("GuideMailId");
  //     localStorage.removeItem("userMailId");
  //     console.log("Token removed from local storage");
  //   }
  // }, [location]);

  useEffect(() => {
    const token = localStorage.getItem("token");
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
          navigate("/dashboard");
        } else {
          localStorage.removeItem("token");
        }
      };
      func();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      navigate("/login");
    }
  }, []);

  const handleFirstLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!verifyOTP) {
      // console.warn(SERVERPATH + "/api/check/" + formData["email"]);
      try {
        const response = await axios.post(
          SERVERPATH + "/api/check/" + formData["email"] + "/" + "password",
          { passcode: formData["password"] }
        );
        // console.warn(response.data);

        if (response.data.is_account_available == "false") {
          // console.warn("enter valid user account");
          setIsLoading(false);
          // alert("enter valid user account");
          setError1("Enter valid user details!");
          alertDelay();
        } else if (
          response.data.first_time == "false" &&
          response.data.is_account_available == "true" &&
          response.data.is_password_correct == "false"
        ) {
          setIsLoading(false);
          // console.warn("password incorrect");
          setError1("Incorrect Password!");
          alertDelay();
          // alert("password incorrect");
        } else if (
          response.data.first_time == "false" &&
          response.data.is_account_available == "true" &&
          response.data.is_password_correct == "true"
        ) {
          setIsLoading(false);
          // console.warn("Login Success");
          // alert("Login Success");
          setUserToken(response.data.token);
          // console.warn(response.data.token);

          localStorage.setItem("token", response.data.token);
          localStorage.setItem("teamId", response.data.teamId);
          localStorage.setItem("userEmail", response.data.userEmail);

          navigate("/dashboard");
        } else if (
          response.data.first_time === "true" &&
          response.data.is_account_available == "true"
        ) {
          setIsLoading(false);
          // console.warn("I am  called");
          const o = { _id: response.data._id };

          if (response.data.Is_Email_sent == "true");
          {
            setLoginOpen(false);
            setVerifyOTP(true);
            setReceivedOTP(response.data.OTP);
            setUserToken(response.data.token);
            const token = response.data.token_for_first_time;
            // console.warn(token);
            localStorage.setItem("token_for_first_time", token);
            localStorage.setItem("userEmail", formData["email"]);
            localStorage.setItem("userName", response.data.name);
            localStorage.setItem("userPhoneNo", response.data.phoneNo);
            localStorage.setItem("userSection", response.data.section);
            localStorage.setItem("userRegNo", response.data.regNo);
          }
          if (response.data.Is_Email_sent == "false") {
            console.warn("Email not sent");
          }
        } else {
          console.warn("cannot processed");
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };

  // const handleSubmit = async(e)=>{
  //   e.preventDefault();

  //   if(!verifyOTP){
  //     console.warn('http://localhost:5000/api/check/'+formData['email'])
  //     try{
  //       const response = await axios.get('http://localhost:5000/api/check/'+formData['email']);
  //       console.warn(response.data);
  //       if (response.data.is_account_available==='true');
  //       {
  //         const o ={_id:response.data._id}
  //         // setObjId({_id:ObjectID(response.data._id)});
  //         setObjId(o)
  //         console.warn(o);
  //         try{
  //           console.warn("trying")
  //           const sendPositiveresponse = await axios.get("http://localhost:5000/api/check/verified/"+formData['email']+"/"+objId["_id"]);
  //           console.warn(sendPositiveresponse.data)
  //           if(sendPositiveresponse.data.Is_Email_sent);
  //           {
  //               setVerifyOTP(true);
  //               setReceivedOTP(sendPositiveresponse.data.OTP)
  //           }
  //         } catch(error){
  //           console.warn("to send verified note")
  //           console.warn(error)
  //         }
  //       }
  //     } catch(error){
  //       console.warn(error);
  //     }
  //   }
  // };

  const alertDelay = () => {
    setTimeout(() => {
      setError1("");
      setError2("");
      setError3("");
    }, 5000); // 3000 milliseconds = 3 seconds
  };

  const checkOTP = (e) => {
    e.preventDefault();

    if (userOTP) {
      if (userOTP == receivedOTP) {
        // console.warn("LCorrect otp entered");

        setVerifyOTP(false);

        setOpenNewPasswordContainer(true);
      } else {
        console.warn(openNewPasswordContainer);
        // alert("You have entered wrong OTP");
        setError2("Incorect OTP!");
        alertDelay();

        // console.warn("Wrong OTP");
      }
    } else {
      // alert("Enter correct OTP");
      setError2("Enter OTP!");
      alertDelay();
    }
  };

  const continueRegister = (e) => {
    e.preventDefault();

    if (newPassword == newConfirmPassword) {
      localStorage.setItem("newPassword", newPassword);
      navigate("/login/select_team");
    } else {
      // console.warn("both are not same");
      setError3("Password doesn't match!");
      alertDelay();
    }
  };

  if (localStorage.getItem("token") == null) {
    return (
      <>
        {isLoading && <LoadingScreen />}

        <LoginNavBar />

        <div className="login_bg px-10 xs:px-10">
          <div className="lg:w-1/4 md:w-2/4 s:w-2/4 xs:w-3/4 border bg-white bg-opacity-40 backdrop-filter p-6 rounded-lg shadow-lg">
            <div className={loginOpen ? "block" : "hidden"}>
              <div className={loginOpen ? " flex justify-center" : "hidden"}>
                <h1 className="p-4 font-semibold text-2xl">LOGIN</h1>
              </div>

              <div className="justify-center">
                <form onSubmit={handleFirstLogin}>
                  <input
                    className="border-2 border-solid border-black rounded-lg px-2 h-12 my-4 w-full"
                    type="text"
                    placeholder="Email or Team ID"
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
                        verifyOTP
                          ? "hidden p-3"
                          : "bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg"
                      }
                      type="submit"
                    >
                      Submit
                    </button>
                    <div className="flex justify-around pb-2">
                      {Error1 && (
                        <p
                          style={{ color: "red" }}
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

            <div className={verifyOTP ? "visible" : "hidden"}>
              <div className={true ? " flex justify-center" : "hidden"}>
                <h1 className="p-4 font-semibold text-2xl">Verify OTP</h1>
              </div>
              <form>
                <div className=" flex justify-center">
                  <input
                    className="border-2 border-solid border-black rounded-lg px-2 h-12 my-4 w-fit tracking-widest"
                    type="number"
                    placeholder="o  t  p"
                    maxLength="6"
                    value={formData.otp}
                    onChange={(e) => setUserOTP(e.target.value)}
                  />
                </div>

                <div className=" flex flex-col justify-center">
                  <button
                    onClick={checkOTP}
                    className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg"
                    type="submit"
                  >
                    Submit
                  </button>
                  <div className="flex justify-around pb-2">
                    {Error2 && (
                      <p style={{ color: "red" }} className="font-bold text-lg">
                        {Error2}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>

            <div className={openNewPasswordContainer ? "visible" : "hidden"}>
              <div className={true ? " flex justify-center" : "hidden"}>
                <h1 className="p-4 font-semibold text-2xl">Set Password</h1>
              </div>

              <form>
                <input
                  className="border-2  border-solid border-black rounded-lg px-2 h-12 my-4 w-full"
                  type="text"
                  placeholder="new password"
                  value={newPassword}
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <input
                  className="border-2  border-solid border-black rounded-lg px-2 h-12 my-4 w-full"
                  type="text"
                  placeholder="confirm password"
                  value={newConfirmPassword}
                  required
                  onChange={(e) => setNewConfirmPassword(e.target.value)}
                />

                <div className=" flex flex-col justify-center">
                  <button
                    onClick={continueRegister}
                    className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg"
                    type="submit"
                  >
                    Submit
                  </button>
                  <div className="flex justify-around pb-2">
                    {Error3 && (
                      <p style={{ color: "red" }} className="font-bold text-lg">
                        {Error3}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  } else {
    navigate("/dashboard");
  }
};

export default Login;
