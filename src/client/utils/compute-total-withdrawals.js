const computeTotalWithdrawals = transactions => {
	let totalWithdrawals = 0;

	for (let i = 0; i < transactions.length; i++) {
		if (transactions[i].type === "withdrawal")
			totalWithdrawals += transactions[i].amount;
	}

	return totalWithdrawals;
};

export default computeTotalWithdrawals;
