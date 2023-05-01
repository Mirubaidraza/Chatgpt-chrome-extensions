// Set up an event listener for when the submit button is clicked
document.getElementById('submitButton').addEventListener('click', function() {
    // Get the user input from the input field
    var userInput = document.getElementById('inputText').value;
  
    // Make a request to the ChatGPT API to generate output based on the user input
    // Replace 'YOUR_API_KEY' with your own API key
    fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: JSON.stringify({
        prompt: userInput,
        max_tokens: 100,
        temperature: 0.7,
        n: 1,
        stop: ['\n']
      })
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // Display the output from the ChatGPT API in the output div
      var outputDiv = document.getElementById('output');
      outputDiv.innerHTML = data.choices[0].text;
    })
    .catch(function(error) {
      console.log(error);
    });
  });
  