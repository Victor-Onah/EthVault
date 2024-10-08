import { useContext } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { AppContext } from "../App";
import { Link } from "react-router-dom";

const AccountSetupDashboard = () => {
	const { state } = useContext(AppContext);

	return (
		<div className="backdrop-blur-sm bg-white bg-opacity-20 p-2 rounded-lg border border-slate-300 space-y-2">
			<h4 className="font-semibold text-base flex gap-2 items-center">
				<BiInfoCircle /> Setup your account
			</h4>
			<p>
				Setting up your account is important for transaction processing.
				Customers who have not setup their account may not be able to
				send or receive funds.
			</p>
			<div className="flex gap-4 items-center">
				<div className="h-1 bg-blue-300 rounded-full flex-1">
					<div
						className={`${
							state.user.setup.pin &&
							!state.user.setup.email &&
							"w-1/3"
						} ${
							state.user.setup.email &&
							!state.user.setup.deposit &&
							"w-2/3"
						} h-full bg-blue-900`}></div>
				</div>
				<span className="font-semibold">
					{state.user.setup.pin && !state.user.setup.email
						? 1
						: state.user.setup.pin && state.user.setup.email
						? 2
						: 0}
					/3
				</span>
			</div>
			<Link
				to="./setup"
				className="p-2 rounded-md bg-blue-900 float-right inline-block">
				{!state.user.setup.pin ? "Get started" : "Continue"}
			</Link>
		</div>
	);
};

export default AccountSetupDashboard;
