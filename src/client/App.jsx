import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Index from "./pages";
import SignIn from "./pages/sign-in";
import Dashboard from "./pages/dashboard";
import Send from "./pages/dashboard/send";
import { Toaster } from "sonner";
import Receive from "./pages/dashboard/receive";
import { createContext, useReducer } from "react";
import DashboardLayout from "./pages/dashboard/layout";
import TermsAndConditions from "./pages/terms";
import PrivacyPolicy from "./pages/privacy";
import Logout from "./pages/dashboard/logout";
import Profile from "./pages/dashboard/profile";
import SingleTransaction from "./pages/dashboard/transactions/single-transaction";
import TransactionsLayout from "./pages/dashboard/transactions/layout";
import Transactions from "./pages/dashboard/transactions";
import NotFound from "./pages/not-found";
import Error from "./pages/error";
import DashboardNotFound from "./pages/dashboard/not-found";
import ResetPassword from "./pages/dashboard/reset/password";
import ResetEmail from "./pages/dashboard/reset/email";
import Setup from "./pages/dashboard/setup";

export const AppContext = createContext(null);

function App() {
	const defaultState = {
		user: null,
		rate: null
	};

	const reducer = (state, action) => {
		const { type } = action;
		if (type === "set_user") return { ...state, user: action.payload };
		if (type === "set_rate") return { ...state, rate: action.payload };
		if (type === "update_email")
			return { ...state, user: { ...state.user, email: payload } };
		return state;
	};

	const [state, dispatch] = useReducer(reducer, defaultState);

	const router = createBrowserRouter([
		{
			path: "/",
			errorElement: <Error />,
			element: (
				<>
					<Toaster richColors duration={4000} />
					<Outlet />
				</>
			),
			children: [
				{
					index: true,
					element: <Index />
				},
				{
					path: "/sign-in",
					element: <SignIn />
				},
				{
					path: "/dashboard",
					element: <DashboardLayout />,
					children: [
						{
							index: true,
							element: <Dashboard />
						},
						{
							path: "/dashboard/send",
							element: <Send />
						},
						{
							path: "/dashboard/receive",
							element: <Receive />
						},
						{
							path: "/dashboard/transactions",
							element: <TransactionsLayout />,
							children: [
								{
									index: true,
									element: <Transactions />
								},
								{
									path: "/dashboard/transactions/:id",
									element: <SingleTransaction />
								}
							]
						},
						{
							path: "/dashboard/logout",
							element: <Logout />
						},
						{
							path: "/dashboard/reset/password",
							element: <ResetPassword />
						},
						{
							path: "/dashboard/reset/email",
							element: <ResetEmail />
						},
						{
							path: "/dashboard/setup",
							element: <Setup />
						},
						{
							path: "/dashboard/profile",
							element: <Profile />
						},
						{
							path: "/dashboard/*",
							element: <DashboardNotFound />
						}
					]
				},
				{
					path: "/terms",
					element: <TermsAndConditions />
				},
				{
					path: "/privacy",
					element: <PrivacyPolicy />
				},
				{
					path: "/*",
					element: <NotFound />
				}
			]
		}
	]);

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			<RouterProvider router={router} />
		</AppContext.Provider>
	);
}

export default App;
