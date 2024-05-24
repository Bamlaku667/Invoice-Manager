import React from "react";
import day from "dayjs";
import * as XLSX from "xlsx";
import InvoicesError from "./InvoicesError";
import Link from "next/link";
import { MdDelete } from "react-icons/md";


const InvoicesTable = ({ invoices }) => {
  const exportAsExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      invoices.map((invoice) => ({
        "Invoice Number": invoice.invoiceNumber,
        "Client Name": invoice.clientName,
        "Client Email": invoice.clientEmail,
        "Client Address": invoice.clientAddress,
        "Total Amount": invoice.totalAmount,
        "Due Date": day(invoice.dueDate).format("hh:mm a - MMM Do, YYYY"),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Invoices");
    XLSX.writeFile(workbook, "invoices.xlsx");
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-end mb-4">
        <button
          className="btn btn-secondary"
          disabled={invoices.length === 0}
          onClick={exportAsExcel}
        >
          Export as Excel
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Client Name</th>
              <th>Client Email</th>
              <th>Client Address</th>
              <th>Total Amount</th>
              <th className="hidden sm:block">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length === 0 && (
              <InvoicesError text={"No Invoices Found"} />
            )}
            {invoices.map((invoice) => {
              const id = invoice.id;
              const {
                clientName,
                clientAddress,
                clientEmail,
                invoiceNumber,
                totalAmount,
                dueDate,
              } = invoice;
              const formattedDate = day(dueDate).format(
                "hh:mm a - MMM Do, YYYY"
              );
              return (
                <tr key={id}>
                  <td>
                    <Link href={`/invoices/${id}`}>{invoiceNumber}</Link>
                  </td>
                  <td>
                    <Link href={`/invoices/${id}`}>{clientName}</Link>
                  </td>
                  <td>
                    <Link href={`/invoices/${id}`}>{clientEmail}</Link>
                  </td>
                  <td>
                    <Link href={`/invoices/${id}`}>{clientAddress}</Link>
                  </td>
                  <td>
                    <Link href={`/invoices/${id}`}>{totalAmount}</Link>
                  </td>
                  <td>
                    <Link href={`/invoices/${id}`}>{formattedDate}</Link>
                  </td>
                  <td>
                   
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicesTable;
