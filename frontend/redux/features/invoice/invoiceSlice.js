// import { api } from "@/redux/api/apiSlice";
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   invoices: [],
//   loading: false,
//   error: null,
// };

// const invoiceSlice = createSlice({
//   name: "invoiceState",
//   initialState,
//   reducers: {
//     addInvoice: (state, action) => {
//       state.invoices.push(action.payload);
//     },
//     removeInvoice: (state, action) => {
//       state.invoices = state.invoices.filter(
//         (invoice) => invoice.id !== action.payload
//       );
//     },
//     updateInvoice: (state, action) => {
//       const { id, ...updatedInvoice } = action.payload;
//       const index = state.invoices.findIndex((invoice) => invoice.id === id);
//       if (index !== -1) {
//         state.invoices[index] = { ...state.invoices[index], ...updatedInvoice };
//       }
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addMatcher(api.endpoints.getInvoices.matchFulfilled, (state, action) => {
//         state.invoices = action.payload;
//         state.loading = false;
//       })
//       .addMatcher(api.endpoints.getInvoices.matchPending, (state) => {
//         state.loading = true;
//       })
//       .addMatcher(api.endpoints.getInvoices.matchRejected, (state, action) => {
//         state.error = action.error.message;
//         state.loading = false;
//       })

//       // handling addInvoice matchers
//       .addMatcher(api.endpoints.addInvoice.matchFulfilled, (state, action) => {
//         state.invoices.push(action.payload);
//       })

//       //handling deleting invoice matchers
//       .addMatcher(
//         api.endpoints.deleteInvoice.matchFulfilled,
//         (state, action) => {
//           state.invoices = state.invoices.filter(
//             (invoice) => invoice.id !== action.payload
//           );
//         }
//       )

//       //handling updating invoice matchers
//       .addMatcher(
//         api.endpoints.updateInvoice.matchFulfilled,
//         (state, action) => {
//           const { id, ...updatedInvoice } = action.payload;
//           const index = state.invoices.findIndex(
//             (invoice) => invoice.id === id
//           );
//           if (index !== -1) {
//             state.invoices[index] = {
//               ...state.invoices[index],
//               ...updatedInvoice,
//             };
//           }
//         }
//       );
//   },
// });

// export const {
//   addInvoice,
//   removeInvoice,
//   updateInvoice,
//   setLoading,
//   setError,
// } = invoiceSlice.actions;

// export default invoiceSlice.reducer;
