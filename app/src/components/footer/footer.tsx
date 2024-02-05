import React from "react";

interface FooterProps extends React.ComponentPropsWithoutRef<"footer"> {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className="bg-neutral-900 text-white mt-2 py-1">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Pseudonym. All rights reserved.</p>
        <p className="text-sm">
          Designed with <span className="text-red-500">&hearts;</span> by
          Pseudonym-Team
        </p>
      </div>
    </footer>
  );
};
