import { createContext, ReactNode, useContext, useState } from "react";

interface ThemeContextType {
  bgColor: string;
  setBgColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ButtonLayout({ children }: { children: ReactNode }) {
  const [bgColor, setBgColor] = useState("bg-white");

  return (
    <ThemeContext.Provider value={{ bgColor, setBgColor }}>
      <div
        className={`-ml-128 min-h-screen flex flex-col items-center justify-center transition-all duration-500 ${bgColor}`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  console.log();
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
