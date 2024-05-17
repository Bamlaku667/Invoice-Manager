import { PrismaClient } from "@prisma/client";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { t } from "tar";

const prisma = new PrismaClient();

const getInvoices = async (req, res) => {
  const invoices = await prisma.invoice.findMany({
    where: {
      userId: req.user.userId,
    },
    include: {
      items: true,
    },
  });
  if (!invoices) throw new NotFoundError("No invoices found");
  res.status(200).json(invoices);
};

const getInvoice = async (req, res) => {
  const { id } = req.params;

  const invoice = await prisma.invoice.findUnique({
    where: {
      id: parseInt(id),
      userId: req.user.userId, // fetch the invoice for a specific user
    },
    include: {
      items: true,
    },
  });
  if (!invoice) throw new NotFoundError("Invoice not found");
  res.status(200).json(invoice);
};

const createInvoice = async (req, res) => {
  // console.log(req.user);
  // return res.send(req.user.userId);
  const {
    invoiceNumber,
    clientName,
    clientAddress,
    clientEmail,
    items,
    totalAmount,
    dueDate,
  } = req.body;

  // Ensure dueDate is provided and is a valid date
  if (!dueDate) {
    throw new BadRequestError("Due date is required");
  }

  const parsedDueDate = new Date(dueDate);
  if (isNaN(parsedDueDate)) {
    throw new BadRequestError("Invalid due date format");
  }

  const newInvoice = await prisma.invoice.create({
    data: {
      invoiceNumber,
      clientName,
      clientEmail,
      clientAddress,
      totalAmount,
      dueDate: parsedDueDate,
      items: {
        create: items,
      },
      userId: req.user.userId,
    },
  });

  if (!newInvoice) throw new BadRequestError("Failed to create invoice");
  res.status(201).json(newInvoice);
};
const updateInvoice = async (req, res) => {
  const { id } = req.params;
  const updatedInvoice = await prisma.invoice.update({
    where: {
      id: parseInt(id),
    },
    data: {
      invoiceNumber: invoiceNumber || req.body.invoiceNumber,
      clientName: clientName || req.body.clientName,
      clientEmail: clientEmail || req.body.clientEmail,
      clientAddress: clientAddress || req.body.clientAddress,
      totalAmount: totalAmount || req.body.totalAmount,
      dueDate: new Date(dueDate),
      items: {
        upsert: items.map((item) => ({
          where: { id: item.id },
          update: item,
          create: item,
        })),
      },
    },
  });
  res.status(200).json(updatedInvoice);
};

const deleteInvoice = async (req, res) => {
  const { id } = req.params;

  const invoice = await prisma.invoice.findUnique({
    where: {
      id: parseInt(id),
      userId: req.user.userId,
    },
  });
  if (!invoice) throw new NotFoundError("invoice not found");

  await prisma.item.deleteMany({
    where: {
      invoiceId: parseInt(id),
    },
  });

  await prisma.invoice.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.status(200).json({ msg: "invoice deleted successfully" });
};

const payInvoice = async (req, res) => {
  try {
    // Your code here
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const sendInvoice = async (req, res) => {
  try {
    // Your code here
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const cancelInvoice = async (req, res) => {
  try {
    // Your code here
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

export {
  getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  payInvoice,
  sendInvoice,
  cancelInvoice,
};
