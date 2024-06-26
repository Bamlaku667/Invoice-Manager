import "express-async-errors";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { authRoutes, invoiceRoutes, userRoutes } from "./routes/index.js";
import cookieParser from "cookie-parser";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// const corsOptions = {
//   origin: "https://invoice-manager-zafl.vercel.app",
//   credentials: true,
// };

app.use(cors({
  origin: function (origin, callback) {
    callback(null, origin);
  }, 
  credentials: true
}));app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("server is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
