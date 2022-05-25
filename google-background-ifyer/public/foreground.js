/* global chrome*/
chrome.storage.sync.get("manuscript", (obj) => {
  console.log(obj);
  document.body.style.backgroundImage = `url(${obj.manuscript.urls.regular})`;
});
