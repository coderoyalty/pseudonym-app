import React from "react";
import MessageCarousel from "@/components/message-carousel";
import CopyableInput from "@/components/copyable-input";
import { useAuth } from "@/contexts/auth";
import axios from "@/api/axios";
import { InboxContent } from "@/components/dashboard/inbox/inbox-pagination";
import { Skeleton } from "@/components/ui/skeleton";

const UserStatsPanel = ({
  messageCount,
  archivedCount,
  loading = false,
}: {
  messageCount: number;
  archivedCount: number;
  loading?: boolean;
}) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-evenly gap-0 sm:gap-2 divide-y sm:divide-y-0 divide-x-0 sm:divide-x border-b">
        <div className="flex flex-col items-center justify-center gap-2 p-4">
          {loading ? (
            <Skeleton className="h-16 w-full" />
          ) : (
            <span className="text-5xl">{messageCount}</span>
          )}
          <span>messages received</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 p-4">
          {loading ? (
            <Skeleton className="h-16 w-full" />
          ) : (
            <span className="text-5xl">{archivedCount}</span>
          )}
          <span>messages archived</span>
        </div>
      </div>
    </>
  );
};

interface HomeProps {
  messagesCount: number;
  archivedCount: number;
  recentMessages: InboxContent[];
}

const DashboardHome: React.FC = () => {
  const { user, signin } = useAuth();

  const [data, setData] = React.useState<HomeProps>(null!);
  const [isLoading, setLoading] = React.useState(false);
  const url = `https://pseudonym-app.vercel.app/${user?.username}`;

  React.useEffect(() => {
    setLoading(true);
    axios
      .get("/users/me/stats")
      .then((response) => {
        signin(response.data.user);
        setData(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div id="component-to-capture">
        <UserStatsPanel
          messageCount={data?.messagesCount}
          archivedCount={data?.archivedCount}
          loading={isLoading}
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
      </div>
    </>
  );
};

export default DashboardHome;
