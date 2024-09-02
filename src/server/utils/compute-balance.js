const computeBalance = async transactions => {
	let totalDeposits = 0;
	let totalWithdrawals = 0;

	for (let i = 0; i < transactions.length; i++) {
		if (transactions[i].type === "deposit")
			totalDeposits += transactions[i].amount;
		if (transactions[i].type === "withdrawal")
			totalWithdrawals += transactions[i].amount;
	}

	return totalDeposits - totalWithdrawals;
};

export default computeBalance;
