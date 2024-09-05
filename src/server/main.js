import express from "express";
import ViteExpress from "vite-express";
import { resolve } from "path";
import { config } from "dotenv";
import { connect } from "mongoose";
import User from "./model/user.js";
import cookieParser from "cookie-parser";
import Mailer from "./utils/mailing-service.js";
// import { baseUser } from "./utils/default.js";
import formidable from "formidable";
import Issue from "./model/issue.js";
import { readFile } from "fs/promises";

config();

const app = express();
const port = parseInt(process.env.PORT || "3000");

app.use(express.static(resolve(process.cwd(), "./public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const authMiddleware = async (req, res, next) => {
	try {
		const authCookie = req.cookies.auth;

		if (!authCookie) return res.status(401).end();

		req.email = Buffer.from(authCookie, "hex").toString("utf-8");

		next();
	} catch (error) {
		res.status(500).end();
	}
};

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

		res.end();
	} catch (error) {
		res.status(500).end();
	}
});

app.get("/api/user", authMiddleware, async (req, res) => {
	try {
		const user = await User.findOne({ email: req.email });

		if (!user) return res.status(401).end();

		res.json(user);
	} catch (error) {
		res.status(500).end();
	}
});

app.get("/api/user/logout", async (req, res) => {
	res.cookie("auth", null, {
		maxAge: 0,
		secure: true,
		httpOnly: true,
		path: "/"
	});

	res.end();
});

app.post("/api/user/reset/email", authMiddleware, async (req, res) => {
	try {
		const { email, "new-email": newEmail, pin } = req.body;

		if (!email || !newEmail) return res.status(403).end();

		const user = await User.findOne({ email });
		const userWithNewEmail = await User.findOne({ email: newEmail });

		if (userWithNewEmail) return res.status(409).end();

		if (!user) return res.status(404).end();

		if (!user.pin === pin) return res.status(401).end();

		user.email = newEmail;

		await user.save();

		res.status(201).end();
	} catch (error) {
		res.status(500).end();
	}
});

app.post("/api/user/reset/password", authMiddleware, async (req, res) => {
	try {
		const { email, "new-password": newPassword, pin } = req.body;

		if (!email || !newPassword) return res.status(403).end();

		const user = await User.findOne({ email });

		if (!user) return res.status(404).end();

		if (user.pin !== pin) return res.status(401).end();

		user.password = newPassword;

		await user.save();

		res.status(201).end();
	} catch (error) {
		res.status(500).end();
	}
});

app.post("/api/user/transfer", authMiddleware, async (req, res) => {
	try {
		const { external } = req.query;

		if (external) return res.status(400).end();

		const { email } = req.body;

		if (req.email === email) return res.status(403).end("self");

		const otherUser = await User.findOne({ email });

		if (!otherUser) return res.status(404).end();

		const { pin, email: emailSetup, deposit } = otherUser.setup;

		if (pin && emailSetup && deposit)
			res.status(400).end("balance_insufficient");

		res.status(403).end();
	} catch (error) {
		res.status(500).end();
	}
});

app.get(
	"/api/user/send-verification-mail",
	authMiddleware,
	async (req, res) => {
		try {
			const user = await User.findOne({ email: req.email });

			if (!user) return res.status(404).end();

			const isMailSent = await Mailer.sendVerificationMail({
				email: req.email
			});

			if (!isMailSent) return res.status(503).end();

			res.end();
		} catch (error) {
			res.status(500).redirect("/error");
		}
	}
);

app.get("/api/user/verify", async (req, res) => {
	try {
		const { email } = req.query;

		if (!email) return res.status(400).end();

		const user = await User.findOne({ email });

		if (user) {
			user.setup.email = true;

			await user.save();
		}

		res.redirect("/dashboard");
	} catch (error) {
		res.status(500).redirect("/error");
	}
});

app.post("/api/user/setup/pin", authMiddleware, async (req, res) => {
	try {
		const { pin } = req.body;

		if (!pin) return res.status(400).end();

		const user = await User.findOne({ email: req.email });

		if (!user) return res.status(404).end();

		user.setup.pin = true;
		user.pin = pin;

		await user.save();

		res.end();
	} catch (error) {
		res.status(500).end();
	}
});

app.post("/api/user/issue", authMiddleware, async (req, res) => {
	try {
		const requestParser = formidable({});

		const [fields, files] = await requestParser.parse(req);

		const issue = new Issue({
			userEmail: req.email,
			description: fields.description[0],
			images: []
		});

		if (files.images) {
			for (let image of files.images) {
				const imageString = await readFile(image.filepath, "base64");

				issue.images.push(imageString);
			}
		}

		await issue.save();
		await Mailer.sendIssueReceiptConfirmationEmail({
			email: req.email,
			name: fields.name[0]
		});

		res.status(201).end();
	} catch (error) {
		res.status(500).end();
	}
});

app.post("/api/send-reset-email", async (req, res) => {
	try {
		const { email } = req.body;

		if (!email) return res.status(400).end();

		const user = await User.findOne({ email });

		if (!user) return res.status(404).end();

		const isMailSent = await Mailer.sendPasswordResetEmail({
			email
		});

		if (!isMailSent) return res.status(503).end();

		res.end();
	} catch (error) {
		res.status(500).redirect("/error");
	}
});

app.post("/api/reset-password", async (req, res) => {
	try {
		const { email, "new-password": newPassword } = req.body;

		if (!email || !newPassword) return res.status(400).end();

		const user = await User.findOne({ email });

		if (!user) return res.status(404).end();

		user.password = newPassword;

		await user.save();

		res.end();
	} catch (error) {
		res.status(500).redirect("/error");
	}
});

ViteExpress.listen(app, 3000, async () => {
	try {
		await connect(process.env.DB_URL);

		// await new User(baseUser).save();
		console.log(`Server is listening on port ${port}...`);
	} catch (error) {
		console.error(error);
	}
});
