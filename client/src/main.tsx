import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store";
import { Home, Login, NewMovie, User } from "./pages";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/index.ts";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/movie/new",
    element: <NewMovie />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
        <App />
      </LocalizationProvider>
    </Provider>
  </React.StrictMode>
);
