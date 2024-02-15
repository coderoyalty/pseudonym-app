import express from "express";

export interface CookieAttributes {
	secure?: boolean;
	path?: string;
	domain?: string;
	sameSite?: "lax" | "strict" | "none";
	httpOnly?: boolean;
	maxAge?: number;
	expires?: Date;
}

export class Cookie {
	constructor(name: string, value: string, attributes: CookieAttributes) {
		this.name = name;
		this.value = value;
		this.attributes = attributes;
	}

	private name: string;
	private value: string;
	private attributes: CookieAttributes;

	set(res: express.Response) {
		res.cookie(this.name, this.value, this.attributes);
	}
}
