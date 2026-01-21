import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-20 border-b border-white/10 bg-[#0b0f1a]/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <Image src="/openai.svg" alt="Home" width={20} height={20} />
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
              Workspace
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="rounded-full border border-transparent px-3 py-1.5 text-slate-200 transition hover:border-white/10 hover:bg-white/5"
          >
            Dashboard
          </Link>
          <Link
            href="/knowledge-repo"
            className="rounded-full border border-white/10 px-3 py-1.5 text-slate-200 transition hover:bg-white/5"
          >
            Knowledge Repo
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
