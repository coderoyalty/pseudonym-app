import useSpecificDescendantClick from "@/hooks/useSpecificDescendantClick";
import { Button } from "../ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

interface NavLinksProps {
  autoHide?: boolean;
  tag?: keyof HTMLElementTagNameMap;
  onTagClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({
  autoHide = false,
  tag = "a",
  onTagClick = () => {},
}) => {
  const ref = React.useRef(null);
  useSpecificDescendantClick(ref, tag, onTagClick);

  const navigate = useNavigate();

  return (
    <>
      <ul
        className={`flex gap-4 items-center justify-center max-md:flex-col text-lg ${
          autoHide && "max-md:hidden"
        }`}
        ref={ref}
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

      <Button
        className={autoHide ? "max-md:hidden" : ""}
        onClick={() => navigate("/auth?type=signup")}
      >
        Get Started
      </Button>
    </>
  );
};

export default NavLinks;
