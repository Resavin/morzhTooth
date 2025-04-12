import { useEffect, useState } from "react"; // Import useState and useEffect
import { BrowserRouter as Router, Link, Route, Routes } from "react-router"; // Corrected imports
import "@/index.css";
import { ButtonLayout } from "@/components/buttonLayout";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { NotFound } from "@/pages/NotFound";
import { RoomDetailPage } from "@/pages/RoomDetailPage";
import morzhik from "@/assets/morzhik.png";
// TODO: gradient bg
// shadow on buttons
// what to do with the place to the right?
function App() {
  // --- NEW STATE ---
  // State to control the visibility/opacity of the version text
  const [isVersionVisible, setIsVersionVisible] = useState(true);

  // --- NEW EFFECT ---
  // Effect to trigger the fade-out after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVersionVisible(false); // Set state to trigger fade-out
    }, 300); // 3000 milliseconds = 3 seconds

    // Cleanup function: clear the timer if the component unmounts
    // before the 3 seconds are up.
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <Router>
      {/* ButtonLayout likely needs to be inside Router if it uses useLocation */}
      <ButtonLayout>
        <Link to="/" className="flex flex-col items-center text-center mb-4">
          {/* Added flex layout for Link content */}
          <img
            src={morzhik}
            className="h-48 mix-blend-luminosity" // mix-blend might not work well without a specific background
            alt="Morzhik"
          />
          <div className="text-white text-2xl mt-2">
            {/* Added margin-top */}
            Клык Моржа
            <div
              className={`
                 ${/* Ensures proper layout */ ""}
                -mb-8 transition-opacity duration-[3000ms] ease-in-out ${/* Transition setup: 3 seconds */ ""}
                ${
                isVersionVisible ? "opacity-100" : "opacity-0"
              } ${/* Conditional opacity */ ""}
              `}
            >
              v2.00
            </div>
          </div>
        </Link>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/rooms/:roomId" element={<RoomDetailPage />} />
        </Routes>
      </ButtonLayout>
    </Router>
  );
}

export default App;
