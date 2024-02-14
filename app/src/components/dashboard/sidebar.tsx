import React from "react";
import { Link, Location } from "react-router-dom";
import { IconProps } from "@radix-ui/react-icons/dist/types";

type NavItem = {
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  to: string;
  name: string;
};

interface NavProps {
  items?: NavItem[];
  location: Location<any>;
}

const SideBar: React.FC<NavProps> = ({ location, items = [] }) => {
  return (
    <aside className="h-screen hidden pl-4 w-[195px] border-r border-slate-200 shrink-0 py-10 md:block sticky top-0 overflow-y-auto">
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

export type { NavItem, NavProps };
export default SideBar;
