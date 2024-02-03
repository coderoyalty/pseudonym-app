import App from "../app";
import ControllerFactory from "./controller.factory";
import BaseController from "../controllers/base.controller";

/**
 * Controller Decorator
 *
 * The `Controller` decorator is a higher-order function that creates and injects
 * instances of controller classes into the application.
 *
 * @param args - Additional arguments to be passed to the controller constructor.
 * @returns A decorator function that can be applied to controller classes.
 */
function Controller(...args: any[]): ClassDecorator {
	return function <T>(target: T) {
		const app = App.getInstance();
		const instance = ControllerFactory.getInstance(target, ...args);
		app.injectController(instance as BaseController);
	};
}

export default Controller;
