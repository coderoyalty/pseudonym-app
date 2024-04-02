import axios from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/auth";
import useDebounce from "@/hooks/useDebounce";
import React, { useState, useEffect } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";

type StateType = "loading" | "available" | "taken" | "same";

const formSchema = z.object({
  password: z.string().min(8),
  new_password: z.string().min(8),
});

const UpdatePassword = () => {
  const loading = false;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      new_password: "",
    },
  });

  return (
    <div className="space-y-2 mt-8">
      <span className="text-xl font-bold">Update Password</span>
      <div className="p-4 border">
        <Form {...form}>
          <form className="space-y-4">
            {/* email address field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Old Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* password field */}
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="New password"
                      {...field}
                      type="password"
                    />
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
      </div>
    </div>
  );
};

const Profile: React.FC = () => {
  const { user, signin } = useAuth();
  const [username, setUsername] = useState<string>(user.username || "");
  const [loading, setLoading] = useState<boolean>(false);
  const debouncedValue = useDebounce(username, 500);
  const [usernameState, setUsernameState] = useState<StateType>("loading");
  const { toast } = useToast();

  useEffect(() => {
    const verifyUsername = async () => {
      if (debouncedValue === user.username) {
        setUsernameState("same");
        return;
      }

      if (!debouncedValue.trim()) {
        return;
      }

      try {
        await axios.get(`/users/exists/${debouncedValue}`);
        setUsernameState("taken");
      } catch (err) {
        setUsernameState("available");
      }
    };

    verifyUsername();
  }, [debouncedValue, user.username]);

  useEffect(() => {
    setUsernameState("loading");
  }, [username]);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!username.trim() || username === user.username) return;

    setLoading(true);
    try {
      await axios.patch(`/users/${user.id}`, {
        username,
      });
      toast({ description: "Successfully updated the username" });
      signin({ ...user, username });
    } catch (err) {
      toast({
        title: "Uh oh! we couldn't change your username",
        description: "Something kind of isn't correct..",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-md p-4 space-y-6">
      <div className="space-y-2">
        <span>id</span>
        <Input
          readOnly
          value={user.id}
          className="outline outline-1 bg-slate-200"
        />
      </div>
      <div className="space-y-2">
        <span>email</span>
        <Input
          readOnly
          value={user.email}
          className="outline outline-1 bg-slate-200"
        />
      </div>
      <div className="space-y-2">
        <span>username:</span>
        <div className="flex flex-col justify-center gap-3 p-4 border">
          {usernameState !== "same" && (
            <div>
              {usernameState === "loading" ? (
                <div>...</div>
              ) : usernameState === "available" ? (
                "username is available"
              ) : (
                "username has already been taken"
              )}
            </div>
          )}
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="outline outline-1"
          />
          <Button
            disabled={
              loading ||
              usernameState === "same" ||
              usernameState === "taken" ||
              !username.trim()
            }
            onClick={handleClick}
          >
            Submit
          </Button>
        </div>
      </div>
      <UpdatePassword />
    </div>
  );
};

export default Profile;
