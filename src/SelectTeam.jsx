import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import LoginNavBar from "./LoginNavBar";
import Footer from "./shared/Footer";

export default function SelectTeam() {
  const [modalOpen, setModalOpen] = useState(false);
  const [choice, setChoice] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const SERVERPATH = import.meta.env.VITE_SERVERPATH;

  useEffect(() => {
    const token = localStorage.getItem("token_for_first_time");
    const userEmail = localStorage.getItem("userEmail");

    if (token) {
      axios
        .get(`${SERVERPATH}/checkAuthentication/${userEmail}`, {
          headers: { Authorization: token },
        })
        .then((res) => {
          if (res.data.message !== "Authenticated") {
            localStorage.clear();
            navigate("/login");
          }
        })
        .catch(() => {
          localStorage.clear();
          navigate("/login");
        });
    } else {
      localStorage.clear();
      navigate("/login");
    }
  }, [navigate]);

  const trySelect = (num) => {
    setChoice(num);
    setModalOpen(true);
  };

  const confirmSelection = () => {
    setModalOpen(false);
    navigate(`${pathname}/${choice}`);
  };

  return (
    <>
      <LoginNavBar />
      <div className="login_bg">
        <div className="lg:w-2/5 md:w-2/4 sm:w-3/4 border bg-white bg-opacity-70 backdrop-filter p-6 rounded-lg shadow-lg flex flex-col items-center">
          <p className="p-4 font-semibold text-2xl">Select Team Members</p>
          <div className="flex flex-row space-x-10 px-10">
            {[1, 2].map((n) => (
              <button
                key={n}
                onClick={() => trySelect(n)}
                className="bg-red-900 text-white rounded-lg p-7 m-4 border-2 text-lg hover:bg-red-800 transition"
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md mx-auto bg-gradient-to-br from-white via-white to-gray-100 shadow-2xl rounded-xl p-8 animate-fadeIn scale-100 transition-all border border-red-300">

            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white border-4 border-red-600 rounded-full p-3 shadow-lg z-10">
              <svg
                className="h-10 w-10 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                />
              </svg>
            </div>

            <div className="text-center mt-6">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Confirm Your Team Size
              </h2>
              <p className="mt-2 text-gray-600 text-sm">
                This can’t be changed later. Choose wisely!
              </p>
            </div>

            <div className="flex justify-center items-center mt-6">
              <span className="text-6xl font-extrabold text-red-700 bg-red-100 px-6 py-3 rounded-xl shadow-inner border border-red-300 tracking-wide">
                {choice}
              </span>
            </div>
            <p className="text-center mt-2 text-gray-700 text-lg font-medium">
              {choice > 1 ? "Team Members" : "Team Member"}
            </p>

            <div className="mt-8 flex justify-around gap-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-2 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-900 font-medium shadow"
              >
                Cancel, Go Back
              </button>
              <button
                onClick={confirmSelection}
                className="px-5 py-2 rounded-md bg-red-700 text-white hover:bg-red-800 font-semibold shadow-lg"
              >
                Confirm, Proceed!
              </button>
            </div>
          </div>
        </div>
      )}




      <Footer />
    </>
  );
}
