async function calendarFormHandler(event) {
	event.preventDefault();

	let date = document
		.querySelector('input[name="calendar-date"]')
		.value.replace(/-/g, '/');
	console.log(date);

	if (date) {
		const response = await fetch('/api/calendar', {
			method: 'POST',
			body: JSON.stringify({
				date: date,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			document.location.reload();
		} else {
			alert(response.statusText);
		}
	}
}

document
	.querySelector('.add-calendar-form')
	.addEventListener('submit', calendarFormHandler);
