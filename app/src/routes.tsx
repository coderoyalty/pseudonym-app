import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/404";
import MessagePage from "./pages/message-page";
import route from "./components/dashboard/route";

// const DashboardHome = () => {
//   return (
//     <motion.div
//       initial={{ scale: 0, borderRadius: "50%", rotate: 0 }}
//       animate={{
//         rotate: [360, 0, 360],
//         scale: 1,
//         borderRadius: "100%",
//         x: ["0px", "300px", "0px"],
//         backgroundColor: ["#dfdfd3", "#abcdef"],
//       }}
//       className="w-32 h-32 flex justify-center items-center"
//     >
//       Dashboard
//     </motion.div>
//   );
// };

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/:username" element={<MessagePage />} />
        <Route path="/auth" element={<AuthPage />} />
        {route}
      </Routes>
    </>
  );
}
