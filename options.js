// Load the saved API key when the options page is opened
chrome.storage.sync.get(['apiKey'], function(result) {
    let apiKey = result.apiKey;
    if (apiKey) {
      document.getElementById('apiKey').value = apiKey;
    }
  });
  
  // Save the API key when the Save button is clicked
  document.getElementById('saveButton').addEventListener('click', function() {
    let apiKey = document.getElementById('apiKey').value;
    // Validate the API key
    if (apiKey && apiKey.length === 64) {
      // Save the API key to Chrome storage
      chrome.storage.sync.set({apiKey: apiKey}, function() {
        // Display a success message
        let messageDiv = document.getElementById('message');
        messageDiv.innerHTML = 'API key saved successfully.';
        messageDiv.className = 'success';
      });
    } else {
      // Display an error message
      let messageDiv = document.getElementById('message');
      messageDiv.innerHTML = 'Please enter a valid API key.';
      messageDiv.className = 'error';
    }
  });
  