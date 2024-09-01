import { useForm } from "react-hook-form";
import Input from "./input";
import SubmitBtn from "./button";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const PinSetupForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitting }
	} = useForm();

	const navigate = useNavigate();

	const handlePinSetup = async form => {
		try {
			const response = await fetch("/api/user/setup/pin", {
				method: "POST",
				body: JSON.stringify({ pin: form.pin }),
				headers: {
					"Content-Type": "application/json"
				}
			});

			if (!response.ok) {
				if (response.status === 404) return navigate("/sign-in");
				if (response.status === 500)
					return toast.error(
						"An internal server error ocurred. We're working to fix it."
					);
			}

			dispatch({ type: "pin_set" });
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(handlePinSetup)}
			className="bg-slate-50 bg-opacity-10 backdrop-blur-sm p-4 shadow-inner w-full max-w-96 rounded-md space-y-6 m-auto">
			<Helmet>
				<title>Setup Transaction PIN</title>
			</Helmet>
			<Input
				pattern={RegExp(/^[\d]{4}$/)}
				errors={errors}
				register={register}
				emptyErrorMsg="Please enter a 4-digit transaction PIN"
				inputErrorMsg="Transaction PINS are only 4-digits"
				label={"Transaction PIN"}
				type={"text"}
				name={"pin"}
				id={"pin"}
				required={true}
				placeholder={"****"}
			/>
			<SubmitBtn disabled={isSubmitting || !isValid}>
				{isSubmitting ? <CgSpinner className="animate-spin" /> : "Save"}
			</SubmitBtn>
		</form>
	);
};

export default PinSetupForm;
