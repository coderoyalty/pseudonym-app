import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cors, { CorsOptions } from "cors";
import BaseController from "./controllers/base.controller";
import config from "./utils/config";
import errorMiddleWare from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";

export default class App {
	private static instance: App | null = null;
	private app: Express;
	private port: number;

	static endpoints: string[] = [];

	constructor() {
		this.app = express();
		this.initMiddleware();
		this.port = (process.env.PORT || 5000) as number;
	}

	injectController(controller: BaseController) {
		let endpoint = controller.endpoint;
		if (endpoint.length > 0 && endpoint[0] === "/") {
			endpoint = endpoint.slice(1);
		}
		if (endpoint.length > 0 && endpoint.at(-1) === "/") {
			endpoint = endpoint.slice(0, -1);
		}

		//TODO: actual controller registration here!
		if (endpoint.length === 0) {
			this.app.use("/api/", controller.router);
		} else {
			this.app.use(`/api/${endpoint}`, controller.router);
		}

		// for checking the api status
		this.app.use("/api/status", (req: Request, res: Response) => {
			return res.sendStatus(200);
		});
	}

	private initMiddleware() {
		const allowedOrigins = config.allowedOrigins;
		const corsOptions: CorsOptions = {
			origin: function (origin: string | undefined, callback: any) {
				if (!origin || allowedOrigins.includes(origin)) {
					callback(null, true);
				} else {
					callback(new Error("Not allowed by CORS"));
				}
			},
			credentials: true,
		};

		this.app.disable("x-powered-by");
		this.app.set("trust proxy", 1);
		this.app.use(cors(corsOptions));
		this.app.use(morgan("dev"));
		this.app.use(express.json());
		this.app.use(cookieParser(config.COOKIE_SECRET));
		this.app.use(
			express.urlencoded({
				extended: false,
			}),
		);
	}

	static getInstance() {
		if (!this.instance) {
			console.log(`Application: ✅ created`);
			this.instance = new App();
		}
		return this.instance;
	}

	private initHandler() {
		this.app.use(errorMiddleWare);
	}

	public run() {
		this.initHandler();
		const server = this.app.listen(this.port, () => {
			const time = new Date().toISOString();
			console.log(
				`[⚡] server started: ${time} => http://localhost:${this.port}/`,
			);
			if (process.env.NODE_ENV == "dev") {
				console.log("Registered endpoints:");
				for (let endpoint of App.endpoints) {
					console.log("\t" + endpoint);
				}
			}
		});

		return server;
	}
}
