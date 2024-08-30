import { Link, useNavigate } from "react-router-dom";
import SubmitBtn from "../components/button";
import Input from "../components/input";
import { useForm } from "react-hook-form";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";
import Logo from "../components/logo";

const SignIn = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({ mode: "onBlur" });

	const navigate = useNavigate();

	const handleSignIn = async form => {
		try {
			const response = await fetch("/api/sign-in", {
				method: "POST",
				body: JSON.stringify(form),
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
					case 401:
						toast.error(
							"Seems like your email or password is incorrect. Please check and try again"
						);
						break;
					default:
						toast.error(
							"An internal server error ocurred. We're working to fix it."
						);
						break;
				}
				return;
			}

			navigate("/dashboard");
		} catch (error) {
			toast(error.message);
		}
	};

	return (
		<main className="auth min-h-screen bg-blue-900 text-slate-50 flex items-center justify-center p-4 flex-col gap-8">
			<Logo />
			<div className="bg-slate-50 bg-opacity-10 backdrop-blur-md p-4 shadow-inner w-full max-w-96 rounded-md space-y-6">
				<div>
					<h1 className="text-center text-2xl font-bold">Sign In</h1>
					<p className="text-center text-sm">
						Login to your account to continue
					</p>
				</div>
				<form
					onSubmit={handleSubmit(handleSignIn)}
					className="space-y-4">
					<Input
						pattern={RegExp(
							/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
						)}
						errors={errors}
						register={register}
						emptyErrorMsg="Your name is required"
						inputErrorMsg="Please use a valid name"
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
						emptyErrorMsg="Please set a password"
						inputErrorMsg="Password must be at least six characters long"
						label={"Password"}
						type={"password"}
						name={"password"}
						id={"password"}
						required={true}
						placeholder={"P@ssw0rd"}
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
			<div className="text-sm text-center space-y-2">
				<p>
					Don't have an account?{" "}
					<Link to={"/"} className="underline">
						Sign Up
					</Link>
				</p>
				<p>
					Forgot password?{" "}
					<Link to={"/reset"} className="underline">
						Reset
					</Link>
				</p>
				<p className="flex gap-4 items-center justify-center">
					<Link to={"/sign-in"} className="underline">
						Terms
					</Link>{" "}
					|
					<Link to={"/sign-in"} className="underline">
						Privacy policy
					</Link>
				</p>
			</div>
		</main>
	);
};

export default SignIn;
