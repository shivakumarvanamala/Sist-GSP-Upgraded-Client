const StudentCard = ({ title, img, name, regNo, section }) => (
  <div className="bg-white rounded-xl shadow-lg mb-4 overflow-hidden min-w-80 min-h-80 transition-transform transform hover:scale-105">
    <div className="bg-[#9e1c3f] text-white py-3 text-center font-bold text-xl">
      {title}
    </div>
    <img
      src={img}
      alt="Profile"
      className="w-32 h-32 rounded-full mx-auto mt-4"
    />
    <div className="p-4 text-center">
      <p className="text-lg font-semibold text-gray-700">Name: {name}</p>
      <p className="text-lg text-gray-600">Reg No: {regNo}</p>
      <p className="text-lg text-gray-600">Section: {section}</p>
    </div>
  </div>
);

export default StudentCard;
