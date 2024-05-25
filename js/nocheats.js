function addNoCheatListeners(doc) {
    doc.oncontextmenu = () => {
        alert("Pls dont try to steal the codes Restricted By Rishab");
        return false;
    };

    doc.onkeydown = e => {
        if (e.key === "F12") {
            alert("Pls dont try to steal the codes Restricted By Rishab");
            return false;
        }
        if ((e.ctrlKey && e.key === "u") || (e.ctrlKey && e.key === "U")) {
            alert("Pls dont try to steal the codes Restricted By Rishab");
            return false;
        }
        if ((e.ctrlKey && e.shiftKey && e.key === "J") || (e.ctrlKey && e.key === "j")) {
            alert("Pls dont try to steal the codes Restricted By Rishab");
            return false;
        }
        if ((e.ctrlKey && e.shiftKey && e.key === "C") || (e.ctrlKey && e.key === "c")) {
            alert("Pls dont try to steal the codes Restricted By Rishab");
            return false;
        }
        if ((e.ctrlKey && e.shiftKey && e.key === "I") || (e.ctrlKey && e.key === "i")) {
            alert("Pls dont try to steal the codes Restricted By Rishab");
            return false;
        }
    };

    doc.addEventListener('keydown', function(e) {
        if ((e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.shiftKey && e.key === 'i')) {
            alert("Pls dont try to steal the codes Restricted By Rishab");
            e.preventDefault();
            return false;
        }
    });
}

function addListenersToIframes() {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            addNoCheatListeners(iframeDoc);
        } catch (e) {
            console.error('Could not access iframe document:', e);
        }
    });
}

addNoCheatListeners(document);
addListenersToIframes();

// Re-apply listeners to iframes periodically to catch dynamically added iframes
setInterval(addListenersToIframes, 1000);
