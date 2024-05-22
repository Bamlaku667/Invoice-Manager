import express from "express";
import {
  cancelInvoice,
  createInvoice,
  deleteInvoice,
  exportAllInvoicesAsExcel,
  exportInvoiceAsPdf,
  getCurrentUser,
  getInvoice,
  getInvoices,
  payInvoice,
  sendInvoice,
  updateInvoice,
} from "../controllers/index.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.use(authenticate);
router.get("/current-user", getCurrentUser);
router.get('/export-excel', exportAllInvoicesAsExcel);
router.get("/", getInvoices);
router.post("/", createInvoice);
router.get('/export-pdf/:id', exportInvoiceAsPdf);
router.get("/:id", getInvoice);
router.patch("/:id", updateInvoice);
router.delete("/:id", deleteInvoice);
router.patch("/:id/pay", payInvoice);
router.patch("/:id/send", sendInvoice);
router.patch("/:id/cancel", cancelInvoice);
// Example route definition in your routes configuration file


export default router;
