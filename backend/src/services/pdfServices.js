import PDFDocument from "pdfkit";
import blobStream from "blob-stream";
import fs from "fs";

const generatePdf = (invoiceData) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A5" });
    const filePath = `./invoices/${invoiceData.invoiceNumber}.pdf`;

    // Ensure the invoices directory exists
    const dir = "./invoices";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // const stream = fs.createWriteStream(filePath);
    const stream = doc.pipe(blobStream());

    // Set default font and font size
    doc.font("Courier").fontSize(14);

    // Add content to PDF with improved styling
    doc.text("Invoice", {
      align: "center",
      underline: true,
      bold: true,
      fontSize: 24,
      margin: [0, 0, 0, 40], // Top margin
    });

    doc.moveDown();
    doc.text(`Invoice Number: ${invoiceData.invoiceNumber}`, { x: 50, y: 100 });

    doc.text(`Client Name: ${invoiceData.clientName}`, { x: 50, y: 100 });

    doc.text(
      `Due Date: ${new Date(
        invoiceData.dueDate
      ).toLocaleDateString()} ${new Date(
        invoiceData.dueDate
      ).toLocaleTimeString()}`,
      { x: 50, y: 50 }
    );

    doc.text("Items", {
      align: "center",
      underline: true,
      bold: true,
      fontSize: 24,
      margin: [0, 0, 0, 40], // Top margin
    });

    // Calculate grand total
    const grandTotal = invoiceData.items.reduce((total, item) => {
      return total + item.quantity * item.unitPrice;
    }, 0);

    // Iterate over items to add detailed breakdown with improved styling
    invoiceData.items.forEach((item, index) => {
      doc.text("-----------------------------", { x: 50, y: 260 + index * 20 });
      doc.text(`${index + 1}): ${item.description}`, {
        x: 50,
        y: 220 + index * 20,
      });
      doc.text(`Quantity: ${item.quantity}`, { x: 50, y: 240 + index * 20 });
      doc.text(`Unit Price: $ ${item.unitPrice.toFixed(2)}`, {
        x: 150,
        y: 240 + index * 20,
      });
      doc.text(
        `Total Amount: $ ${(item.quantity * item.unitPrice).toFixed(2)}`,
        { x: 50, y: 260 + index * 20 }
      );
      doc.text("-----------------------------", { x: 50, y: 260 + index * 20 });
    });
    doc.text(`Grand Total: $${grandTotal.toFixed(2)}`, {
      x: 50,
      y: 300 + invoiceData.items.length * 20,
      bold: true,
    });

    doc.text("-----------------------------", { x: 50, y: 260 });

    doc.end();

    stream.on("finish", () => {
      const url = stream.toBlobURL("application/pdf");
      iframe.src = url
      resolve(url)
    //   iframe.src = url;
    });

    stream.on("error", (error) => {
      reject(error);
    });
  });
};

export default {
  generatePdf,
};
