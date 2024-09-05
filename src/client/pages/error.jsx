import { Helmet } from "react-helmet";
import { BiError } from "react-icons/bi";

const Error = () => {
	return (
		<main className="auth text-white">
			<div className="min-h-screen flex items-center justify-center p-4">
				<Helmet>
					<title>Error - Unknown</title>
				</Helmet>
				<div className="bg-white bg-opacity-20 backdrop-blur-md border border-slate-300 p-4 rounded-lg text-center space-y-4 text-sm w-full max-w-80">
					<h1 className="text-2xl font-bold">Application Error</h1>
					<div className="text-4xl flex justify-center">
						<span>
							<BiError />
						</span>
					</div>
					<p>
						The application crashed. <br /> Try refreshing your
						browser.
					</p>
				</div>
			</div>
		</main>
	);
};

export default Error;
