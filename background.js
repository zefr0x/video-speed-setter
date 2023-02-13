function getIncreaseAmount(restoredSettings) {
    let increaseAmount = restoredSettings.increaseAmount;
    if (increaseAmount === undefined) {
        increaseAmount = 0.1;
    }
    return increaseAmount;
}

async function applyPlayBackRate(tab, amount) {
    try {
        browser.scripting
            .executeScript({
                target: {
                    tabId: tab.id,
                },
                injectImmediately: true,
                args: [amount],
                func: (amount) => {
                    document
                        .querySelectorAll("video")
                        .forEach((video) => (video.playbackRate += amount));
                },
            })
            .then();
    } catch (err) {
        console.error(
            `can't apply playback rate, failed to execute script: ${err}`,
        );
    }
}

browser.commands.onCommand.addListener(async function (command) {
    let tab = await browser.tabs
        .query({ active: true, windowId: browser.windows.WINDOW_ID_CURRENT })
        .then((tabs) => browser.tabs.get(tabs[0].id))
        .then();

    await browser.storage.local
        .get()
        .then(getIncreaseAmount)
        .then(function (increaseAmount) {
            if (command === "increase") {
                applyPlayBackRate(tab, +increaseAmount);
            } else if (command === "decrease") {
                applyPlayBackRate(tab, -increaseAmount);
            }
        });
});
