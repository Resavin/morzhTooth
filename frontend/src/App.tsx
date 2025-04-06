import { BrowserRouter as Router, Route, Routes } from "react-router";
import "@/index.css";
import { ButtonLayout } from "@/components/buttonLayout";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { NotFound } from "@/pages/NotFound";
import morzhik from "@/assets/morzhik.png";
import { Link } from "react-router"; // Import Link from react-router-dom

function App() {
  return (
    <Router>
      <ButtonLayout>
        <Link to="/">
          <img
            src={morzhik}
            className="h-48 mix-blend-luminosity"
            alt="Morzhik"
          />
          <p className="text-white text-2xl">Клык Моржа v2.00</p>
        </Link>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ButtonLayout>
    </Router>
  );
}

export default App;
