import MessageForm from "@/components/message/message-form";
import MessageGuideline from "@/components/message/guideline";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ScreenLoader from "@/components/ScreenLoader";
import axios from "@/api/axios";
import React from "react";
import NotFoundPage from "./404";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/components/ui/use-toast";

interface PageParams {
  username?: string;
  [key: string]: string | undefined;
}

function MessagePage() {
  const params = useParams<PageParams>();
  const [userId, setUserId] = React.useState("");
  const [isLoading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/users/exists/${params.username}`);
      setUserId(response.data.user.id);
      setLoading(false);
      if (user && user.id === response.data.user.id) {
        toast({
          title: "Uh oh, we're sorry!",
          description:
            "Unfortunately... we can't let you send a message to yourself... 😿",
        });
        navigate("/dashboard", {
          replace: true,
          state: {
            from: {
              pathname: location.pathname,
            },
          },
        });
      }
    } catch (err) {
      setError(true);
    }
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  if (error) {
    return <NotFoundPage />;
  }

  return (
    <>
      <ScreenLoader isLoading={isLoading} />
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
        <MessageForm maxLength={300} userId={userId} />
        <MessageGuideline />
      </div>
    </>
  );
}

export default MessagePage;
