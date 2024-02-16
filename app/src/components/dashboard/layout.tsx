import {
  GearIcon,
  EnvelopeClosedIcon,
  ArchiveIcon,
  AvatarIcon,
  DashboardIcon,
} from "@radix-ui/react-icons";
import { Outlet, useLocation } from "react-router-dom";
import MobileNav from "./mobile-nav";
import SideBar, { NavItem } from "./sidebar";

const items: NavItem[] = [
  {
    icon: DashboardIcon,
    to: "/dashboard",
    name: "Home",
  },
  {
    icon: EnvelopeClosedIcon,
    to: "/dashboard/messages",
    name: "Inbox",
  },
  {
    icon: AvatarIcon,
    to: "/dashboard/account",
    name: "Account",
  },
  {
    icon: GearIcon,
    to: "/dashboard/settings",
    name: "Settings",
  },
  {
    icon: ArchiveIcon,
    to: "/dashboard/archive",
    name: "Archive",
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
