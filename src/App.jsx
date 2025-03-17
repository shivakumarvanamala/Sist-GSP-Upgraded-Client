import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

// Import components
import Dashboard from "./Dashboard";
// import ErrorBoundary from './ErrorBoundary';
import Login from "./Login";
import SelectTeam from "./SelectTeam";
import SingleRegister from "./SingleRegister";
import DuoRegisterForm from "./DuoRegisterForm";
import SingleRegisterForm from "./SingleRegisterForm";
import Success from "./Success";
import Home from "./Home";
import StaffLogin from "./Stafflogin";
import StaffDashboard from "./StaffDashboard";
import { NewProfileDetails } from "./NewProfileDetails";
import { TeamProfile } from "./TeamProfile";
import { TeamProfile2 } from "./TeamProfile2";

import ChangePassword from "./ChangePassword";
import AddProblemStatement from "./AddProblemStatement";
import StudentPasswordChange from "./StudentPasswordChange";
import Teambyguide from "./Teambyguide";
import Practice from "./practice";
import Admin from "./Admin";
import AdminLogin from "./AdminLogin";
import AdminAddTeam from "./AdminFunctions/AdminAddTeam";
import AdminDeleteTeam from "./AdminFunctions/AdminDeleteTeam";
import AdminAddFaculty from "./AdminFunctions/AdminAddFaculty";
import AdminUpdateFacultyVacancies from "./AdminFunctions/AdminUpdateFacultyVacancies";
import AdminGetFacultyDetails from "./AdminFunctions/AdminGetFacultyDetails";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/practice" element={<Practice />} /> */}

          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/staff_login" element={<StaffLogin />} />
          <Route path="/staff_dashboard" element={<StaffDashboard />} />

          <Route
            path="/staff_dashboard/profile_details"
            element={<NewProfileDetails />}
          />
          <Route
            path="/staff_dashboard/profile_details/team_profile"
            element={<TeamProfile />}
          />
          <Route
            path="/staff_dashboard/profile_details/team_profile2"
            element={<TeamProfile2 />}
          />

          <Route
            path="/staff_dashboard/change_password"
            element={<ChangePassword />}
          />
          <Route
            path="/staff_dashboard/add_problem_statement"
            element={<AddProblemStatement />}
          />
          <Route
            path="/staff_dashboard/select_student"
            element={<Teambyguide />}
          />

          <Route
            path="/dashboard/student_Password_change"
            element={<StudentPasswordChange />}
          />

          <Route path="/login/select_team" element={<SelectTeam />} />
          <Route path="/login/select_team/1" element={<SingleRegister />} />
          <Route path="/login/select_team/2" element={<SingleRegister />} />
          <Route
            path="/login/select_team/1/:id"
            element={<SingleRegisterForm />}
          />
          <Route
            path="/login/select_team/2/:id"
            element={<DuoRegisterForm />}
          />
          <Route
            path="/login/select_team/1/:id/success"
            element={<Success />}
          />
          <Route
            path="/login/select_team/2/:id/success"
            element={<Success />}
          />

          <Route path="//admin_login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/add_team" element={<AdminAddTeam />} />
          <Route path="/admin/delete_team" element={<AdminDeleteTeam />} />
          <Route path="/admin/add_faculty" element={<AdminAddFaculty />} />
          <Route
            path="/admin/update_faculty_vacancies"
            element={<AdminUpdateFacultyVacancies />}
          />
          <Route
            path="/admin/get_faculty_details"
            element={<AdminGetFacultyDetails />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
