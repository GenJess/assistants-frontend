import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="flex items-center gap-4 border-b p-4">
      <Link href="/">
        <Image src="/openai.svg" alt="Home" width={32} height={32} />
      </Link>
    </nav>
  );
};

export default Navbar;
