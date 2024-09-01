import { useContext } from "react";
import { AppContext } from "../../App";
import { BiCheck } from "react-icons/bi";

const Setup = () => {
	const { state } = useContext(AppContext);
	return (
		<div className="text-sm p-4">
			<div className="flex">
				<span>
					<BiCheck />
				</span>
				<span className="h-1 flex-1 bg-white"></span>
				<span>
					<BiCheck />
				</span>
				<span className="h-1 flex-1 bg-white"></span>
				<span>
					<BiCheck />
				</span>
			</div>
			<div className="text-center">
				<h1 className="text-2xl">
					{!state.user.setup.pin
						? "Set Transaction PIN"
						: !state.user.setup.email
						? "Verify Your Email"
						: "Make Your First Deposit"}
				</h1>
				<p>
					{!state.user.setup.pin
						? "Transaction PINs are used during payment verification and other processes that require authorization."
						: !state.user.setup.email
						? "We want to make sure you're a real person. You can change your email any time."
						: "A balance of at least ETH 0.1 is required before users can start transacting with each other on the platform. We do this to make sure that user accounts are not left in active"}
				</p>
			</div>
		</div>
	);
};

export default Setup;
