let rootEl;
let dropdown;
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
    if (rootEl) rootEl.remove();

    rootEl = document.createElement('div');
    rootEl.id = 'grammarIcon';
    rootEl.style.left = `${rect.right + window.scrollX + 10}px`;
    rootEl.style.top = `${rect.top + window.scrollY}px`;
    document.body.appendChild(rootEl);

    rootEl.addEventListener('click', showDropdown);
}

function showDropdown() {
    dropdown = document.createElement('div');
    dropdown.id = 'grammarDropdown';
    dropdown.style.position = 'absolute';
    dropdown.style.left = rootEl.style.left;
    dropdown.style.top = `${parseInt(rootEl.style.top) + 30}px`;
    dropdown.style.background = '#fff';
    dropdown.style.border = '1px solid #ccc';
    dropdown.style.padding = '5px';
    fixOption.innerText = 'Fix Grammar';

    const fixOption = document.createElement('div');
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

function handleOutsideClick(event) {
    const tartget = event.target;
    if (!dropdown.contains(event.target)) {
        dropdown.remove();
        document.removeEventListener('click', handler);
    }
}

function cleanUp() { }

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
