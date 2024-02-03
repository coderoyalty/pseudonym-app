import BaseController from "../controllers/base.controller";
import ControllerFactory from "./controller.factory";
import asyncHandler from "express-async-handler";
import App from "../app";

enum HttpMethod {
	GET = "get",
	POST = "post",
	PUT = "put",
	DELETE = "delete",
	PATCH = "patch",
}

function registerRouteWithMethod(
	instance: BaseController,
	originalMethod: any,
	path: string,
	method: HttpMethod = HttpMethod.GET,
	...middlewares: any[]
) {
	if (!instance) {
		console.error("⚠ Can't access the router of the provided instance");
		return;
	}
	switch (method) {
		case HttpMethod.GET:
			instance.router.get(path, ...middlewares, asyncHandler(originalMethod));
			break;
		case HttpMethod.POST:
			instance.router.post(path, ...middlewares, asyncHandler(originalMethod));
			break;
		case HttpMethod.DELETE:
			instance.router.delete(
				path,
				...middlewares,
				asyncHandler(originalMethod),
			);
			break;
		case HttpMethod.PATCH:
			instance.router.patch(path, ...middlewares, asyncHandler(originalMethod));
			break;
		case HttpMethod.PUT:
			instance.router.put(path, ...middlewares, asyncHandler(originalMethod));
			break;
		default:
			break;
	}

	const endpoint = `${method.toUpperCase()} - ${instance.endpoint}${path}`;
	App.endpoints.push(endpoint);
}

/**
 * Get Decorator
 *
 * The `Get` decorator is used to register a route with the HTTP GET method.
 *
 * @param path - The path for the registered route.
 * @param middlewares - Optional middlewares to be applied to the route.
 * @returns - A decorator function that can be applied to methods within a controller class.
 */
function Get(path: string, ...middlewares: any[]) {
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		const originalMethod = descriptor.value;

		const instance = ControllerFactory.getInstance(target.constructor);

		registerRouteWithMethod(
			instance as BaseController,
			originalMethod,
			path,
			HttpMethod.GET,
			...middlewares,
		);
	};
}

/**
 * Delete Decorator
 *
 * The `Delete` decorator is used to register a route with the HTTP DELETE method.
 *
 * @param path - The path for the registered route.
 * @param middlewares - Optional middlewares to be applied to the route.
 * @returns - A decorator function that can be applied to methods within a controller class.
 */
function Delete(path: string, ...middlewares: any[]) {
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		const originalMethod = descriptor.value;

		const instance = ControllerFactory.getInstance(target.constructor);

		registerRouteWithMethod(
			instance as BaseController,
			originalMethod,
			path,
			HttpMethod.DELETE,
			...middlewares,
		);
	};
}

/**
 * Put Decorator
 *
 * The `Put` decorator is used to register a route with the HTTP PUT method.
 *
 * @param path - The path for the registered route.
 * @param middlewares - Optional middlewares to be applied to the route.
 * @returns - A decorator function that can be applied to methods within a controller class.
 */
function Put(path: string, ...middlewares: any[]) {
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		const originalMethod = descriptor.value;

		const instance = ControllerFactory.getInstance(target.constructor);

		registerRouteWithMethod(
			instance as BaseController,
			originalMethod,
			path,
			HttpMethod.PUT,
			...middlewares,
		);
	};
}

/**
 * Post Decorator
 *
 * The `Post` decorator is used to register a route with the HTTP POST method.
 *
 * @param path - The path for the registered route.
 * @param middlewares - Optional middlewares to be applied to the route.
 * @returns - A decorator function that can be applied to methods within a controller class.
 */
function Post(path: string, ...middlewares: any[]) {
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		const originalMethod = descriptor.value;

		const instance = ControllerFactory.getInstance(target.constructor);

		registerRouteWithMethod(
			instance as BaseController,
			originalMethod,
			path,
			HttpMethod.POST,
			...middlewares,
		);
	};
}

/**
 * Patch Decorator
 *
 * The `Patch` decorator is used to register a route with the HTTP PATCH method.
 *
 * @param path - The path for the registered route.
 * @param middlewares - Optional middlewares to be applied to the route.
 * @returns - A decorator function that can be applied to methods within a controller class.
 */
function Patch(path: string, ...middlewares: any[]) {
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		const originalMethod = descriptor.value;

		const instance = ControllerFactory.getInstance(target.constructor);

		registerRouteWithMethod(
			instance as BaseController,
			originalMethod,
			path,
			HttpMethod.PATCH,
			...middlewares,
		);
	};
}

export { Get, Delete, Put, Post, Patch };
