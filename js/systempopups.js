const popup = new Popup({
    id: "howtouse",
    title: "How to use RgShows?",
    content: `Make sure to read guide of RgShows, before using it at your own :), btw u got no choice u have to read it ;)
        custom-space-out big-margin§{btn-refuse-override}[YES, TAKE ME THERE]{btn-accept-override}[NO, TAKE ME THERE]`,
    sideMargin: "2.9vw",
    titleColor: "#fff",
    textColor: "#fff",
    backgroundColor: "#222",
    closeColor: "#fff",
    fontSizeMultiplier: 1.2,
    linkColor: "#888",
    allowClose: false,
    showOnce: true,
    css: `
    .popup.override .custom-space-out {
        display: flex;
        justify-content: center;
        gap: 1.5em;
    }`,
    loadCallback: () => {
        /* button functionality */
        document.querySelector(".popup.board button.refuse-override").onclick =
            () => {
                popup.hide();
                window.location.href = './issues.html';
            };

        document.querySelector(".popup.board button.accept-override").onclick =
            () => {
                popup.hide();
                window.location.href = './issues.html';
            };
    },
});
