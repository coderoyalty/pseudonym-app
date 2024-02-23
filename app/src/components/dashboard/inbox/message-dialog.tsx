import { ArchiveIcon, CameraIcon, TrashIcon } from "@radix-ui/react-icons";
import { Dialog, IconButton } from "@radix-ui/themes";
import { twMerge } from "tailwind-merge";
import { InboxContent } from "./inbox-pagination";
import * as htmlToImage from "html-to-image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MessageDialogContentProps {
  message: InboxContent;
}

export const MessageDialogContent: React.FC<MessageDialogContentProps> = ({
  message,
}) => {
  const [isVisible, setVisibility] = useState(true);
  const handleCapture = () => {
    const dialogContent = document.getElementById("dialog-content")!;

    setVisibility(false);
    // since <AnimatePresence/> takes a moment before removing its descendants,
    // we mimick the delay here by taking the snapshot after a delay
    setTimeout(() => {
      htmlToImage
        .toPng(dialogContent)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "pseudonym_message.png";
          link.click();
        })
        .finally(() => {
          setVisibility(true);
        });
    }, 1000);
  };

  return (
    <Dialog.Content style={{ maxWidth: 450 }} id="dialog-content">
      <Dialog.Title align="center">Message</Dialog.Title>
      <Dialog.Description size="2" mb="4" align="center">
        Sent: {new Date(message.createdAt).toUTCString()}
      </Dialog.Description>

      <div
        className={twMerge(
          "flex-grow flex items-center justify-center",
          "min-h-[200px] p-4 border rounded-md"
        )}
      >
        <p className="font-medium whitespace-pre-wrap">{message.content}</p>
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center gap-2 mt-4"
          >
            <IconButton color="blue" className="cursor-pointer">
              <ArchiveIcon width={22} height={22} />
            </IconButton>
            <IconButton
              color="green"
              className="cursor-pointer"
              onClick={() => handleCapture()}
            >
              <CameraIcon width={22} height={22} />
            </IconButton>
            <IconButton color="red" className="cursor-pointer">
              <TrashIcon width={22} height={22} />
            </IconButton>
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog.Content>
  );
};
