const SubmitBtn = ({ children, disabled }) => {
	return (
		<button
			disabled={disabled}
			className="bg-blue-900 p-2 rounded-md w-full shadow-inner text-sm h-9 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed text-slate-50"
			type="submit">
			{children}
		</button>
	);
};

export default SubmitBtn;
