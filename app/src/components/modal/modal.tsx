import useClickOutside from "@/hooks/useClickOutside";
import React from "react";

interface ModalProps {
  children?: React.ReactNode;
  onClose?: () => void;
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  onClose = () => {},
}) => {
  const [isClosing, _] = React.useState(false);
  const ref = React.useRef(null);
  useClickOutside(ref, () => {
    onClose();
  });

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Hide scrollbar when modal is open
    } else {
      document.body.style.overflow = ""; // Restore scrollbar when modal is closed
    }
    return () => {
      document.body.style.overflow = ""; // Make sure to restore scrollbar on unmount
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 ${
            isClosing ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
        >
          {/* the blur background */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div
            className="relative bg-white p-4 rounded-lg shadow-lg z-50"
            ref={ref}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export { Modal };
