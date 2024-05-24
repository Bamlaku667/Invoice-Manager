"use client";
import { useDeleteInvoiceMutation } from "@/redux/api/apiSlice";
import React from "react";

function InvoiceDelete({ id }) {
  const [deleteInvoice] = useDeleteInvoiceMutation();
  const handleDeleteInvoice = async () => {
    if (confirm("Are you sure you want to delete this invoice?")) {
      try {
        await deleteInvoice(id);
        toast.success("Invoice deleted successfully.");
        // Redirect to invoices page
        router.refresh();
        router.push("/invoices");
      } catch (error) {
        toast.error("Failed to delete the invoice.");
      }
    }
  };
  return (
    <div>
      <button className="btn btn-error" onClick={handleDeleteInvoice}>
        Delete
      </button>
    </div>
  );
}

export default InvoiceDelete;
