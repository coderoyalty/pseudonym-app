import React from "react";
import { MessageDialogContent } from "./message-dialog";
import { InboxContent } from "./inbox-pagination";
import { Dialog } from "@radix-ui/themes";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { format } from "timeago.js";

interface InboxMessageDialogProps {
  messages: InboxContent[];
  editContentList: (contents: InboxContent[]) => void;
  archivedPage?: boolean;
}

const InboxPaginatedList: React.FC<InboxMessageDialogProps> = ({
  messages,
  editContentList,
  archivedPage,
}) => {
  const [idx, setIndex] = React.useState(0);

  const processMessage = () => {
    if (messages.length < 0 || idx < 0) {
      return;
    }

    const filteredContent = messages.filter((_, index) => index != idx);
    editContentList(filteredContent);
  };

  return (
    <>
      {messages.length > 0 ? (
        <MessageDialogContent
          message={messages[idx]}
          process={processMessage}
          archive={archivedPage}
        />
      ) : (
        ""
      )}
      <Page messages={messages} setIndex={setIndex} />
    </>
  );
};

interface PageProps extends Omit<InboxMessageDialogProps, "editContentList"> {
  setIndex: (value: React.SetStateAction<number>) => void;
}

const Page: React.FC<PageProps> = ({ messages, setIndex }) => {
  return (
    <div className="flex flex-wrap gap-2 p-4 cursor-pointer">
      <AnimatePresence>
        {messages.map((content, idx) => (
          <Dialog.Trigger key={idx}>
            <motion.div
              onClick={() => {
                setIndex(idx);
              }}
              key={content.id}
              className={twMerge(
                "flex-grow flex flex-col",
                "min-h-[200px] p-4 border rounded-md",
                "transition-all hover:bg-slate-100/90"
              )}
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex-grow flex justify-center items-center">
                <p className="font-medium whitespace-pre-wrap">
                  {content.content}
                </p>
              </div>
              <div className="text-xs text-right">
                {format(content.createdAt)}
              </div>
            </motion.div>
          </Dialog.Trigger>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default InboxPaginatedList;
