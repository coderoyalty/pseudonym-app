import axios from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/auth";
import { AxiosError } from "axios";
import React from "react";

const Profile: React.FC = () => {
  const { user, signin } = useAuth();
  const [username, setUsername] = React.useState(user.username as string);
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const data: Record<string, string> = {
      description: "",
    };

    if (!username.trim().length || username === user.username) return;
    setLoading(true);
    try {
      await axios.patch(`/users/${user.id}`, {
        username,
      });
      data.description = "Successfully updated the username";
      signin({ ...user, username });
    } catch (err) {
      data.title = "Uh oh! we couldn't change your username";
      data.description = "Something kind of isn't correct..";
    } finally {
      toast(data);
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
        <span>username</span>
        <div className="flex items-center gap-1">
          <Input
            defaultValue={user.username}
            value={username}
            onChange={(e) => {
              e.preventDefault();
              setUsername(e.target.value);
            }}
            className="outline outline-1"
          />
          <Button disabled={loading} onClick={handleClick}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
