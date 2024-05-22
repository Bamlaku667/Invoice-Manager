import ExcelJS from 'exceljs';
import fs from 'fs';

const generateExcel = async (invoices) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Invoices');

  // Add headers
  worksheet.addRow(['Invoice Number', 'Client Name', 'Client Email', 'Client Address', 'Total Amount', 'Due Date']);
  invoices.forEach(invoice => {
    worksheet.addRow([
      invoice.invoiceNumber,
      invoice.clientName,
      invoice.clientEmail,
      invoice.clientAddress,
      invoice.totalAmount,
      invoice.dueDate.toDateString()
    ]);
  });

  // Ensure the invoices directory exists
  const dir = './invoices';
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }

  // Save the workbook to a file
  const filePath = './invoices/balanceSheet.xlsx';
  await workbook.xlsx.writeFile(filePath);

  return filePath;
};

export default {
  generateExcel,
};
