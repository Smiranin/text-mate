// popup.js

// Load saved settings on popup open
chrome.storage.local.get(['grammarCheckEnabled'], function (result) {
    document.getElementById('enableGrammarCheck').checked = result.grammarCheckEnabled || false;
});

// Save settings when the button is clicked
document.getElementById('saveSettingsBtn').addEventListener('click', function () {
    const isEnabled = document.getElementById('enableGrammarCheck').checked;

    // Save the setting in chrome.storage
    chrome.storage.local.set({ grammarCheckEnabled: isEnabled }, function () {
        console.log('Settings saved');
        alert('Settings saved!');
    });
});
