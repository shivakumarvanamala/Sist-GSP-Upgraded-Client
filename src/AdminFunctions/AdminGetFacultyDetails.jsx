import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingScreen from "../shared/Loader";
import sist_logo_login from "../assets/sist_logo_login.png";
import log_out from "../assets/svgs/log_out.svg";
import Footer from "../shared/Footer";

import AdminDisplayFaculty from "../AdminDisplayFaculty"

function AdminGetFacultyDetails() {
  const SERVERPATH = import.meta.env.VITE_SERVERPATH;

  const [facultyList, setFacultyList] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [guideDict, setGuideDict] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${SERVERPATH}/admin/get_faculty_details`, {
        params: { page, limit, search: searchQuery },
      });
      setGuideDict(res.data.guides);
      // console.log(res.data.guides)
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.warn(err);
    }
    setIsLoading(false);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminMailId = localStorage.getItem("adminMailId");

    if (token) {
      const headers = { Authorization: `${token}` };
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const authResponse = await axios.get(
            `${SERVERPATH}/checkAuthentication/${adminMailId}`,
            { headers }
          );
          if (authResponse.data.message !== "Authenticated") {
            localStorage.removeItem("token");
            localStorage.removeItem("adminMailId");
            navigate("/");
          }

          // const response = await axios.get(
          //   `${SERVERPATH}/admin/get_faculty_details`,
          //   { headers }
          // );
          // setFacultyList(response.data.faculty);
        } catch (error) {
          console.error(error);
          // setError("Failed to fetch faculty details.");
        }
        setIsLoading(false);
      };
      fetchData();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("adminMailId");
      navigate("/");
    }
  }, [location, navigate]);

  useEffect(() => {
    getData();
  }, [searchQuery, page]);


  const adminLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminMailId");
    navigate("/");
  };

  const guideSerialNumber = (page - 1) * limit + 1;

  const capitalizeEachWord = (str) =>
    str.replace(/\w+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

  const capitalizeNameOnly = (name) =>
    name
      .split(" ")
      .map((word) => {
        const match = word.match(/^(Mr\.|Mrs\.|Dr\.|Ms\.)(.*)/i);
        if (match) {
          const [_, title, rest] = match;
          return title + (rest ? rest[0].toUpperCase() + rest.slice(1).toUpperCase() : "");
        } else {
          return word.toUpperCase();
        }
      })
      .join(" ");

  // return (
  //   <div className="App">
  //     {isLoading && <LoadingScreen />}
  // <nav className="bg-[#9e1c3f] text-white p-4">
  //   <div className="container mx-auto flex justify-between items-center">
  //     <div className="flex items-center">
  //       <a href="/">
  //         <img
  //           src={sist_logo_login}
  //           alt="Logo"
  //           className="h-12 w-auto float-start"
  //         />
  //       </a>
  //     </div>
  //     <div className="flex items-center relative">
  //       <button
  //         onClick={toggleDropdown}
  //         className="text-sm font-semibold rounded text-white focus:outline-none"
  //       >
  //         <svg className="h-8 w-8 text-gray-100" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>            </button>
  //       {isDropdownOpen && (
  //         <div className="absolute top-10 right-0 bg-white text-gray-800 p-2 rounded shadow-md z-10">
  //           <div className="flex flex-row justify-center items-center hover:bg-gray-200">
  //             <img className="h-4 w-4" src={log_out} alt="LogOut" />
  //             <button onClick={adminLogout} className="block p-2">
  //               Logout
  //             </button>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // </nav>

  //     <div className="login_bg px-10 flex justify-center items-center min-h-screen">
  //       <div className="lg:w-3/4 md:w-4/5 s:w-4/5 xs:w-3/4 border p-4 bg-white bg-opacity-50 backdrop-filter rounded-lg shadow-lg">
  //         <div className="block">
  //           <div className="flex justify-center">
  //             <h1 className="text-3xl font-bold text-center text-[#9e1c3f]">
  //               Faculty Details
  //             </h1>
  //           </div>
  //           {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
  //           <table className="min-w-full bg-white border border-gray-300">
  //             <thead>
  //               <tr className="bg-gray-200">
  //                 <th className="border px-4 py-2">Name</th>
  //                 <th className="border px-4 py-2">Department</th>
  //                 <th className="border px-4 py-2">Email</th>
  //                 <th className="border px-4 py-2">Phone</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {facultyList.map((faculty, index) => (
  //                 <tr key={index} className="hover:bg-gray-100">
  //                   <td className="border px-4 py-2">{faculty.name}</td>
  //                   <td className="border px-4 py-2">{faculty.department}</td>
  //                   <td className="border px-4 py-2">{faculty.email}</td>
  //                   <td className="border px-4 py-2">{faculty.phone}</td>
  //                 </tr>
  //               ))}
  //             </tbody>
  //           </table>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <>
      {isLoading && <LoadingScreen />}
      <nav className="bg-[#9e1c3f] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <a href="/">
              <img
                src={sist_logo_login}
                alt="Logo"
                className="h-12 w-auto float-start"
              />
            </a>
          </div>
          <div className="flex items-center relative">
            <button
              onClick={toggleDropdown}
              className="text-sm font-semibold rounded text-white focus:outline-none"
            >
              <svg className="h-8 w-8 text-gray-100" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>            </button>
            {isDropdownOpen && (
              <div className="absolute top-10 right-0 bg-white text-gray-800 p-2 rounded shadow-md z-100">
                <div className="flex flex-row justify-center items-center hover:bg-gray-200">
                  <img className="h-4 w-4" src={log_out} alt="LogOut" />
                  <button onClick={adminLogout} className="block p-2">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>


      <div className="bg-[#9e1c3f] flex flex-col lg:flex-row items-center justify-between mt-1 mb-5 px-4 py-3 sticky top-0 z-50 shadow-md space-y-2 lg:space-y-0">
        {/* <div className="flex flex-row items-center justify-center" /> */}
        <div className="flex flex-row items-center justify-center">
          <h1 className="text-white font-semibold text-xl lg:text-2xl">Faculty Details</h1>
        </div>
        <div className="flex flex-row items-center w-full lg:w-[40%] gap-2">
          <input
            type="text"
            placeholder="Search by guide name..."
            className="border-2 border-black rounded-lg px-4 h-12 w-full text-center"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPage(1);
                setSearchQuery(inputValue.trim());
              }
            }}
          />
          <button
            className="bg-white text-black border-2 border-black rounded-lg px-4 h-12 font-semibold"
            onClick={() => {
              setPage(1);
              setSearchQuery(inputValue.trim());
            }}
          >
            Search
          </button>
        </div>
      </div>

      <div className="lg:flex md:flex md:flex-row lg:flex-row justify-between border m-0 hidden sm:block">
        <div className="lg:w-1/12 sm:w-1/10 flex justify-center p-5 border-x font-semibold lg:text-lg sm:text-sm">
          <p>Sl. No</p>
        </div>
        <div className="lg:w-3/12 sm:w-6/10 flex justify-center p-5 border-x font-semibold">
          <p>Guide Name</p>
        </div>
        <div className="lg:w-5/12 md:flex justify-center p-5 border-x font-semibold hidden sm:block">
          <p>Specialization</p>
        </div>
        <div className="lg:w-2/12 flex sm:w-1/10 justify-center p-5 border-x font-semibold">
          <p>Guide Vacancies</p>
        </div>
        <div className="lg:w-2/12 flex sm:w-1/10 justify-center p-5 border-x font-semibold">
          <p>Max Teams</p>
        </div>
        <div className="lg:w-2/12 sm:w-2/10 flex justify-center p-5 border-x font-semibold">
          <p>Select</p>
        </div>
      </div>

      {guideDict.map((item, idx) => (
        <AdminDisplayFaculty
          key={item.id}
          serialNumber={guideSerialNumber + idx}
          empId={item.EMPID}
          name={capitalizeNameOnly(item.NAME)}
          img={item.IMAGE}
          vacancies={item.VACANCIES}
          MaxTeams={item.MaxTeams}
          designation={capitalizeEachWord(item.DESIGNATION)}
          dm1={item.DOMAIN1}
          dm2={item.DOMAIN2}
          dm3={item.DOMAIN3}
          mailId={item.UniversityEMAILID.toLowerCase()}
        />
      ))}

      <div className="flex justify-center items-center gap-6 my-8">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-5 py-2 rounded-full font-medium transition-all duration-200 border-2 ${page === 1
            ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
            : "bg-white hover:bg-[#9e1c3f] hover:text-white border-[#9e1c3f] text-[#9e1c3f]"
            }`}
        >
          ⬅ Prev
        </button>

        <span className="text-lg font-semibold text-gray-700">
          Page <span className="text-[#9e1c3f]">{page}</span> of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-5 py-2 rounded-full font-medium transition-all duration-200 border-2 ${page === totalPages
            ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
            : "bg-white hover:bg-[#9e1c3f] hover:text-white border-[#9e1c3f] text-[#9e1c3f]"
            }`}
        >
          Next ➡
        </button>
      </div>


      <Footer />
    </>
  );
}

export default AdminGetFacultyDetails;
