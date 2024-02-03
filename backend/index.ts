import "./app";
import "module-alias/register";
import "./controllers";
import App from "./app";

const app = App.getInstance();
//.. your database connections and other configurations can happen here!

// run the application
const server = app.run();

export default server;
