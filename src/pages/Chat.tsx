import "./Chat.scss"
import { useEffect, useRef, useState } from "react"
import { ResponseMessage } from "../utils"
import {
  useRedirectWhenApiKeyIsInValid,
  useResponseStreamingText,
} from "../hooks"
import ChatBox from "../components/ChatBox"
import ChatItem, { BotPendingItem } from "../components/ChatItem"
import ChatHeader from "../components/ChatHeader"

export function Chat() {
  // check if api key is valid on mount
  useRedirectWhenApiKeyIsInValid()

  const [chatHistory, setChatHistory] = useState<ResponseMessage[]>([])
  const { isPending, isStreamingFinished, request, streamingResponseText } =
    useResponseStreamingText()
  const streamingBoxElRef = useRef<HTMLDivElement | null>(null)

  // waiting time = pending time + streaming time
  const isWaitingForResponseToComplete = isPending || !isStreamingFinished

  const handleUserInput = async (content: string) => {
    // update ui immediately
    const newChatHistory: ResponseMessage[] = [
      ...chatHistory,
      { role: "user", content },
    ]
    setChatHistory(newChatHistory)

    // request new response
    request({
      content,
      chatHistory: newChatHistory,
    })
  }

  // update context
  useEffect(() => {
    if (!isPending && isStreamingFinished && streamingResponseText) {
      setChatHistory((history) =>
        history.concat([{ role: "assistant", content: streamingResponseText }])
      )
    }
  }, [isPending, isStreamingFinished, streamingResponseText])

  // update position of streaming chat item
  useEffect(() => {
    let rafPending = 0
    const update = () => {
      if (streamingBoxElRef.current && !isStreamingFinished) {
        streamingBoxElRef.current.scrollIntoView(false)
      }
      rafPending = requestAnimationFrame(update)
    }
    rafPending = requestAnimationFrame(update)
    return () => window.cancelAnimationFrame(rafPending)
  }, [isStreamingFinished])

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
            {/* streaming chat item */}
            {isWaitingForResponseToComplete ? (
              <BotPendingItem
                ref={streamingBoxElRef}
                text={streamingResponseText ? streamingResponseText : "..."}
              />
            ) : null}
          </div>
        </div>
      </div>
      {/* chat box */}
      <div className="chat-box-wrapper">
        <ChatBox
          status={isWaitingForResponseToComplete ? "pending" : "idle"}
          onSubmit={handleUserInput}
        />
      </div>
    </div>
  )
}
