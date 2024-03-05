import axios from "@/api/axios";
import { ErrorDisplay } from "@/components/dashboard/error";
import InboxPaginatedList from "@/components/dashboard/inbox/inbox-list";
import {
  inboxReducer,
  InboxState,
  InboxActionType,
  InboxContent,
  InboxPagination,
} from "@/components/dashboard/inbox/inbox-pagination";
import { useAuth } from "@/contexts/auth";
import { Dialog } from "@radix-ui/themes";
import { useState, useReducer, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";
import emptyIllustration from "@/assets/svg/undraw_empty_data.svg";
import notFoundIllustration from "@/assets/svg/undraw_not_found.svg";

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

export default function ArchiveInbox() {
  const NUM_SKELETONS = 4;
  const size = 10;

  const [searchParams, setSearchParams] = useSearchParams();
  const paramPage = parseInt(searchParams.get("page") ?? "1");
  const [pageIndex, setPageIndex] = useState(
    isNaN(paramPage) || paramPage === 0 ? 1 : paramPage
  );
  const [{ contentList, pagination }, dispatch] = useReducer(inboxReducer, {
    contentList: [],
    pagination: { prev: null, next: null, total: 0, size },
  });
  const { user } = useAuth();

  const navigate = useNavigate();

  if (!user) {
    navigate("/auth?type=login");
  }

  const [open, setOpen] = useState(false);

  const dialogToggle = () => {
    setOpen((open) => !open);
  };

  useEffect(() => {
    setSearchParams({ ...searchParams, page: pageIndex.toString() });
  }, [pageIndex]);

  const fetchData = async (url: string) => {
    const res = await axios.get(url);
    const data = res.data;
    const toInbox: InboxState = {
      contentList: data.data,
      pagination: {
        next: data.next,
        prev: data.prev,
        total: data.total,
        size: size,
      },
    };

    return toInbox;
  };

  const url = `/users/${user?.id}/messages?type=archive&size=${size}&page=${pageIndex}`;
  const { data, isLoading, error } = useSWR<InboxState>(url, fetchData);

  useEffect(() => {
    if (data) {
      dispatch({ type: InboxActionType.CONTENT, payload: data.contentList });
      dispatch({
        type: InboxActionType.PAGINATION,
        payload: data.pagination,
      });
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="space-y-2 my-4">
        {Array.from({ length: NUM_SKELETONS }).map((_, idx) => (
          <LoaderSkeleton key={idx} />
        ))}
      </div>
    );
  }
  if (error) {
    return <ErrorDisplay message="we couldn't fetch your data" />;
  }
  return (
    <>
      <Dialog.Root open={open} onOpenChange={dialogToggle}>
        <div className="flex flex-col items-center gap-4 justify-between my-4">
          <InboxPaginatedList
            archivedPage={true}
            messages={contentList}
            editContentList={(contents: InboxContent[]) => {
              dispatch({ type: InboxActionType.CONTENT, payload: contents });
              dialogToggle();
            }}
          />
          <div className="space-y-8 flex flex-col items-center">
            {((noPage: number) => {
              if (pageIndex > noPage) {
                return (
                  <img
                    src={notFoundIllustration}
                    alt="empty illustration"
                    className="h-[300px]"
                  />
                );
              } else if (contentList.length === 0) {
                return (
                  <img
                    src={emptyIllustration}
                    alt="empty illustration"
                    className="h-[300px]"
                  />
                );
              }

              return (
                <p className="font-medium text-center">
                  page {pageIndex} of {noPage}
                </p>
              );
            })(Math.floor(pagination.total / size) + 1)}
            <InboxPagination
              setPageIndex={setPageIndex}
              pagination={pagination}
            />
          </div>
        </div>
      </Dialog.Root>
    </>
  );
}
