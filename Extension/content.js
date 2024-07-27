const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = '.pdf,.doc,.pptx,.txt';
fileInput.style.position = 'fixed';
fileInput.style.bottom = '10px';
fileInput.style.right = '10px';
fileInput.style.zIndex = '9999';

document.body.appendChild(fileInput);

fileInput.addEventListener('change', function() {
  const files = this.files;
  // Handle file selection here
  console.log(files);
});
