import "./ApiInput.scss"
import { useState } from "react"
import ConfigurableButton from "../components/ConfigurableButton"
import ConfigurableInput from "../components/ConfigurableInput"
import { isValidApiKey } from "../utils"
import { useNavigate } from "react-router-dom"

export default function ApiInput() {
  const [apiKey, setApiKey] = useState<string>(
    // TODO reset this to empty string later
    import.meta.env.VITE_OPENROUTER_API_KEY
  )
  const navigate = useNavigate()

  const [isPending, setIsPending] = useState(false)
  const [hasErred, setHasErred] = useState(false)
  const handleSubmit = async () => {
    setIsPending(true)
    setHasErred(false)
    if (await isValidApiKey({ apiKey: apiKey! })) {
      navigate("/")
      setIsPending(false)
    } else {
      setHasErred(true)
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
              onChange={(e) => {
                setApiKey(e.target.value)
              }}
            />
          </div>
          <div className="error">
            {hasErred ? "invalid api key, try again" : null}
          </div>

          <div className="button-wrapper">
            <ConfigurableButton
              disabled={!apiKey || isPending}
              onClick={handleSubmit}
            >
              {isPending ? "Checking key" : "Stat chatting"}
            </ConfigurableButton>
          </div>
        </div>
      </div>
    </>
  )
}
