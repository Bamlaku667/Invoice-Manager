"use client";
import React, { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import SectionTitle from "../components/SectionTitle";
import { MdDelete } from "react-icons/md";
import { useAddInvoiceMutation } from "@/redux/api/apiSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function CreateForm() {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "",
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    items: [],
    totalAmount: 0,
    dueDate: "",
  });

  const [addInvoice, { isLoading, isError, isSuccess, error }] =
    useAddInvoiceMutation();

  useEffect(() => {
    if (isError) {

      toast.error(error?.data?.msg || "Failed to create invoice");
    }
    if (isSuccess) {
      toast.success("Invoice created successfully");
    }
  }, [isError, isSuccess, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addInvoice(invoiceData).unwrap();
      setInvoiceData({
        invoiceNumber: "",
        clientName: "",
        clientEmail: "",
        clientAddress: "",
        items: [],
        totalAmount: 0,
        dueDate: "",
      });
    } catch (error) {
      console.error(error);
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
        { description: "", quantity: 0, unitPrice: 0 },
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

  return (
    <div className="container mx-auto p-4">
      <SectionTitle text="Create Invoice" />
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-3 bg-base-200 rounded-lg shadow-md"
      >
        <div className="space-y-2 ">
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
          <div className="space-y-2">
            <FormInput
              label="Client Address"
              id="clientAddress"
              type="text"
              name="clientAddress"
              value={invoiceData.clientAddress}
              onChange={handleChange}
            />
          </div>
          <FormInput
            label="Due Date"
            name="dueDate"
            type="date"
            value={invoiceData.dueDate}
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
                    handleItemChange(
                      index,
                      "quantity",
                      parseInt(e.target.value)
                    )
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

          <div className="flex ">
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary "
              onClick={handleSubmit}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  creating...
                </>
              ) : (
                "Create"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateForm;
