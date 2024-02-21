import axios from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/auth";
import useDebounce from "@/hooks/useDebounce";
import React, { useState, useEffect } from "react";

type StateType = "loading" | "available" | "taken" | "same";

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
    <div className="rounded-md p-4 space-y-4">
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
    </div>
  );
};

export default Profile;
