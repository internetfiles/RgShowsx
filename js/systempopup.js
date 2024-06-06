const popup = new Popup({
    id: "board",
    titleColor: "#FFFFFF",
    textColor: "#FFFFFF",
    closeColor: "#FFFFFF",
    title: "Uh Oh!",
    backgroundColor: "#8A2BE2",
    fontSizeMultiplier: 1.3,
    content: `
    This board name is already taken!
    Try picking a different one.
    {btn-ok}[Okay]`,
    borderWidth: ".15em",
    borderColor: "#FFFFFF",
    textShadow: "0 0 .3em #000000bb",
    css: `
    .popup.board button {
        border: 2px solid white;
        background-color: transparent;
        color: white;
        filter: drop-shadow(0 0 .2em #000000bb);
        margin-top: 1em;
    }`,
    loadCallback: () => {
        /* button functionality */
        document
            .querySelector(".popup.board button")
            .addEventListener("click", () => {
                popup.hide();
            });
    },
});
