import AuthForm from "@/components/auth-form/auth-form";
import { useAuth } from "@/contexts/auth";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  let type = searchParams.get("type")!;

  if (!["login", "signup"].includes(type)) {
    type = "login";
    searchParams.set("type", "login");
  }

  const { user } = useAuth();

  if (user) {
    navigate("/dashboard");
  }
  return (
    <div>
      <AuthForm authType={type as any} />
    </div>
  );
}
