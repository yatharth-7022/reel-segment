import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginSignupPage from "./LoginSignupPage";
import NotFound from "./NotFound";
import ProtectedRoute from "./ProtectedRoute"; // ✅ Ensure this is correct

import Home from "./Home";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<LoginSignupPage />} />
      <Route path="*" element={<NotFound />} /> {/* 404 Page */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
