async function deleteFormHandler(event) {
    event.preventDefault();

    const employeeCalendarId = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    console.log(employeeCalendarId)

    const id = event.target.getAttribute("data-id")
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
  
var btnDelete= document.getElementsByClassName('delete-event-btn');
for (var i=0;i<btnDelete.length;i++){
  btnDelete[i].addEventListener('click', deleteFormHandler);
}
