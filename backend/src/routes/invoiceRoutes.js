import express from "express";
import {
  createInvoice,
  deleteInvoice,
  exportAllInvoicesAsExcel,
  exportInvoiceAsPdf,
  getCurrentUser,
  getInvoice,
  getInvoices,
  updateInvoice,
} from "../controllers/index.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.use(authenticate);
router.get("/current-user", getCurrentUser);
router.get('/export-excel', exportAllInvoicesAsExcel);
router.get("/", getInvoices);
router.post("/", createInvoice);
router.post('/export-pdf/:id', exportInvoiceAsPdf);
router.get("/:id", getInvoice);
router.patch("/:id", updateInvoice);
router.delete("/:id", deleteInvoice);
// Example route definition in your routes configuration file


export default router;
