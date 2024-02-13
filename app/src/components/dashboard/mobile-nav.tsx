import useClickOutside from "@/hooks/useClickOutside";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import React from "react";
import { Link } from "react-router-dom";
import { NavProps } from "./sidebar";

const MobileNav: React.FC<NavProps> = ({ location, items = [] }) => {
  const [isOpen, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  return (
    <>
      <div
        className="relative mb-5 block border-b p-4 shadow-inner md:hidden"
        ref={ref}
      >
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

export default MobileNav;
