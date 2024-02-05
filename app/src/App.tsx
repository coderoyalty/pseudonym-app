import "./App.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <Theme>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Theme>
    </>
  );
}

export default App;
