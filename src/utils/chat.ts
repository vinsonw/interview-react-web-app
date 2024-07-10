type RequestToBot = {
  role?: string
  content: string
}

type ResponseMessage = {
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

const existingConversations: RequestToBot[] = []

export const getResponseFromBot = async ({
  role = "user",
  content,
}: RequestToBot): Promise<ResponseFromBot | null> => {
  if (!content) return null

  const res: ResponseFromBot = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "HTTP-Referer": `${import.meta.env.VITE_YOUR_SITE_URL}`, // Optional, for including your app on openrouter.ai rankings.
        "X-Title": `${import.meta.env.VITE_YOUR_SITE_NAME}`, // Optional. Shows in rankings on openrouter.ai.
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free",
        // preserve the context
        messages: [...existingConversations, { role, content }],
      }),
    }
  ).then((res) => res.json())

  // update context
  existingConversations.push(res.choices[0].message)

  return res
}
