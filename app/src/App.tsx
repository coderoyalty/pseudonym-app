import "./App.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import HomePage from "./components/home-page/home-page";

function App() {
  return (
    <>
      <div className="">
        <Theme>
          <HomePage />
        </Theme>
      </div>
    </>
  );
}

export default App;
