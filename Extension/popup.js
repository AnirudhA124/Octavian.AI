document.addEventListener('DOMContentLoaded', function() {
    const minutesOfMeeting = document.getElementById('minutes-of-meeting');
    
    console.log('Side panel DOM fully loaded');
  
    if (minutesOfMeeting) {
      console.log('Minutes of meeting element found');
      
      minutesOfMeeting.addEventListener('click', function() {
        console.log('Minutes of meeting clicked');
        chrome.runtime.sendMessage({action: 'openExtension', id: 'ggifbhnhbaomifdpjpimajoodfjaeafm'}, response => {
          if (chrome.runtime.lastError) {
            console.error('Error:', chrome.runtime.lastError);
          } else {
            console.log('Message sent, response:', response);
          }
        });
      });
    } else {
      console.error('Minutes of meeting element not found');
    }
  });