import Joi from "joi";

// shema for creating a user

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  username: Joi.string().min(3).required(),
});

// schema for login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Schema for creating an invoice
const createInvoiceSchema = Joi.object({
  invoiceNumber: Joi.string().required(),
  clientName: Joi.string().required(),
  clientEmail: Joi.string().email().required(),
  clientAddress: Joi.string().required(),
  items: Joi.array()
    .items(
      Joi.object({
        description: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
        unitPrice: Joi.number().positive().required(),
      })
    )
    .min(1), // Ensure at least one item is present
  totalAmount: Joi.number().positive().required(),
  dueDate: Joi.date().iso().required(),
});

// Schema for updating an invoice
const updateInvoiceSchema = Joi.object({
  id: Joi.number().integer().required(),
  userId: Joi.number().integer().required(), 
  invoiceNumber: Joi.string(),
  clientName: Joi.string(),
  clientEmail: Joi.string().email(),
  clientAddress: Joi.string(),
  totalAmount: Joi.number().positive(),
  dueDate: Joi.date().iso(),
  items: Joi.array().items(
    Joi.object({
      description: Joi.string(),
      quantity: Joi.number().integer(),
      unitPrice: Joi.number().positive(),
    })
  ),
})

export {
  registerSchema,
  loginSchema,
  createInvoiceSchema,
  updateInvoiceSchema,
};
