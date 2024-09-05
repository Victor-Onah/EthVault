import { useForm } from "react-hook-form";
import SubmitBtn from "../components/button";
import Input from "../components/input";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CgSpinner } from "react-icons/cg";
import Logo from "../components/logo";

const ForgotPassword = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm();

	const handlePasswordReset = async ({ email }) => {
		try {
			const toastId = Math.random();
			const response = await fetch("/api/send-reset-email", {
				method: "POST",
				body: JSON.stringify({ email }),
				headers: {
					"Content-Type": "application/json"
				}
			});

			if (!response.ok)
				return toast.error(
					"We could not complete your request at this time. Please try again later."
				);

			toast.success(
				`We've sent an email to ${email}. Please check your inbox to continue. If you din't receive an email, return to this page and try again`,
				{
					duration: 60_000,
					id: toastId,
					cancel: {
						label: "Ok",
						onClick() {
							toast.dismiss(toastId);
						}
					}
				}
			);
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<main className="auth min-h-screen bg-blue-900 text-slate-50 flex items-center justify-center p-4 flex-col gap-8">
			<Helmet>
				<title>EthVault - Forgot Password</title>
			</Helmet>
			<Logo />
			<div className="bg-slate-50 bg-opacity-10 backdrop-blur-md p-4 shadow-inner w-full max-w-96 rounded-md space-y-6">
				<div>
					<h1 className="text-center text-2xl font-bold">
						Forgot Password?
					</h1>
					<p className="text-center text-sm">
						No worries! We've made it easy to recover your account.
					</p>
				</div>
				<form
					onSubmit={handleSubmit(handlePasswordReset)}
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
							"Send email"
						)}
					</SubmitBtn>
				</form>
			</div>
		</main>
	);
};

export default ForgotPassword;
