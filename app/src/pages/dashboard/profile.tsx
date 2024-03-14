import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth";
import React from "react";
import UsernameChangeForm from "@/components/dashboard/profile/username-form";
import EmailVerificationForm from "@/components/dashboard/profile/email-form";

const Profile: React.FC = () => {
  const { user } = useAuth();

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
      <EmailVerificationForm />
      <UsernameChangeForm />
    </div>
  );
};

export default Profile;
