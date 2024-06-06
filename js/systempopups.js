const popup = new Popup({
    id: "override",
    title: "Data Conflict",
    content: `Your cloud data and local data are different. Which one do you want to use?
      custom-space-out big-margin§{btn-refuse-override}[Local Data]{btn-accept-override}[Cloud Data]`,
    sideMargin: "1.5em",
    fontSizeMultiplier: "1.2",
    backgroundColor: "#FFFEE3",
    allowClose: false,
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
                // user wants to use local data
            };

        document.querySelector(".popup.board button.accept-override").onclick =
            () => {
                popup.hide();
                // user wants to use cloud data
            };
    },
});
