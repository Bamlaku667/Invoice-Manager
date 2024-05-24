import Link from "next/link";
import React from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import NavLinks from "./NavLinks";
import Header from "./Header";

function Navbar() {
  return (
    <>
    <nav className="bg-base-200">
      <div className="navbar align-element">
        <div className="navbar-start">
          {/* TITLE */}
          <Link
            href="/"
            className="hidden lg:flex btn btn-primary text-3xl items-center"
          >
            Invoice Manager
          </Link>
          {/* DROPDOWN */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>
      </div>
    </nav>
    </>
  );
}

export default Navbar;
