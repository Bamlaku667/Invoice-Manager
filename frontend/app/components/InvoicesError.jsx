import React from 'react'
import { MdError } from "react-icons/md";

function InvoicesError({text}) {
 
    return (
        <div className="flex flex-col justify-center items-center h-96 text-center text-gray-500">
        <MdError size={48} className="mb-4" />
        <h2 className="text-2xl">{text}</h2>
      </div>
    );
  
}

export default InvoicesError
