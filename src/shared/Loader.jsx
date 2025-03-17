// import "./LoadingScreen.css"; // Import CSS file with animation styles

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center cursor-not-allowed bg-black bg-opacity-50 z-50">
      <div className="flex space-x-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-6 h-6 rounded-full animate-custom-bounce"
            style={{
              background: "linear-gradient(135deg, #ff3131, #8b0000)", // Modern red gradient
              animationDelay: `${i * 0.2}s`,
              filter: "drop-shadow(0px 0px 12px rgba(255, 48, 48, 0.7))", // Soft red glow
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;

// const LoadingScreen = () => {
//   return (
//     <div>
//       <div className="fixed w-full min-h-screen z-50 bg-black opacity-30" />
//       <div className="flex fixed w-full justify-center items-center h-screen">
//         <div className="loading-container">
//           <div className="loading-circle"></div>
//           <div className="loading-circle"></div>
//           <div className="loading-circle"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoadingScreen;

// const LoadingScreen = () => {
//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
//       <div className="flex space-x-2">
//         <div className="w-4 h-4 bg-red-700 rounded-full animate-bounce"></div>
//         <div className="w-4 h-4 bg-red-700 rounded-full animate-bounce delay-150"></div>
//         <div className="w-4 h-4 bg-red-700 rounded-full animate-bounce delay-300"></div>
//       </div>
//     </div>
//   );
// };

// export default LoadingScreen;

// const LoadingScreen = () => {
//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
//       <div className="flex space-x-3">
//         {[...Array(3)].map((_, i) => (
//           <div
//             key={i}
//             className="w-6 h-6 bg-red-600 rounded-full animate-custom-bounce"
//             style={{
//               animationDelay: `${i * 0.2}s`,
//               filter: "drop-shadow(0px 0px 8px rgba(255, 0, 0, 0.6))",
//             }}
//           ></div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LoadingScreen;
