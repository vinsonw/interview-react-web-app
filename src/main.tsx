import "./index.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Start from "./pages/Start.tsx"
import Chat from "./pages/Chat.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
