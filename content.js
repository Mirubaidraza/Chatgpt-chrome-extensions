// Listen for a message from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'replaceText') {
      // Get all text nodes on the page
      let nodes = document.querySelectorAll('body, body *');
      for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        // Only replace text that is not inside a script, style, or iframe element
        if (node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE' && node.tagName !== 'IFRAME') {
          for (let j = 0; j < node.childNodes.length; j++) {
            let child = node.childNodes[j];
            if (child.nodeType === Node.TEXT_NODE) {
              // Replace the text with the output from the ChatGPT API
              let oldText = child.textContent;
              let newText = oldText.replace(request.oldText, request.newText);
              if (oldText !== newText) {
                let newNode = document.createElement('span');
                newNode.innerHTML = newText;
                node.replaceChild(newNode, child);
              }
            }
          }
        }
      }
    }
  });
  
  // Listen for user input on the page
  document.addEventListener('input', function(event) {
   let target = event.target;
    // Only send a message to the background script if the target is an input field or text area
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      // Send a message to the background script with the user input
      chrome.runtime.sendMessage({type: 'getPrediction', text: target.value}, function(response) {
        // Replace the input field or text area with the output from the ChatGPT API
        if (response && response.text) {
          chrome.runtime.sendMessage({type: 'replaceText', oldText: target.value, newText: response.text});
        }
      });
    }
  });
  