"use client";
import Link from "next/link";
import { useSelector } from "react-redux";

const links = [
  { id: 1, url: "/", text: "home" },
  { id: 3, url: "/about", text: "About" },
  { id: 5, url: "/createInvoice", text: "Create Invoice" },
  { id: 6, url: "/invoices", text: "Invoices" },
];

const NavLinks = () => {
  return (
    <>
        <>
          {links.map((link) => {
            const { id, url, text } = link;
            return (
              <li key={id}>
                <Link href={url} className="capitalize" to={url}>
                  {text}
                </Link>
              </li>
            );
          })}
        </>
    </>
  );
};
export default NavLinks;
