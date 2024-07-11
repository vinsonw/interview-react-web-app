import { useState } from "react"
import { localStorageApiKey } from "../constants"
import { getStreamingResponseFromBot, RequestToBot } from "../utils"

export const useResponseStreamingText: () => {
  isPending: boolean
  isStreamingFinished: boolean
  streamingResponseText: string
  request: (options: RequestToBot) => void
} = () => {
  const [isPending, setIsPending] = useState(false)
  const [isStreamingFinished, setIsStreamingFinished] = useState(true)
  const [streamingResponseText, setStreamingResponseText] = useState("")

  const request = async ({
    content,
    apiKey = localStorage.getItem(localStorageApiKey)!,
    chatHistory = [{ role: "user", content }],
  }: RequestToBot) => {
    getStreamingResponseFromBot({
      content,
      apiKey,
      chatHistory,
      setStreamingResponseText,
      setIsPending,
      setIsStreamingFinished,
    })
  }

  return {
    isPending,
    isStreamingFinished,
    streamingResponseText,
    request,
  }
}
