import BaseController from "../../controllers/base.controller";
import ControllerFactory from "../controller.factory";

describe("ControllerFactory", () => {
	class TestController extends BaseController {}

	describe("getInstance", () => {
		it("should create and return an instance of the specified class", () => {
			const instance = ControllerFactory.getInstance(TestController);

			expect(instance).toBeInstanceOf(TestController);
		});

		it("should return same instance if the controller class has been instantiated", () => {
			const firstInstance = ControllerFactory.getInstance(TestController);
			const secondInstance = ControllerFactory.getInstance(TestController);

			expect(firstInstance).toBe(secondInstance);
		});
	});
});
