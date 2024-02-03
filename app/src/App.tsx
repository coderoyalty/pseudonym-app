import "./App.css";
import "@radix-ui/themes/styles.css";
import Author from "./components/Author";
import { Theme } from "@radix-ui/themes";

function App() {
  return (
    <>
      <div className="flex items-center justify-center">
        <Theme>
          <Author />
        </Theme>
      </div>
    </>
  );
}

export default App;
