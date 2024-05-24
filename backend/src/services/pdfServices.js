import PDFDocument from "pdfkit";
import fs from "fs";
import blobStream from "blob-stream";

const generatePdf = (invoiceData) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A5" });
    // const filePath = `./invoices/${invoiceData.invoiceNumber}.pdf`;

    // // Ensure the invoices directory exists
    // const dir = "./invoices";
    // if (!fs.existsSync(dir)) {
    //   fs.mkdirSync(dir);
    // }

    var stream = doc.pipe(blobStream());
    // Set default font and font size
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
      `Due Date: ${new Date(
        invoiceData.dueDate
      ).toLocaleDateString()} ${new Date(
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
      doc.text(`Unit Price: $${item.unitPrice.toFixed(2)}`, { x: 150, y: yPosition + 40 });
      doc.text(`Total Amount: $${(item.quantity * item.unitPrice).toFixed(2)}`, { x: 50, y: yPosition + 60 });
      doc.text(`-----------------------------`, { x: 50, y: yPosition + 80 });
    });
    doc.text(`Grand Total: $${grandTotal.toFixed(2)}`, {
      x: 50,
      y: 180 + invoiceData.items.length * 60,
      bold: true,
    });

    doc.end();

    stream.on("finish", () => {
      var blob_url = stream.toBlobURL('application/pdf');
      resolve(blob_url);
    });

    stream.on("error", (error) => {
      reject(error);
    });

    doc.pipe(stream);
  });
};

export default {
  generatePdf,
};
