import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface ThemeContextType {
  theme: string;
  toggleTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "system";
  });

  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = (currentTheme: string) => {
      if (currentTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    // Check system preference if 'system' is selected
    if (theme === "system") {
      const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
      applyTheme(systemDarkMode.matches ? "dark" : "light");
      systemDarkMode.addEventListener("change", (e) => {
        applyTheme(e.matches ? "dark" : "light");
      });
    } else {
      applyTheme(theme);
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="min-h-screen bg-white dark:bg-darkMode text-black dark:text-white">
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
