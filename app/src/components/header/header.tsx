import type { FC } from "react";
import { Button } from "../ui/button";

interface NavBarProps extends React.ComponentPropsWithoutRef<"nav"> {}

const NavBar: FC<NavBarProps> = () => {
  return (
    <nav className="flex justify-between items-center">
      <a href="/" className="text-2xl font-semibold uppercase font-mono">
        pseudonym
      </a>
      <ul className="flex gap-4 items-center justify-center text-lg">
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
      <Button>Get Started</Button>
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
