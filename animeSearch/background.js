chrome.runtime.onInstalled.addListener((details) => {
  chrome.contextMenus.create({
    title: "Search on AnimeSearch",
    contexts: ["page", "selection"],
    id: "animeSearch",
  });
  chrome.contextMenus.create({
    title: "Search on aniwatch",
    contexts: ["page", "selection"],
    id: "aniwatch",
    parentId: "animeSearch",
  });
  chrome.contextMenus.onClicked.addListener((event) => {
    if (event.menuItemId === "animeSearch") {
      chrome.tabs.update({
        url: `https://animesearch.info/anime-list.html?search=${event.selectionText.replace(
          " ",
          "+"
        )}`,
      });
    } else if (event.menuItemId === "aniwatch") {
      chrome.tabs.update({
        url: `https://aniwatch.to/search?keyword=${event.selectionText.replace(
          " ",
          "+"
        )}`,
      });
    }
  });
});
