import { setStoredCities } from "../utilities/storage"

// TODO: background script
chrome.runtime.onInstalled.addListener(() => {
  // TODO: on installed function
  setStoredCities([])
})
