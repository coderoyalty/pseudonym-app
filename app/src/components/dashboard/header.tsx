import { useAuth } from "@/contexts/auth";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { DropdownMenu, Button } from "@radix-ui/themes";
import axios from "@/api/axios";
import { useNavigate, Link } from "react-router-dom";

const DashboardHeader = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    axios.post("/auth/logout").then(() => {
      signout();
      navigate("/auth");
    });
  };
  return (
    <>
      <div className="bg-slate-950 py-4 flex justify-between items-center px-4 md:px-20">
        <Link to="/" className="text-xl text-white">
          Pseudonym
        </Link>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="outline" color="blue" className="cursor-pointer">
              Menu
              <CaretDownIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item
              color="red"
              className="cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </>
  );
};

export default DashboardHeader;
