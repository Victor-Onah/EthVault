import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: {
		required: true,
		type: String
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	transactions: {
		type: [
			{
				type: {
					type: String,
					enum: ["deposit", "withdrawal"]
				},
				amount: Number,
				date: Date
			}
		]
	},
	setup: {
		pin: {
			type: Boolean,
			default: false
		},
		email: {
			type: Boolean,
			default: false
		},
		deposit: {
			type: Boolean,
			default: false
		}
	}
});

const User = mongoose.connection.useDb("Eth_Vault").model("User", userSchema);

export default User;
