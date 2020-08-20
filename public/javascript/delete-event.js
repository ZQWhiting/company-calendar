async function deleteFormHandler(event) {
    event.preventDefault();

    const employeeCalendarId = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    console.log(employeeCalendarId)

    const id = document.querySelector('.event-id').textContent;
    console.log(id)

    const response = await fetch(`/api/event/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
          event_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace(`/calendar/${employeeCalendarId}`);
      } else {
        alert(response.statusText);
    }
}
  
document.querySelector('.delete-event-btn').addEventListener('click', deleteFormHandler);