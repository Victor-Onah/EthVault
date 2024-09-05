import { useForm } from "react-hook-form";
import SubmitBtn from "../components/button";
import Input from "../components/input";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CgSpinner } from "react-icons/cg";
import Logo from "../components/logo";

const ResetPasswordNoAuth = () => {
	const {
		register,
		setError,
		handleSubmit,
		formState: { errors, isValid, isSubmitting }
	} = useForm();
	const currentUrl = new URL(window.location);
	const navigate = useNavigate();
	const timestamp = currentUrl.searchParams.get("ts");
	const emailToReset = currentUrl.searchParams.get("email");
	const handlePasswordChange = async form => {
		if (form["confirm-new-password"] !== form["new-password"]) {
			return setError(
				"confirm-new-password",
				{
					message: "Passwords do not match"
				},
				{ shouldFocus: true }
			);
		}

		if (form.email.trim().toLowerCase() !== emailToReset)
			return (
				toast.error("Unable to complete request."),
				navigate("/forgot-password")
			);

		try {
			const response = await fetch("/api/reset-password", {
				body: JSON.stringify({
					"new-password": form["new-password"],
					email: form.email
				}),
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				}
			});

			if (!response.ok) {
				switch (response.status) {
					case 404:
						toast.error(
							"We couldn't find an account with this email."
						);
						break;
					case 400:
						toast.error(
							"Your request is incomplete. Please provide the required information and try again."
						);
						break;
					default:
						toast.error(
							"An internal server error ocurred. We're working to fix it."
						);
						break;
				}
			}

			toast.success("Password reset was successful.");
			navigate("/sign-in");
		} catch (error) {
			toast.error(error.message);
		}
	};

	if (!timestamp || !emailToReset)
		return (
			toast.error("Unable to complete request."),
			navigate("/forgot-password")
		);

	if (Date.now() - new Date(Number(timestamp)).getDate() > 60_000 * 5)
		return toast.error("Link expired."), navigate("/forgot-password");

	return (
		<main className="auth min-h-screen bg-blue-900 text-slate-50 flex items-center justify-center p-4 flex-col gap-8">
			<Helmet>
				<title>Reset Password</title>
			</Helmet>
			<Logo />
			<div className="bg-slate-50 bg-opacity-10 backdrop-blur-md p-4 shadow-inner w-full max-w-96 rounded-md space-y-6">
				<div className="space-y-6">
					<div>
						<h1 className="text-center text-2xl font-bold">
							Reset Password
						</h1>
						<p className="text-center text-sm">
							Provide the required information to reset your
							password
						</p>
					</div>
					<form
						onSubmit={handleSubmit(handlePasswordChange)}
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
						<Input
							pattern={RegExp(/^[^\s)]{6,}$/)}
							errors={errors}
							register={register}
							emptyErrorMsg="Enter new password"
							inputErrorMsg="Password must be at least six characters long"
							label={"New password"}
							type={"password"}
							name={"new-password"}
							id={"new-password"}
							required={true}
							placeholder={"P@ssw0rd"}
						/>
						<Input
							pattern={RegExp(/^[^\s)]{6,}$/)}
							errors={errors}
							register={register}
							emptyErrorMsg="Confirm new password"
							inputErrorMsg="Password must be at least six characters long"
							label={"Confirm password"}
							type={"password"}
							name={"confirm-new-password"}
							id={"confirm-new-password"}
							required={true}
							placeholder={"P@ssw0rd"}
						/>
						<SubmitBtn disabled={!isValid || isSubmitting}>
							{isSubmitting ? (
								<CgSpinner className="animate-spin" />
							) : (
								"Submit"
							)}
						</SubmitBtn>
					</form>
				</div>
			</div>
		</main>
	);
};

export default ResetPasswordNoAuth;
