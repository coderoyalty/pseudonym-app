import request from "supertest";
import express from "express";
import AuthController from "../auth.controller";
import AuthService from "../../services/auth.service";
import ControllerFactory from "../../utils/controller.factory";
import BaseController from "../base.controller";

jest.mock("../../services/auth.service");

const app = express();
app.use(express.json());

describe("AuthController", () => {
	const data = {
		email: "johndoe@gmail.com",
		username: "Johndoe",
		password: "JohnDoe1970",
	};

	beforeAll(() => {
		const authController: BaseController =
			ControllerFactory.getInstance(AuthController);
		app.use(`${authController.endpoint}`, authController.router);
	});

	describe("POST /auth/register", () => {
		it("should return status 201 when registering successfully", async () => {
			const response = await request(app).post("/auth/register").send(data);

			expect(response.status).toBe(201);
			expect(response.body).toEqual({
				message: "Account has been created successfully.",
			});
		});
	}); // /auth/register

	describe("POST /auth/login", () => {
		it("should return status 200 when logging in successfully", async () => {
			const token = "mock-token";
			(AuthService.login as jest.Mock).mockResolvedValue(token);

			const response = await request(app).post("/auth/login").send({
				email: data.email,
				password: data.password,
			});

			expect(response.status).toBe(200);
			expect(response.body).toEqual({
				message: "You've signed-in successfully",
			});

			expect(response.header["set-cookie"]).toBeDefined();
			expect(response.headers["set-cookie"][0].trim().split(";")).toContain(
				`auth=${token}`,
			);
		});
	}); // /auth/login

	describe("POST /auth/logout", () => {
		it("should return status 200 when logging out successfully", async () => {
			const response = await request(app).post("/auth/logout");

			expect(response.status).toBe(200);
		});
	}); // /auth/logout
});
