import { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("todoapp-theme");
    return savedTheme || "light";
  });

  useEffect(() => {
    localStorage.setItem("todoapp-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
