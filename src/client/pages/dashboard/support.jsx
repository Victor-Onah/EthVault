import { useContext, useRef, useState } from "react";
import SubmitBtn from "../../components/button";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CgSpinner } from "react-icons/cg";
import { LuImagePlus } from "react-icons/lu";

const SupportPage = () => {
	const { state } = useContext(AppContext);
	const navigate = useNavigate();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [images, setImages] = useState([]);
	const imageInputRef = useRef(null);
	const handleSubmit = async e => {
		e.preventDefault();

		setIsSubmitting(true);

		try {
			const form = new FormData(e.target);

			if (form.get("description").trim() === "") {
				setIsSubmitting(false);

				toast.warning(
					"Your issue description is empty. Please describe your issue before submitting."
				);

				return;
			}

			form.append("name", state.user.name);

			const response = await fetch("/api/user/issue", {
				method: "POST",
				body: form
			});

			if (!response.ok) {
				if (response.status === 401) navigate("/sign-in");
				else
					toast.error(
						"An internal server error ocurred. We're working to fix it."
					);

				setIsSubmitting(false);

				return;
			}

			toast.success(
				"We've received your issue and will get back to you with a solution or response."
			);

			setIsSubmitting(false);

			e.target.reset();

			for (let url of images) {
				URL.revokeObjectURL(url);
			}

			setImages([]);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const handleImageUpload = e =>
		setImages(prev => {
			for (let url of prev) {
				URL.revokeObjectURL(url);
			}

			let urls = [];

			for (let file of e.target.files) {
				const url = URL.createObjectURL(file);

				urls.push(url);
			}

			return urls;
		});

	return (
		<div class="flex-1">
			<section class="py-12 md:py-16 lg:py-20 px-4 md:px-6 text-sm">
				<div class="container max-w-4xl mx-auto space-y-6">
					<div className="text-center">
						<h1 className="text-2xl font-bold">
							How can we help you?
						</h1>
						<p className="text-sm max-w-[500px] m-auto">
							Our customer support team is here to assist you with
							any questions or issues you may have. We offer a
							variety of support services to ensure your
							satisfaction.
						</p>
					</div>

					<div class="rounded-lg p-4 md:p-6 space-y-6  bg-slate-50 bg-opacity-10 backdrop-blur-sm shadow-inner w-full">
						<div class="space-y-2">
							<h2 class="text-xl font-bold">Contact Us</h2>
							<p>
								Describe your issue in detail and we'll get back
								to you as soon as possible. <br /> You can also
								add images of the page to give us a better view
								of the issue.
							</p>
						</div>
						<form onSubmit={handleSubmit} class="space-y-4">
							<input
								ref={imageInputRef}
								className="hidden"
								type="file"
								name="images"
								accept="image/*"
								multiple
								onChange={handleImageUpload}
							/>
							<button
								type="button"
								onClick={() => imageInputRef.current.click()}
								className="bg-white text-blue-900 p-2 flex gap-2 w-full max-w-40 rounded-xl justify-center">
								<LuImagePlus className="text-lg" />{" "}
								<span>Upload images</span>
							</button>
							{images.length > 0 && (
								<div className="max-w-full overflow-auto whitespace-nowrap space-x-2">
									{images.map(imageUrl => (
										<img
											className="w-[70px] aspect-square object-cover align-middle rounded-xl inline-block"
											src={imageUrl}
											height={70}
										/>
									))}
								</div>
							)}
							<textarea
								class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[150px] bg-opacity-15 bg-white"
								name="description"
								required
								placeholder="Enter your message"></textarea>
							<SubmitBtn disabled={isSubmitting}>
								{isSubmitting ? (
									<CgSpinner className="animate-spin" />
								) : (
									"Submit"
								)}
							</SubmitBtn>
						</form>
					</div>
				</div>
			</section>
		</div>
	);
};

export default SupportPage;
