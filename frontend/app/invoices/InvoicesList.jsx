"use client";
import { useGetInvoicesQuery } from "@/redux/api/apiSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import SectionTitle from "../components/SectionTitle";
import { BsFillGridFill, BsList } from "react-icons/bs";
import InvoicesGrid from "../components/InvoicesGrid";
import InvoicesTable from "../components/InvoicesTable";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import InvoicesError from "../components/InvoicesError";

const InvoicesList = () => {
  const { data: invoices, isLoading, isError, refetch } = useGetInvoicesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [layout, setLayout] = useState("grid");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const setActiveStyles = (pattern) => {
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout
        ? "btn-primary text-primary-content"
        : "btn-ghost text-based-content"
    }`;
  };

  if (isError) return <InvoicesError />;
  if (isLoading) return <Loading />;

  return (
    <>
      <div className="mt-[5%] flex items-center justify-evenly">
        <div className="w-1/2">
          <SectionTitle text="My Invoices" />
        </div>
        <div className="w-1/2">
          <div className="flex gap-x-5 justify-end pr-10">
            <button
              type="button"
              onClick={() => setLayout("grid")}
              className={setActiveStyles("grid")}
            >
              <BsFillGridFill />
            </button>
            <button
              type="button"
              onClick={() => setLayout("list")}
              className={setActiveStyles("list")}
            >
              <BsList />
            </button>
          </div>
        </div>
      </div>

      <div>
        {layout === "grid" ? (
          <InvoicesGrid invoices={invoices} />
        ) : (
          <InvoicesTable invoices={invoices} />
        )}
      </div>
    </>
  );
};

export default InvoicesList;
