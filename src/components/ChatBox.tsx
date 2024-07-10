import "./ChatBox.scss"
import { useState } from "react"
import ConfigurableInput from "./ConfigurableInput"

export type ChatBoxStatus = "idle" | "pending"
export default function ChatBox({
  onSubmit,
  status = "idle",
}: {
  onSubmit: (content: string) => void
  status?: ChatBoxStatus
}) {
  const [youContent, setYouContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(youContent)
    setYouContent("")
  }

  return (
    <form className="chat-box-wrapper" onSubmit={handleSubmit}>
      <ConfigurableInput
        value={youContent}
        onChange={(e) => setYouContent(e.target.value)}
        placeholder="Messaging ChatGPT here."
      />
      <button>
        {status === "idle" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 32 32"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z"
              clipRule="evenodd"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <rect
              width="10"
              height="10"
              x="7"
              y="7"
              fill="currentColor"
              rx="1.25"
            ></rect>
          </svg>
        )}
      </button>
    </form>
  )
}
