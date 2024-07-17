// ==UserScript==
// @name         Substance Asset Page GLB Auto Select
// @website      https://github.com/cpawliuk/Substance-Asset-Page-GLB-Auto-Select
// @version      2024-07-17
// @description  Simple script to auto select the GLB download option
// @author       Christopher Pawliuk
// @match        *://substance3d.adobe.com/assets/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=adobe.com
// @grant        none
// ==/UserScript==

window.setTimeout = window.setTimeout.bind(window);
window.setInterval = window.setInterval.bind(window);

const downloadFile = false; // Set to True if you want to auto download.

addEventListener("load", setTimeout(SelectGLB, 3000)); // Set the timeout higher if needed due to the client side delay in loading the components.

function DownloadFile() {
    document.getElementsByClassName("spectrum-SplitButton-action")[0].click();
}

function SelectGLB() {
    document.getElementsByClassName("spectrum-SplitButton-trigger")[0].click();
    document.getElementsByClassName("spectrum-Menu-item")[1].click();
    downloadFile ? DownloadFile() : null;

    // Script will continue to call the function every 3000 ms due to React being used for the site.
    // Only if GLB isn't already selected.
    setInterval(() => {
        if (document.getElementsByClassName("spectrum-SplitButton-action")[0].firstChild.textContent !== "Download (GLB)") {
            document.getElementsByClassName("spectrum-SplitButton-trigger")[0].click();
            document.getElementsByClassName("spectrum-Menu-item")[1].click();

            downloadFile ? DownloadFile() : null;
        }
    }, 3000);
}