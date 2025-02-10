import "./LoadingScreen.css"; // Import CSS file with animation styles

const LoadingScreen = () => {
  return (
    <div>
      <div className="fixed w-full min-h-screen z-50 bg-black opacity-30" />
      <div className="flex fixed w-full justify-center items-center h-screen">
        <div className="loading-container">
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
