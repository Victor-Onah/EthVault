const generateETHAddress = async () => {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let address = "0x";

	for (let i = 0; i <= 40; i++) {
		address += characters.charAt(
			Math.floor(Math.random() * characters.length)
		);
	}

	return address;
};

export default generateETHAddress;
