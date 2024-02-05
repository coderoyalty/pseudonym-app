import { Route, Routes } from "react-router-dom";
import HomePage from "./components/home-page/home-page";
import AuthPage from "./pages/AuthPage";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </>
  );
}
