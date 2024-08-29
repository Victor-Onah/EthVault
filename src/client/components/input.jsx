import { useState } from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";

const Input = ({
	label,
	type,
	name,
	id,
	register,
	errors,
	pattern,
	placeholder,
	emptyErrorMsg,
	inputErrorMsg,
	required,
	...rest
}) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	return (
		<div className="flex flex-col gap-1">
			<label className="text-sm" htmlFor={id}>
				{label}
			</label>
			<div className="relative">
				<input
					{...rest}
					{...register(name, {
						required: {
							value: required,
							message: emptyErrorMsg
						},
						pattern: {
							value: pattern,
							message: inputErrorMsg
						}
					})}
					placeholder={placeholder}
					autoComplete="off"
					autoCorrect="off"
					className="bg-slate-50 bg-opacity-20 outline-none p-2 rounded-md text-sm w-full"
					type={isPasswordVisible ? "text" : type}
					id={id}
				/>
				{type === "password" && (
					<button
						onClick={() => setIsPasswordVisible(!isPasswordVisible)}
						className="absolute top-1/2 right-0 p-4 -translate-y-1/2 text-black"
						type="button">
						{isPasswordVisible ? <RxEyeClosed /> : <RxEyeOpen />}
					</button>
				)}
			</div>
			{errors[name] && (
				<small className="text-red-300">{errors[name].message}</small>
			)}
		</div>
	);
};

export default Input;
