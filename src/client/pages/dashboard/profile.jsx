import { useContext } from "react";
import { AppContext } from "../../App";
import { BiCopy } from "react-icons/bi";
import { toast } from "sonner";
import wallets from "../../assets/wallets";
import { Link } from "react-router-dom";

const Profile = () => {
	const {
		state: { user }
	} = useContext(AppContext);

	return (
		<div className="p-4 space-y-6">
			<h1 className="text-2xl font-bold text-center">Profile</h1>
			<div className="text-sm space-y-2">
				<div className="space-y-1  p-2 rounded-lg bg-white bg-opacity-20 backdrop-blur-md border border-slate-300">
					<p className="font-semibold">Name</p>
					<p className="capitalize p-2 rounded-lg bg-white bg-opacity-10 backdrop-blur-md">
						{user.name}
					</p>
				</div>
				<div className="space-y-1  p-2 rounded-lg bg-white bg-opacity-20 backdrop-blur-md border border-slate-300">
					<p className="font-semibold">Email</p>
					<p className="lowercase p-2 rounded-lg bg-white bg-opacity-10 backdrop-blur-md flex justify-between items-center">
						{user.email}
						<button
							className="p-2 active:scale-[.95]"
							onClick={() =>
								window.navigator.clipboard &&
								(window.navigator.clipboard.writeText(
									user.email
								),
								toast.success("Email copied to clipboard"))
							}>
							<BiCopy />
						</button>
					</p>
				</div>
				<div className="space-y-1  p-2 rounded-lg bg-white bg-opacity-20 backdrop-blur-md border border-slate-300">
					<p className="font-semibold">Wallet address</p>
					<p className="lowercase p-2 rounded-lg bg-white bg-opacity-10 backdrop-blur-md flex justify-between items-center">
						{wallets[Math.floor(Math.random() * wallets.length)]}
						<button
							className="p-2 active:scale-[.95]"
							onClick={() =>
								window.navigator.clipboard &&
								(window.navigator.clipboard.writeText(
									wallets[
										Math.floor(
											Math.random() * wallets.length
										)
									]
								),
								toast.success(
									"Wallet address copied to clipboard"
								))
							}>
							<BiCopy />
						</button>
					</p>
				</div>
			</div>
			<hr />
			<div className="space-y-4">
				<h2 className="text-lg font-bold">Useful links</h2>
				<div className="flex flex-col gap-1 text-sm underline">
					<Link to="/dashboard/reset/password">Change password</Link>
					<Link to="/dashboard/reset/email">Change email</Link>
				</div>
			</div>
		</div>
	);
};

export default Profile;
