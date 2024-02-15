import "./App.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";

function App() {
  return (
    <>
      <AuthProvider>
        <Theme>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Theme>
      </AuthProvider>
    </>
  );
}

export default App;
