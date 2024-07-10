import { useState } from "react"
import { getResponseFromBot } from "./utils"

function App() {
  const [youContent, setYouContent] = useState("")
  const [botContent, setBotContent] = useState("")
  const handleClick = async () => {
    const res = await getResponseFromBot({ content: youContent })
    if (!res) return console.error("res is null")
    console.log("res", res)
    setBotContent(res.choices[0].message.content)
  }

  return (
    <>
      <input
        value={youContent}
        onChange={(e) => setYouContent(e.target.value)}
      />
      <button onClick={handleClick}>submit</button>
      <div>{botContent}</div>
    </>
  )
}

export default App
