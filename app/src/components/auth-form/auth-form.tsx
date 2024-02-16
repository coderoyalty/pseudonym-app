import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import SignupForm from "./signup-form";
import LoginForm from "./login-form";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { IconButton, Tooltip } from "@radix-ui/themes";

interface AuthFormProps extends React.ComponentPropsWithoutRef<"div"> {
  authType?: "login" | "signup";
}

const AuthForm: React.FC<AuthFormProps> = ({ authType = "login" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(authType);
  const [params, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    setSearchParams({ ...params, type: value });
  }, [value]);

  const onPrevLocation = () => {
    let from = location.state?.from?.pathname || "/";

    navigate(from);
  };

  return (
    <div className="my-8">
      <div className="max-w-[400px] mx-auto my-4">
        <Tooltip content={"Click to go back"}>
          <IconButton
            variant="classic"
            color="grass"
            radius="full"
            className="hover:cursor-pointer"
            size="2"
            onClick={onPrevLocation}
          >
            <ArrowLeftIcon width={"22"} height={"22"} />
          </IconButton>
        </Tooltip>
      </div>
      <Tabs
        className="w-[400px] mx-auto"
        defaultValue={authType}
        value={value}
        onValueChange={(value) => {
          setValue(value as any);
        }}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <div className="my-12 mx-auto border p-4 rounded-md shadow-md">
            <LoginForm />
          </div>
        </TabsContent>
        <TabsContent value="signup">
          <div className="my-12 mx-auto border p-4 rounded-md shadow-md">
            <SignupForm changeTab={setValue} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthForm;
