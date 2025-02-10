import { useNavigate } from "react-router-dom";
import LoginNavBar from "./LoginNavBar";
import Footer from "./shared/Footer";

export default function Home() {
  const navigate = useNavigate();

  const GoLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <>
      <LoginNavBar />

      <div className="login_bg s:p-20 py-4">
        <div className=" border p-6 bg-white bg-opacity-80 backdrop-filter rounded-lg shadow-lg font-semibold">
          <br></br>
          {/* <p className="font-bold text-red-600 text-center text-4xl p-0">Vacancies Have Been Updated Please Complete Your Registration</p> */}
          <div className="hidden">
            <p className="font-semibold text-center text-2xl p-0">
              Registration Process for Students
            </p>
            <br></br>
            <li>
              Register with the mail id which is given to placement cell and
              password is your register number.
            </li>
            <li>
              You will receive OTP to your mail. Enter and submit. Kindly check
              in your spam mails and inbox.
            </li>
            <li>Enter new password, confirm password and then submit.</li>
            <li>Select Team or Single.</li>
            <li>Select a guide who have vacancies.</li>
            <li>Enter project Details.</li>
            <li>
              If you are doing project alone, Enter your details and submit.
            </li>
            <li>If not, Enter team member 1 details first.</li>
            <li>
              Enter second person mail id which is given to placement cell and
              click on verify.
            </li>
            <li> You are not allowed to change your register number.</li>
            <li>
              An OTP will be sent to the second team member's email, which
              should then be entered and submitted.
            </li>
            <br></br>
            <p>NOTE:</p>
            {/* <br></br> */}
            <li>
              Registration will not be processed if the second member's email is
              already registered.
            </li>
            <li>
              When you click on submit, if a registration with the current team
              member's email is detected on any device, both registrations are
              terminated. You have to restart the process again.
            </li>
            <br></br>
            <p className="font-semibold text-center text-2xl p-0">
              Login Process for Students
            </p>
            <br></br>
            <li>
              Use the password that you setup in your registration process.
            </li>
            <li>You are redirected to your dashboard.</li>
            <li>
              If second member of a team want to access the dashboard, login
              with the first member mailid and password or with team id and
              password.
            </li>
            <br></br>
          </div>

          <div>
            <p className="font-semibold text-center text-2xl p-0">
              Instructions For Students⚡⚡
            </p>

            <br></br>

            <p>
              {" "}
              1. Chapter 1 - Introduction - Page number starts with 1 from this
              page onwards.
            </p>
            <p>
              {" "}
              2. Inform everyone to follow the same chapter headings as in
              Template given. (subdivisions can vary).
            </p>
            <p>
              {" "}
              3. Under Chapter 3, inside 3.1, they can include OBJECTIVE of the
              Project and its necessity.
            </p>
            <p>
              {" "}
              4. From the first page till List of Tables, the page numbers will
              be in Roman letters. From Chapter 1 onwards, digits based
              numbering style.
            </p>
            <p> 5. Instruct the students to strictly adhere to the template.</p>
          </div>
          <br></br>

          <div className=" lg:flex lg:flex-row justify-center space-x-3 flex-col space-y-2">
            <a
              href="https://drive.google.com/file/d/1LQzZmfyRaHpW9nJTVAXIVSpXXsa-Ztk3/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-red-900 text-white px-6 py-2 mt-4 rounded-md my-2 text-lg">
                Project-Report Template
              </button>
            </a>
            <a
              href="https://docs.google.com/presentation/d/1cobAi_62TYNG96NgALy9NnjIifKzlaG2/edit?usp=sharing&ouid=113013420184703351472&rtpof=true&sd=true"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg">
                PPT Template
              </button>
            </a>
            <a
              href="https://docs.google.com/spreadsheets/d/14aITm8U3IT1iApeSQRlPKDQIhE3xg2NM/edit?usp=sharing&ouid=113013420184703351472&rtpof=true&sd=true"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg">
                Staff Mail Id's
              </button>
            </a>
            <a
              href="https://drive.google.com/file/d/1OiR_xbgeQHJhvG4ecPywEmccnnWHwzcI/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg">
                Exam Schedule
              </button>
            </a>

            <a>
              <button
                onClick={GoLogin}
                className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg"
              >
                Student Login
              </button>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

// ppt - https://docs.google.com/presentation/d/1cobAi_62TYNG96NgALy9NnjIifKzlaG2/edit?usp=sharing&ouid=113013420184703351472&rtpof=true&sd=true
// staff mailids - https://docs.google.com/spreadsheets/d/14aITm8U3IT1iApeSQRlPKDQIhE3xg2NM/edit?usp=sharing&ouid=113013420184703351472&rtpof=true&sd=true
// projectreport template -https://drive.google.com/file/d/1LQzZmfyRaHpW9nJTVAXIVSpXXsa-Ztk3/view?usp=sharing
// shedule - https://drive.google.com/file/d/1OiR_xbgeQHJhvG4ecPywEmccnnWHwzcI/view?usp=sharing
