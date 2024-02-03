import BaseController from "../controllers/base.controller";

/**
 * ControllerFactory Class
 *
 * The `ControllerFactory` class is responsible for managing and creating instances of
 * controllers. It ensures that only one instance of each controller is created and
 * provides a centralized point for controller instantiation.
 */
class ControllerFactory {
	// A map to store instances of controllers, using the class name as the key
	private static instances: Map<string, BaseController> = new Map();

	/**
	 * getInstance Method
	 *
	 * This method creates and returns an instance of the specified controller class.
	 * If an instance of the same class has already been created, it returns the existing
	 * instance to avoid redundant instantiation.
	 *
	 * @template T - The type of the controller class.
	 * @param {Function} controller - The controller class.
	 * @param {any[]} args - Additional arguments to be passed to the controller constructor.
	 * @returns {T} - An instance of the specified controller class.
	 */
	static getInstance<T>(controller: any, ...args: any[]): T {
		// use the class name as key to a map
		const name = controller.name;
		if (this.instances.has(name)) {
			return this.instances.get(name) as T;
		}

		const instance: BaseController = new (controller as any)(...args);
		this.instances.set(name, instance);

		// Log a message indicating that the instance has been created
		console.log(`${name}: ✅ created`);
		return this.instances.get(name) as T;
	}
}

export default ControllerFactory;
