chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "fixGrammar",
        title: "Fix Grammar",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "fixGrammar") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: fixGrammarFromContextMenu,
            args: [info.selectionText]
        });
    }
});

function fixGrammarFromContextMenu(selectedText) {
    replaceSelectedText("Test Text");
    // Handle the text fixing similar to the content script
    // fetch('https://your-server.com/grammar-check', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ text: selectedText })
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         const correctedText = data.correctedText;
    //         replaceSelectedText(correctedText);
    //     });
}

function replaceSelectedText(newText) {
    const range = window.getSelection().getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(newText));
}
