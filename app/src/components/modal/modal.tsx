import useClickOutside from "@/hooks/useClickOutside";
import { Cross2Icon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  children?: React.ReactNode;
  onClose?: () => void;
  isOpen: boolean;
  avoidScroll?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  avoidScroll = false,
  onClose = () => {},
}) => {
  const [isClosing, _] = React.useState(false);
  const ref = React.useRef(null);
  useClickOutside(ref, () => {
    onClose();
  });

  React.useEffect(() => {
    // Hide scrollbar when modal is open
    if (avoidScroll) {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }

    // Make sure to restore scrollbar on unmount
    return () => {
      if (avoidScroll) {
        document.body.style.overflow = "";
      }
    };
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 100,
            }}
            className={twMerge(
              "fixed inset-0 flex items-center justify-center z-50",
              isClosing ? "opacity-0" : "opacity-100",
              "transition-opacity duration-300"
            )}
          >
            {/* the blur background */}
            <div className="absolute inset-0 bg-slate-950 opacity-50"></div>
            <motion.div
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
              }}
              className="relative bg-white p-4 rounded-lg shadow-lg z-50"
              ref={ref}
            >
              <div className="flex justify-end mb-1">
                <IconButton
                  variant="outline"
                  color="mint"
                  className="cursor-pointer"
                  onClick={onClose}
                >
                  <Cross2Icon width={16} height={16} />
                </IconButton>
              </div>
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export { Modal };
