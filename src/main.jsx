// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { BrowserRouter } from "react-router-dom";
// import "./i18n";
// import { Provider } from "react-redux";
// import { store } from "./redux/store.js";
// import { ToastProvider } from "./features/sales/common/toast/ToastContext.jsx";

// createRoot(document.getElementById("root")).render(
//   // <StrictMode>
//   <Provider store={store}>
//     <BrowserRouter>
//       <ToastProvider>
//         <App />
//       </ToastProvider>
//     </BrowserRouter>
//   </Provider>,
//   // {/* </StrictMode> */}
// );

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./i18n";

import { Provider } from "react-redux";
import { store } from "./redux/store.js";

import { ToastProvider } from "./features/sales/common/toast/ToastContext.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// main.jsx / index.js - sabse upar, koi bhi import ke baad

// const fixGoogleTranslateBlinking = () => {
//   // Body ka top reset karta raho
//   const observer = new MutationObserver(() => {
//     if (document.body.style.top && document.body.style.top !== "0px") {
//       document.body.style.top = "0px";
//     }
//     if (document.body.style.position === "relative") {
//       document.body.style.position = "static";
//     }
//   });

//   observer.observe(document.body, {
//     attributes: true,
//     attributeFilter: ["style"],
//   });
// };

// fixGoogleTranslateBlinking();

const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </Provider>,
);
