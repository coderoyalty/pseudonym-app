import useClickOutside from "@/hooks/useClickOutside";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { AnimatePresence, motion } from "framer-motion";
import React, { FC } from "react";
import NavLinks from "./navlink";
import useWindowSize from "@/hooks/useWindowSize";

interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = React.useState(false);

  const callback = (size: { x: number; y: number }) => {
    if (size.x > 768 && isOpen) {
      setOpen(false);
    }
  };

  useClickOutside(ref, () => setOpen(false));
  useWindowSize(callback);

  return (
    <nav
      ref={ref}
      className="flex justify-between items-center max-md:flex-wrap"
    >
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
            animate={{
              scale: 1,
              transitionEnd: { display: "none" },
              decelerate: 4000,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            exit={{ scale: 0 }}
            className="w-full"
          >
            <div className="w-[70%] my-4 mx-auto flex flex-col gap-4 justify-center">
              <NavLinks
                onTagClick={() =>
                  setTimeout(() => {
                    setOpen(false);
                  }, 500)
                }
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
