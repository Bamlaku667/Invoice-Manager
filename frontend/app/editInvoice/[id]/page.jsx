"use client";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import {
  useGetInvoiceQuery,
  useUpdateInvoiceMutation,
} from "@/redux/api/apiSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import SectionTitle from "@/app/components/SectionTitle";
import FormInput from "@/app/components/FormInput";

function EditForm({ params }) {
  const { data: invoice, isLoading: isFetching, isError } = useGetInvoiceQuery(params.id);
  const [updateInvoice, { isLoading, isError: isUpdateError, isSuccess, error }] = useUpdateInvoiceMutation();
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "",
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    items: [],
    totalAmount: 0,
    dueDate: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch invoice data");
    } else if (invoice) {
      setInvoiceData(invoice);
    }
  }, [isError, invoice]);

  useEffect(() => {
    if (isUpdateError) {
      toast.error(error?.data?.msg || "Failed to update invoice");
      console.log(error);
    }
    if (isSuccess) {
      toast.success("Invoice updated successfully");
      router.push("/invoices");
    }
  }, [isUpdateError, isSuccess, router, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting invoiceData:", invoiceData); // Debugging
    try {
      await updateInvoice(invoiceData).unwrap();
    } catch (error) {
      console.error("Error updating invoice:", error); // Debugging
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({
      ...invoiceData,
      [name]: value,
    });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoiceData.items];
    newItems[index][field] = value;
    setInvoiceData({
      ...invoiceData,
      items: newItems,
    });
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [
        ...invoiceData.items,
        { description: "", quantity: 0, unitPrice: 0 }, // New items without id
      ],
    });
  };

  const removeItem = (index) => {
    const newItems = [...invoiceData.items];
    newItems.splice(index, 1);
    setInvoiceData({
      ...invoiceData,
      items: newItems,
    });
  };

  useEffect(() => {
    const total = invoiceData.items.reduce((acc, item) => {
      return acc + item.quantity * item.unitPrice;
    }, 0);
    setInvoiceData((prevState) => ({
      ...prevState,
      totalAmount: total,
    }));
  }, [invoiceData.items]);

  if (isFetching) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <SectionTitle text="Edit Invoice" />
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-3 bg-base-200 rounded-lg shadow-md"
      >
        <div className="space-y-2">
          <FormInput
            label="Invoice Number"
            name="invoiceNumber"
            value={invoiceData.invoiceNumber}
            onChange={handleChange}
          />
          <FormInput
            label="Client Name"
            name="clientName"
            value={invoiceData.clientName}
            onChange={handleChange}
          />
          <FormInput
            label="Client Email"
            name="clientEmail"
            type="email"
            value={invoiceData.clientEmail}
            onChange={handleChange}
          />
          <FormInput
            label="Client Address"
            name="clientAddress"
            type="text"
            value={invoiceData.clientAddress}
            onChange={handleChange}
          />
          <FormInput
            label="Due Date"
            name="dueDate"
            type="date"
            value={invoiceData.dueDate.split("T")[0]} // Ensure date format is compatible with input[type="date"]
            onChange={handleChange}
          />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="label">
              <span className="label-text capitalize">Items</span>
            </label>
            {invoiceData.items.map((item, index) => (
              <div key={index} className="flex space-x-4 items-center">
                <FormInput
                  label="Description"
                  name={`description-${index}`}
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
                  }
                />
                <FormInput
                  label="Quantity"
                  name={`quantity-${index}`}
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", parseInt(e.target.value))
                  }
                />
                <FormInput
                  label="Unit Price"
                  name={`unitPrice-${index}`}
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "unitPrice",
                      parseFloat(e.target.value)
                    )
                  }
                />
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="btn btn-circle btn-ghost"
                >
                  <MdDelete />
                </button>
              </div>
            ))}
            <button type="button" onClick={addItem} className="btn btn-success">
              Add Item
            </button>
          </div>
          <FormInput
            label="Total Amount"
            name="totalAmount"
            type="number"
            value={invoiceData.totalAmount}
            readOnly
          />
          <div className="flex">
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditForm;
