import { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

// Custom hook để dùng theme tiện lợi ở mọi component
export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Lấy theme từ localStorage hoặc mặc định là "light"
    const savedTheme = localStorage.getItem("todoapp-theme");
    return savedTheme || "light";
  });

  // Lưu theme vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem("todoapp-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
