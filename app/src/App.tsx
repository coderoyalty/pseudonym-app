import "./App.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <AuthProvider>
        <Theme>
          <Toaster />
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Theme>
      </AuthProvider>
    </>
  );
}

export default App;
