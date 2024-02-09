import React from "react";

import NavBar from "./navbar";

interface HeaderProps extends React.ComponentPropsWithoutRef<"header"> {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="p-4 bg-transparent backdrop-blur-sm max-md:backdrop-blur-[1px] sticky max-md:fixed top-0 max-md:left-0 max-md:right-0 z-10">
      <NavBar />
    </header>
  );
};

export default Header;
