import { ArchiveIcon, CameraIcon, TrashIcon } from "@radix-ui/react-icons";
import { Dialog, IconButton } from "@radix-ui/themes";
import { twMerge } from "tailwind-merge";
import { InboxContent } from "./inbox-pagination";

interface MessageDialogContentProps {
  message: InboxContent;
}

export const MessageDialogContent: React.FC<MessageDialogContentProps> = ({
  message,
}) => {
  return (
    <Dialog.Content style={{ maxWidth: 450 }}>
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
      <div className="flex justify-center gap-2 mt-4">
        <IconButton color="blue" className="cursor-pointer">
          <ArchiveIcon width={22} height={22} />
        </IconButton>
        <IconButton color="green" className="cursor-pointer">
          <CameraIcon width={22} height={22} />
        </IconButton>
        <IconButton color="red" className="cursor-pointer">
          <TrashIcon width={22} height={22} />
        </IconButton>
      </div>
    </Dialog.Content>
  );
};
