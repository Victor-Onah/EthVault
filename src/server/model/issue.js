import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
	userEmail: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	images: {
		type: [String]
	}
});

const Issue = mongoose.connection
	.useDb("Eth_Vault")
	.model("Issue", issueSchema);

export default Issue;
