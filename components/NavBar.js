import Link from "next/link";
import Image from "next/image";
import logo from '../public/logo.png'

const NavBar = () => {
  return (
    <div className="navbar">
      <Link href="/">
        <Image src={logo} alt="logo" width={90} height={90} />
      </Link>
    </div>
  );
};

export default NavBar;
