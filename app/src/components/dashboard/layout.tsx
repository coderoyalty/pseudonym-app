import {
  GearIcon,
  EnvelopeClosedIcon,
  ArchiveIcon,
  AvatarIcon,
  DashboardIcon,
} from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

type NavItem = {
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  to: string;
  name: string;
};

interface SideBarProps extends React.ComponentPropsWithoutRef<"aside"> {
  items?: NavItem[];
}

const SideBar: React.FC<SideBarProps> = ({ className, items = [] }) => {
  return (
    <aside className={className}>
      <nav>
        <ul className="space-y-1">
          {items.map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.to}
                className="font-medium text-base flex w-full items-center border-r-2 px-2 py-1.5 border-r-transparent text-gray-700 hover:border-r-gray-400"
              >
                <span className="flex flex-grow items-center space-x-2">
                  <item.icon width={18} height={18} />
                  <span>{item.name}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

const DashboardLayout = () => {
  const location = useLocation();
  console.log(location);
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

  return (
    <>
      <div className="container max-w-[830px] min-h-screen flex">
        <SideBar
          className="hidden w-[195px] border-r border-slate-200 shrink-0 py-10 md:block"
          items={items}
        />
        <div className="grow p-0 md:p-10 flex justify-center items-center">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
