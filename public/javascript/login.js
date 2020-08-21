async function loginFormHandler(event) {
	event.preventDefault();

	const email = document.querySelector('#email-login').value.trim();
	const password = document.querySelector('#password-login').value.trim();

	if (email && password) {
		const response = await fetch('/api/employee/login', {
			method: 'post',
			body: JSON.stringify({
				email,
				password,
			}),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			document.location.replace('/');
		} else {
			alert(response.statusText);
		}
	}
}

async function signupFormHandler(event) {
	event.preventDefault();

	const firstname = document.querySelector('#firstname-signup').value.trim();
	const lastname = document.querySelector('#lastname-signup').value.trim();
	const email = document.querySelector('#email-signup').value.trim();
	const password = document.querySelector('#password-signup').value.trim();

	if (firstname && lastname && email && password) {
		const response = await fetch('/api/employee', {
			method: 'post',
			body: JSON.stringify({
				firstname,
				lastname,
				email,
				password,
			}),
			headers: { 'Content-Type': 'application/json' },
		});
		// check the response status
		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert(response.statusText);
		}
	}
}

document
	.querySelector('.signup-form')
	.addEventListener('submit', signupFormHandler);
document
	.querySelector('.login-form')
	.addEventListener('submit', loginFormHandler);
