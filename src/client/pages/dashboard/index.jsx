import { BiCalendar } from "react-icons/bi";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { PiHandWavingDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import computeTotalDeposits from "../../utils/compute-total-deposits";
import computeTotalWithdrawals from "../../utils/compute-total-withdrawals";

const Dashboard = () => {
	const { state } = useContext(AppContext);
	const deposits = computeTotalDeposits(state.user.transactions || []);
	const withdrawals = computeTotalWithdrawals(state.user.transactions || []);

	return (
		<>
			<section className="p-4 space-y-2">
				<Helmet>
					<title>Dashboard - EthVault</title>
					<meta name="description" content="" />
				</Helmet>
				<div>
					<h1 className="text-xl font-bold flex items-center gap-2">
						Hi {state.user.name.split(" ")[0]}{" "}
						<PiHandWavingDuotone />
					</h1>
				</div>
				<div className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-700 px-2 py-4 rounded-lg space-y-6">
					<div>
						<p className="text-xs">Available balance</p>
						<h2 className="font-black text-lg">
							ETH {Number(deposits - withdrawals).toFixed(2)}
						</h2>
					</div>
					<div className="flex justify-center items-center gap-4">
						<Link
							to="./send"
							className="text-sm flex gap-1 items-center py-1 px-2 bg-blue-400 rounded-full w-fit shadow-inner">
							Send <BsArrowUp />
						</Link>
						<Link
							to="./receive"
							className="text-sm flex gap-1 items-center py-1 px-2 bg-blue-400 rounded-full w-fit shadow-inner">
							Receive <BsArrowDown />
						</Link>
					</div>
				</div>
			</section>
			<section className="text-sm p-4 flex gap-4">
				<div className="bg-gradient-to-r from-green-500 to-green-600 flex-1 rounded-md space-y-2 p-4">
					<h4 className="text-xs">Total deposit</h4>
					<p className="font-bold">ETH {deposits.toFixed(2)}</p>
				</div>
				<div className="bg-gradient-to-r from-red-500 to-red-600 flex-1 rounded-md space-y-2 p-4">
					<h4 className="text-xs">Total withdrawal</h4>
					<p className="font-bold">ETH {withdrawals.toFixed(2)}</p>
				</div>
			</section>
			<section className="p-4 space-y-4 flex-1">
				<div className="flex justify-between items-center">
					<h2 className="text-lg font-bold">Recent transactions</h2>
					<Link to="./transactions" className="text-sm underline">
						See more
					</Link>
				</div>
				<div className="text-sm space-y-2">
					{state.user.transactions.length > 0 ? (
						state.user.transactions
							.slice(state.user.transactions.length - 6)
							.sort(
								(a, b) =>
									new Date(b.date).getTime() -
									new Date(a.date).getTime()
							)
							.map((transaction, index) => (
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
										<p className="capitalize">
											{transaction.type}
										</p>
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
		</>
	);
};

export default Dashboard;
