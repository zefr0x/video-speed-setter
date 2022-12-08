// Get settings from input and store them.
function storeSettings() {
    browser.storage.local.set({
        increaseAmount: document.getElementById("increaseAmount").value,
    });
}

function loadUI(restoredSettings) {
    // Load localization.
    document
        .querySelector("html")
        .setAttribute("lang", browser.i18n.getUILanguage());
    document.getElementById("increaseAmountLable").textContent =
        browser.i18n.getMessage("increaseAmountLable");
    document.getElementById("saveButton").textContent =
        browser.i18n.getMessage("saveButton");

    // and set value in the input if there was no stored one.
    const input = document.getElementById("increaseAmount");

    if (restoredSettings.increaseAmount === undefined) {
        input.value = 0.1;
    } else {
        input.value = restoredSettings.increaseAmount;
    }
}

browser.storage.local.get().then(loadUI);

document.getElementById("saveButton").addEventListener("click", storeSettings);
