chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "getFontFamilies",
      title: "Get Font Families",
      contexts: ["selection"],
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "getFontFamilies") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getFontFamilies,
      });
    }
  });
  
  function getFontFamilies() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const fontFamilies = new Set();
  
      function traverse(node) {
        if (range.intersectsNode(node)) {
          console.log("Processing node:", node);
  
          let element = null;
          if (node.nodeType === Node.ELEMENT_NODE) {
            element = node;
          } else if (node.nodeType === Node.TEXT_NODE && node.parentElement) {
            // If it's a text node, check its parent
            element = node.parentElement;
          }
  
          if (element) {
            const style = window.getComputedStyle(element);
            const fontFamily = style.fontFamily;
            console.log("Font family:", fontFamily);
            if (fontFamily) {
              fontFamilies.add(fontFamily);
            }
          }
  
          if (node.hasChildNodes()) {
            node.childNodes.forEach(traverse);
          }
        }
      }
  
      traverse(range.commonAncestorContainer);
  
      const fontFamiliesArray = Array.from(fontFamilies);
      alert("Font Families: " + fontFamiliesArray.join(", "));
    }
  }