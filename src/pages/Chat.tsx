import "./Chat.scss"

import { useState } from "react"
import { getResponseFromBot, ResponseMessage } from "../utils"
import ChatBox, { ChatBoxStatus } from "../components/ChatBox"
import ChatItem, { BotPendingItem } from "../components/ChatItem"
import ChatHeader from "../components/ChatHeader"
import { useRedirectWhenApiKeyIsInValid } from "../hooks/use-redirect-when-api-key-is-invalid"

export default function Chat() {
  // check if api key is valid on mount
  useRedirectWhenApiKeyIsInValid()

  // handle user / bot interactions
  const [chatHistory, setChatHistory] = useState<ResponseMessage[]>([])
  const [chatBoxStatus, setChatBoxStatus] = useState<ChatBoxStatus>("idle")
  const handleUserInput = async (content: string) => {
    setChatBoxStatus("pending")

    // update ui immediately
    const newChatHistory: ResponseMessage[] = [
      ...chatHistory,
      { role: "user", content },
    ]
    setChatHistory(newChatHistory)

    // wait for response then update ui again
    const res = await getResponseFromBot({
      content,
      chatHistory: newChatHistory,
    })
    if (!res) return console.error("res is null")
    setChatHistory(newChatHistory.concat(res.choices[0].message))
    setChatBoxStatus("idle")
  }

  return (
    <div className="chat-page-wrapper">
      <div className="chat-page">
        <div className="chat-header">
          <ChatHeader />
        </div>
        {/* empty status */}
        {chatHistory.length === 0 ? (
          <div className="empty-text">Type something below to start. </div>
        ) : null}
        {/* content */}
        <div className="chat-content">
          <div className="chat-content-inner">
            {chatHistory.map((message, index) => (
              <ChatItem
                key={index}
                title={message.role}
                content={message.content}
                shouldScrollIntoView={
                  chatHistory.length - 1 === index ? true : false
                }
              />
            ))}
            {chatBoxStatus === "pending" ? <BotPendingItem /> : null}
          </div>
        </div>
      </div>
      <ChatBox status={chatBoxStatus} onSubmit={handleUserInput} />
    </div>
  )
}
