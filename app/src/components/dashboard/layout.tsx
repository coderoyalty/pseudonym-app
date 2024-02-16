import {
  EnvelopeClosedIcon,
  ArchiveIcon,
  AvatarIcon,
  DashboardIcon,
  HomeIcon,
} from "@radix-ui/react-icons";
import { Outlet, useLocation } from "react-router-dom";
import MobileNav from "./mobile-nav";
import SideBar, { NavItem } from "./sidebar";

const items: NavItem[] = [
  {
    icon: HomeIcon,
    to: "/",
    name: "Home",
  },
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

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <>
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
