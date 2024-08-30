import { useContext } from "react";
import { Helmet } from "react-helmet";
import { AppContext } from "../../App";
import { BiCalendar } from "react-icons/bi";
import { Link } from "react-router-dom";

const Transactions = () => {
	const { state } = useContext(AppContext);

	return (
		<section className="p-4 space-y-12 flex-1">
			<Helmet>
				<title>Transactions History - EthVault</title>
				<meta name="description" content="" />
			</Helmet>
			<div className="text-center">
				<h1 className="text-2xl font-bold">Transactions History</h1>
				<p className="text-sm">View your past transactions.</p>
			</div>
			<div className="text-sm space-y-2">
				{state.user.transactions ? (
					state.user.transactions.map((transaction, index) => (
						<Link
							key={index}
							to={`./transactions/${transaction._id}`}
							className="active:scale-[.98] flex items-center justify-between gap-4 backdrop-blur-sm bg-white bg-opacity-20 p-2 rounded-lg border border-slate-300">
							<div className="flex flex-1 gap-1 items-center text-xs">
								<BiCalendar />{" "}
								{new Date(
									transaction.date
								).toLocaleDateString()}
							</div>
							<div className="flex-1">
								<p
									className={`${
										transaction.type === "deposit"
											? "text-green-300"
											: "text-red-300"
									}`}>
									{transaction.type === "withdrawal"
										? "-"
										: "+"}
									ETH{" "}
									{Number(
										transaction.amount
									).toLocaleString()}
								</p>
							</div>
							<div className="flex-1 text-right">
								<p className="capitalize">{transaction.type}</p>
							</div>
						</Link>
					))
				) : (
					<div className="text-center p-4 rounded-lg bg-white bg-opacity-20 border border-slate-300 backdrop-blur-md">
						No transactions to show
					</div>
				)}
			</div>
		</section>
	);
};

export default Transactions;
