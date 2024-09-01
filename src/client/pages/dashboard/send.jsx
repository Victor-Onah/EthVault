import { useState } from "react";
import { FaUsers } from "react-icons/fa";
import Input from "../../components/input";
import SubmitBtn from "../../components/button";
import { useForm } from "react-hook-form";
import { TfiAngleLeft } from "react-icons/tfi";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import { CgSpinner } from "react-icons/cg";

const Send = () => {
	const [form, setForm] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid }
	} = useForm({ mode: "onBlur" });

	const handleTransfer = async form => {
		try {
			const response = await fetch(
				`/api/user/transfer?${
					form["wallet-address"] ? "external=true" : ""
				}`,
				{
					body: JSON.stringify(form),
					method: "POST",
					headers: { "Content-type": "application/json" }
				}
			);

			if (!response.ok) {
				switch (response.status) {
					case 400:
						toast.error("Incorrect transaction PIN.");
						break;
					case 403:
						const text = await response.text();
						text === "self"
							? toast.error(
									"You can't transfer funds to yourself"
							  )
							: toast.error(
									"The account you wish to transfer to has not yet been setup to receive funds from other users on this platform."
							  );
						break;
					case 404:
						toast.error(
							"The account you wish to transfer to does not exist on this platform. Please check the email and try again."
						);
				}
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

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
							className="flex-1 bg-white bg-opacity-20 p-4 rounded-lg flex items-center justify-center border border-slate-300 text-center gap-2 backdrop-blur-sm active:scale-[.98]">
							<img src="/images/eth.svg" alt="ETH" width={20} />{" "}
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
							onSubmit={handleSubmit(handleTransfer)}
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
								pattern={RegExp(/^[\d]+\.?[\d]*$/)}
								errors={errors}
								register={register}
								emptyErrorMsg="Please set an amount"
								inputErrorMsg="Minimum of ETH 0.0001"
								label={"Amount"}
								type={"text"}
								name={"amount"}
								id={"amount"}
								required={true}
								placeholder={"100.00"}
							/>
							<SubmitBtn disabled={isSubmitting || !isValid}>
								{isSubmitting ? (
									<CgSpinner className="animate-spin" />
								) : (
									"Transfer"
								)}
							</SubmitBtn>
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
							onSubmit={handleSubmit(handleTransfer)}
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
								pattern={RegExp(/^[\d]+\.?[\d]*$/)}
								errors={errors}
								register={register}
								emptyErrorMsg="Please set an amount"
								inputErrorMsg="Minimum of ETH 0.0001"
								label={"Amount"}
								type={"text"}
								name={"amount"}
								id={"amount"}
								required={true}
								placeholder={"100.00"}
							/>
							<Input
								pattern={RegExp(/^[\d]{4}$/)}
								errors={errors}
								register={register}
								emptyErrorMsg="Please enter your 4-digit transaction PIN"
								inputErrorMsg="Transaction PINS are only 4-digits"
								label={"Transaction PIN"}
								type={"text"}
								name={"pin"}
								id={"pin"}
								required={true}
								placeholder={"****"}
							/>
							<SubmitBtn disabled={isSubmitting || !isValid}>
								{isSubmitting ? (
									<CgSpinner className="animate-spin" />
								) : (
									"Transfer"
								)}
							</SubmitBtn>
						</form>
					</div>
				</section>
			)}
		</>
	);
};

export default Send;
