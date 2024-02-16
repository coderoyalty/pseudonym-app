import { ObserverType, useAuth } from "@/contexts/auth";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";
interface ProtectedRouteProps {
  children: React.JSX.Element;
}
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { observer, signout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const observe = () => {
    signout();
    toast({
      title: "Uh oh! You can't visit this page!",
      description: "We're sorry, but you have to signup/login to see this page",
    });
    navigate(location.state?.from?.pathname ?? "/");
  };

  React.useEffect(() => {
    observer.subscribe(ObserverType.UNAUTHORIZED, observe);

    return () => {
      observer.unsubscribe(ObserverType.UNAUTHORIZED, observe);
    };
  }, []);

  return <>{children}</>;
}
