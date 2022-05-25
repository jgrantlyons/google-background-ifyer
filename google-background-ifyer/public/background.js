/* global chrome */
// async function getCurrentTab() {
//   let queryOptions = { active: true, currentWindow: true };
//   let [tab] = await chrome.tabs.query(queryOptions);
//   return tab;
// }

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  message = JSON.parse(message);
  console.log("sender " + sender.id);
  if (message[0] === "search-term") {
    chrome.windows.getCurrent((w) => {
      chrome.tabs.query({ active: true, windowId: w.id }, (tabs) => {
        console.log(tabs[0].id);
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ["foreground.js"],
        });
      });
    });
  }
  sendResponse({ res: "request sent to foreground from background" });
});
