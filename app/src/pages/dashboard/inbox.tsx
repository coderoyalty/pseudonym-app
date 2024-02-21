import React, { useState, useEffect, useReducer } from "react";
import axios from "@/api/axios";
import { useAuth } from "@/contexts/auth";
import { Button } from "@radix-ui/themes";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";

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

interface InboxMessagesPanelProps {
  messages: InboxContent[];
}

const InboxMessagesPanel: React.FC<InboxMessagesPanelProps> = ({
  messages,
}) => {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {messages.map((content) => (
        <div
          key={content.id}
          className="border min-h-[200px] rounded-md p-4 flex-grow flex items-center justify-center"
        >
          <p className="whitespace-pre-wrap">{content.content}</p>
        </div>
      ))}
    </div>
  );
};

export default function Inbox() {
  const [current, setCurrent] = useState(1);
  const [state, dispatch] = useReducer(inboxReducer, {
    contentList: [],
    pagination: { prev: null, next: null },
  });
  const { user } = useAuth();

  const size = 10;

  useEffect(() => {
    const fetchMessages = async () => {
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
      } catch (err) {
        console.error("Failed to fetch inbox messages:", err);
      }
    };

    fetchMessages();
  }, [current, user.id]);

  return (
    <div className="flex flex-col items-center gap-4 justify-between my-4">
      <InboxMessagesPanel messages={state.contentList} />
      <InboxPagination setCurrent={setCurrent} {...state.pagination} />
    </div>
  );
}
