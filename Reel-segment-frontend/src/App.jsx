import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import LoginSignupPage from "./LoginSignupPage";
import NotFound from "./NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginSignupPage />} />
      <Route path="*" element={<NotFound />} /> {/* 404 Page */}
    </Routes>
  );
}

export default App;
