import { useState, useEffect } from "react";

const Welcome: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      setShowPopup(true);
      localStorage.setItem("hasVisited", "true"); // Set flag to show the popup only once
    }
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.6)] z-50">
      <div className="bg-surface p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
        <p className="mb-4">We're glad to have you here. Enjoy your visit!</p>
        <button
          onClick={closePopup}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Welcome;
