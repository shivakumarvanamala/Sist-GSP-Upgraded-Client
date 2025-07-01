import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingScreen from "../shared/Loader";

import AdminNavbar from "./AdminNavbar";
import Footer from "../shared/Footer";

import AdminDisplayFaculty from "../AdminDisplayFaculty"

function AdminGetFacultyDetails() {
  const SERVERPATH = import.meta.env.VITE_SERVERPATH;

  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [vacancyFilter, setVacancyFilter] = useState("");
  const [vacancyInputValue, setVacancyInputValue] = useState("");
  const [guideDict, setGuideDict] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${SERVERPATH}/admin/get_faculty_details`, {
        params: { page, limit, search: searchQuery, minVacancies: vacancyFilter },
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

  // const toggleDropdown = () => {
  //   setDropdownOpen(!isDropdownOpen);
  // };

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
  }, [searchQuery, vacancyFilter, page]);

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

  const handleSearch = () => {
    setPage(1);
    setSearchQuery(inputValue.trim());
    setVacancyFilter(vacancyInputValue.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearFilters = () => {
    setInputValue("");
    setVacancyInputValue("");
    setSearchQuery("");
    setVacancyFilter("");
    setPage(1);
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <AdminNavbar />
      <div className="bg-[#9e1c3f] flex flex-col lg:flex-row items-center justify-between mt-1 mb-5 px-4 py-3 sticky top-0 z-50 shadow-md space-y-3 lg:space-y-0">
        <div className="flex flex-row items-center justify-center">
          <h1 className="text-white font-semibold text-xl lg:text-2xl">Faculty Details</h1>
        </div>
        <div className="flex flex-col lg:flex-row items-center w-full lg:w-[50%] gap-3">
          <div className="flex flex-row items-center w-full gap-3">
            <input
              type="text"
              placeholder="Search by guide name..."
              className="border-2 border-white rounded-lg px-4 h-11 w-full text-center bg-white/90 backdrop-blur-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <input
              type="number"
              placeholder="Min vacancies"
              min="0"
              className="border-2 border-white rounded-lg px-3 h-11 w-32 text-center bg-white/90 backdrop-blur-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              value={vacancyInputValue}
              onChange={(e) => setVacancyInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="flex flex-row gap-2">
            <button
              className="bg-white text-[#9e1c3f] rounded-lg px-5 h-11 font-semibold hover:bg-white/90 transition-all shadow-md"
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              className="bg-white/20 text-white border border-white/30 rounded-lg px-4 h-11 font-medium hover:bg-white/30 transition-all"
              onClick={clearFilters}
              title="Clear Filters"
            >
              Clear
            </button>
          </div>
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
          <p>Alloted Batches</p>
        </div>
        <div className="lg:w-2/12 flex sm:w-1/10 justify-center p-5 border-x font-semibold">
          <p>Guide Vacancies</p>
        </div>
        <div className="lg:w-2/12 sm:w-2/10 flex justify-center p-5 border-x font-semibold">
          <p>Update Vacancies</p>
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
          AllotedBatches={item.AllotedBatches}
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