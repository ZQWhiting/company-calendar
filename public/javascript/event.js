async function eventFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="event-title"]').value.trim();
    const description = document.querySelector('textarea[name="event-description"]').value.trim();
    const date = document.querySelector('input[name="event-date"]').value.trim();
    const start_time = document.querySelector('input[name="event-start_time"]').value.trim();
    const end_time = document.querySelector('input[name="event-end_time"]').value.trim();
  
    const calendar_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (title && description && date && start_time && end_time) {
        const response = await fetch('/api/event', {
          method: 'POST',
          body: JSON.stringify({
            calendar_id,
            title,
            description,
            date,
            start_time,
            end_time
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
    }
}
  
document.querySelector('.event-form').addEventListener('submit', eventFormHandler);