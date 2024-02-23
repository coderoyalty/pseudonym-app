import React, { useState, useReducer, useEffect } from "react";
import axios from "@/api/axios";
import { useAuth } from "@/contexts/auth";
import { Button, Dialog, IconButton } from "@radix-ui/themes";
import {
  CameraIcon,
  CaretLeftIcon,
  CaretRightIcon,
  ArchiveIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Skeleton } from "@/components/ui/skeleton";
import { twMerge } from "tailwind-merge";

interface InboxContent {
  id: string;
  content: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

interface InboxPagination {
  prev: number | null;
  next: number | null;
}

interface InboxState {
  contentList: InboxContent[];
  pagination: InboxPagination;
}

type InboxAction =
  | { type: "SET_CONTENT_LIST"; payload: InboxContent[] }
  | { type: "SET_PAGINATION"; payload: InboxPagination };

const inboxReducer = (state: InboxState, action: InboxAction): InboxState => {
  switch (action.type) {
    case "SET_CONTENT_LIST":
      return {
        ...state,
        contentList: action.payload,
      };
    case "SET_PAGINATION":
      return {
        ...state,
        pagination: action.payload,
      };
    default:
      return state;
  }
};

interface InboxPaginationProps {
  prev: number | null;
  next: number | null;
  setCurrent: (current: number) => void;
}

const InboxPagination: React.FC<InboxPaginationProps> = ({
  prev,
  next,
  setCurrent,
}) => {
  return (
    <div className="space-x-2">
      <Button
        onClick={() => setCurrent(prev || 1)}
        disabled={!prev}
        className="cursor-pointer disabled:cursor-not-allowed"
      >
        <CaretLeftIcon width={24} height={24} /> Previous
      </Button>
      <Button
        onClick={() => setCurrent(next || 1)}
        disabled={!next}
        className="cursor-pointer disabled:cursor-not-allowed"
      >
        Next
        <CaretRightIcon width={24} height={24} />
      </Button>
    </div>
  );
};

interface InboxMessageDialogProps {
  messages: InboxContent[];
}

interface PageProps extends InboxMessageDialogProps {
  setIndex: (value: React.SetStateAction<number>) => void;
}

const Page: React.FC<PageProps> = ({ messages, setIndex }) => {
  return (
    <div className="flex flex-wrap gap-2 p-4 cursor-pointer">
      {messages.map((content, idx) => (
        <Dialog.Trigger>
          <div
            onClick={() => {
              setIndex(idx);
            }}
            key={content.id}
            className={twMerge(
              "flex-grow flex items-center justify-center",
              "min-h-[200px] p-4 border rounded-md",
              "transition-all hover:bg-slate-100/90"
            )}
          >
            <p className="font-medium whitespace-pre-wrap">{content.content}</p>
          </div>
        </Dialog.Trigger>
      ))}
    </div>
  );
};

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

const InboxMessageDialog: React.FC<InboxMessageDialogProps> = ({
  messages,
}) => {
  const [idx, setIndex] = React.useState(0);

  return (
    <>
      <Dialog.Root>
        {messages.length > 0 ? (
          <MessageDialogContent message={messages[idx]} />
        ) : (
          ""
        )}
        <Page messages={messages} setIndex={setIndex} />
      </Dialog.Root>
    </>
  );
};

export default function Inbox() {
  const [current, setCurrent] = useState(1);
  const [{ contentList, pagination }, dispatch] = useReducer(inboxReducer, {
    contentList: [],
    pagination: { prev: null, next: null },
  });
  const [state, setState] = useState<"loading" | "error" | "idle">("idle");
  const { user } = useAuth();

  const size = 10;

  useEffect(() => {
    const fetchMessages = async () => {
      dispatch({
        type: "SET_PAGINATION",
        payload: { prev: null, next: null },
      });
      setState("loading");
      try {
        const res = await axios.get(
          `/users/${user.id}/messages?size=${size}&page=${current}`
        );
        const data = res.data;
        dispatch({ type: "SET_CONTENT_LIST", payload: data.data });
        dispatch({
          type: "SET_PAGINATION",
          payload: { prev: data.prev, next: data.next },
        });
        setState("idle");
      } catch (err) {
        console.error("Failed to fetch inbox messages:", err);
        setState("error");
      }
    };

    fetchMessages();
  }, [current, user.id]);

  return (
    <>
      {state === "loading" && (
        <div className="space-y-2">
          <div className="h-[200px]  border rounded p-4 space-y-2">
            <Skeleton className="h-[20px] w-[120px] bg-blue-900/15" />
            <Skeleton className="h-[20px] bg-blue-900/15" />
            <Skeleton className="h-[20px] bg-blue-900/15" />
            <Skeleton className="h-[20px] bg-blue-900/15" />
            <Skeleton className="h-[20px] bg-blue-900/15" />
            <Skeleton className="h-[20px] w-[90%] bg-blue-900/15" />
          </div>
        </div>
      )}
      <div className="flex flex-col items-center gap-4 justify-between my-4">
        {state === "idle" && <InboxMessageDialog messages={contentList} />}
        <InboxPagination setCurrent={setCurrent} {...pagination} />
      </div>
    </>
  );
}
