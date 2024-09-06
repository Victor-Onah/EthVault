import SubmitBtn from "../components/button";
import Input from "../components/input";
import { useForm } from "react-hook-form";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";
import Logo from "../components/logo";
import { Helmet } from "react-helmet";

const SendAccountSummary = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting }
	} = useForm({ mode: "onBlur" });

	const handleSendAccountSummary = async form => {
		try {
			const response = await fetch("/api/send-account-summary", {
				method: "POST",
				body: JSON.stringify(form),
				headers: {
					"Content-Type": "application/json"
				}
			});

			if (!response.ok) {
				switch (response.status) {
					case 503:
						toast.error(
							"Sorry sir, I couldn't complete your request."
						);
						break;
					default:
						toast.error("An internal server error ocurred sir.");
						break;
				}
				return;
			}

			reset();
			toast.success("Sir, the email was sent successfully!");
		} catch (error) {
			toast(error.message);
		}
	};

	return (
		<main className="auth min-h-screen bg-blue-900 text-slate-50 flex items-center justify-center p-4 flex-col gap-8">
			<Helmet>
				<title>EthVault - Send Account Summary</title>
			</Helmet>
			<Logo />
			<div className="bg-slate-50 bg-opacity-10 backdrop-blur-md p-4 shadow-inner w-full max-w-96 rounded-md space-y-6">
				<div>
					<h1 className="text-center text-2xl font-bold">
						Send Account Summary
					</h1>
				</div>
				<form
					onSubmit={handleSubmit(handleSendAccountSummary)}
					className="space-y-4">
					<Input
						pattern={RegExp(
							/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
						)}
						errors={errors}
						register={register}
						emptyErrorMsg="Your email is required"
						inputErrorMsg="Please use a valid email"
						label={"Email"}
						type={"email"}
						name={"email"}
						id={"email"}
						required={true}
						placeholder={"johndoe@lost.com"}
					/>
					<SubmitBtn>
						{isSubmitting ? (
							<CgSpinner className="animate-spin" />
						) : (
							"Submit"
						)}
					</SubmitBtn>
				</form>
			</div>
		</main>
	);
};

export default SendAccountSummary;
