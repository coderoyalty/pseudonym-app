import AuthForm from "@/components/auth-form/auth-form";
import { useSearchParams } from "react-router-dom";

export default function AuthPage() {
  const [searchParams] = useSearchParams();

  let type = searchParams.get("type")!;

  if (!["login", "signup"].includes(type)) {
    type = "login";
    searchParams.set("type", "login");
  }

  return (
    <div>
      <AuthForm authType={type as any} />
    </div>
  );
}
