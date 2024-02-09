import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/404";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </>
  );
}
