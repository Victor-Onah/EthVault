import express from "express";
import ViteExpress from "vite-express";
import { resolve } from "path";
import { config } from "dotenv";
import { connect } from "mongoose";
import User from "./model/user.js";
import cookieParser from "cookie-parser";

config();

const app = express();
const port = parseInt(process.env.PORT || "3000");

app.use(express.static(resolve(process.cwd(), "./public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/api/sign-up", async (req, res) => {
	try {
		await User.create(req.body);

		res.status(201).end();
	} catch (error) {
		if (error.message.includes("validation")) return res.status(400).end();
		if (error.message.includes("duplicate")) return res.status(409).end();

		res.status(500).end();
	}
});

app.post("/api/sign-in", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user) return res.status(404).end();
		if (user.password !== password) return res.status(401).end();

		const authCookie = Buffer.from(email).toString("hex");

		res.cookie("auth", authCookie, {
			secure: true,
			httpOnly: true,
			maxAge: 60_000 * 60 * 24 * 3,
			path: "/"
		});

		res.status(200).end();
	} catch (error) {
		res.status(500).end();
	}
});

app.get("/api/user", async (req, res) => {
	try {
		const authCookie = req.cookies.auth;

		if (!authCookie) return res.status(401).end();

		const email = Buffer.from(authCookie, "hex").toString("utf-8");
		const user = await User.findOne({ email }).select("name email phone");

		if (!user) return res.status(401).end();

		res.json(user);
	} catch (error) {
		res.status(500).end();
	}
});

ViteExpress.listen(app, 3000, async () => {
	try {
		await connect(process.env.DB_URL);
		console.log(`Server is listening on port ${port}...`);
	} catch (error) {
		console.error(error);
	}
});
