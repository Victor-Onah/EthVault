import { useContext, useEffect, useState } from "react";
import { BiMenu, BiSad } from "react-icons/bi";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { CgSpinner } from "react-icons/cg";

const DashboardLayout = () => {
	const [loadState, setLoadState] = useState("pending");
	const { dispatch } = useContext(AppContext);
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch("/api/user");

				if (!response.ok) {
					switch (response.status) {
						case 401:
							navigate("/sign-in");
							break;
						default:
							setLoadState("failed");
							break;
					}
					return;
				}

				const data = await response.json();

				dispatch({ type: "set_user", payload: data });
				setLoadState("done");
			} catch (error) {
				setLoadState("failed");
			}
		})();
	}, []);

	return (
		<main className="auth bg-blue-900 text-white">
			{loadState === "done" && (
				<div className="max-w-3xl m-auto flex flex-col  min-h-screen">
					<header className="sticky top-2 p-2 z-50">
						<div className="flex justify-between items-center bg-white bg-opacity-10 p-4 rounded-full text-sm backdrop-blur-md">
							<div>
								<h3 className="font-black">EthVault</h3>
							</div>
							<div>
								<button>
									<BiMenu />
								</button>
							</div>
						</div>
					</header>
					<Outlet />
					<div className="flex gap-4 items-center justify-center px-4 py-8 text-xs">
						<Link to={"/sign-in"} className="underline">
							Terms
						</Link>{" "}
						|
						<Link to={"/sign-in"} className="underline">
							Privacy policy
						</Link>
					</div>
				</div>
			)}
			{loadState === "failed" && (
				<div className="min-h-screen flex items-center justify-center p-4">
					<div className="bg-red-700 bg-opacity-20 backdrop-blur-md border border-slate-300 p-4 rounded-lg text-center space-y-4 text-sm w-full max-w-80">
						<h1 className="text-2xl font-bold">Oops!</h1>
						<div className="text-4xl flex justify-center">
							<span>
								<BiSad />
							</span>
						</div>
						<p>
							Sorry, we couldn't load your dashboard. <br />
							Try refreshing your browser.
						</p>
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
		</main>
	);
};

export default DashboardLayout;
