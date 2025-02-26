chrome.runtime.onInstalled.addListener(() => {
    const fontMenuId = chrome.contextMenus.create({
      id: "changeFont",
      title: "Change Font",
      contexts: ["page"], // Show on the whole page
    });
  
    const fontOptions = [
      { title: "Arial", fontFamily: "Arial, sans-serif" },
      { title: "Times New Roman", fontFamily: "'Times New Roman', serif" },
      { title: "Courier New", fontFamily: "'Courier New', monospace" },
      { title: "Cursive", fontFamily: "cursive" }, // Added cursive
      { title: "Verdana", fontFamily: "Verdana, sans-serif"}
    ];
  
    fontOptions.forEach((option) => {
      chrome.contextMenus.create({
        parentId: fontMenuId,
        id: `font-${option.fontFamily}`,
        title: option.title,
        contexts: ["page"],
      });
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId.startsWith("font-")) {
      const fontFamily = info.menuItemId.replace("font-", "");
      chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        css: `body { font-family: ${fontFamily} !important; }`,
      });
    }
  });