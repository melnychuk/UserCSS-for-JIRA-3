// ==UserScript==
// @include https://bugs.opera.com/*
// ==/UserScript==

window.addEventListener('load', function() {
    
    // Specify the path to the stylesheet here:
    var path = 'styles/style.css';
    
    /* No need to change anything below this line */
    
    // Error check for the stylesheet filename.
    if (!path) {
        opera.postError('EXTENSION ERROR: No CSS file has been specified');
        return;
    }
    
    var onCSS = function(event) {
        var message = event.data;
        
        // Check this is the correct message and path from the background script.
        if (message.topic === 'LoadedInjectedCSS' && message.data.path === path) {
            // Remove the message listener so it doesn't get called again.
            opera.extension.removeEventListener('message', onCSS, false);
            
            var css = message.data.css;

            // Create a <style> element and add it to the <head> element of the current page.
            // Insert the contents of the stylesheet into the <style> element.
            var style = document.createElement('style');
            style.setAttribute('type', 'text/css');            
            style.appendChild(document.createTextNode(css));
            document.getElementsByTagName('head')[0].appendChild(style);
        }
    }

    // On receipt of a message from the background script, execute onCSS().
    opera.extension.addEventListener('message', onCSS, false);
    
    // Send the stylesheet path to the background script to get the CSS.
    opera.extension.postMessage({
        topic: 'LoadInjectedCSS',
        data: path
    });
}, false);
