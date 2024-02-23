import React from "react";
import { Button } from "@radix-ui/themes";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";

export interface InboxContent {
  id: string;
  content: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface InboxPagination {
  prev: number | null;
  next: number | null;
  total: number;
  size: number;
}

export interface InboxState {
  contentList: InboxContent[];
  pagination: InboxPagination;
}

export enum InboxActionType {
  CONTENT,
  PAGINATION,
}

export type InboxAction =
  | { type: InboxActionType.CONTENT; payload: InboxContent[] }
  | { type: InboxActionType.PAGINATION; payload: InboxPagination };

export const inboxReducer = (
  state: InboxState,
  action: InboxAction
): InboxState => {
  switch (action.type) {
    case InboxActionType.CONTENT:
      return {
        ...state,
        contentList: action.payload,
      };
    case InboxActionType.PAGINATION:
      return {
        ...state,
        pagination: action.payload,
      };
    default:
      return state;
  }
};

export interface InboxPaginationProps {
  pagination: InboxPagination;
  setPageIndex: (pageIndex: number) => void;
}

export const InboxPagination: React.FC<InboxPaginationProps> = ({
  pagination: { next, prev },
  setPageIndex,
}) => {
  return (
    <div className="space-x-2">
      <Button
        onClick={() => {
          setPageIndex(prev!);
        }}
        disabled={!prev}
        className="cursor-pointer disabled:cursor-not-allowed"
      >
        <CaretLeftIcon width={24} height={24} /> Previous
      </Button>
      <Button
        onClick={() => setPageIndex(next!)}
        disabled={!next}
        className="cursor-pointer disabled:cursor-not-allowed"
      >
        Next
        <CaretRightIcon width={24} height={24} />
      </Button>
    </div>
  );
};
