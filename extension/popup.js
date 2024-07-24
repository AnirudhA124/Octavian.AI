document.getElementById('uploadBtn').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
      alert('Please select an MP4 file.');
      return;
    }
    
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch('http://localhost:5000/transcribe', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      document.getElementById('transcription').textContent = data.transcription;
    } catch (error) {
      console.error('Error:', error);
      alert('Error uploading or transcribing file.');
    }
  });
  