import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DisplayGuide from "./DisplayGuide";
import LoginNavBar from "./LoginNavBar";
import Footer from "./shared/Footer";
import LoadingScreen from "./shared/Loader";

export default function SingleRegister() {
  const SERVERPATH = import.meta.env.VITE_SERVERPATH;
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [vacancyFilter, setVacancyFilter] = useState("");
  const [vacancyInputValue, setVacancyInputValue] = useState("");
  const [guideDict, setGuideDict] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;
  const navigate = useNavigate();

  // const getData = async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await axios.get(`${SERVERPATH}/guide_list`, {
  //       params: { page, limit, search: searchQuery },
  //     });
  //     setGuideDict(res.data.guides);
  //     setTotalPages(res.data.totalPages);
  //   } catch (err) {
  //     console.warn(err);
  //   }
  //   setIsLoading(false);
  // };

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${SERVERPATH}/guide_list`, {
        params: { page, limit, search: searchQuery, minVacancies: vacancyFilter },
      });
      // console.log("Fetched data:", res.data); 

      // ✅ FIX: check correct keys from backend response
      if (res.data && Array.isArray(res.data.guides)) {
        setGuideDict(res.data.guides);
        setTotalPages(res.data.totalPages || 1); // fallback just in case
      } else {
        setGuideDict([]); // handle unexpected structure
        setTotalPages(1);
      }
    } catch (err) {
      console.warn("Error fetching guide list:", err);
      setGuideDict([]); // fail-safe
      setTotalPages(1);
    }
    setIsLoading(false);
  };


  useEffect(() => {
    const token = localStorage.getItem("token_for_first_time");
    const userEmail = localStorage.getItem("userEmail");
    if (token) {
      const headers = { Authorization: token };
      axios
        .get(`${SERVERPATH}/checkAuthentication/${userEmail}`, { headers })
        .then((res) => {
          if (res.data.message !== "Authenticated") {
            localStorage.clear();
            navigate("/login");
          } else {
            getData();
          }
        });
    } else {
      localStorage.clear();
      navigate("/login");
    }
  }, []);

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
      <LoginNavBar />

      <div className="bg-[#9e1c3f] flex flex-col lg:flex-row items-center justify-between mt-1 mb-5 px-4 py-3 sticky top-0 z-50 shadow-md space-y-3 lg:space-y-0">
        <div className="flex flex-row items-center justify-center">
          <h1 className="text-white font-semibold text-xl lg:text-2xl">Select Your Guide</h1>
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

      <div className="lg:flex md:flex md:flex-row lg:flex-row justify-between border-2 m-0 hidden sm:block">
        <div className="lg:w-1/12 sm:w-1/10 flex justify-center p-5 border-x-2 font-semibold lg:text-lg sm:text-sm">
          <p>Sl. No</p>
        </div>
        <div className="lg:w-3/12 sm:w-6/10 flex justify-center p-5 border-x-2 font-semibold">
          <p>Guide Name</p>
        </div>
        <div className="lg:w-5/12 md:flex justify-center p-5 border-x-2 font-semibold hidden sm:block">
          <p>Specialization</p>
        </div>
        <div className="lg:w-2/12 flex sm:w-1/10 justify-center p-5 border-x-2 font-semibold">
          <p>Guide Vacancies</p>
        </div>
        <div className="lg:w-2/12 sm:w-2/10 flex justify-center p-5 border-x-2 font-semibold">
          <p>Select</p>
        </div>
      </div>

      {guideDict.map((item, idx) => (
        <DisplayGuide
          key={item.id}
          serialNumber={guideSerialNumber + idx}
          empId={item.EMPID}
          name={capitalizeNameOnly(item.NAME)}
          img={item.IMAGE}
          vacancies={item.VACANCIES}
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
