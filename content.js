let grammarIcon;
//TODO: Check Event model
document.addEventListener('selectionchange', function () {
    let test = window.getSelection();
    const selectedText = window.getSelection().toString().trim();
    const target = event.target;
    if (selectedText.length > 0) {
        const rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
        showGrammarIcon(rect);
    } else {
        // if (grammarIcon) grammarIcon.remove();
    }
});

function showGrammarIcon(rect) {
    if (grammarIcon) grammarIcon.remove();

    grammarIcon = document.createElement('div');
    grammarIcon.id = 'grammarIcon';
    grammarIcon.style.left = `${rect.right + window.scrollX + 10}px`;
    grammarIcon.style.top = `${rect.top + window.scrollY}px`;
    document.body.appendChild(grammarIcon);

    debugger;
    grammarIcon.addEventListener('click', showDropdown);
}

function showDropdown() {
    debugger;
    const dropdown = document.createElement('div');
    dropdown.id = 'grammarDropdown';
    dropdown.style.position = 'absolute';
    dropdown.style.left = grammarIcon.style.left;
    dropdown.style.top = `${parseInt(grammarIcon.style.top) + 30}px`;
    dropdown.style.background = '#fff';
    dropdown.style.border = '1px solid #ccc';
    dropdown.style.padding = '5px';

    const fixOption = document.createElement('div');
    fixOption.innerText = 'Fix Grammar';
    fixOption.style.cursor = 'pointer';
    fixOption.style.color = 'red';
    fixOption.addEventListener('click', () => fixGrammar(window.getSelection().toString().trim()));

    dropdown.appendChild(fixOption);
    document.body.appendChild(dropdown);

    document.addEventListener('click', function handler(event) {
        // if (!dropdown.contains(event.target)) {
        //     dropdown.remove();
        //     document.removeEventListener('click', handler);
        // }
    });

    debugger;
}

function fixGrammar(selectedText) {
    replaceSelectedText("Test Text");

    // fetch('https://your-server.com/grammar-check', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ text: selectedText })
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         const correctedText = data.correctedText;
    //         replaceSelectedText(correctedText);
    //     })
    //     .catch(error => console.error('Error:', error));
}

function replaceSelectedText(newText) {
    const range = window.getSelection().getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(newText));
}
