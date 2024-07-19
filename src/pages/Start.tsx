import "./Start.scss"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ConfigurableButton from "../components/ConfigurableButton"
import ConfigurableInput from "../components/ConfigurableInput"
import { isValidApiKey } from "../utils"
import { localStorageApiKey } from "../constants"

export function Start() {
  const [apiKey, setApiKey] = useState<string>(
    // only for test purpose
    import.meta.env.VITE_OPENROUTER_API_KEY || ""
  )
  const navigate = useNavigate()

  const [isPending, setIsPending] = useState(false)
  const [hasErred, setHasErred] = useState(false)
  const handleSubmit = async () => {
    // clean up
    setIsPending(true)
    setHasErred(false)

    // validate api key
    if (await isValidApiKey({ apiKey })) {
      localStorage.setItem(localStorageApiKey, apiKey)
      navigate("/chat")
    } else {
      localStorage.removeItem(localStorageApiKey)
      setHasErred(true)
      setIsPending(false)
    }
  }

  return (
    <>
      <div className="start-page-wrapper">
        <div className="start-page-inner">
          <div className="input-wrapper">
            <ConfigurableInput
              placeholder="Input a api key to start."
              value={apiKey}
              disabled={isPending}
              onChange={(e) => {
                setApiKey(e.target.value)
                setHasErred(false)
              }}
            />
          </div>
          <div className="button-wrapper">
            <ConfigurableButton
              disabled={!apiKey || isPending}
              onClick={handleSubmit}
            >
              {isPending ? "Checking key" : "Start chatting"}
            </ConfigurableButton>
          </div>
          <div className="error">
            {hasErred ? "invalid api key, try again" : null}
          </div>
        </div>
      </div>
    </>
  )
}
