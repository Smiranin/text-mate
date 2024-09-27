let rootEl;
let contentEl;
let currentText = "";

function init() {
    rootEl = document.createElement("div");
    rootEl.classList.add("container");

    let btn = document.createElement("button");
    btn.classList.add("icon-wrapper");
    btn.innerHTML = `<img src="icon16.png" width="16" height="16" alt="">`;

    contentEl = document.createElement("div");
    contentEl.classList.add("content");

    rootEl.appendChild(btn);
    rootEl.appendChild(contentEl);


    btn.addEventListener("click", () => {
        contentEl.textContent = currentText;
    });
}

function cleanUp() {
    contentEl.textContent = "";
    currentText = "";
    rootEl.remove();
    document.removeEventListener('click', handleOutsideClick);
}


// //TODO: Check Event model
document.addEventListener('mouseup', function () {
    let test = window.getSelection();
    const selectedText = window.getSelection().toString().trim();
    const target = event.target;
    if (selectedText.length > 0) {
        const rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
        currentText = selectedText;
        contentEl.textContent = selectedText;
        showLauncher(rect);
    }
});

function showLauncher(rect) {
    if (rootEl) rootEl.remove();

    rootEl.style.left = `${rect.right + window.scrollX + 10}px`;
    rootEl.style.top = `${rect.top + window.scrollY}px`;
    document.body.appendChild(rootEl);

    setTimeout(() => {
        document.addEventListener("click", handleOutsideClick, true);

    });
}

function handleOutsideClick(event) {
    const tartget = event.target;
    if (!rootEl.contains(event.target) && rootEl !== tartget) {
        cleanUp();
    }
}

init();
