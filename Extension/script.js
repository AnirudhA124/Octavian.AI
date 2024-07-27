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
      // Call the function to upload the file when file is selected
      sendButton.addEventListener('click', function() {
        uploadFile(file);
      });
    }
  });

  function uploadFile(file) {
    const formData = new FormData();
    const question = textbox.value;

    if (!question) {
      alert('Please enter a question.');
      return;
    }

    formData.append('file', file);
    formData.append('question', question);

    fetch('http://127.0.0.1:5000/upload', {  // URL of your Flask backend
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log('File uploaded successfully:', data);
      // You can handle the response here, such as displaying the response to the user
    })
    .catch(error => {
      console.error('Error uploading file:', error);
    });
  }
});
