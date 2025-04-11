import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
// --- NEW IMPORT ---
import { useLocation } from "react-router"; // Import useLocation

interface ThemeContextType {
  bgColor: string;
  setBgColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ButtonLayout({ children }: { children: ReactNode }) {
  const [bgColor, setBgColor] = useState("bg-lime-700");
  const [isShifted, setIsShifted] = useState(true); // Start shifted
  const [isReversed, setIsReversed] = useState(false); // Start shifted

  // --- GET LOCATION ---
  const location = useLocation(); // Get location object

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    // --- CONDITION CHECK ---
    // Only trigger the slide-in animation if the current path is NOT the root '/'
    if (location.pathname !== "/") {
      if (location.pathname.includes("/room")) {
        setIsReversed(true);
        setIsShifted(false); // Change state to trigger the transition
      } else {
        setIsReversed(false); // Change state to trigger the transition
        setIsShifted(false); // Change state to trigger the transition
      }
      // Start the slide-in animation for non-root routes
    } else {
      // If we are on the root route, ensure it IS shifted out
      // This handles navigating back to '/' after being on another page
      setIsReversed(false);
      setIsShifted(true);
    }

    // Cleanup function to clear the timer if the component unmounts
    // or if the location changes before the timer finishes
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
    // --- DEPENDENCY ARRAY ---
    // Re-run this effect if the pathname changes
  }, [location.pathname]);

  return (
    <ThemeContext.Provider value={{ bgColor, setBgColor }}>
      <div
        className={`
          min-h-screen flex ${
          isReversed ? "flex-row" : "flex-col"
        } items-center justify-center
          ${bgColor}
          transition-all duration-700 ease-out ${/* Transition classes always present */ ""}
          ${
          isShifted ? "-ml-128" : "ml-0"
        } ${/* Apply margin conditionally */ ""}
        `}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
