const generateETHAddress = () => {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let address = "T";

	for (let i = 0; i < 26; i++) {
		address += characters.charAt(
			Math.floor(Math.random() * characters.length)
		);
	}

	return address;
};

export default generateETHAddress;
