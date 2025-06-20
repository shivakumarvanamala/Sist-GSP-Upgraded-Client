const GuideCard = ({ img, name, email, problemStatements }) => (
  <div className="group relative w-full max-w-sm">
    <div className="h-full w-full rounded-xl shadow-lg transition-all duration-500 transform [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
      <div className="inset-0 bg-white rounded-xl p-6 text-center">
        <div className="bg-[#9e1c3f] text-white py-3 text-xl font-bold rounded-t-xl">
          Guide Details
        </div>
        <img
          src={img}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mt-4"
        />
        <p className="text-lg text-gray-700 font-semibold">{name}</p>
        <p className="text-lg text-gray-600">{email}</p>
        <a className="underline text-blue-600 cursor-pointer mt-2 block">
          View Problem Statements
        </a>
      </div>
      <div className="absolute inset-0 bg-white rounded-xl p-6 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
        <div className="bg-[#9e1c3f] text-white py-3 text-xl font-bold rounded-t-xl">
          Problem Statements
        </div>
        <div className="px-4 overflow-y-auto max-h-48">
          {problemStatements.length > 0 ? (
            problemStatements.map((item, index) => (
              <p key={index} className="p-2 font-semibold capitalize">
                {index + 1}. {item}
              </p>
            ))
          ) : (
            <p className="p-4 text-2xl font-bold">No Problem Statements!</p>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default GuideCard;
