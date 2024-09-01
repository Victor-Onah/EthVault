import { useForm } from "react-hook-form";
import SubmitBtn from "../../../components/button";
import Input from "../../../components/input";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../../../App";
import { toast } from "sonner";
import { CgSpinner } from "react-icons/cg";

const ResetPassword = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isLoading }
	} = useForm();

	const [isSubmitting, setIsSubmitting] = useState(false);

	const navigate = useNavigate();

	const { state } = useContext(AppContext);

	const handlePasswordChange = async form => {
		const toastId = toast(
			"Are you sure you want to change your password?",
			{
				cancel: {
					label: "Cancel",
					onClick() {
						toast.dismiss(toastId);
					}
				},
				actionButtonStyle: { backgroundColor: "red", color: "white" },
				duration: Number.POSITIVE_INFINITY,
				action: {
					label: "Continue",
					async onClick() {
						setIsSubmitting(true);

						try {
							const response = await fetch(
								"/api/user/reset/password",
								{
									body: JSON.stringify({
										"new-password": form["new-password"],
										email: state.user.email
									}),
									method: "POST",
									headers: {
										"Content-Type": "application/json"
									}
								}
							);

							if (!response.ok) {
								switch (response.status) {
									case 404:
									case 403:
										navigate("/sign-in");
										break;
									default:
										toast.error(
											"An internal server error ocurred. We're working to fix it."
										);
										break;
								}
								return (
									setIsSubmitting(false),
									toast.dismiss(toastId)
								);
							}

							toast.success("Email updated successfully");
							navigate("/sign-in");
						} catch (error) {
							toast.error(error.message);
						}
					}
				}
			}
		);
	};

	return (
		<div className="pt-4 px-4 pb-4 w-fit m-auto flex-1">
			<Helmet>
				<title>Change Password</title>
			</Helmet>
			<div className="space-y-6">
				<div>
					<h1 className="text-center text-2xl font-bold">
						Change Password
					</h1>
					<p className="text-center text-sm">
						Provide the required information to change your password
					</p>
				</div>
				<form
					onSubmit={handleSubmit(handlePasswordChange)}
					className="bg-slate-50 bg-opacity-10 backdrop-blur-sm p-4 shadow-inner w-full max-w-96 rounded-md space-y-4">
					<Input
						pattern={RegExp(/^[^\s)]{6,}$/)}
						errors={errors}
						register={register}
						emptyErrorMsg="Enter current password"
						inputErrorMsg="Password must be at least six characters long"
						label={"Current password"}
						type={"password"}
						name={"password"}
						id={"password"}
						required={true}
						placeholder={"P@ssw0rd"}
					/>
					<Input
						pattern={RegExp(/^[^\s)]{6,}$/)}
						errors={errors}
						register={register}
						emptyErrorMsg="Enter current password"
						inputErrorMsg="Password must be at least six characters long"
						label={"New password"}
						type={"password"}
						name={"new-password"}
						id={"new-password"}
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
	);
};

export default ResetPassword;
