import React from 'react'
import Link from "next/link";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex  flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="text-center flex flex-col items-center">
        <h1 className="text-9xl font-extrabold text-error mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-2">Page Not Found</h2>
        <p className="text-lg mb-6">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <button className="btn btn-primary flex border">
            <FaHome className="mr-2" />
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
