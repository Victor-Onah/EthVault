import { useState } from "react";
import { FaUsers } from "react-icons/fa";
import Input from "../../components/input";
import SubmitBtn from "../../components/button";
import { useForm } from "react-hook-form";
import { TfiAngleLeft } from "react-icons/tfi";
import { Helmet } from "react-helmet";

const Send = () => {
	const [form, setForm] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({ mode: "onBlur" });

	return (
		<>
			<Helmet>
				<title>Transfer Funds</title>
				<meta name="description" content="" />
			</Helmet>
			{(form === "other-provider" || form === "eth-vault") && (
				<div className="p-4">
					<button
						onClick={() => setForm("")}
						className="p-2 flex aspect-square items-center justify-center bg-white bg-opacity-20 border-slate-300 backdrop-blur-sm text-slate-50 text-lg active:scale-[.98] rounded-full border">
						<TfiAngleLeft />
					</button>
				</div>
			)}
			{form === "" && (
				<section className="p-4 space-y-12 flex-1">
					<div className="text-center">
						<h1 className="text-2xl font-bold">Transfer funds</h1>
						<p className="text-sm">
							Select a ETH account provider to continue
						</p>
					</div>
					<div className="flex gap-4 text-sm">
						<button
							onClick={() => setForm("eth-vault")}
							className="flex-1 bg-white bg-opacity-20 p-4 rounded-lg flex items-center justify-center border border-slate-300 text-center backdrop-blur-sm active:scale-[.98]">
							<img src="/images/usdt.svg" alt="ETH" width={40} />{" "}
							EthVault
						</button>
						<button
							onClick={() => setForm("other-provider")}
							className="flex-1 bg-white bg-opacity-20 p-4 rounded-lg flex items-center justify-center border border-slate-300 text-center gap-2 backdrop-blur-sm active:scale-[.98]">
							<FaUsers className="text-xl" /> Other provider
						</button>
					</div>
				</section>
			)}
			{form === "eth-vault" && (
				<section className="pt-4 px-4 pb-4 w-fit m-auto flex-1">
					<div className="bg-slate-50 bg-opacity-10 backdrop-blur-sm p-4 shadow-inner w-full max-w-96 rounded-md space-y-6">
						<div>
							<h1 className="text-center text-2xl font-bold">
								Transfer fund
							</h1>
							<p className="text-center text-sm">
								Provide the required information to complete
								transaction
							</p>
						</div>
						<form
							onSubmit={handleSubmit(
								async form =>
									await new Promise(resolve =>
										setTimeout(() => resolve(), 10000)
									)
							)}
							className="space-y-4">
							<Input
								pattern={RegExp(
									/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
								)}
								errors={errors}
								register={register}
								emptyErrorMsg="Recipient email is required"
								inputErrorMsg="Please use a valid email"
								label={"Recipient email"}
								type={"email"}
								name={"email"}
								id={"email"}
								required={true}
								placeholder={"johndoe@lost.com"}
							/>
							<Input
								pattern={RegExp(/^[\d]{2,}$/)}
								errors={errors}
								register={register}
								emptyErrorMsg="Please set an amount"
								inputErrorMsg="Minimum of ETH10"
								label={"Amount"}
								type={"number"}
								name={"amount"}
								id={"amount"}
								required={true}
								placeholder={"100.00"}
								minLength={4}
								maxLength={4}
								min={10}
							/>
							<SubmitBtn>Transfer</SubmitBtn>
						</form>
					</div>
				</section>
			)}
			{form === "other-provider" && (
				<section className="pt-4 px-4 pb-4 w-fit m-auto flex-1">
					<div className="bg-slate-50 bg-opacity-10 backdrop-blur-sm p-4 shadow-inner w-full max-w-96 rounded-md space-y-6">
						<div>
							<h1 className="text-center text-2xl font-bold">
								Transfer fund
							</h1>
							<p className="text-center text-sm">
								Provide the required information to complete
								transaction
							</p>
						</div>
						<form
							onSubmit={handleSubmit(
								async form =>
									await new Promise(resolve =>
										setTimeout(() => resolve(), 10000)
									)
							)}
							className="space-y-4">
							<Input
								pattern={RegExp(/^0x[a-zA-Z0-9]{40}$/)}
								errors={errors}
								register={register}
								emptyErrorMsg="Recipient wallet address is required"
								inputErrorMsg="Please use a valid wallet address"
								label={"Recipient wallet address"}
								type={"text"}
								name={"wallet-address"}
								id={"wallet-address"}
								required={true}
								placeholder={"0x***************"}
							/>
							<Input
								pattern={RegExp(/^[\d]{2,}$/)}
								errors={errors}
								register={register}
								emptyErrorMsg="Please set an amount"
								inputErrorMsg="Minimum of ETH10"
								label={"Amount"}
								type={"number"}
								name={"amount"}
								id={"amount"}
								required={true}
								placeholder={"100.00"}
								minLength={4}
								maxLength={4}
								min={10}
							/>
							<Input
								pattern={RegExp(/^[\d]{4}$/)}
								errors={errors}
								register={register}
								emptyErrorMsg="Please enter your 4-digit transaction PIN"
								inputErrorMsg="Transaction PINS are only 4-digits"
								label={"Transaction PIN"}
								type={"number"}
								name={"pin"}
								id={"pin"}
								required={true}
								placeholder={"****"}
								minLength={4}
								maxLength={4}
							/>
							<SubmitBtn>Transfer</SubmitBtn>
						</form>
					</div>
				</section>
			)}
		</>
	);
};

export default Send;
