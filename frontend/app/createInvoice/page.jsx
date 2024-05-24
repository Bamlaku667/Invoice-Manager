import React from 'react'
import RequireAuth from '../lib/ReuquireAuth'
import CreateForm from './CreateForm'

function CreateInvoicePage() {
  return (
   <RequireAuth>
    <CreateForm />
   </RequireAuth>
  )
}

export default CreateInvoicePage
