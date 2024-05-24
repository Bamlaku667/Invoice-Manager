import React from "react";
import InvoicesList from "./InvoicesList";
import RequireAuth from "../lib/ReuquireAuth";

function page() {
  return (
    <RequireAuth>
      <div>
        <InvoicesList />
      </div>
    </RequireAuth>
  );
}

export default page;
