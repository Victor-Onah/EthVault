import { Link } from "react-router-dom";

const Logo = () => (
	<Link to="/dashboard" className="flex gap-2 items-center">
		<img width={15} src="/images/eth.svg" alt="Eth logo blue" />
		<h3 className="font-black">EthVault</h3>
	</Link>
);

export default Logo;
