import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingScreen from "../shared/Loader";
import AdminNavbar from "./AdminNavbar";

function AdminAddFaculty() {
  const SERVERPATH = import.meta.env.VITE_SERVERPATH;

  const [facultyName, setFacultyName] = useState("");
  const [universityEmail, setUniversityEmail] = useState("");
  const [empId, setEmpId] = useState("");
  const [designation, setDesignation] = useState("");
  const [domain1, setDomain1] = useState("");
  const [domain2, setDomain2] = useState("");
  const [domain3, setDomain3] = useState("");
  const [imageDriveLink, setImageDriveLink] = useState("");
  const [totalBatches, setTotalBatches] = useState("");
  const [maxTeams, setMaxTeams] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminMailId = localStorage.getItem("adminMailId");

    if (token) {
      const headers = { Authorization: `${token}` };
      const func = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            SERVERPATH + "/checkAuthentication/" + adminMailId,
            { headers }
          );
          if (response.data.message !== "Authenticated") {
            localStorage.removeItem("token");
            localStorage.removeItem("adminMailId");
            navigate("/");
          }
        } catch (error) {
          console.error("Authentication check failed", error);
          localStorage.removeItem("token");
          localStorage.removeItem("adminMailId");
          navigate("/");
        }
        setIsLoading(false);
      };
      func();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("adminMailId");
      navigate("/");
    }
  }, [location, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    // Validate numeric fields
    if (isNaN(totalBatches) || totalBatches <= 0) {
      setError("Total Batches must be a positive number");
      return;
    }
    if (isNaN(maxTeams) || maxTeams <= 0) {
      setError("Max Teams must be a positive number");
      return;
    }

    // Combine domains
    const fieldOfInterest = [domain1, domain2, domain3].filter(domain => domain.trim()).join("; ");

    const formData = {
      name: facultyName,
      email: universityEmail,
      empId: empId,
      designation: designation,
      fieldOfInterest: fieldOfInterest,
      imageDriveLink: imageDriveLink,
      totalBatches: parseInt(totalBatches),
      maxTeams: parseInt(maxTeams),
      password: password,
    };

    try {
      setIsLoading(true);
      const response = await axios.post(
        SERVERPATH + "/admin/add_faculty",
        formData
      );
      setMessage(response.data.message);
      // Clear all form fields
      setFacultyName("");
      setUniversityEmail("");
      setEmpId("");
      setDesignation("");
      setDomain1("");
      setDomain2("");
      setDomain3("");
      setImageDriveLink("");
      setTotalBatches("");
      setMaxTeams("");
      setPassword("");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Something went wrong.");
      } else {
        setError("Failed to connect to the server.");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {isLoading && <LoadingScreen />}
      <AdminNavbar />

      <div className="py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Add New Faculty</h1>
          </div>

          {/* Form Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Personal Information Section */}
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                    Personal Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Faculty Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={facultyName}
                      onChange={(e) => setFacultyName(e.target.value)}
                      placeholder="Dr. John Smith"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      University Email ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={universityEmail}
                      onChange={(e) => setUniversityEmail(e.target.value)}
                      placeholder="john.smith@university.edu"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Employee ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={empId}
                      onChange={(e) => setEmpId(e.target.value)}
                      placeholder="EMP2024001"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Designation <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="Professor / Assistant Professor"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50"
                    />
                  </div>
                </div>
              </div>

              {/* Fields of Interest Section */}
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Fields of Interest
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">Specify up to three primary domains of expertise</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Domain 1 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={domain1}
                      onChange={(e) => setDomain1(e.target.value)}
                      placeholder="Machine Learning"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Domain 2
                    </label>
                    <input
                      type="text"
                      value={domain2}
                      onChange={(e) => setDomain2(e.target.value)}
                      placeholder="Data Science"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Domain 3
                    </label>
                    <input
                      type="text"
                      value={domain3}
                      onChange={(e) => setDomain3(e.target.value)}
                      placeholder="Artificial Intelligence"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Details Section */}
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                    Professional Details
                  </h2>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Profile Image Drive Link <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    value={imageDriveLink}
                    onChange={(e) => setImageDriveLink(e.target.value)}
                    placeholder="https://drive.google.com/file/d/..."
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/50"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Total Batches <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={totalBatches}
                      onChange={(e) => setTotalBatches(e.target.value)}
                      placeholder="5"
                      required
                      min="1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Maximum Teams <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={maxTeams}
                      onChange={(e) => setMaxTeams(e.target.value)}
                      placeholder="5"
                      required
                      min="1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/50"
                    />
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Security
                  </h2>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter secure password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/50"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  Create Faculty Profile
                </button>
              </div>
            </form>

            {/* Status Messages */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-700 text-center font-medium flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              </div>
            )}

            {message && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-green-700 text-center font-medium flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {message}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className="w-full h-fit bg-slate-100 text-black text-center ">
        &copy; {new Date().getFullYear()} Sathyabama University. All rights
        reserved.
      </footer>
    </div>
  );
}

export default AdminAddFaculty;