import { Modal } from "@/components/modal/modal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React from "react";

interface MessageCarouselProps {
  messages: { content: string; id: string }[];
}

const MessageCarousel: React.FC<MessageCarouselProps> = ({ messages = [] }) => {
  const [isOpen, setOpen] = React.useState(false);
  const [idx, setIndex] = React.useState(0);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className="min-h-[80dvh] w-[80dvw] flex flex-col gap-3 justify-center items-center">
          <p className="min-h-[200px] max-w-[250px]">
            {messages.at(idx)?.content}
          </p>
          <span className="text-base font-medium">
            - Anonymous [
            {new Date((messages.at(idx) as any)?.createdAt).toDateString()}]
          </span>
        </div>
      </Modal>
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
                <ScrollArea
                  className="max-h-full px-2 py-1 border rounded-lg shadow cursor-pointer"
                  onClick={() => {
                    setIndex(idx);
                    setOpen(true);
                  }}
                >
                  <p className="min-h-[200px] max-sm:max-h-auto flex justify-center items-center text-center text-sm font-semibold">
                    {message.content}
                  </p>
                </ScrollArea>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="mt-4 mb-4" />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

export default MessageCarousel;
