import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";

import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import Error from "./pages/Error";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<Error/> ,
    children: [
      { path: "/", element: <Home /> },
      { path: "/posts/:postId", element: <PostPage /> },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
