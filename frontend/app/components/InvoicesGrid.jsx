"use client";
import { MdError } from "react-icons/md";
import React, { useState } from "react";
import Link from "next/link";
import InvoicesError from "./InvoicesError";
import { MdPictureAsPdf } from "react-icons/md";
import { toast } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function InvoicesGrid({ invoices }) {
  const [selectedInvoiceUrl, setSelectedInvoiceUrl] = useState(null);
  const [isPdfLoading, setIsPdfLoading] = useState({});

  const handleDownload = async (id) => {
    setIsPdfLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const response = await fetch(`${API_URL}/api/invoices/export-pdf/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Create a link element and set its attributes
      const link = document.createElement("a");
      link.href = url;
      link.download = "invoice.pdf"; // Set the download attribute here
      document.body.appendChild(link); // Append the link to the body

      // Programmatically click the link to start the download
      link.click();

      // Remove the link from the body once the download starts
      document.body.removeChild(link);
      toast.success("PDF exported successfully");
      setIsPdfLoading(false);
    } catch (error) {
      setIsPdfLoading((prev) => ({ ...prev, [id]: false }));
      console.error(error);
      toast.error("Failed to export the invoice as PDF.");
    }
  };

  return (
    <div>
      {invoices && invoices.length === 0 && (
        <InvoicesError text={"No invoices found"} />
      )}
      {invoices && invoices.length > 0 && (
        <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 px-4">
          {invoices.map((invoice) => {
            const {
              clientName,
              clientAddress,
              invoiceNumber,
              totalAmount,
              dueDate,
            } = invoice;
            return (
              <div
                key={invoice.id}
                className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow border border-base-200 duration-200"
              >
                <Link href={`/invoices/${invoice.id}`}>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title capitalize tracking-wider">
                      {clientName}
                    </h2>
                    <span className="text-secondary">
                      Address: {clientAddress}
                    </span>
                    <span className="text-secondary">
                      Invoice Number: {invoiceNumber}
                    </span>
                    <span className="text-secondary">
                      Due Date: {new Date(dueDate).toLocaleDateString()}
                    </span>
                    <span className="text-secondary">
                      Total Amount: ${totalAmount}
                    </span>
                  </div>
                </Link>
                <div className="card-actions justify-center pb-4">
                  <button
                    disabled={isPdfLoading[invoice.id]}
                    className="btn btn-primary"
                    onClick={() => handleDownload(invoice.id)}
                  >
                    {isPdfLoading[invoice.id] ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        <MdPictureAsPdf className="mr-2" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <MdPictureAsPdf className="mr-2" />
                        Download PDF
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {selectedInvoiceUrl && (
        <div className="flex justify-center items-center h-96 mt-4">
          <iframe
            src={selectedInvoiceUrl}
            width="80%"
            height="100%"
            className="border-2 border-gray-300"
            typeof="application/pdf"
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default InvoicesGrid;
