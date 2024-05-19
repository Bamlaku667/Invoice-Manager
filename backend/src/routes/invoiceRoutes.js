import express from "express";
import {
  cancelInvoice,
  createInvoice,
  deleteInvoice,
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
router.get("/", getInvoices);
router.post("/", createInvoice);
router.get("/:id", getInvoice);
router.patch("/:id", updateInvoice);
router.delete("/:id", deleteInvoice);
router.patch("/:id/pay", payInvoice);
router.patch("/:id/send", sendInvoice);
router.patch("/:id/cancel", cancelInvoice);

export default router;
