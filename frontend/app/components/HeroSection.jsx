'use client';
import React from "react";
import HeroImage from "./heroImage.png";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Header from "./Header";

const HeroSection = () => {
  const userState = useSelector((state) => state.userState);
  const user = userState ? userState.user : null;

  return (

    <>
    <div className="relative grid grid-cols-1 md:grid-cols-2 p-10 h-screen">
      <div className="z-20 flex flex-col justify-center gap-y-3 items-start text-5xl pl-3">
        <h1 className=" w-full    md:text-left text-3xl">
          <span className="">Simplify Your Invoicing</span> with Our App
        </h1>
        <p className="text-[20px] leading-relaxed ">
          Take control of your invoicing process with our powerful and
          easy-to-use invoice management app. Create, send, and track invoices
          with ease. Start streamlining your
          invoicing today.
        </p>
        {user && ( // Render Link only if user is authenticated
          <Link href="/invoices">
            <button className="btn font-bold btn-outline ">Get Started</button>
          </Link>
        )}
      </div>
      <Image
        alt='hero image'
        src={HeroImage}
        layout=""
        objectFit="cover"
        className="z-0 hidden md:block"
      />
    </div>
    </>

  );
};

export default HeroSection;
