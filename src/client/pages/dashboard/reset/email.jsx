import { useForm } from "react-hook-form";
import SubmitBtn from "../../../components/button";
import Input from "../../../components/input";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../../../App";
import { CgSpinner } from "react-icons/cg";

const ResetEmail = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid }
	} = useForm();

	const [isSubmitting, setIsSubmitting] = useState(false);

	const navigate = useNavigate();

	const { dispatch } = useContext(AppContext);

	const handleEmailChange = async form => {
		const toastId = toast("Are you sure you want to change your email?", {
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
						const response = await fetch("/api/user/reset/email", {
							body: JSON.stringify(form),
							method: "POST",
							headers: { "Content-Type": "application/json" }
						});

						if (!response.ok) {
							switch (response.status) {
								case 404:
								case 403:
									navigate("/sign-in");
									break;
								case 409:
									toast.error(
										"The new email is already in use."
									);
									break;
								case 401:
									toast.error("Incorrect transaction PIN.");
									break;
								default:
									toast.error(
										"An internal server error ocurred. We're working to fix it."
									);
									break;
							}
							return (
								setIsSubmitting(false), toast.dismiss(toastId)
							);
						}

						dispatch({
							type: "update_email",
							payload: form["new-email"]
						});
						toast.success("Email updated successfully.");
						setIsSubmitting(false);
					} catch (error) {
						toast.error(error.message);
					}
				}
			}
		});
	};

	return (
		<div className="pt-4 px-4 pb-4 w-fit m-auto flex-1">
			<Helmet>
				<title>Change Email</title>
			</Helmet>
			<div className="space-y-6">
				<div>
					<h1 className="text-center text-2xl font-bold">
						Change Email
					</h1>
					<p className="text-center text-sm">
						Provide the required information to change your email
					</p>
				</div>
				<form
					onSubmit={handleSubmit(handleEmailChange)}
					className="space-y-4 bg-slate-50 bg-opacity-10 backdrop-blur-sm p-4 shadow-inner w-full max-w-96 rounded-md">
					<Input
						pattern={RegExp(
							/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
						)}
						errors={errors}
						register={register}
						emptyErrorMsg="Enter current email"
						inputErrorMsg="email must be at least six characters long"
						label={"Current email"}
						type={"email"}
						name={"email"}
						id={"email"}
						required={true}
						placeholder={"johndoe@lost.com"}
					/>
					<Input
						pattern={RegExp(
							/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
						)}
						errors={errors}
						register={register}
						emptyErrorMsg="Enter new email"
						inputErrorMsg="email must be at least six characters long"
						label={"New email"}
						type={"email"}
						name={"new-email"}
						id={"new-email"}
						required={true}
						placeholder={"johndoe@lost.com"}
					/>
					<Input
						pattern={RegExp(/^[\d]{4}$/)}
						errors={errors}
						register={register}
						emptyErrorMsg="Please enter your 4-digit transaction PIN. It is needed for authorization."
						inputErrorMsg="Transaction PINS are only 4-digits"
						label={"Transaction PIN"}
						type={"text"}
						name={"pin"}
						id={"pin"}
						required={true}
						placeholder={"****"}
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

export default ResetEmail;
