import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Dialog } from "@radix-ui/themes";
import React from "react";
import { MessageDialogContent } from "./dashboard/inbox/message-dialog";
import { InboxContent } from "./dashboard/inbox/inbox-pagination";

interface MessageCarouselProps {
  messages: InboxContent[];
}

const MessageCarousel: React.FC<MessageCarouselProps> = ({ messages = [] }) => {
  const [idx, setIndex] = React.useState(0);

  return (
    <>
      <Dialog.Root>
        {messages.length > 0 ? (
          <MessageDialogContent message={messages[idx]} />
        ) : (
          ""
        )}

        <div className="mx-auto p-2 mt-12 mb-4 md:px-8">
          <h1 className="mb-8 text-center text-2xl font-medium">
            Your Recent Messages
          </h1>

          <Carousel
            orientation="vertical"
            className="w-full mx-auto md:max-w-sm my-8"
          >
            <CarouselContent className="h-[275px] my-4">
              {messages.map((message, idx) => (
                <CarouselItem className="basis-1/2" key={message.id}>
                  <Dialog.Trigger>
                    <div
                      className="max-h-full px-2 py-1 border rounded-lg shadow cursor-pointer"
                      onClick={() => {
                        setIndex(idx);
                      }}
                    >
                      <p className="min-h-[200px] max-sm:max-h-auto flex justify-center items-center text-sm font-semibold whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </Dialog.Trigger>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="mt-4 mb-4" />
            <CarouselNext />
          </Carousel>
        </div>
      </Dialog.Root>
    </>
  );
};

export default MessageCarousel;
