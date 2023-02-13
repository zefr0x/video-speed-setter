document.getElementById("source").textContent =
    browser.i18n.getMessage("source");
document.getElementById("author").textContent =
    browser.i18n.getMessage("author");
document.getElementsByTagName("title")[0].textContent =
    browser.i18n.getMessage("extensionName");

document
    .getElementsByTagName("html")[0]
    .setAttribute("lang", browser.i18n.getUILanguage());

["keyup", "change"].forEach((event) =>
    document
        .getElementById("speedInput")
        .addEventListener(event, applyPlayBackRateForCurrentTab),
);

async function applyPlayBackRateForCurrentTab() {
    let tab = await browser.tabs
        .query({ active: true, windowId: browser.windows.WINDOW_ID_CURRENT })
        .then((tabs) => browser.tabs.get(tabs[0].id))
        .then();

    try {
        browser.scripting
            .executeScript({
                target: {
                    tabId: tab.id,
                },
                injectImmediately: true,
                args: [document.getElementById("speedInput").value],
                func: (rate) => {
                    document
                        .querySelectorAll("video")
                        .forEach((video) => (video.playbackRate = rate));
                },
            })
            .then();
    } catch (err) {
        console.error(
            `can't apply playback rate, failed to execute script: ${err}`,
        );
    }
}
