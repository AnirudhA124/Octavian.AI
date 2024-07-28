function sendMessage() {
  const userInput = document.getElementById('textbox');
  const chatContainer = document.querySelector('.options');
  const userMessage = userInput.value.trim();

  if (userMessage) {
    // Create a new container for the user question
    const userQuestionDiv = document.createElement('div');
    userQuestionDiv.classList.add('container1');
    userQuestionDiv.innerHTML = `
      <div class="logou"></div>
      <div>${userMessage}</div>`;
    chatContainer.appendChild(userQuestionDiv);
    userInput.value = '';

    // Scroll to the bottom of the chat container
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Send message to server
    fetch('http://127.0.0.1:8000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    })
    .then(response => response.json())
    .then(data => {
      // Create a new container for the bot response
      const botResponseDiv = document.createElement('div');
      botResponseDiv.classList.add('container2');
      botResponseDiv.innerHTML = `
        <div class="logoc"></div>
        <div>${data.response}</div>`;
      chatContainer.appendChild(botResponseDiv);

      // Scroll to the bottom of the chat container
      chatContainer.scrollTop = chatContainer.scrollHeight;
    })
    .catch(error => {
      console.error('Error:', error);
      const errorDiv = document.createElement('div');
      errorDiv.classList.add('container2');
      errorDiv.innerHTML = `
        <div class="logoc"></div>
        <div>Sorry, there was an error processing your request.</div>`;
      chatContainer.appendChild(errorDiv);
    });
  } else {
    console.log('Message is empty');
  }
}

// Allow sending message with Enter key
document.getElementById('textbox').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});

// Allow sending message with click on send icon
document.getElementById('sendButton').addEventListener('click', function() {
  sendMessage();
});
