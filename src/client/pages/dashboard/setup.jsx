import { useContext } from "react";
import { AppContext } from "../../App";
import { BiCheck } from "react-icons/bi";
import PinSetupForm from "../../components/pin-setup-form";
import VerificationEmail from "../../components/verification-email";
import { FaEthereum } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Setup = () => {
	const { state } = useContext(AppContext);
	const navigate = useNavigate();

	return (
		<div className="text-sm p-4 space-y-6 flex-1">
			<div className="flex items-center gap-1">
				<span
					className={`p-2 rounded-full bg-white ${
						state.user.setup.pin ? "text-blue-900" : "bg-opacity-20"
					}`}>
					<BiCheck />
				</span>
				<span className="h-1 flex-1 bg-white"></span>
				<span
					className={`p-2 rounded-full bg-white ${
						state.user.setup.email
							? "text-blue-900"
							: "bg-opacity-20"
					}`}>
					<BiCheck />
				</span>
				<span className="h-1 flex-1 bg-white"></span>
				<span className="p-2 rounded-full bg-white bg-opacity-20">
					<BiCheck />
				</span>
			</div>
			<div className="text-center space-y-2">
				<h1 className="text-2xl font-bold">
					{!state.user.setup.pin
						? "Set Transaction PIN"
						: !state.user.setup.email
						? "Verify Your Email"
						: "Make Your First Deposit"}
				</h1>
				<p className="max-w-[400px] m-auto">
					{!state.user.setup.pin
						? "Transaction PINs are used during payment verification and other processes that require authorization."
						: !state.user.setup.email
						? "We want to make sure you're a real person. You can change your email any time."
						: "A balance of at least ETH 0.1 is required before users can start transacting with each other on the platform. We do this to make sure that user accounts are not left in active"}
				</p>
			</div>
			<div>
				{!state.user.setup.pin ? (
					<PinSetupForm />
				) : !state.user.setup.email ? (
					<VerificationEmail />
				) : (
					<div className="bg-white bg-opacity-20 backdrop-blur-md border border-slate-300 p-4 rounded-lg text-center space-y-4 text-sm w-full max-w-80">
						<Helmet>
							<title>
								{mailSent && !sendingEmail
									? `Verify Email`
									: `Resending Email...`}
							</title>
						</Helmet>
						<h1 className="text-2xl font-bold">Fund Account</h1>
						<div className="text-4xl flex justify-center">
							<span>
								<FaEthereum />
							</span>
						</div>
						<p>Continue to profile and copy wallet address.</p>
						<SubmitBtn
							onClick={() => navigate("/dashboard/profile")}>
							Continue
						</SubmitBtn>
					</div>
				)}
			</div>
		</div>
	);
};

export default Setup;
