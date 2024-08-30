const computeTotalDeposits = transactions => {
	let totalDeposits = 0;

	for (let i = 0; i < transactions.length; i++) {
		if (transactions[i].type === "deposit")
			totalDeposits += transactions[i].amount;
	}

	return totalDeposits;
};

export default computeTotalDeposits;
