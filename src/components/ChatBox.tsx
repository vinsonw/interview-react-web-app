import "./ChatBox.scss"
import { useState } from "react"
import ConfigurableInput from "./ConfigurableInput"

export default function ChatBox({
  onSubmit,
}: {
  onSubmit: (content: string) => void
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
      />
      <button>x</button>
    </form>
  )
}
