"use client";
import React, { useState } from "react";
import {
  useGetInvoiceQuery,
  useDeleteInvoiceMutation,
} from "@/redux/api/apiSlice";
import Link from "next/link";
import Image from "next/image";
import detailsImage from "../../components/details.svg";
import Loading from "@/app/components/Loading";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import NotFound from "@/app/not-found";

function InvoiceDetails({ params }) {
  const {
    data: invoice,
    isLoading,
    isSuccess,
    isError,
  } = useGetInvoiceQuery(params.id, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const [deleteInvoice] = useDeleteInvoiceMutation();
  const [pdfUrl, setPdfUrl] = useState(null); // State to hold the PDF URL
  const router = useRouter();
  const [isPdfLoading, setIsPdfLoading] = useState(false);

  if (isLoading) return <Loading />;

  if (isError) {
    return <NotFound />;
  }

  const {
    invoiceNumber,
    clientName,
    clientEmail,
    clientAddress,
    totalAmount,
    dueDate,
    items,
  } = invoice;

  const handleEditInvoice = () => {
    // Logic for editing the invoice
    router.push(`/editInvoice/${params.id}`);
    // toast.info("Edit Invoice functionality is not implemented yet.");
  };

  const handleDeleteInvoice = async () => {
    if (confirm("Are you sure you want to delete this invoice?")) {
      try {
        await deleteInvoice(params.id);
        toast.success("Invoice deleted successfully.");
        // Redirect to invoices page
        router.refresh();
        router.push("/invoices");
      } catch (error) {
        toast.error("Failed to delete the invoice.");
      }
    }
  };

  const handleExportAsPdf = async () => {
    setIsPdfLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/invoices/export-pdf/${params.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate PDF.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);

      // Trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = "invoice.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("PDF exported successfully");
      setIsPdfLoading(false);
    } catch (error) {
      setIsPdfLoading(false);
      console.error(error);
      toast.error("Failed to export the invoice as PDF.");
    }
  };

  return (
    <section className="max-w-7xl mx-auto p-8">
      <div className="text-md breadcrumbs mb-6">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/invoices">Invoices</Link>
          </li>
          <li>{invoiceNumber}</li>
        </ul>
      </div>
      <div className="flex justify-end gap-4 mb-6">
        <button className="btn btn-primary" onClick={handleEditInvoice}>
          Edit Invoice
        </button>
        <button className="btn btn-error" onClick={handleDeleteInvoice}>
          Delete Invoice
        </button>
        <button
          disabled={isPdfLoading}
          className="btn btn-secondary"
          onClick={handleExportAsPdf}
        >
          {isPdfLoading ? (
            <>
              <span className="loading loading-spinner"></span>
              Exporting...
            </>
          ) : (
            "Export As PDF"
          )}
        </button>
      </div>
      {/* INVOICE DETAILS */}
      <div className="grid gap-y-8 lg:grid-cols-2 lg:gap-x-16 border border-base-200 p-6 rounded-lg shadow-lg">
        {/* IMAGE */}
        <div className="flex justify-center items-center">
          <Image
          width={1000}
          height={1000}
            src={detailsImage}
            alt={`Invoice ${invoiceNumber}`}
            className="w-full h-auto object-cover  rounded-lg lg:w-full"
          />
        </div>
        {/* DETAILS */}
        <div>
          <h1 className="capitalize text-3xl font-bold mb-4 ">
            {invoiceNumber}
          </h1>
          <h4 className="text-xl  font-bold mb-2">
            {clientName}
          </h4>
          <p className="text-lg mb-1">
            <strong>Email:</strong> {clientEmail}
          </p>
          <p className="text-lg  mb-1">
            <strong className="">Address:</strong> {clientAddress}
          </p>
          <p className="text-lg  mb-1">
            <strong>Total Amount:</strong> ${totalAmount}
          </p>
          <p className="text-lg  mb-1">
            <strong>Due Date:</strong> {new Date(dueDate).toLocaleDateString()}
          </p>
        </div>
      </div>
      {/* ITEMS LIST */}
      <div className="mt-10 border border-base-200 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Items</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-left">Description</th>
                <th className="text-right">Quantity</th>
                <th className="text-right">Unit Price</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="hover">
                  <td className="text-left">{item.description}</td>
                  <td className="text-right">{item.quantity}</td>
                  <td className="text-right">${item.unitPrice}</td>
                  <td className="text-right">
                    ${item.quantity * item.unitPrice}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="text-right font-bold" colSpan="3">
                  Grand Total:
                </td>
                <td className="text-right font-bold">
                  $
                  {items.reduce(
                    (total, item) => total + item.quantity * item.unitPrice,
                    0
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default InvoiceDetails;
