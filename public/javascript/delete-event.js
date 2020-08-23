async function eventDeleteFormHandler(event) {
	event.preventDefault();

	const id = event.target.getAttribute('data-id');
	console.log(id);

	const response = await fetch(`/api/event/${id}`, {
		method: 'DELETE',
	});

	if (response.ok) {
		document.location.reload();
	} else {
		alert(response.statusText);
	}
}

var eventBtnDelete = document.getElementsByClassName('delete-event-btn');
for (var i = 0; i < eventBtnDelete.length; i++) {
	eventBtnDelete[i].addEventListener('click', eventDeleteFormHandler);
}
