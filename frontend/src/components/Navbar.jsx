import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black text-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="text-lg font-semibold">
          Dev.
        </Link>

        <div className="hidden items-center gap-8 text-[10px] md:flex">
          <Link to="/" className="hover:text-gray-300">
            HOME
          </Link>

          <Link to="/" className="hover:text-gray-300">
            LISTING
          </Link>

          <Link to="/" className="hover:text-gray-300">
            ABOUT US
          </Link>
        </div>

        <Link
          to="/contact"
          className="rounded border border-white px-4 py-1 text-[10px] hover:bg-white hover:text-black"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
