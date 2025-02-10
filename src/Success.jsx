import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  localStorage.removeItem("token_for_first_time");
  localStorage.removeItem("token");
  localStorage.removeItem("GuideName");
  localStorage.removeItem("GuideMailId");
  localStorage.removeItem("userMailId");
  localStorage.removeItem("newPassword");
  localStorage.removeItem("userMailId");
  localStorage.removeItem("GuideId");
  localStorage.removeItem("GuideImage");
  localStorage.removeItem("userSection");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("GuideId");
  localStorage.removeItem("userRegNo");
  localStorage.removeItem("userPhoneNo");
  localStorage.removeItem("userName");






  const GoLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="text-lg border-2 m-2 text-white  text-center align-middle justify-center rounded-lg border-black shadow-lg shadow-gray-300 sha">
        <div className="border rounded-lg bg-[#9e1c3f] m-3 py-16">
          <h1>You have successfully completed filling the form.</h1>
          <h1>Contact your project coordinator for further process.</h1>
          <h1>Thank you!!</h1>
          <button
            onClick={GoLogin}
            className=" p-4 bg-white text-black mt-6 shadow-md rounded-md shadow-gray-400"
          >
            Back to Login
          </button>
        </div>
      </div>
    </>
  );
}
