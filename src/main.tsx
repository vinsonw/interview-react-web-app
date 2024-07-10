import "./index.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const { Start } = await import("./pages/Start.tsx")
      return { Component: Start }
    },
  },
  {
    path: "/chat",
    lazy: async () => {
      const { Chat } = await import("./pages/Chat.tsx")
      return { Component: Chat }
    },
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
