async function eventFormHandler(event) {
	event.preventDefault();

	const title = document
		.querySelector('input[name="event-title"]')
		.value.trim();
	const description = document
		.querySelector('textarea[name="event-description"]')
		.value.trim();
	const start_time = document
		.querySelector('input[name="event-start_time"]')
		.value.trim();
	const end_time = document
		.querySelector('input[name="event-end_time"]')
		.value.trim();
	const calendar_id = document.querySelector('select[name="event-calendar"]')
		.value;

	if (title && description && start_time && end_time) {
		const response = await fetch('/api/event', {
			method: 'POST',
			body: JSON.stringify({
				calendar_id,
				title,
				description,
				start_time,
				end_time,
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
	.querySelector('.add-event-form')
	.addEventListener('submit', eventFormHandler);
