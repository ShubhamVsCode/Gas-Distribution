import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="px-52 py-5 border-b flex justify-between items-center">
      <div>
        <Link href="/" className="text-xl font-semibold">
          Deepak Studio
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
