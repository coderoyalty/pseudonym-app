import MessageForm from "@/components/message/message-form";
import MessageGuideline from "@/components/message/guideline";
import {
  Dialog,
  DialogClose,
  Flex,
  Button as RadixBtn,
} from "@radix-ui/themes";
import { useParams } from "react-router-dom";

interface PageParams {
  username?: string;
  [key: string]: string | undefined;
}

function MessagePage() {
  const params = useParams<PageParams>();
  return (
    <>
      <div className="min-h-screen flex flex-col gap-2 max-w-[600px] max-sm:w-[min(400px,100%)] mx-auto p-4">
        <h1 className="text-2xl font-bold py-2 text-center text-slate-950">
          <a href="/" className="scroll-m-20 border-b border-blue-300">
            Pseudonym
          </a>
        </h1>
        <h2 className="scroll-m-20 border-b pb-2 text-center text-xl font-semibold tracking-tight first:mt-0">
          Say something to{" "}
          <span className="text-blue-500">@{params.username}</span>
        </h2>
        <Dialog.Root>
          <MessageForm maxLength={300} />
          <Dialog.Content>
            <Dialog.Title>🚀 Coming soon!</Dialog.Title>
            <DialogClose />
            <Dialog.Description>
              This feature is yet to roll-out. The username @{params.username}{" "}
              probably doesn't exist.
              <br />
              This is just a preview page.
            </Dialog.Description>
            <Flex gap="3" justify="end" mt="3">
              <Dialog.Close>
                <RadixBtn
                  variant="surface"
                  className="cursor-pointer"
                  color="bronze"
                >
                  Close
                </RadixBtn>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
        <MessageGuideline />
      </div>
    </>
  );
}

export default MessagePage;
