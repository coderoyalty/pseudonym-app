import useClickOutside from "@/hooks/useClickOutside";
import {
  GearIcon,
  EnvelopeClosedIcon,
  ArchiveIcon,
  AvatarIcon,
  DashboardIcon,
  CaretDownIcon,
} from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { Button } from "@radix-ui/themes";
import React from "react";
import { Link, Location, Outlet, useLocation } from "react-router-dom";

type NavItem = {
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  to: string;
  name: string;
};

interface NavProps extends React.ComponentPropsWithoutRef<"aside"> {
  items?: NavItem[];
  location: Location<any>;
}

const SideBar: React.FC<NavProps> = ({ className, location, items = [] }) => {
  return (
    <aside className={className}>
      <nav>
        <ul className="space-y-1">
          {items.map((item, idx) => {
            console.log(item.to, location.pathname);
            return (
              <li key={idx}>
                <Link
                  to={item.to}
                  className={`active font-medium text-base flex w-full items-center border-r-2 px-2 py-1.5 text-gray-700 ${
                    item.to === location.pathname
                      ? "border-r-black"
                      : "border-r-transparent hover:border-r-gray-400"
                  }`}
                >
                  <span className="flex flex-grow items-center space-x-2">
                    <item.icon width={18} height={18} />
                    <span>{item.name}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

const MobileNav: React.FC<NavProps> = ({ className, location, items = [] }) => {
  const [isOpen, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  return (
    <>
      <div className={className} ref={ref}>
        <Button
          onClick={() => {
            setOpen(!isOpen);
          }}
          variant="outline"
          color="gray"
          className="flex h-10 w-full items-center justify-between rounded-md cursor-pointer border px-2 text-center text-sm font-medium"
        >
          Profile <CaretDownIcon />
        </Button>

        {isOpen && (
          <ul className="absolute left-0 right-0 z-10 mt-1 space-y-1.5 bg-white p-2 shadow-lg">
            {items.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={item.to}
                  className={`flex w-full items-center rounded px-3 py-1.5 font-medium text-base text-slate-900 ${
                    location.pathname === item.to
                      ? "bg-slate-100"
                      : "hover:bg-slate-200"
                  }`}
                >
                  <span className="flex flex-grow items-center space-x-2">
                    <item.icon width={18} height={18} />
                    <span>{item.name}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

const DashboardLayout = () => {
  const location = useLocation();
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
      <MobileNav
        location={location}
        className="relative mb-5 block border-b p-4 shadow-inner md:hidden"
        items={items}
      />
      <div className="container max-w-[830px] min-h-screen flex">
        <SideBar
          location={location}
          className="hidden pl-4 w-[195px] border-r border-slate-200 shrink-0 py-10 md:block"
          items={items}
        />
        <div className="grow p-0 md:p-10">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
