import { ArchiveIcon, CameraIcon, TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Dialog, Flex, IconButton } from "@radix-ui/themes";
import { twMerge } from "tailwind-merge";
import { InboxContent } from "./inbox-pagination";
import * as htmlToImage from "html-to-image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "@/api/axios";
import { Button } from "@/components/ui/button";

interface MessageDialogContentProps {
  message: InboxContent;
  process?: () => void;
  archive?: boolean;
}

export const MessageDialogContent: React.FC<MessageDialogContentProps> = ({
  message,
  process,
  archive = false,
}) => {
  const [isVisible, setVisibility] = useState(true);
  const [open, setOpen] = useState(false);
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

  if (!message) {
    return;
  }

  const handleDelete = async () => {
    if (!process) return;
    await axios.delete(`/users/${message.owner}/messages/${message.id}`);
    process();
  };

  const handleArchive = async () => {
    if (!process) return;
    await axios.patch(
      `/users/${message.owner}/messages/${message.id}?action=${
        archive ? "unarchive" : "archive"
      }`
    );
    process();
  };

  return (
    <Dialog.Content style={{ maxWidth: 450 }} id="dialog-content">
      <Dialog.Title align="center">Message</Dialog.Title>
      <Dialog.Description size="2" mb="4" align="center">
        Sent: {new Date(message.createdAt).toUTCString()}
      </Dialog.Description>
      {/* content */}
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
            {/* Archive Button */}
            {process ? (
              <IconButton
                color={!archive ? "blue" : "iris"}
                className="cursor-pointer"
                onClick={() => handleArchive()}
              >
                <ArchiveIcon width={22} height={22} />
              </IconButton>
            ) : (
              ""
            )}
            {/* Snapshot Button */}
            <IconButton
              color="green"
              className="cursor-pointer"
              onClick={() => handleCapture()}
            >
              <CameraIcon width={22} height={22} />
            </IconButton>
            {/* Delete Button */}
            {process ? (
              <IconButton
                color="red"
                className="cursor-pointer"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <TrashIcon width={22} height={22} />
              </IconButton>
            ) : (
              ""
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <AlertDialog.Root
        open={open}
        onOpenChange={() => setOpen((open) => !open)}
      >
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Delete Message</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? This message will be deleted, there's no way of
            recovering it.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button className="bg-transparent border border-gray-700 hover:bg-gray-50 text-black">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                className="bg-red-700 hover:bg-red-500"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Dialog.Content>
  );
};
