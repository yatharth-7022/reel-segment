import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginSignupPage from "./components/LoginSignupPage";
import NotFound from "./NotFound";
import ProtectedRoute from "./ProtectedRoute";

import Home from "./components/Home";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<LoginSignupPage />} />
      <Route path="*" element={<NotFound />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
