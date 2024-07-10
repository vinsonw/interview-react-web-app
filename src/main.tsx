import "./index.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ApiInput from "./pages/ApiInput.tsx"
import Chat from "./pages/Chat.tsx"

const router = createBrowserRouter([
  {
    path: "/start",
    element: <ApiInput />,
  },
  {
    path: "/",
    element: <Chat />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
