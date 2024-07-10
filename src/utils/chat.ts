type RequestToBot = {
  role?: string
  content: string
  chatHistory?: ResponseMessage[]
  apiKey?: string
}

export type ResponseMessage = {
  content: string
  role: string
}

type ResponseFromBot = {
  choices: { index: number; finish_reason: any; message: ResponseMessage }[]
  created: number
  id: string
  model: string
  object: string
  usage: any
}

export const getResponseFromBot = async ({
  content,
  chatHistory = [{ role: "user", content }],
  apiKey = import.meta.env.VITE_OPENROUTER_API_KEY,
}: RequestToBot): Promise<ResponseFromBot | null> => {
  if (!content) return null

  try {
    const res: ResponseFromBot = await fetch(
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
        }),
      }
    ).then((res) => res.json())

    return res
  } catch (e) {
    throw e
  }
}

export const isValidApiKey = async ({ apiKey }: { apiKey: string }) => {
  try {
    await getResponseFromBot({
      content: "hello",
      apiKey,
    })
    return true
  } catch (e) {
    return false
  }
}
