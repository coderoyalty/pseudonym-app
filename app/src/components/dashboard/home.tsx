import React from "react";
import MessageCarousel from "../message-carousel";
import CopyableInput from "../copyable-input";
import { useAuth } from "@/contexts/auth";
import axios from "@/api/axios";

const UserStatsPanel = ({
  messageCount,
  archivedCount,
}: {
  messageCount: number;
  archivedCount: number;
}) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-evenly gap-0 sm:gap-2 divide-y sm:divide-y-0 divide-x-0 sm:divide-x border-b">
        <div className="flex flex-col items-center justify-center gap-2 p-4">
          <span className="text-5xl">{messageCount}</span>
          <span>messages received</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 p-4">
          <span className="text-5xl">{archivedCount}</span>
          <span>messages archived</span>
        </div>
      </div>
    </>
  );
};

interface HomeProps {
  messagesCount: number;
  archivedCount: number;
  recentMessages: {
    content: string;
    id: string;
  }[];
}

const DashboardHome: React.FC = () => {
  const { user, signin } = useAuth();

  const [data, setData] = React.useState<HomeProps>(null!);
  const url = `https://pseudonym-app.vercel.app/${user?.username}`;

  React.useEffect(() => {
    axios.get("/users/me/stats").then((response) => {
      signin(response.data.user);
      setData(response.data);
    });
  }, []);

  return (
    <>
      <UserStatsPanel
        messageCount={data?.messagesCount}
        archivedCount={data?.archivedCount}
      />
      <div className="p-4">
        <h1 className="font-medium">
          Username: <span className="text-blue-600">{user?.username}</span>
        </h1>
        <h1 className="font-medium">Email: {user?.email}</h1>
      </div>

      <CopyableInput value={url} />

      <div className="relative max-w-full">
        <MessageCarousel messages={data?.recentMessages || []} />
      </div>
    </>
  );
};

export default DashboardHome;
