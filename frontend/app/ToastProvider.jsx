
import "./globals.css";
import { ToastContainer } from "react-toastify";

export default function ToastProvider({ children }) {
  return (
    <>
      {children}
      <ToastContainer position="top-center"/>
    </>
  );
}
