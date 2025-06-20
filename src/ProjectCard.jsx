import { useNavigate } from "react-router-dom";
import BgImage from "./assets/card_bg.jpg";

/* eslint-disable react/prop-types */
export const ProjectCard = ({
  team,
  projectId,
  projectTitle,
  projectDomain,
  studentOneImg,
  studentTwoImg,
  regNoOne,
  studentOne,
  regNoTwo,
  studentTwo,
}) => {
  const navigate = useNavigate();

  function getDirectLinkFromShareableLinkStudent(shareableLink) {
    try {
      const fileIdMatch = shareableLink.match(/\/file\/d\/(.*?)\//);
      if (fileIdMatch && fileIdMatch[1]) {
        const fileId = fileIdMatch[1];
        return `https://drive.google.com/thumbnail?id=${fileId}`;
      } else {
        throw new Error("Invalid shareable link format");
      }
    } catch (error) {
      return null;
    }
  }

  return (
    <div className="space-y-4 w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-md shadow-lg hover:shadow-md transition-shadow min-h-[24rem] flex flex-col justify-between">
      <div className="relative flex w-full h-[12rem] justify-center items-center mb-4">
        <img
          className="absolute object-cover object-center w-full h-full rounded-t-md"
          src={BgImage}
          alt="Bg-image"
        />
        <div className={`flex ${team ? "gap-4" : "gap-0"} sm:gap-4 relative items-center justify-center`}>
          <img
            className="w-[8rem] sm:w-[7rem] md:w-[9rem] border-2 border-slate-400 rounded-full"
            src={getDirectLinkFromShareableLinkStudent(studentOneImg) || "/student_fallback_image.jpg"}
            alt="Student One"
          />
          {team && (
            <img
              className="w-[8rem] sm:w-[7rem] md:w-[9rem] border-2 border-slate-400 rounded-full"
              src={getDirectLinkFromShareableLinkStudent(studentTwoImg) || "/student_fallback_image.jpg"}
              alt="Student Two"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 p-4 text-center flex-grow">
        <p className="text-lg font-medium text-gray-600">
          Project ID: {projectId}
        </p>
        <p className="text-xl font-semibold text-gray-600 capitalize min-h-[4.5rem] flex flex-col justify-center items-center">
          {studentOne} ({regNoOne})
          <span className="block h-[1.5rem]">
            {team ? `${studentTwo} (${regNoTwo})` : ""}
          </span>
        </p>
      </div>
      <h2 className="text-center p-2 text-xl font-medium capitalize">
        Title: {projectTitle}
      </h2>
      <p className="text-center p-2 text-base text-gray-700 capitalize">
        Domain: {projectDomain}
      </p>
      <div className="flex items-center justify-center w-full pb-2">
        <button
          onClick={() => {
            localStorage.setItem("projectId", projectId);
            navigate('/staff_dashboard/profile_details');
          }}
          className="w-[95%] h-10 flex items-center justify-center bg-[#fd4e00] rounded-md font-semibold text-white hover:scale-[1.01] active:scale-[0.99] hover:shadow-lg transition-all"
        >
          Profile Details
        </button>
      </div>
    </div>
  );
};
