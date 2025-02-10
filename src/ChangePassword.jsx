import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "./shared/Loader";
import Alert from "./shared/Alert";
import back_arrow from "./assets/svgs/back_arrow.svg";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [Error3, setError3] = useState("");
  const navigate = useNavigate();

  const SERVERPATH = import.meta.env.VITE_SERVERPATH;

  const [isLoading, setisLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [alertType, setAlertType] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("guideMailId");

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
      navigate("/staff_login");
    }
  }, []);

  const userEmail = localStorage.getItem("guideMailId");
  const updatePassword = async () => {
    setisLoading(true);
    const res = await axios.post(SERVERPATH + "/staffCredential/" + userEmail, {
      password: formData.newPassword,
    });
    setisLoading(false);
    // console.warn(res.data)
    setAlert(true);

    if (res.data.message === "Success") {
      setAlertMessage("Submitted Successfully!");
      setAlertType("success");
      setFormData({ newPassword: "", confirmPassword: "" });
    } else {
      setAlertMessage("Failed to Submit!");
      setAlertType("fail");
    }
    alertDelay();
  };

  const handleSubmit = (e) => {
    setError3("");
    e.preventDefault();
    // console.warn(formData);
    if (formData.newPassword !== formData.confirmPassword) {
      setError3("Password doesn't match!");
      alertDelay();
    } else if (formData.newPassword == formData.confirmPassword) {
      updatePassword();
    }
  };

  const alertDelay = () => {
    setTimeout(() => {
      setError3("");
      setAlert(false);
    }, 5000); // 3000 milliseconds = 3 seconds
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div
        className={`flex items-center justify-center ${alert ? "" : "hidden"} `}
      >
        <Alert type={alertType} message={alertMessage} />
      </div>
      <div className="hidden md:fixed md:w-fit md:h-full md:left-1 md:top-[5rem] md:flex md:items-center md:justify-center md:cursor-pointer">
        <a href="/staff_dashboard/" className="w-fit h-fit">
          <img
            className="bg-slate-200 m-4 p-2 w-10 rounded-full hover:bg-slate-300 hover:shadow-md"
            src={back_arrow}
            alt="⬅️"
            title="Go back"
          ></img>
        </a>
      </div>
      <div className="flex flex-row items-center justify-center pt-10">
        <div className="py-10 px-20 border-2 border-black w-fit">
          <form onSubmit={handleSubmit}>
            <p className="flex flow-row items-center justify-center font-bold text-xl">
              Change Password
            </p>
            <div className="">
              <input
                className="border-2 border-solid border-black h-12 px-2 my-4 w-full"
                type="text"
                placeholder="new password"
                value={formData.newPassword}
                required
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
              />
            </div>

            <div className="">
              <input
                className="border-2 border-solid border-black h-12 px-2 my-4 w-full"
                type="text"
                placeholder="confirm password"
                value={formData.confirmPassword}
                required
                onChange={(e) => {
                  setFormData({ ...formData, confirmPassword: e.target.value });
                  // console.warn(formData)
                }}
              />
            </div>

            <div className="flex flow-row items-center justify-center">
              <button
                type="submit"
                className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg"
              >
                Submit
              </button>
            </div>
            <div className="flex justify-around pb-2">
              {Error3 && (
                <p style={{ color: "red" }} className="font-bold text-lg">
                  {Error3}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
