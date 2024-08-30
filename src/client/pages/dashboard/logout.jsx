import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import SubmitBtn from "../../components/button";

const Logout = () => {
	const [loadState, setLoadState] = useState("pending");
	const navigate = useNavigate();

	const logout = async () => {
		try {
			setLoadState("pending");

			await fetch("/api/user/logout");

			navigate("/sign-in");
		} catch (error) {
			setLoadState("failed");
		}
	};

	useEffect(() => {
		logout();
	}, []);

	return (
		<>
			{loadState === "failed" && (
				<div className="min-h-screen flex items-center justify-center p-4">
					<div className="bg-red-700 bg-opacity-20 backdrop-blur-md border border-slate-300 p-4 rounded-lg text-center space-y-4 text-sm w-full max-w-80">
						<h1 className="text-2xl font-bold">Oops!</h1>
						<div className="text-4xl flex justify-center">
							<span>
								<BiSad />
							</span>
						</div>
						<p>Sorry, we couldn't log you out.</p>
						<SubmitBtn onClick={logout}>Try again</SubmitBtn>
					</div>
				</div>
			)}
			{loadState === "pending" && (
				<div className="min-h-screen flex items-center justify-center p-4">
					<div className="bg-white bg-opacity-20 backdrop-blur-md border border-slate-300 p-4 rounded-lg text-center space-y-4 text-sm w-full max-w-80">
						<h1 className="text-2xl font-bold">Please wait...</h1>
						<div className="text-4xl flex justify-center">
							<span className="animate-spin">
								<CgSpinner />
							</span>
						</div>
						<p>We're loading your dashboard</p>
					</div>
				</div>
			)}
		</>
	);
};

export default Logout;
