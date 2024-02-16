import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "@/api/axios";
import { useToast } from "../ui/use-toast";
import { AxiosError } from "axios";
import { CircleLoader } from "react-spinners";

const formSchema = z.object({
  email: z.string().email(),
  username: z.string().min(2).max(50),
  password: z.string().min(8),
});

interface SignupFormProps<T = any> {
  changeTab?: (value: T) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ changeTab = () => {} }) => {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await axios.post("/auth/register", values);

      toast({
        title: "Yay! We've created your account 🙌",
        description: "Check your mail to verify your email address",
      });

      form.reset({
        username: "",
        email: "",
        password: "",
      });
      setLoading(false);

      changeTab("login");
    } catch (err) {
      const toastProp = {
        title: "Uh oh! couldn't create your account",
        description: "We were unable to create an account for you",
      };

      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          toastProp.description =
            "The email address or username might already exists";
        }
        toast(toastProp);
      }
    }

    setLoading(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* email address field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="jane@doe.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* username field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="pseudonym" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public identifier name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* password field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Jane123@" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="py-3 w-full" disabled={loading}>
            {loading ? (
              <span className="flex gap-1">
                <CircleLoader size={20} speedMultiplier={2} color="#ffffff" />
                Loading...
              </span>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SignupForm;
