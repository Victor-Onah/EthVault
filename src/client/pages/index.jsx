import { Link, useNavigate } from "react-router-dom";
import SubmitBtn from "../components/button";
import Input from "../components/input";
import { useForm } from "react-hook-form";
import { CgSpinner } from "react-icons/cg";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import Logo from "../components/logo";
import { useState } from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

const Index = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid }
	} = useForm({ mode: "onBlur" });
	const navigate = useNavigate();

	const [agree, setAgree] = useState(false);

	const handleSignUp = async form => {
		try {
			const response = await fetch("/api/sign-up", {
				method: "POST",
				body: JSON.stringify(form),
				headers: {
					"Content-Type": "application/json"
				}
			});

			if (!response.ok) {
				switch (response.status) {
					case 400:
						toast.error(
							"Invalid input. Please check your input and try again."
						);
						break;
					case 409:
						toast.error(
							"Seems like you already have an account. Sign in instead."
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

			navigate("/sign-in");
		} catch (error) {
			toast(error.message);
		}
	};

	return (
		<>
			<Helmet>
				<title>EthVault - Sign Up</title>
				<meta
					name="description"
					content="Create an account to start saving your Ethereum assets the right way"
				/>
			</Helmet>
			<main className="auth min-h-screen bg-blue-900 text-slate-50 flex items-center justify-center p-4 flex-col gap-8">
				<Logo />
				<div className="bg-slate-50 bg-opacity-10 backdrop-blur-md p-4 shadow-inner w-full max-w-96 rounded-md space-y-6">
					<div>
						<h1 className="text-center text-2xl font-bold">
							Sign Up
						</h1>
						<p className="text-center text-sm">
							Create an account to continue
						</p>
					</div>
					<form
						onSubmit={handleSubmit(handleSignUp)}
						className="space-y-4">
						<Input
							pattern={RegExp(
								/^[a-zA-ZàáâäãåāèéêëēėęîïíīįìôöòóœøōõûüùúūÿýçćčñńßśšžźżÀÁÂÄÃÅĀÈÉÊËĒĖĘÎÏÍĪĮÌÔÖÒÓŒØŌÕÛÜÙÚŪŸÝÇĆČÑŃßŚŠŽŹŻ'-]+(\s*[a-zA-ZàáâäãåāèéêëēėęîïíīįìôöòóœøōõûüùúūÿýçćčñńßśšžźżÀÁÂÄÃÅĀÈÉÊËĒĖĘÎÏÍĪĮÌÔÖÒÓŒØŌÕÛÜÙÚŪŸÝÇĆČÑŃßŚŠŽŹŻ'-]*)+$/
							)}
							errors={errors}
							register={register}
							emptyErrorMsg="Your name is required"
							inputErrorMsg="Please use a valid name"
							label={"Full name"}
							type={"text"}
							name={"name"}
							id={"name"}
							required={true}
							placeholder={"John Doe"}
						/>
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
							pattern={RegExp(/^\+?[\d]\d{10,14}$/)}
							errors={errors}
							register={register}
							emptyErrorMsg="Your phone number required"
							inputErrorMsg="Please use a valid phone number"
							label={"Phone number"}
							type={"tel"}
							name={"phone"}
							id={"phone"}
							required={true}
							placeholder={"+1-345-456-76"}
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
						<div className="flex text-sm gap-4 items-center">
							<button
								type="button"
								className="text-lg"
								onClick={() => setAgree(!agree)}>
								{agree ? (
									<ImCheckboxChecked />
								) : (
									<ImCheckboxUnchecked />
								)}
							</button>
							<span onClick={() => setAgree(!agree)}>
								By checking this box you agree to our{" "}
								<Link className="underline">
									Terms and Conditions
								</Link>
							</span>
						</div>
						<SubmitBtn
							disabled={!agree || !isValid || isSubmitting}>
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
						Already have an account?{" "}
						<Link to={"/sign-in"} className="underline">
							Sign In
						</Link>
					</p>
					<p className="flex gap-4 items-center justify-center">
						<Link to={"/terms"} className="underline">
							Terms
						</Link>{" "}
						|
						<Link to={"/privacy"} className="underline">
							Privacy policy
						</Link>
					</p>
				</div>
			</main>
		</>
	);
};

export default Index;
