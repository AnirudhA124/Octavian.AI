document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('sendButton');
    const textbox = document.getElementById('textbox');
    const chatContainer = document.getElementById('chatContainer');

    sendButton.addEventListener('click', function() {
        const message = textbox.value.trim();
        if (message) {
            // Add user's message to chat
            addMessage(message, 'user');
            textbox.value = ''; // Clear the textbox

            // Simulate a bot response (for demonstration)
            setTimeout(() => {
                addMessage('This is a response from Octavian.', 'bot');
            }, 1000);
        }
    });

    function addMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to bottom
    }
});
