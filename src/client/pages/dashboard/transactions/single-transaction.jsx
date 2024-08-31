import { useContext } from "react";
import { AppContext } from "../../../App";
import { useNavigate, useParams } from "react-router-dom";
import { BiCheckCircle } from "react-icons/bi";
import generateETHAddress from "../../../utils/generate-address";
import wallets from "../../../assets/wallets";

const SingleTransaction = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { state } = useContext(AppContext);

	const transaction = state.user.transactions.find(
		transactions => transactions._id === id
	);

	if (!transaction) return navigate("/not-found");

	return (
		<div className="flex-1 p-4 space-y-6">
			<h1 className="text-2xl font-bold text-center">
				Transaction Details
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 backdrop-blur-sm bg-white bg-opacity-20 p-2 rounded-lg border border-slate-300 text-sm">
				<div>
					<div className="mb-4">
						<h2 className="text-lg font-medium mb-1">
							Transaction Hash
						</h2>
						<p className=" break-all">{generateETHAddress()}</p>
					</div>
					<div className="mb-4">
						<h2 className="text-lg font-medium mb-1">
							Block Number
						</h2>
						<p className="">{transaction._id}</p>
					</div>
					<div className="mb-4">
						<h2 className="text-lg font-medium mb-1">Timestamp</h2>
						<p className="">
							{new Date(transaction.date).toDateString()}
						</p>
					</div>
				</div>
				<div>
					<div className="mb-4">
						<h2 className="text-lg font-medium mb-1">
							Sender Address
						</h2>
						<p className=" break-all">
							{transaction.type === "deposit"
								? generateETHAddress()
								: wallets[
										Math.floor(
											Math.random() * wallets.length
										)
								  ]}
						</p>
					</div>
					<div className="mb-4">
						<h2 className="text-lg font-medium mb-1">
							Recipient Address
						</h2>
						<p className=" break-all">
							{transaction.type === "deposit"
								? wallets[
										Math.floor(
											Math.random() * wallets.length
										)
								  ]
								: generateETHAddress()}
						</p>
					</div>
					<div className="mb-4">
						<h2 className="text-lg font-medium mb-1">Amount</h2>
						<p className="">1.23456789 ETH</p>
					</div>
				</div>
			</div>
			<div className="backdrop-blur-sm bg-white bg-opacity-20 p-2 rounded-lg border border-slate-300 text-sm">
				<h2 className="text-lg font-medium mb-2">Transaction Status</h2>
				<div className="flex items-center gap-2">
					<BiCheckCircle className="h-6 w-6 text-green-300" />
					<span className="text-green-300 font-medium">
						Confirmed
					</span>
				</div>
			</div>
			<div className="backdrop-blur-sm bg-white bg-opacity-20 p-2 rounded-lg border border-slate-300 text-sm">
				<h2 className="text-lg font-medium mb-2">Additional Details</h2>
				<p className="">
					This transaction was part of a larger batch of transfers to
					various wallets. The overall batch was successful and all
					transfers were confirmed within the same block.
				</p>
			</div>
		</div>
	);
};

export default SingleTransaction;
