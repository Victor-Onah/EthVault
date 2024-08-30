import { BiCopy } from "react-icons/bi";
import wallets from "../../assets/wallets";
import { toast } from "sonner";
import { useContext } from "react";
import { AppContext } from "../../App";
import { Helmet } from "react-helmet";

const Receive = () => {
	const { state } = useContext(AppContext);

	return (
		<section className="p-4 space-y-12 flex-1">
			<Helmet>
				<title>Receive Funds</title>
				<meta name="description" content="" />
			</Helmet>
			<div className="text-center">
				<h1 className="text-2xl font-bold">Receive funds</h1>
				<p className="text-sm">Copy your email or wallet address</p>
			</div>
			<div className="text-sm space-y-2">
				<div className="flex-1 bg-white bg-opacity-20 p-4 rounded-lg flex items-center justify-between border border-slate-300 text-center backdrop-blur-sm">
					<span className="overflow-ellipsis flex-1 text-left max-w-[90%] overflow-clip">
						{wallets[Math.floor(Math.random() * 2)]}
					</span>
					<button
						className="active:scale-[.98]"
						onClick={() => {
							if (window.navigator.clipboard) {
								window.navigator.clipboard.writeText(
									wallets[Math.floor(Math.random() * 2)]
								);
								toast.success(
									"Wallet address copied successfully"
								);
							} else {
								toast.error("Failed to copy");
							}
						}}>
						<BiCopy />
					</button>
				</div>
				<div
					onClick={() => setForm("other-platform")}
					className="flex-1 bg-white bg-opacity-20 p-4 rounded-lg flex items-center justify-between border border-slate-300 text-center gap-2 backdrop-blur-sm">
					<span className="overflow-ellipsis flex-1 text-left max-w-[90%] overflow-clip">
						{state.user.email}
					</span>
					<button
						className="active:scale-[.98]"
						onClick={() => {
							if (window.navigator.clipboard) {
								window.navigator.clipboard.writeText(
									state.user.email
								);
								toast.success(
									"Email address copied successfully"
								);
							} else {
								toast.error("Failed to copy");
							}
						}}>
						<BiCopy />
					</button>
				</div>
			</div>
		</section>
	);
};

export default Receive;
