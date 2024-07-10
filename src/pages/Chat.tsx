import "./Chat.scss"

import { useState } from "react"
import { getResponseFromBot, ResponseMessage } from "../utils"
import ChatBox from "../components/ChatBox"
import ChatItem from "../components/ChatItem"

export default function Chat() {
  const [chatHistory, setChatHistory] = useState<ResponseMessage[]>([])
  const handleUserInput = async (content: string) => {
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
  }

  return (
    <div className="chat-page-wrapper">
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <ChatItem
            key={index}
            title={message.role}
            content={message.content}
          />
        ))}
      </div>
      <ChatBox onSubmit={handleUserInput} />
    </div>
  )
}
