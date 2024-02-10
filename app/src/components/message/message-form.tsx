import { zodResolver } from "@hookform/resolvers/zod";
import { TextArea, Dialog, Button } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import { z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "../ui/form";

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

export default MessageForm;
