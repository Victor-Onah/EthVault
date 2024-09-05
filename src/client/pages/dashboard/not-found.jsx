import { Helmet } from "react-helmet";
import { TbError404 } from "react-icons/tb";

const DashboardNotFound = () => (
	<div className="flex-1 flex items-center justify-center p-4">
		<Helmet>
			<title>Error - Not Found</title>
		</Helmet>
		<div className="bg-white bg-opacity-20 backdrop-blur-md border border-slate-300 p-4 rounded-lg text-center space-y-4 text-sm w-full max-w-80">
			<h1 className="text-2xl font-bold">Not Found</h1>
			<div className="text-4xl flex justify-center">
				<span>
					<TbError404 />
				</span>
			</div>
			<p>We can't find transaction with this page</p>
		</div>
	</div>
);

export default DashboardNotFound;
