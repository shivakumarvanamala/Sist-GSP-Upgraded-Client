import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import jwtDecode from "jwt-decode";

import axios from "axios";

import DisplayGuide from "./DisplayGuide";
import LoginNavBar from "./LoginNavBar";
import Footer from "./shared/Footer";

import LoadingScreen from "./shared/Loader";

export default function SingleRegister() {
  const SERVERPATH = import.meta.env.VITE_SERVERPATH;

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGuides, setFilteredGuides] = useState([]);

  const [guideDict, setGuideDict] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(SERVERPATH + "/guide_list");
      setGuideDict(response.data.sort((a, b) => a.SL - b.SL));
    } catch (err) {
      console.warn(err);
    }
    setIsLoading(false);
  };

  // useEffect(() => {
  //   const checkToken = async () => {
  //     const token = localStorage.getItem("token_for_first_time");

  //     if (token) {
  //       const decodedToken = jwtDecode(token);
  //       const expirationTime = decodedToken.exp * 1000;

  //       if (expirationTime < Date.now()) {
  //         localStorage.removeItem("token");
  //         localStorage.removeItem("GuideName");
  //         localStorage.removeItem("GuideMailId");
  //         localStorage.removeItem("userMailId");
  //         localStorage.removeItem("newPassword");
  //         navigate("/login");
  //       }
  //     } else {
  //       navigate("/login");
  //     }
  //   };

  //   checkToken();
  //   getData();
  // }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token_for_first_time");
    const userEmail = localStorage.getItem("userEmail");

    if (token) {
      const headers = {
        Authorization: `${token}`,
      };
      const func = async () => {
        const response = await axios.get(
          SERVERPATH + "/checkAuthentication/" + userEmail,
          { headers }
        );
        if (response.data.message == "Authenticated") {
          // console.warn(("hiii"))
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("userEmail");
          navigate("/login");
        }
      };
      func();
      getData();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    // Filter guides based on the search query
    const filteredGuides = guideDict.filter((guide) =>
      guide["NAME"].toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredGuides(filteredGuides);
  }, [searchQuery, guideDict]);

  let guideSerialNumber = 1;

  function capitalizeEachWord(str) {
    return str.replace(/\w+/g, (word) => {
      const firstLetter = word.charAt(0).toUpperCase();
      const restOfWord = word.slice(1).toLowerCase();
      return firstLetter + restOfWord;
    });
  }

  function capitalizeNameOnly(name) {
    const words = name.split(" ");

    const capitalizedWords = words.map((word, index) => {
      const titleMatch = word.match(/^(Mr\.|Mrs\.|Dr\.|Ms\.)(.*)/i);

      if (titleMatch) {
        // If there is a title, keep it unchanged
        const title = titleMatch[1];
        const capitalizedRest = titleMatch[2]
          ? titleMatch[2][0].toUpperCase() +
            titleMatch[2].slice(1).toUpperCase()
          : "";

        return title + capitalizedRest;
      } else {
        // If no title, capitalize the entire word
        return word.toUpperCase();
      }
    });

    return capitalizedWords.join(" ");
  }

  return (
    <>
      {isLoading && <LoadingScreen />}
      <LoginNavBar />
      {/* {console.warn("dict" + guideDict)} */}

      {/* <h1>Single Registration Form</h1> */}

      <div className="bg-[#9e1c3f] flex items-center justify-between mt-5 mb-5">
        <div className="flex flex-row items-center justify-center">
          <h1 className="p-4 text-white leading-loose  font-semibold text-2xl items-center"></h1>
        </div>

        <div className="flex flex-row items-center justify-center">
          <h1 className="p-4 text-white leading-loose  font-semibold lg:text-2xl md:text-2xl items-center text-sm">
            Select Your Guide
          </h1>
        </div>
        <div className="flex flex-row items-center">
          <input
            type="text"
            placeholder="Search guide..."
            className="border-2 border-solid border-black rounded-lg px-2 h-12 my-4 mr-10 lg:w-fit md:w-fit w-40"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="lg:flex md:flex md:flex-row lg:flex-row justify-between border-2 m-0 hidden sm:block">
        <div className="lg:w-1/12 sm:w-1/10 flex justify-center p-5 border-x-2 font-semibold lg:text-lg sm:text-sm">
          <p>Sr. No.</p>
        </div>
        <div className="lg:w-3/12 sm:w-6/10 flex justify-center p-5 border-x-2 font-semibold">
          <p>Supervisor's Name</p>
        </div>
        <div className="lg:w-5/12 md:flex justify-center  p-5 border-x-2 font-semibold hidden sm:block">
          <p>Specialization</p>
        </div>
        <div className="lg:w-2/12 flex sm:w-1/10 justify-center p-5 border-x-2 font-semibold">
          <p>Guides Vacancy</p>
        </div>
        <div className="lg:w-2/12 sm:w-2/10 flex justify-center p-5 border-x-2 font-semibold">
          <p>Select</p>
        </div>
      </div>

      {filteredGuides.map((item) => {
        return (
          <DisplayGuide
            key={item["id"]}
            serialNumber={guideSerialNumber++}
            empId={item["EMPID"]}
            name={capitalizeNameOnly(item["NAME"])}
            img={item["IMAGE"]}
            vacancies={item["VACANCIES"]}
            designation={capitalizeEachWord(item["DESIGNATION"])}
            dm1={item["DOMAIN1"]}
            dm2={item["DOMAIN2"]}
            dm3={item["DOMAIN3"]}
            mailId={item["UniversityEMAILID"].toLowerCase()}
            im="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb3m_AEpNzWsxMYF_W3DiheGuLfRH9hTb4SA&usqp=CAU"
          />
        );
      })}

      <Footer />
    </>
  );
}
