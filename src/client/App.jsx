import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages";
import SignIn from "./pages/sign-in";
import Dashboard from "./pages/dashboard";
import Send from "./pages/dashboard/send";
import { Toaster } from "sonner";
import Receive from "./pages/dashboard/receive";
import { createContext, useReducer } from "react";
import DashboardLayout from "./pages/dashboard/layout";

export const AppContext = createContext(null);

function App() {
	const defaultState = {
		user: null,
		email: null
	};

	const reducer = (state, action) => {
		const { type } = action;
		if (type === "set_user") return { ...state, user: action.payload };
		return state;
	};

	const [state, dispatch] = useReducer(reducer, defaultState);

	const loadUser = async () => {
		try {
		} catch (error) {}
	};

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			<Toaster richColors duration={4000} />
			<BrowserRouter>
				<Routes>
					<Route index element={<Index />} />
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/dashboard" element={<DashboardLayout />}>
						<Route index element={<Dashboard />} />
						<Route path="/dashboard/send" element={<Send />} />
						<Route
							path="/dashboard/receive"
							element={<Receive />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</AppContext.Provider>
	);
}

export default App;
