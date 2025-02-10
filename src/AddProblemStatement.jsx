import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "./shared/Loader";
import Alert from "./shared/Alert";
import back_arrow from "./assets/svgs/back_arrow.svg";

export default function AddProblemStatement() {
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

  const [openInputStatement, setopenInputStatement] = useState(true);

  const [problemStatements, setproblemStatements] = useState([]);

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

      const fetchProblemStudents = async () => {
        const res = await axios.post(
          SERVERPATH +
            "/staffLogin/staffDashboard/fetchProblemStatements/" +
            userEmail
        );
        // console.warn(res.data)
        setproblemStatements(res.data.problemStatements);
      };

      fetchProblemStudents();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      navigate("/staff_login");
    }
  }, []);

  const userEmail = localStorage.getItem("guideMailId");

  //   const handleSubmit = (e) => {
  //     setError3("");
  //     e.preventDefault();
  //     // console.warn(formData);
  //     if(formData.newPassword!==formData.confirmPassword){
  //         setError3("Password doesn't match!")
  //         alertDelay();
  //     }
  //     else if(formData.newPassword==formData.confirmPassword){
  //         updatePassword();
  //     }
  //   }

  const [problem, setProblem] = useState("");
  const addProblemStatement = async (e) => {
    e.preventDefault();
    console.warn(problem);
    setisLoading(true);
    const res = await axios.post(
      SERVERPATH +
        "/staffLogin/staffDashboard/addProblemStatements/" +
        userEmail,
      { problemStatement: problem }
    );
    setisLoading(false);
    // console.warn(res.data)
    setAlert(true);
    if (res.data.message == "Success") {
      setAlertMessage("Submitted Successfully!");
      setAlertType("success");
    } else {
      setAlertMessage("Failed to Submit!");
      setAlertType("fail");
    }
    alertDelay();
    setproblemStatements([...problemStatements, problem]);
    setProblem("");
    setopenInputStatement(!openInputStatement);
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
      <div className="flex flex-row items-center justify-center  p-10">
        <div className="py-10 md:px-20 px-10 border-2 border-black w-fit">
          <p className="flex flow-row items-center justify-center font-bold text-xl">
            Problem Statements
          </p>
          <div className="">
            <div className="border-2 border-solid border-black min-h-12 h-auto md:px-8 my-4 w-full">
              {problemStatements.length > 0 ? (
                problemStatements.map((item, index) => {
                  return (
                    <p className="p-2 font-semibold capitalize pt-4">
                      {parseInt(index) + 1} . {item}
                    </p>
                  );
                })
              ) : (
                <p className="p-2 text-2xl capitalize font-bold">
                  Not added any Problem Statements!
                </p>
              )}
            </div>
          </div>
          <div
            className={`flex justify-center ${
              openInputStatement ? "" : "hidden"
            }`}
          >
            <button
              onClick={() => {
                setopenInputStatement(!openInputStatement);
              }}
              className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg"
            >
              Add
            </button>
          </div>
          <form>
            <div
              className={`flex flex-col justify-center ${
                openInputStatement ? "hidden" : ""
              }`}
            >
              <input
                className="border-2 border-solid border-black h-12 px-2 my-4 w-full"
                type="text"
                placeholder="problem statement..."
                value={problem}
                required
                onChange={(e) => {
                  setProblem(e.target.value);
                  // console.warn(formData)
                }}
              />

              <button
                onClick={addProblemStatement}
                className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg"
              >
                Submit
              </button>
            </div>
          </form>

          {/* 
                <div className="flex flow-row items-center justify-center">
                <button type="submit" className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg">
                    Submit
                </button>

                </div>
                <div className="flex justify-around pb-2">
                            {Error3 && <p style={{ color: 'red' }} className="font-bold text-lg">{Error3}</p>}
                  </div> */}
        </div>
      </div>
    </>
  );
}
