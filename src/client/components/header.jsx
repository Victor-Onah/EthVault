import { BiLogOut, BiMenu, BiSupport, BiUser, BiX } from "react-icons/bi";
import Logo from "./logo";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className="sticky top-2 p-2 z-50">
			<div className="flex justify-between items-center bg-white bg-opacity-10 p-2 rounded-full text-sm backdrop-blur-md">
				<Logo />
				<div className="relative">
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="p-2 flex aspect-square rounded-full bg-white bg-opacity-20 border border-slate-300">
						{isMenuOpen ? <BiX /> : <BiMenu />}
					</button>
					<div
						style={{
							transformOrigin: "top right"
						}}
						className={`${
							isMenuOpen ? "scale-100" : "scale-0"
						} transition-all p-2 space-y-2 bg-blue-800 border border-blue-400 backdrop-blur-md absolute right-full top-full rounded-lg w-screen max-w-48`}>
						<Link
							to={"/dashboard/profile"}
							onClick={() => setIsMenuOpen(false)}
							className="p-2 rounded-lg bg-white bg-opacity-20 flex gap-4 items-center">
							<BiUser /> Profile
						</Link>
						<Link
							to={"/dashboard/support"}
							onClick={() => setIsMenuOpen(false)}
							className="p-2 rounded-lg bg-white bg-opacity-20 flex gap-4 items-center">
							<BiSupport /> Support
						</Link>
						<hr />
						<Link
							to={"/dashboard/logout"}
							onClick={() => setIsMenuOpen(false)}
							className="p-2 rounded-lg bg-red-500 bg-opacity-30 text-red-300 flex gap-4 items-center">
							<BiLogOut /> Logout
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
