import { PrismaClient } from "@prisma/client";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import pdfService from "../services/pdfServices.js";
import PDFDocument from "pdfkit";
import dayjs from "dayjs";
import excelService from "../services/excelServices.js";
import path from "path";
import fs from "fs";
const prisma = new PrismaClient();
import moment from "moment";
import { createInvoiceSchema, updateInvoiceSchema } from "../validation/validationSchemas.js";

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
  const { error } = createInvoiceSchema.validate(req.body);
  if (error) {
    throw new BadRequestError(error.details[0].message);
  }
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
  const {
    invoiceNumber,
    clientName,
    clientEmail,
    clientAddress,
    totalAmount,
    dueDate,
    items,
  } = req.body;

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
  const newItems = items.filter(item =>!item.id); // Items without an id are considered new

  // now for those with an id but do not comes with the request, we delete them

  const itemIds = items.map(item => item.id);
  const itemsToDelete = invoice.items.filter(item => !itemIds.includes(item.id));

  await prisma.item.deleteMany({
    where: {
      id: {
        in: itemsToDelete.map(item => item.id),
      },
    },
  });

  const updatedInvoice = await prisma.invoice.update({
    where: {
      id: parseInt(id),
    },
    data: {
      invoiceNumber: invoiceNumber || invoice.invoiceNumber,
      clientName: clientName || invoice.clientName,
      clientEmail: clientEmail || invoice.clientEmail,
      clientAddress: clientAddress || invoice.clientAddress,
      totalAmount: totalAmount || invoice.totalAmount,
      dueDate: dueDate ? new Date(dueDate) : invoice.dueDate,
      items: {
        create: newItems,  // Then create all items again
      },
    },
  });

  if (!updatedInvoice) throw new BadRequestError("Failed to Update invoice");

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

const getCurrentUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.userId },
  });

  if (!user) {
    throw new NotFoundError("User not found");
  }
  res.json({ user });
};

// const exportInvoiceAsPdf = async (req, res) => {
//   const { id } = req.params;

//   const invoiceData = await prisma.invoice.findUnique({
//     where: {
//       id: parseInt(id),
//       userId: req.user.userId, // fetch the invoice for a specific user
//     },
//     include: {
//       items: true,
//     },
//   });
//   if (!invoiceData) throw new NotFoundError("Invoice not found");


//   const currentDateTime = moment().format('YYYY_MM_DD_HH_mm_ss'); // Format current date and time
//   const fileName = `${invoiceData.invoiceNumber}_${currentDateTime}.pdf`; // Use invoice number and current date time as file name
//   const filePath = path.join(process.cwd(), "public/downloads", fileName);

//   // Ensure the directory exists
//   const dir = path.dirname(filePath);
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir, { recursive: true });
//   }

//   const doc = new PDFDocument({ size: "A5" });
//   doc.font("Courier").fontSize(14);

//   // Add content to PDF with improved styling
//   doc.text("Invoice", {
//     align: "center",
//     underline: true,
//     fontSize: 24,
//     margin: [0, 0, 0, 40], // Top margin
//   });


//   doc.moveDown();
//   doc.text(`Invoice Number: ${invoiceData.invoiceNumber}`, { x: 50, y: 100 });
//   doc.text(`Client Name: ${invoiceData.clientName}`, { x: 50, y: 120 });
//   doc.text(
//     `Due Date: ${new Date(invoiceData.dueDate).toLocaleDateString()} ${new Date(
//       invoiceData.dueDate
//     ).toLocaleTimeString()}`,
//     { x: 50, y: 140 }
//   );


//   doc.text("Items", {
//     align: "center",
//     underline: true,
//     fontSize: 24,
//     margin: [0, 20], // Top margin
//   });

//   // Calculate grand total
//   const grandTotal = invoiceData.items.reduce((total, item) => {
//     return total + item.quantity * item.unitPrice;
//   }, 0);

//   // Iterate over items to add detailed breakdown with improved styling
//   invoiceData.items.forEach((item, index) => {
//     const yPosition = 180 + index * 60;
//     doc.text(`-----------------------------`, { x: 50, y: yPosition });
//     doc.text(`${index + 1}: ${item.description}`, { x: 50, y: yPosition + 20 });
//     doc.text(`Quantity: ${item.quantity}`, { x: 50, y: yPosition + 40 });
//     doc.text(`Unit Price: $${item.unitPrice.toFixed(2)}`, {
//       x: 150,
//       y: yPosition + 40,
//     });
//     doc.text(`Total Amount: $${(item.quantity * item.unitPrice).toFixed(2)}`, {
//       x: 50,
//       y: yPosition + 60,
//     });
//     doc.text(`-----------------------------`, { x: 50, y: yPosition + 80 });
//   });
//   doc.text(`Grand Total: $${grandTotal.toFixed(2)}`, {
//     x: 50,
//     y: 180 + invoiceData.items.length * 60,
//     bold: true,
//   });

