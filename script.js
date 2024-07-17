// ==UserScript==
// @name         Substance Asset Page Auto Select and Downloader
// @website      https://github.com/cpawliuk/Substance-Asset-Page-Auto-Select-And-Downloader
// @version      1.0
// @description  Simple script to auto select the GLB download option
// @author       Christopher Pawliuk
// @match        *://substance3d.adobe.com/assets*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=adobe.com
// @grant        none
// ==/UserScript==

window.setTimeout = window.setTimeout.bind(window);
window.setInterval = window.setInterval.bind(window);

window.downloadFile = false; // Set to True if you want to auto download.
window.ToggleDownload = () => {
    window.downloadFile = !window.downloadFile;
    document.getElementById("auto-dl-text").textContent = window.downloadFile ? "Enabled" : "Disabled";
    document.getElementById("toggle-button").textContent = window.downloadFile ? "Off" : "On";
};

addEventListener("load", setTimeout(SelectGLB, 3000)); // Set the timeout higher if needed due to the client side delay in loading the components.

function DownloadFile() {
    document.querySelector(".spectrum-SplitButton-action").click();
}

function SelectGLB() {
    const newElement = document.createElement("div");
    newElement.id = "script-ui";
    newElement.style.color = "white";
    newElement.style.backgroundColor = "black";
    newElement.innerHTML = `<b>Running GLS Auto Select Script - Auto Download is: <span id=auto-dl-text>${window.downloadFile ? "Enabled" : "Disabled"}</span> -> Toggle: </b><button id="toggle-button" onClick="window.ToggleDownload()">${window.downloadFile ? "Off" : "On"}</button>`;
    document.getElementById("root").prepend(newElement);

    try {
        document.querySelector(".spectrum-SplitButton-trigger").click();
        document.querySelector(".spectrum-Menu-item").nextElementSibling.click();

        window.downloadFile ? DownloadFile() : null;
    } catch (e) {
        console.log(`Script Error: ${e}`);
    }

    // Script will continue to call the function every 3000 ms due to React being used for the site.
    // Only if GLB isn't already selected.
    setInterval(() => {
        try {
            if (document.querySelector(".spectrum-SplitButton-action").textContent !== "Download (GLB)") {
                document.querySelector(".spectrum-SplitButton-trigger").click();
                document.querySelector(".spectrum-Menu-item").nextElementSibling.click();

                window.downloadFile ? DownloadFile() : null;
            }
        } catch (e) {
            console.log(`Script Error: ${e}`);
        }
    }, 3000);
}