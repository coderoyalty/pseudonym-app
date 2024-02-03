import express from "express";

/**
 * Controller Base Class
 *
 * The `BaseController` class is a base class for implementing controllers in an Express.js application. Controllers
 * handle the routing and request handling logic for specific endpoints within the application. This class provides a
 * standardized structure for creating controllers.
 *
 * @property {express.Router} router - An Express Router instance for defining routes and handling HTTP requests.
 * @property {string} endpoint - The base endpoint path for the controller's routes, defaults to "/".
 */
export default abstract class BaseController {
	router: express.Router;
	endpoint: string;

	constructor(endpoint: string = "/") {
		this.endpoint = endpoint;

		this.router = express.Router({
			mergeParams: true,
		});
	}
}