//   doc.text(`-----------------------------`, { x: 50, y: 80 });

//   const writeStream = fs.createWriteStream(filePath);
//   doc.pipe(writeStream);
//   doc.end();
//   writeStream.on("finish", () => {
//     res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
//     res.setHeader("Content-Type", "application/pdf");
//     res.sendFile(filePath);
//   });

//   writeStream.on("error", (err) => {
//     console.error("Error writing PDF file", err);
//     res.status(500).send("Error generating PDF");
//   });
// };


const exportInvoiceAsPdf = async (req, res) => {
  const { id } = req.params;

  const invoiceData = await prisma.invoice.findUnique({
    where: {
      id: parseInt(id),
      userId: req.user.userId, // fetch the invoice for a specific user
    },
    include: {
      items: true,
    },
  });
  
  if (!invoiceData) throw new NotFoundError("Invoice not found");

  const currentDateTime = moment().format('YYYY_MM_DD_HH_mm_ss'); // Format current date and time
  const fileName = `${invoiceData.invoiceNumber}_${currentDateTime}.pdf`; // Use invoice number and current date time as file name

  const doc = new PDFDocument({ size: "A5" });
  doc.font("Courier").fontSize(14);

  // Add content to PDF with improved styling
  doc.text("Invoice", {
    align: "center",
    underline: true,
    fontSize: 24,
    margin: [0, 0, 0, 40], // Top margin
  });

  doc.moveDown();
  doc.text(`Invoice Number: ${invoiceData.invoiceNumber}`, { x: 50, y: 100 });
  doc.text(`Client Name: ${invoiceData.clientName}`, { x: 50, y: 120 });
  doc.text(
    `Due Date: ${new Date(invoiceData.dueDate).toLocaleDateString()} ${new Date(
      invoiceData.dueDate
    ).toLocaleTimeString()}`,
    { x: 50, y: 140 }
  );

  doc.text("Items", {
    align: "center",
    underline: true,
    fontSize: 24,
    margin: [0, 20], // Top margin
  });

  // Calculate grand total
  const grandTotal = invoiceData.items.reduce((total, item) => {
    return total + item.quantity * item.unitPrice;
  }, 0);

  // Iterate over items to add detailed breakdown with improved styling
  invoiceData.items.forEach((item, index) => {
    const yPosition = 180 + index * 60;
    doc.text(`-----------------------------`, { x: 50, y: yPosition });
    doc.text(`${index + 1}: ${item.description}`, { x: 50, y: yPosition + 20 });
    doc.text(`Quantity: ${item.quantity}`, { x: 50, y: yPosition + 40 });
    doc.text(`Unit Price: $${item.unitPrice.toFixed(2)}`, {
      x: 150,
      y: yPosition + 40,
    });
    doc.text(`Total Amount: $${(item.quantity * item.unitPrice).toFixed(2)}`, {
      x: 50,
      y: yPosition + 60,
    });
    doc.text(`-----------------------------`, { x: 50, y: yPosition + 80 });
  });
  doc.text(`Grand Total: $${grandTotal.toFixed(2)}`, {
    x: 50,
    y: 180 + invoiceData.items.length * 60,
    bold: true,
  });

  doc.text(`-----------------------------`, { x: 50, y: 80 });

  // Create a buffer to store the PDF
  const chunks = [];
  doc.on('data', chunk => chunks.push(chunk));
  doc.on('end', () => {
    const pdfBuffer = Buffer.concat(chunks);

    // Set headers and send the PDF buffer to the client
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  });

  doc.end();
};

const exportAllInvoicesAsExcel = async (req, res) => {
  const invoices = await prisma.invoice.findMany({
    where: {
      userId: req.user.userId,
    },
    include: {
      items: true,
    },
  });
  if (!invoices) throw new NotFoundError("No invoices found");
  await excelService.generateExcel(invoices);
  res.download("./invoices/balanceSheet.xlsx", "Balance Sheet Report.xlsx");
};

export {
  getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getCurrentUser,
  exportInvoiceAsPdf,
  exportAllInvoicesAsExcel,
};
