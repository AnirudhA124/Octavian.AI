document.addEventListener('DOMContentLoaded', function() {
    const userQuestion = localStorage.getItem('userQuestion');
    const serverResponse = localStorage.getItem('serverResponse');
  
    if (userQuestion && serverResponse) {
      const chatContainer = document.querySelector('.options');
  
      // Display user question
      const userChat = document.createElement('div');
      userChat.classList.add('container1');
      userChat.innerHTML = `<div class="userchat"><div class="logou"></div><div>${userQuestion}</div></div>`;
      chatContainer.appendChild(userChat);
  
      // Display server response
      const botResponse = document.createElement('div');
      botResponse.classList.add('container2');
      botResponse.innerHTML = `<div class="botchat"><div class="logoc"></div><div>${serverResponse}</div></div>`;
      chatContainer.appendChild(botResponse);
    }
  });
  