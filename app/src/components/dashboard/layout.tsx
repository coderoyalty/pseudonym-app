import {
  EnvelopeClosedIcon,
  ArchiveIcon,
  AvatarIcon,
  DashboardIcon,
  CaretDownIcon,
} from "@radix-ui/react-icons";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import MobileNav from "./mobile-nav";
import SideBar, { NavItem } from "./sidebar";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { useAuth } from "@/contexts/auth";
import axios from "@/api/axios";

const items: NavItem[] = [
  {
    icon: DashboardIcon,
    to: "/dashboard",
    name: "Dashboard",
  },
  {
    icon: EnvelopeClosedIcon,
    to: "/dashboard/messages",
    name: "Inbox",
  },
  {
    icon: ArchiveIcon,
    to: "/dashboard/archive",
    name: "Archive",
  },
  {
    icon: AvatarIcon,
    to: "/dashboard/profile",
    name: "Profile",
  },
];

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
            <Button variant="soft">
              Menu
              <CaretDownIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item color="red" onClick={handleLogout}>
              Logout
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </>
  );
};

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <>
      <DashboardHeader />
      <MobileNav location={location} items={items} />
      <div className="container max-w-[830px] min-h-screen flex">
        <SideBar location={location} items={items} />
        <div className="grow p-0 md:p-10">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
