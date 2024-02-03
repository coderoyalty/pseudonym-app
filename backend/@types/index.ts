import express from "express";
interface GenericRequest<T> extends express.Request {
	user: T;
}

export { GenericRequest };
