document.addEventListener('DOMContentLoaded', function() {
  const clickToUpload = document.getElementById('clickToUpload');
  const fileInput = document.getElementById('fileInput');
  const fileInfo = document.getElementById('fileInfo');
  const textbox = document.getElementById('textbox');
  const sendButton = document.getElementById('sendButton');

  clickToUpload.addEventListener('click', function() {
    fileInput.click();
  });

  fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      fileInfo.textContent = `Selected file: ${file.name}`;
      // Here you would typically process the file or prepare it for upload
    }
  });

  sendButton.addEventListener('click', function() {
    const message = textbox.value.trim();
    if (message) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', message);
      textbox.value = ''; // Clear the textbox after sending
    }
  });
});