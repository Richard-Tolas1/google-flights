import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import useDarkMode from "../../context/SystemMatchMedia";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  const isSystemDarkMode = useDarkMode();
  const isDarkMode =
    theme === "dark" || (theme === "system" && isSystemDarkMode);

  const [showThemeSwitcher, setShowThemeSwitcher] = useState(false);

  const toggleThemeSwitcher = () => {
    setShowThemeSwitcher((prev) => !prev);
  };

  const appearance = [
    {
      theme: "system",
      text: "Use device default",
    },
    {
      theme: "dark",
      text: "Dark theme",
    },
    {
      theme: "light",
      text: "Light theme",
    },
  ];

  return (
    <div className="relative">
      {isDarkMode ? (
        <LightModeOutlinedIcon
          onClick={toggleThemeSwitcher}
          className="cursor-pointer"
          style={{ width: 20, height: 20 }}
        />
      ) : (
        <DarkModeIcon
          fill="#5F6367"
          onClick={toggleThemeSwitcher}
          className="cursor-pointer"
          style={{ width: 20, height: 20, color: "#5F6367" }}
        />
      )}

      {showThemeSwitcher && (
        <div className="absolute right-8 mt-2 w-56 top-6  dark:bg-[#333] bg-white dark:text-white rounded-md shadow-xl text-black border border-transparent z-10">
          <h2 className="p-4 text-sm font-medium text-[#70757a] border-b border-[#E4E4E4]">
            Appearance
          </h2>
          <div className="flex flex-col space-y-2 p-2">
            {appearance.map((t, k) => (
              <div
                onClick={() => toggleTheme(t.theme)}
                className={`flex items-center p-3 cursor-pointer hover:bg-[#e8eaed] dark:hover:bg-[#3c4043] rounded `}
                key={k}>
                <div className="w-3">
                  {theme === t.theme && (
                    <span className="dark:text-white text-black">✓</span>
                  )}
                </div>
                <div className="ml-5">{t.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
