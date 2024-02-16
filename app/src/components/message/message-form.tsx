import { zodResolver } from "@hookform/resolvers/zod";
import { TextArea } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "../ui/form";
import React from "react";
import axios from "@/api/axios";
import { useToast } from "@/components/ui/use-toast";

interface MessageFormProps {
  maxLength?: number;
  userId: string;
}

const MessageForm: React.FC<MessageFormProps> = ({
  userId,
  maxLength = 256,
}) => {
  const [isLoading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const formSchema = z.object({
    content: z
      .string()
      .min(1)
      .max(maxLength)
      .transform((data) => data.trim()),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      await axios.post(`/users/${userId}/messages`, values);
      toast({
        description: "Your message has been sent.",
      });
      form.reset({ content: "" });
    } catch (err) {
      toast({
        title: "Uh oh! Something went wrong",
        description: "There was a problem with your request.",
      });
    }
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sm:w-[400px] sm:mx-auto space-y-4"
      >
        <FormField
          control={form.control}
          name="content"
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
        <Button type="submit" className="py-3 w-full" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default MessageForm;
