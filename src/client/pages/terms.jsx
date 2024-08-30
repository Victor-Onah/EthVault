import React from "react";
import Logo from "../components/logo";

const TermsAndConditions = () => {
	return (
		<main className="auth min-h-screen bg-blue-900 text-slate-50 flex items-center justify-center p-4 flex-col gap-8">
			<Logo />
			<div className="bg-white max-w-3xl m-auto bg-opacity-10 backdrop-blur-md p-4 rounded-lg border border-slate-300">
				<h1 className="text-center text-2xl font-bold mb-6">
					Terms and Conditions
				</h1>
				<p className="my-6">
					<strong>Last Updated:</strong> 9th September, 2023
				</p>

				<p>
					Welcome to EthVault. By accessing or using our platform, you
					agree to comply with and be bound by the following terms and
					conditions. Please read them carefully before using our
					services.
				</p>

				<h2 className="text-lg font-semibold mt-6">
					1. Acceptance of Terms
				</h2>
				<p>
					By creating an account or using our services, you agree to
					these Terms, our Privacy Policy, and any other policies or
					guidelines provided by us. If you do not agree with any part
					of these Terms, you must not use our platform.
				</p>

				<h2 className="text-lg font-semibold mt-6">
					2. Services Provided
				</h2>
				<p>
					EthVault provides a platform for users to store, transfer,
					and manage their Ethereum cryptocurrency. We do not engage
					in trading activities. Our services include:
				</p>
				<ul>
					<li>Storing Ethereum in user accounts.</li>
					<li>
						Transferring Ethereum within our platform using email
						addresses.
					</li>
					<li>
						Transferring Ethereum to other platforms using wallet
						addresses.
					</li>
				</ul>

				<h2 className="text-lg font-semibold mt-6">
					3. User Account Requirements
				</h2>
				<p>To use our platform, you must:</p>
				<ul>
					<li>
						Provide accurate and complete information, including
						your name, email address, phone number, and password.
					</li>
					<li>
						Set a four-digit transaction PIN for additional
						security.
					</li>
					<li>
						Maintain the confidentiality of your account credentials
						and PIN.
					</li>
				</ul>

				<h2 className="text-lg font-semibold mt-6">
					4. Ethereum Storage and Transfers
				</h2>
				<p>
					<strong>Minimum Balance:</strong> To receive Ethereum from
					other accounts on our platform, your account must have a
					minimum balance of 0.1 Ethereum.
					<br />
					<strong>Transfers Within Platform:</strong> You can transfer
					Ethereum to other users on our platform using their email
					addresses.
					<br />
					<strong>Transfers to Other Platforms:</strong> You can
					transfer Ethereum to external wallet addresses.
				</p>

				<h2 className="text-lg font-semibold mt-6">5. Security</h2>
				<p>
					We implement security measures to protect your data and
					Ethereum. However, you are responsible for:
				</p>
				<ul>
					<li>
						Keeping your account credentials and transaction PIN
						confidential.
					</li>
					<li>
						Notifying us immediately of any unauthorized access to
						your account.
					</li>
				</ul>

				<h2 className="text-lg font-semibold mt-6">
					6. User Responsibilities
				</h2>
				<p>
					<strong>Accuracy of Information:</strong> Ensure that all
					information provided to us is accurate and up-to-date.
					<br />
					<strong>Compliance with Laws:</strong> Comply with all
					applicable laws and regulations regarding cryptocurrency
					storage and transactions.
				</p>

				<h2 className="text-lg font-semibold mt-6">
					7. Prohibited Activities
				</h2>
				<p>You agree not to:</p>
				<ul>
					<li>
						Use our platform for any illegal activities or to
						facilitate illegal transactions.
					</li>
					<li>
						Attempt to interfere with the operation of our platform
						or gain unauthorized access to our systems.
					</li>
				</ul>

				<h2 className="text-lg font-semibold mt-6">
					8. Limitation of Liability
				</h2>
				<p>
					EthVault is not liable for any loss or damage arising from:
				</p>
				<ul>
					<li>
						Unauthorized access to your account or transactions.
					</li>
					<li>Failure to maintain the required minimum balance.</li>
					<li>
						Errors or inaccuracies in the information you provide.
					</li>
				</ul>

				<h2 className="text-lg font-semibold mt-6">
					9. Changes to Terms
				</h2>
				<p>
					We may update these Terms from time to time. We will notify
					you of any significant changes. Your continued use of our
					platform after changes are made constitutes your acceptance
					of the updated Terms.
				</p>

				<h2 className="text-lg font-semibold mt-6">10. Termination</h2>
				<p>
					We may suspend or terminate your account if you breach these
					Terms or if we determine that your account poses a risk to
					our platform. You may also terminate your account by
					contacting us directly.
				</p>

				<h2 className="text-lg font-semibold mt-6">
					13. Entire Agreement
				</h2>
				<p>
					These Terms, together with our Privacy Policy and any other
					agreements or policies referenced herein, constitute the
					entire agreement between you and EthVault regarding your use
					of our platform.
				</p>

				<p className="mt-4">
					Thank you for using EthVault. We appreciate your trust and
					commitment to our platform.
				</p>
			</div>
		</main>
	);
};

export default TermsAndConditions;
