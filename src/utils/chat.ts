import { localStorageApiKey } from "../constants"

export type RequestToBot = {
  role?: string
  content: string
  chatHistory?: ResponseMessage[]
  apiKey?: string
}

export type ResponseMessage = {
  content: string
  role: string
}

// type ResponseFromBot = {
//   choices: { index: number; finish_reason: any; message: ResponseMessage }[]
//   created: number
//   id: string
//   model: string
//   object: string
//   usage: any
// }

// type StreamingResponseFromBot = {
//   choices: { index: number; finish_reason: any; delta: ResponseMessage }[]
//   created: number
//   id: string
//   model: string
//   object: string
//   usage: any
// }

const getReaderText = (str: string) => {
  let matchStr = ""
  try {
    let result = str.match(/data:\s*({.*?})\s*\n/g) as string[]
    if (!result) return ""
    result.forEach((_) => {
      const matchStrItem = _.match(/data:\s*({.*?})\s*\n/)![1]
      const data = JSON.parse(matchStrItem)
      matchStr += data.choices[0].delta.content || ""
    })
  } catch (e) {
    console.log(e)
  }
  return matchStr
}

export const getStreamingResponseFromBot = async ({
  content,
  apiKey = localStorage.getItem(localStorageApiKey)!,
  chatHistory = [{ role: "user", content }],
  setStreamingResponseText = () => {},
  setIsPending = () => {},
  setIsStreamingFinished = () => {},
}: RequestToBot & {
  setStreamingResponseText?: (cb: (prev: string) => string) => void
  setIsPending?: (isPending: boolean) => void
  setIsStreamingFinished?: (isPending: boolean) => void
}) => {
  try {
    if (!content) return
    // clean up last response
    setStreamingResponseText(() => "")
    setIsPending(true)
    setIsStreamingFinished(false)

    const res: Response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": `${import.meta.env.VITE_YOUR_SITE_URL}`, // Optional, for including your app on openrouter.ai rankings.
          "X-Title": `${import.meta.env.VITE_YOUR_SITE_NAME}`, // Optional. Shows in rankings on openrouter.ai.
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct:free",
          messages: chatHistory,
          // enable streaming response
          stream: true,
        }),
      }
    ).then((res) => {
      if (res.status !== 200) {
        throw new Error("Unauthorized")
      }
      return res
    })

    setIsPending(false)

    const reader = res.body!.getReader()
    const decoder = new TextDecoder("utf-8")
    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        console.log("***********************done")
        setIsStreamingFinished(true)
        break
      }
      const decodedText = decoder.decode(value)
      console.log("--streaming response")
      setStreamingResponseText((str) => str + getReaderText(decodedText))
    }
  } catch (e) {
    throw e
  }
}

export const isValidApiKey = async ({ apiKey }: { apiKey: string }) => {
  try {
    await getStreamingResponseFromBot({
      // the content does not matter as long as
      // the bot returns something
      content: "hello",
      apiKey,
    })
    return true
  } catch (e) {
    return false
  }
}
