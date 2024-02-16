import "./App.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/auth";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import axios from "./api/axios";

function Application() {
  const { signout } = useAuth();

  React.useEffect(() => {
    axios.get("/users/me/stats").catch((_err) => {
      signout();
    });
  }, []);

  return (
    <>
      <Theme>
        <Toaster />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Theme>
    </>
  );
}

function App() {
  return (
    <>
      <AuthProvider>
        <Application />
      </AuthProvider>
    </>
  );
}

export default App;
