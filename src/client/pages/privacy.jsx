import React from "react";
import Logo from "../components/logo";

const PrivacyPolicy = () => {
	return (
		<main className="auth min-h-screen bg-blue-900 text-slate-50 flex items-center justify-center p-4 flex-col gap-8">
			<Logo />
			<div className="bg-white max-w-3xl m-auto bg-opacity-10 backdrop-blur-md p-4 rounded-lg border border-slate-300">
				<div className="privacy-policy">
					<h1 className="text-center text-2xl font-bold mb-6">
						Privacy Policy
					</h1>
					<p className="my-6">
						<strong>Last Updated: 9th September, 2023</strong>
					</p>

					<section className="mb-6">
						<h2 className="text-lg font-semibold">
							1. Introduction
						</h2>
						<p className="my-4">
							Welcome to EthVault. Your privacy is important to
							us. This Privacy Policy explains how we collect,
							use, disclose, and safeguard your information when
							you visit our platform or use our services.
						</p>
					</section>

					<section className="mb-6">
						<h2 className="text-lg font-semibold">
							2. Information We Collect
						</h2>
						<p className="my-4">
							We may collect the following information:
						</p>
						<ul className="list-inside list-disc">
							<li>
								Personal Identification Information: Name, email
								address, phone number, etc.
							</li>
							<li>
								Account Information: Username, password,
								transaction PIN.
							</li>
							<li>
								Transaction Information: Details about your
								Ethereum transactions.
							</li>
							<li>
								Technical Data: IP address, browser type, and
								usage data.
							</li>
						</ul>
					</section>

					<section className="mb-6">
						<h2 className="text-lg font-semibold">
							3. How We Use Your Information
						</h2>
						<p className="my-4">
							We use your information for the following purposes:
						</p>
						<ul className="list-inside list-disc">
							<li>To provide and maintain our services.</li>
							<li>
								To process transactions and manage your account.
							</li>
							<li>
								To communicate with you about updates, changes,
								and other relevant information.
							</li>
							<li>
								To ensure the security of our platform and
								prevent fraud.
							</li>
						</ul>
					</section>

					<section className="mb-6">
						<h2 className="text-lg font-semibold">
							4. How We Share Your Information
						</h2>
						<p className="my-4">
							We may share your information in the following
							situations:
						</p>
						<ul className="list-inside list-disc">
							<li>
								With service providers who perform services on
								our behalf.
							</li>
							<li>
								In response to legal processes or as required by
								law.
							</li>
							<li>
								To protect and defend our rights and property.
							</li>
							<li>
								In connection with a business transfer or
								merger.
							</li>
						</ul>
					</section>

					<section className="mb-6">
						<h2 className="text-lg font-semibold">
							5. Security of Your Information
						</h2>
						<p className="my-4">
							We implement security measures to protect your
							information. However, no method of transmission over
							the internet or electronic storage is completely
							secure. We cannot guarantee absolute security.
						</p>
					</section>

					<section className="mb-6">
						<h2 className="text-lg font-semibold">
							6. Your Rights and Choices
						</h2>
						<p className="my-4">You have the right to:</p>
						<ul className="list-inside list-disc">
							<li>
								Access and update your personal information.
							</li>
							<li>
								Request deletion of your personal information,
								subject to certain exceptions.
							</li>
							<li>
								Opt out of receiving marketing communications.
							</li>
						</ul>
					</section>

					<section className="mb-6">
						<h2 className="text-lg font-semibold">
							7. Changes to This Privacy Policy
						</h2>
						<p className="my-4">
							We may update this Privacy Policy from time to time.
							Any changes will be posted on this page with an
							updated effective date. Your continued use of our
							platform after any changes signifies your acceptance
							of the updated policy.
						</p>
					</section>

					<section className="mb-6">
						<h2 className="text-lg font-semibold">8. Contact Us</h2>
						<p className="my-4">
							If you have any questions about this Privacy Policy
							or our practices, please contact us at:
						</p>
						<address>
							<p className="my-4">Email: support@ethvault.com</p>
						</address>
					</section>
				</div>
			</div>
		</main>
	);
};

export default PrivacyPolicy;
