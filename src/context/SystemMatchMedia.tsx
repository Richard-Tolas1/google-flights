import { useEffect, useState } from "react";

const useDarkMode = () => {
  const [isSystemDarkMode, setIsSystemDarkMode] = useState(false);

  useEffect(() => {
    // Function to detect system's dark mode
    const matchDark = window.matchMedia("(prefers-color-scheme: dark)");

    // Set the initial value based on system preference
    setIsSystemDarkMode(matchDark.matches);

    // Add an event listener to listen for system changes
    const handleChange = (e: MediaQueryListEvent) => {
      setIsSystemDarkMode(e.matches);
    };

    matchDark.addEventListener("change", handleChange);

    // Cleanup the event listener on component unmount
    return () => matchDark.removeEventListener("change", handleChange);
  }, []);

  return isSystemDarkMode;
};

export default useDarkMode;
