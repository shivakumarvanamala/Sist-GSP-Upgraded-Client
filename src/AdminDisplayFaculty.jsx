export default function DisplayGuide(props) {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const currentPath = location.pathname;

  // const handleButtonClick = (route, name, mailId, vacancies, empId) => {
  //   if (parseInt(vacancies) > 0) {
  //     localStorage.setItem("GuideName", name);
  //     localStorage.setItem("GuideMailId", mailId);
  //     localStorage.setItem("GuideId", empId);
  //     navigate(currentPath + "/" + route);
  //   } else {
  //     alert("NO VACANCIES");
  //   }
  // };

  const getDirectLinkFromShareableLink = (shareableLink) => {
    try {
      const fileIdMatch = shareableLink.match(/\/uc\?id=(.*?)(&|$)/);
      if (fileIdMatch && fileIdMatch[1]) {
        return `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}`;
      }
    } catch (error) {
      return null;
    }
  };

  const isVacant = parseInt(props.vacancies) > 0;
  // console.log("maxteams", props.maxTeams)

  return (
    <div className="flex flex-col lg:flex-row border rounded-xl overflow-hidden ">

      {/* Serial Number */}
      <div className="lg:w-1/12 flex items-center justify-center bg-gray-100 p-4 text-xl font-bold text-gray-800 border-r">
        {props.serialNumber}
      </div>

      {/* Guide Info */}
      <div className="lg:w-3/12 flex flex-col items-center justify-center p-4 border-r text-center space-y-2">
        <img
          className="object-cover h-28 w-28 rounded-full shadow"
          src={getDirectLinkFromShareableLink(props.img) || "/faculty_fallback_image.jpeg"}
          alt="Guide"
        />
        <p className="text-lg font-semibold text-red-800">{props.name}</p>
        <p className="text-sm text-gray-600">{props.designation}</p>
        <p className="text-sm text-blue-700 underline">{props.mailId}</p>
      </div>

      {/* Domains */}
      <div className="lg:w-5/12 hidden md:flex items-center p-4 border-r">
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li>{props.dm1}</li>
          <li>{props.dm2}</li>
          <li>{props.dm3}</li>
        </ul>
      </div>

      {/* Vacancies */}
      <div className="lg:w-2/12 flex flex-col sm:flex-row items-center justify-center p-4 border-r space-y-1 sm:space-y-0 sm:space-x-2">
        <span className="text-sm text-gray-500 font-medium sm:hidden">Vacancies:</span>
        <p className="text-base text-gray-800">
          Slots Remaining: <span className={`font-bold ${isVacant ? 'text-red-700' : 'text-gray-400'}`}>{props.vacancies > 0 ? props.vacancies : 0}</span>
        </p>
      </div>

      {/* Max Teams */}
      <div className="lg:w-2/12 flex flex-col sm:flex-row items-center justify-center p-4 border-r space-y-1 sm:space-y-0 sm:space-x-2">
        <span className="text-sm text-gray-500 font-medium sm:hidden">Max Teams:</span>
        <p className="text-base text-gray-800">
          Teams: <span className={`font-bold`}>{props.MaxTeams}</span>
        </p>
      </div>

      {/* Button */}
      <div className="lg:w-2/12 flex items-center justify-center p-4">
        <button
          disabled={!isVacant}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200
            ${isVacant
              ? 'bg-[#9e1c3f] text-white hover:scale-105 hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
        // onClick={() =>
        //   handleButtonClick(
        //     props.empId,
        //     props.name,
        //     props.mailId,
        //     props.vacancies,
        //     props.empId
        //   )
        // }
        >
          {isVacant ? "AVAILABLE" : "FULL"}
        </button>
      </div>
    </div>
  );
}
