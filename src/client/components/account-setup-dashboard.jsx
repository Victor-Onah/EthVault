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
			<div className="h-1 bg-blue-300 rounded-full">
				<div
					className={`${
						state.user.setup.pin
							? "w-1/3"
							: state.user.setup.pin
							? "w-2/3"
							: "w-0"
					} h-full w-1/2 bg-blue-900`}></div>
			</div>
			<Link
				to="./setup"
				className="p-2 rounded-md bg-blue-900 float-right inline-block">
				{state.user.setup.pin ? "Get started" : "Continue"}
			</Link>
		</div>
	);
};

export default AccountSetupDashboard;
