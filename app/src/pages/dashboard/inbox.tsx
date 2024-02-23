import React, { useState, useReducer, useEffect } from "react";
import axios from "@/api/axios";
import { useAuth } from "@/contexts/auth";
import { Dialog } from "@radix-ui/themes";
import { Skeleton } from "@/components/ui/skeleton";
import { twMerge } from "tailwind-merge";
import useSWR from "swr";
import {
  InboxContent,
  inboxReducer,
  InboxState,
  InboxActionType,
  InboxPagination,
} from "@/components/dashboard/inbox/inbox-pagination";
import { MessageDialogContent } from "@/components/dashboard/inbox/message-dialog";
import { ErrorDisplay } from "@/components/dashboard/error";

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
        <Dialog.Trigger key={idx}>
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

const InboxPaginatedList: React.FC<InboxMessageDialogProps> = ({
  messages,
}) => {
  const [idx, setIndex] = React.useState(0);

  return (
    <>
      {messages.length > 0 ? (
        <MessageDialogContent message={messages[idx]} />
      ) : (
        ""
      )}
      <Page messages={messages} setIndex={setIndex} />
    </>
  );
};

const LoaderSkeleton = () => {
  return (
    <div className="h-[200px]  border rounded p-4 space-y-2">
      <Skeleton className="h-[20px] w-[120px] bg-blue-900/15" />
      <Skeleton className="h-[20px] bg-blue-900/15" />
      <Skeleton className="h-[20px] bg-blue-900/15" />
      <Skeleton className="h-[20px] bg-blue-900/15" />
      <Skeleton className="h-[20px] bg-blue-900/15" />
      <Skeleton className="h-[20px] w-[90%] bg-blue-900/15" />
    </div>
  );
};

export default function MessagePager() {
  //TODO: set no. of skeletons based on device type (mobile, pc, desktop etc)
  const NUM_SKELETONS = 4;
  const [pageIndex, setPageIndex] = useState(1);
  const [{ contentList, pagination }, dispatch] = useReducer(inboxReducer, {
    contentList: [],
    pagination: { prev: null, next: null },
  });
  const { user } = useAuth();

  //TODO: Add a select button with various options to choose from
  const size = 10;

  const { data, isLoading, error } = useSWR<InboxState>(
    `/users/${user.id}/messages?size=${size}&page=${pageIndex}`,
    async (url: string) => {
      // TODO: remove this delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await axios.get(url);
      const data = res.data;
      const toInbox: InboxState = {
        contentList: data.data,
        pagination: {
          next: data.next,
          prev: data.prev,
        },
      };

      return toInbox;
    }
  );

  useEffect(() => {
    if (data) {
      dispatch({ type: InboxActionType.CONTENT, payload: data.contentList });
      dispatch({
        type: InboxActionType.PAGINATION,
        payload: data.pagination,
      });
    }
  }, [data]);

  if (error) {
    return <ErrorDisplay message="we couldn't fetch your data" />;
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: NUM_SKELETONS }).map((_, idx) => (
          <LoaderSkeleton key={idx} />
        ))}
      </div>
    );
  }

  return (
    <>
      <Dialog.Root>
        <div className="flex flex-col items-center gap-4 justify-between my-4">
          <InboxPaginatedList messages={contentList} />
          <InboxPagination setPageIndex={setPageIndex} {...pagination} />
        </div>
      </Dialog.Root>
    </>
  );
}
