import { useEffect } from "react"
import { localStorageApiKey } from "../constants"
import { useNavigate } from "react-router-dom"
import { isValidApiKey } from "../utils"

export const useRedirectWhenApiKeyIsInValid = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const apiKey = localStorage.getItem(localStorageApiKey)
    if (!apiKey) return navigate("/")

    isValidApiKey({ apiKey: apiKey! }).then((isValid) => {
      if (!isValid) {
        navigate("/")
      }
    })
  }, [])
}
