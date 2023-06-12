import { useState, useEffect } from "react";

const useScreenSize = () => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setIsInitialized(true);
    };

    // Check if window object is available (client-side)
    if (typeof window !== "undefined") {
      handleResize(); // Set initial screen width

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return { screenWidth, isInitialized };
};

export default useScreenSize;
