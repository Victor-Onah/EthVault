import { useContext, useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import SubmitBtn from "../../components/button";
import { Helmet } from "react-helmet";
import { AppContext } from "../../App";

const Logout = () => {
	const [loadState, setLoadState] = useState("pending");
	const navigate = useNavigate();
	const { dispatch } = useContext(AppContext);

	const logout = async () => {
		try {
			setLoadState("pending");

			await fetch("/api/user/logout");

			navigate("/sign-in");
			dispatch({ type: "set_user", payload: null });
		} catch (error) {
			setLoadState("failed");
		}
	};

	useEffect(() => {
		logout();
	}, []);

	return (
		<>
			<Helmet>
				<title>Logout</title>
				<meta name="description" content="" />
			</Helmet>
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
						<p>We're logging you out</p>
					</div>
				</div>
			)}
		</>
	);
};

export default Logout;
