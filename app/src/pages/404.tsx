import { Button } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen flex flex-col gap-8 justify-center items-center">
        <motion.div
          whileHover={{ scale: 0.8, rotate: 15 }}
          whileTap={{
            scale: 0.8,
            rotate: -15,
          }}
          className="border p-8 rounded-md flex"
        >
          <span className="text-xl text-slate-800 font-medium">
            404 - Page Not Found
          </span>
        </motion.div>
        <Button
          variant="classic"
          className="cursor-pointer"
          onClick={() => navigate("/")}
        >
          Go Home
        </Button>
      </div>
    </>
  );
}

export default NotFoundPage;
