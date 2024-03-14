import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "../ui/use-toast";
import axios from "@/api/axios";
import { AxiosError } from "axios";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const LoginForm: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await axios.post("/auth/login", values);

      toast({
        title: "Yay! You're logged in 🙌",
        description: "Welcome boss 🤝",
      });

      form.reset({
        email: "",
        password: "",
      });
      setLoading(false);

      navigate("/dashboard", { replace: true });
    } catch (err) {
      const toastProp = {
        title: "Uh oh! we couldn't sign-in",
        description: "We were unable to sign-in",
      };

      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          toastProp.description =
            "cross-check again, you provided an invalid email address";
        } else if (err.response?.status === 404) {
          toastProp.description =
            "Seems like you haven't created an account.. that's awful 😿";
        } else if (err.response?.status === 429) {
          toastProp.description =
            "You'll have to hold on, you're trying too hard!";
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
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
