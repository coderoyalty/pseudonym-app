import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  TextArea,
  Flex,
  Button as RadixBtn,
} from "@radix-ui/themes";
import React from "react";

interface MessageFormProps {
  maxLength?: number;
}
const MessageForm: React.FC<MessageFormProps> = ({ maxLength = 256 }) => {
  const formSchema = z.object({
    message: z
      .string()
      .min(1)
      .max(maxLength)
      .transform((data) => data.trim()),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sm:w-[400px] sm:mx-auto space-y-4"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <TextArea
                  className="h-[140px]"
                  placeholder="Write a message to me..."
                  {...field}
                ></TextArea>
              </FormControl>
              <FormDescription
                className={`${
                  field.value.length > maxLength && "text-red-600"
                }`}
              >
                {field.value.length}/{maxLength}
              </FormDescription>
            </FormItem>
          )}
        ></FormField>
        <Dialog.Trigger>
          <Button type="submit" className="py-3 w-full">
            Submit
          </Button>
        </Dialog.Trigger>
      </form>
    </Form>
  );
};

interface PageParams {
  username?: string;
  [key: string]: string | undefined;
}

function MessagePage() {
  const params = useParams<PageParams>();
  return (
    <>
      <div className="min-h-screen flex flex-col gap-2 justify-center max-w-[600px] max-sm:w-[min(400px,100%)] mx-auto p-4">
        <h2 className="scroll-m-20 border-b pb-2 text-center text-2xl font-semibold tracking-tight first:mt-0">
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
      </div>
    </>
  );
}

export default MessagePage;
