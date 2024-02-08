import type { FC } from "react";
import { Button } from "../ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface NavBarProps extends React.ComponentPropsWithoutRef<"nav"> {}

interface NavLinksProps {
  autoHide?: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ autoHide = false }) => {
  return (
    <>
      <ul
        className={`flex gap-4 items-center justify-center max-md:flex-col text-lg ${
          autoHide && "max-md:hidden"
        }`}
      >
        <li>
          <a
            href="/"
            className="transition-colors text-black hover:text-neutral-700 font-medium"
          >
            What's Pseudonym?
          </a>
        </li>
        <li>
          <a
            href="#faq"
            className="transition-colors text-black hover:text-neutral-700 font-medium"
          >
            FAQs
          </a>
        </li>
        <li>
          <a
            href="#guidelines"
            className="transition-colors text-black hover:text-neutral-700 font-medium"
          >
            Guidelines
          </a>
        </li>
      </ul>

      <Button className={autoHide ? "max-md:hidden" : ""}>Get Started</Button>
    </>
  );
};

const NavBar: FC<NavBarProps> = () => {
  const [_size, setWindowSize] = React.useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const [isOpen, setOpen] = React.useState(false);

  const callback = () => {
    setWindowSize([window.innerWidth, window.innerHeight]);

    if (window.innerWidth > 768 && isOpen) {
      setOpen(false);
    }
  };
  React.useEffect(() => {
    addEventListener("resize", callback);

    return () => {
      removeEventListener("resize", callback);
    };
  }, [callback]);

  return (
    <nav className="flex justify-between items-center max-md:flex-wrap">
      <a href="/" className="text-2xl font-semibold uppercase font-mono">
        pseudonym
      </a>

      <NavLinks autoHide />

      <IconButton
        size="2"
        color="amber"
        radius="medium"
        variant="surface"
        className="cursor-pointer md:hidden"
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        <HamburgerMenuIcon width={"22"} height={"22"} />
      </IconButton>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="md:hidden w-full"
          >
            <div className="w-[70%] my-4 mx-auto flex flex-col gap-4 justify-center">
              <NavLinks />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

interface HeaderProps extends React.ComponentPropsWithoutRef<"header"> {}

const Header: FC<HeaderProps> = () => {
  return (
    <header className="p-4 bg-transparent backdrop-blur-sm sticky top-0">
      <NavBar />
    </header>
  );
};

export default Header;
