import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function DisplayGuide(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleButtonClick = (route, name, mailId, vacancies, empId) => {
    if (parseInt(vacancies) > 0) {
      localStorage.setItem("GuideName", name);
      localStorage.setItem("GuideMailId", mailId);
      localStorage.setItem("GuideId", empId);
      navigate(currentPath + "/" + route);
    } else {
      alert("NO VACANCIES");
    }
  };

  const [serialNumber, setSerialNumber] = useState(0);

  // Increment the serial number for each entry
  const incrementSerialNumber = () => {
    setSerialNumber((prevNumber) => prevNumber + 1);
  };

  // Call the increment function once when the component mounts
  React.useEffect(() => {
    incrementSerialNumber();
  }, []);

  function getDirectLinkFromShareableLink(shareableLink) {
    try {
      const fileIdMatch = shareableLink.match(/\/uc\?id=(.*?)(&|$)/);
      if (fileIdMatch && fileIdMatch[1]) {
        const fileId = fileIdMatch[1];
        return `https://drive.google.com/thumbnail?id=${fileId}`;
      } else {
        throw new Error("Invalid shareable link format");
      }
    } catch (error) {
      // console.error("Error processing shareable link:", error.message);
      return null;
    }
  }

  return (
    <>
      <div className="lg:flex lg:flex-row lg:justify-between border-2 m-0">
        <div className="lg:w-1/12 sm:w-10% flex justify-center p-5 border-x-2">
          <p>{props.serialNumber}</p>
        </div>

        <div className="lg:w-3/12 sm:w-full flex justify-center p-5 border-x-2">
          <div className="flex flex-col items-center space-y-1 lg:text-lg sm:text-sm">
            <img
              className="object-scale-down h-40 w-30"
              src={getDirectLinkFromShareableLink(props.img)}
              height={100}
              width={100}
              alt="Guide"
            />
            <p>{props.name}</p>
            <p className="">{props.designation}</p>
            <p className="">{props.mailId}</p>
          </div>
        </div>

        <div className="lg:w-5/12 md:flex p-5 border-x-2 hidden sm:block">
          <div className="pl-5">
            <ul className="list-disc">
              <li>{props.dm1}</li>
              <li>{props.dm2}</li>
              <li>{props.dm3}</li>
            </ul>
          </div>
        </div>

        <div className="lg:w-2/12 flex flex-col sm:flex-row items-center justify-center p-5 border-x-2 font-semibold">
          <b className="block sm:hidden">Vacancies : </b>
          <p>{props.vacancies}</p>
        </div>

        <div className="lg:w-2/12 flex flex-col items-center justify-center p-5 border-x-2">
          <button
            className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg"
            key={props.empId}
            onClick={() =>
              handleButtonClick(
                props.empId,
                props.name,
                props.mailId,
                props.vacancies,
                props.empId
              )
            }
          >
            SELECT
          </button>
        </div>
      </div>

      {/* <div className="flex space-x-2 border-2 m-2">
        <h1>{props.name}</h1>
        <img src={props.img+""} height={100} width={100}></img>
                <p>No of Vacancies = {props.vacancies}</p>

        <button className="h-10 p-2 bg-red-600 text-black" key={props.empId} onClick={() => handleButtonClick(props.empId, props.name, props.mailId, props.vacancies, props.empId)}>
          SELECT
        </button>
      </div> */}
    </>
  );
}
