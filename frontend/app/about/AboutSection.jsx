'use client';
import React from "react";
import { FaCheckCircle, FaDownload, FaFileExcel, FaEdit } from "react-icons/fa";
import Image from "next/image";
import TeamImage from "./../components/teamImage.svg"; // Replace with actual image import

const AboutSection = () => {
  return (
    <div className="p-10">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-4">About Us</h1>
        <p className="text-xl leading-relaxed">
          We are dedicated to simplifying your invoicing process. Our team of experts has built a powerful and easy-to-use invoice management app to help you create, send, and track invoices with ease.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center mb-16">
        <div className="md:w-1/2">
          <Image
            alt="team image"
            src={TeamImage}
            layout=""
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-10 mt-6 md:mt-0">
          <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            To provide a seamless invoicing experience through our cutting-edge app. We aim to empower businesses by streamlining their invoicing process, ensuring they can focus more on their core activities.
          </p>
        </div>
      </div>
      <h2 className="text-4xl font-bold text-center mb-10">Our Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="text-center p-6 border rounded-lg shadow-lg">
          <FaCheckCircle className="text-6xl text-primary mb-4 mx-auto" />
          <h3 className="text-2xl font-bold mb-2">Easy to Use</h3>
          <p>
            Our app is designed with user-friendliness in mind. You can start managing your invoices with no prior training.
          </p>
        </div>
        <div className="text-center p-6 border rounded-lg shadow-lg">
          <FaDownload className="text-6xl text-primary mb-4 mx-auto" />
          <h3 className="text-2xl font-bold mb-2">Download Invoices</h3>
          <p>
            Easily download invoices in PDF format for your records and share them with clients.
          </p>
        </div>
        <div className="text-center p-6 border rounded-lg shadow-lg">
          <FaFileExcel className="text-6xl text-primary mb-4 mx-auto" />
          <h3 className="text-2xl font-bold mb-2">Export as Excel</h3>
          <p>
            Export your list of invoices as an Excel file for easy reporting and data analysis.
          </p>
        </div>
        <div className="text-center p-6 border rounded-lg shadow-lg">
          <FaEdit className="text-6xl text-primary mb-4 mx-auto" />
          <h3 className="text-2xl font-bold mb-2">Create and Update Invoices</h3>
          <p>
            Users can effortlessly create new invoices and update existing ones with our intuitive interface.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
