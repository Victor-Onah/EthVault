import { config } from "dotenv";
import fetch from "node-fetch";
import { readFile } from "fs/promises";
import { resolve } from "path";

config();

class Mailer {
	static async sendVerificationMail({ email }) {
		try {
			let emailTemplate = await readFile(
				resolve(process.cwd(), "./src/server/lib/email-template.html"),
				"utf-8"
			);
			emailTemplate = emailTemplate.replace(
				"{{verification_link}}",
				`https://ethvault.onrender.com/api/user/verify?email=${email}`
			);

			const response = await fetch(
				"https://api.brevo.com/v3/smtp/email",
				{
					method: "POST",
					body: JSON.stringify({
						sender: {
							name: "EthVault",
							email: "victor.onah@atrizult.com"
						},
						to: [{ email }],
						subject: "Verify Your Account",
						htmlContent: emailTemplate
					}),
					headers: {
						"api-key": process.env.API_KEY,
						"Content-Type": "application/json"
					}
				}
			);

			if (!response.ok) return false;

			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
}

export default Mailer;
