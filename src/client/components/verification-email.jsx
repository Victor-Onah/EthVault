import { useContext, useEffect, useState } from "react";
import { BiEnvelope } from "react-icons/bi";
import { AppContext } from "../App";
import SubmitBtn from "./button";
import { toast } from "sonner";
import { CgSpinner } from "react-icons/cg";
import { Helmet } from "react-helmet";

const VerificationEmail = () => {
	const { state, dispatch } = useContext(AppContext);
	const [sendingEmail, setSendingEmail] = useState(true);
	const [mailSent, setMailSent] = useState(true);
	const requestSendEmail = async () => {
		try {
			setSendingEmail(true);
			setMailSent(true);

			const response = await fetch("/api/user/send-verification-mail");

			if (!response.ok) {
				if (response.status === 404) navigate("/sign-in");
				if (response.status === 500)
					toast.error(
						"An internal server error ocurred. We're working to fix it."
					);
				if (response.status === 503)
					toast.error(
						"Sorry we couldn't complete your request. Try again later."
					);

				return setSendingEmail(false);
			}
			setSendingEmail(false);
			setMailSent(true);
		} catch (error) {
			toast(error.message);
			setSendingEmail(false);
		}
	};
	useEffect(() => {
		requestSendEmail();
	}, []);

	return (
		<div className="bg-white bg-opacity-20 backdrop-blur-md border border-slate-300 p-4 rounded-lg text-center space-y-4 text-sm w-full max-w-80">
			<Helmet>
				<title>
					{mailSent && !sendingEmail
						? `Verify Email`
						: `Resending Email...`}
				</title>
			</Helmet>
			<h1 className="text-2xl font-bold">
				{mailSent && !sendingEmail
					? "Email Verification"
					: "Please wait..."}
			</h1>
			<div className="text-4xl flex justify-center">
				<span>
					<BiEnvelope />
				</span>
			</div>
			<p>
				{mailSent && !sendingEmail
					? `We've sent an email to ${state.user.email}. If you didn't receive
				the email, you can request a resend.`
					: `We're sending an email to ${state.user.email}.`}
			</p>
			{mailSent && !sendingEmail && (
				<SubmitBtn onClick={requestSendEmail} disabled={sendingEmail}>
					{sendingEmail ? (
						<CgSpinner className="animate-spin" />
					) : (
						"Resend email"
					)}
				</SubmitBtn>
			)}
		</div>
	);
};

export default VerificationEmail;
