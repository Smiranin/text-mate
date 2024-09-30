let rootEl;
let contentEl;
let currentText = "";

function init() {
    rootEl = document.createElement("div");
    rootEl.classList.add("tm-container");

    let btn = document.createElement("button");
    btn.classList.add("tm-icon-wrapper");
    btn.innerHTML = getIcon();

    contentEl = document.createElement("div");
    contentEl.classList.add("tm-content");

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


document.addEventListener('keydown', function (event) {
    if (!(event.altKey && event.shiftKey && event.key === 'F')) return;

    const selectedText = window.getSelection().toString().trim();
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

    document.addEventListener("click", handleOutsideClick);
}

function handleOutsideClick(event) {
    const tartget = event.target;
    if (!rootEl.contains(event.target) && rootEl !== tartget) {
        cleanUp();
    }
}

function getIcon() {
    return `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACa0lEQVR4nO2Y23LSQACG99YZ9QUEwqm2UHuApL6Jr1AfRG0L5WRBCpSSRO+8bitFTgLFEx5IufIV2it8gHWyG5INp1YgsNPJN/Pd7WS+fwPDDACYmJiMRdzqXLzd6sDJvbyVIjeowEl1MC2zjh0WKo7RoAGzDxWNGzC/WNHoAUaGikOVph8wr1BxhEYMaE0+eHyQyEktwwcInLR9u/P/f6MCKz03dIDASX/fPf3zcPz50R+Hm4Leezv3RbbdNWiA/MB26ubzkw+QEVgpI58TWCyYFvnXED2Qk654VloxeoDou/Tw/va1MqAG5s2o8JndqNGQscMEtCMMRLd1AtoR+oLNAfPmzr0Bnv0Neb8moB2eiCXN+X8hAe3wRGzONyignRwRe+z7qbmJBbRzTMSSZjd/IAHtZJVQ1Q29gHayROzRRmtAQDtHvdh1zcz6d1VAOxkiVucaFtBORglNr30bKqCddF9w6slXnYB2Un3BsoerX1QB7RwSscnVzzDp1XzjbdI/IIlimygW6ZG9gAlFQDsJIjax0oBxnXX6B8SV0PhyHR6o1pCvH9foH3CghGI/IWOyS7JV+gfElNCeUVl3RRXQSNjSvBdzV59F3ZVGLzSCLMOICxtGlmDYVWyFXOXtwHLjwaK7QXSp6gm7K+mIq9TtxWqhJRh2YkPOoqajCPcdH+G+vdANOgrpPabgWdiAkLN8TcbqQp1KqGLQUYBBOzZgP4cBBrvL5K8WOGAwFMWSoUrsHpPH2vJw1/YBuWM7gzvWs8V9L4LMeb3/VtVQRgtFsVYc+8p6irWcwpeWE/ji0cn8/8A1MblD/AMTE5CUxhJ2YAAAAABJRU5ErkJggg==">`
}

init();
