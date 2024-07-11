import "./ChatItem.scss"
import { forwardRef, useEffect, useRef } from "react"
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded"

import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded"

export default function ChatItem({
  title,
  content,
  shouldScrollIntoView = false,
}: {
  title: string
  content: string
  shouldScrollIntoView?: boolean
}) {
  const elRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (shouldScrollIntoView) elRef.current?.scrollIntoView()
  }, [])
  const isUser = title === "user"
  return (
    <div className="chat-item-wrapper" ref={elRef}>
      <div className="avatar">
        {isUser ? <PermIdentityRoundedIcon /> : <TipsAndUpdatesRoundedIcon />}
      </div>
      <div className="right">
        <div className="title">{isUser ? "You" : "ChatGPT"}</div>
        <div className="content">{content}</div>
      </div>
    </div>
  )
}

export const BotPendingItem = forwardRef<HTMLDivElement, { text: string }>(
  ({ text }, ref) => {
    return (
      <div className="chat-item-wrapper" ref={ref}>
        <div className="avatar">
          <TipsAndUpdatesRoundedIcon />
        </div>
        <div className="right">
          <div className="title">{"ChatGPT"}</div>
          <div className="content">{text}</div>
        </div>
      </div>
    )
  }
)
