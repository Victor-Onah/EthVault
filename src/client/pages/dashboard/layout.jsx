import { useContext, useEffect, useState } from "react";
import { BiSad } from "react-icons/bi";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { CgSpinner } from "react-icons/cg";
import Header from "../../components/header";
import { Helmet } from "react-helmet";

const DashboardLayout = () => {
	const [loadState, setLoadState] = useState("pending");
	const { dispatch, state } = useContext(AppContext);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => window.scrollTo({ top: 0 }), [location]);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch("/api/user");
				const response2 = await fetch(
					"https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
				);

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
				const { USD } = await response2.json();

				dispatch({ type: "set_user", payload: data });
				dispatch({ type: "set_rate", payload: USD });
				setLoadState("done");
			} catch (error) {
				setLoadState("failed");
			}
		})();
	}, []);

	return (
		<main className="auth text-white">
			{loadState === "done" && (
				<div className="max-w-3xl m-auto flex flex-col  min-h-screen">
					<Header />
					<Outlet />
					<div className="flex gap-4 items-center justify-center px-4 py-8 text-xs">
						<Link to={"/terms"} className="underline">
							Terms
						</Link>{" "}
						|
						<Link to={"/privacy"} className="underline">
							Privacy policy
						</Link>
					</div>
				</div>
			)}
			{loadState === "failed" && (
				<div className="min-h-screen flex items-center justify-center p-4">
					<Helmet>
						<title>Error</title>
						<meta name="description" content="" />
					</Helmet>
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
					<Helmet>
						<title>Loading...</title>
						<meta name="description" content="" />
					</Helmet>
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
