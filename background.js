
/* No need to edit anything in this file */

function loadInjectedCSS(event, path) {
    // Try to get the contents of the stylesheet.
    var req = new XMLHttpRequest();
    req.open('GET', path, false);
    req.send();
    
    // Error check for reading the stylesheet.
    if (!req.responseText) {
        opera.postError('EXTENSION ERROR: Can\'t read ' + path);
        return;
    }
    
    // Send the contents of the stylesheet to the injected script.
    event.source.postMessage({
        topic: 'LoadedInjectedCSS',
        data: {
            css: req.responseText,
            path: path
        }
    });
}

function onMessage(event) {
    var message = event.data;
    // Check the correct message has been received and send the stylesheet path to loadInjectedCSS().
    if (message.topic == 'LoadInjectedCSS') {
        var path = message.data;
        loadInjectedCSS(event, path);
    }
}

window.addEventListener('DOMContentLoaded', function() {
    // On receipt of a message from the injected script, execute onMessage().
    opera.extension.onmessage = onMessage;
}, false);

