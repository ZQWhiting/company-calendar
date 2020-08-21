async function calendarDeleteFormHandler(event) {
	event.preventDefault();

	const id = event.target.getAttribute('data-id');

	const response = await fetch(`/api/calendar/${id}`, {
		method: 'DELETE',
	});

	if (response.ok) {
		document.location.reload();
	} else {
		alert(response.statusText);
	}
}

var calBtnDelete = document.getElementsByClassName('delete-calendar-btn');
for (var i = 0; i < calBtnDelete.length; i++) {
	calBtnDelete[i].addEventListener('click', calendarDeleteFormHandler);
}
