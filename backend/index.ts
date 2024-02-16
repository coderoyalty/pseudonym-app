import "./app";
import "module-alias/register";
import "./controllers";
import App from "./app";
import connectDB from "./utils/database";

const app = App.getInstance();
//.. your database connections and other configurations can happen here!

// run the application
connectDB().catch(() => {
	process.exit(1);
});
const server = app.run();

export default server;
