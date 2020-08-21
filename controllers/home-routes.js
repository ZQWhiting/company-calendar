const router = require('express').Router();
const { Employee, Calendar, Event } = require('../models');
const withAuth = require('../utils/auth');
const { findAll } = require('../models/Event');

router.get('/', (req, res) => {
	Employee.findAll({
		attributes: ['firstname', 'lastname'],
		include: [
			{
				model: Calendar,
				attributes: ['id'],
			},
		],
	})
		.then((dbEmployeeData) => {
			const employees = dbEmployeeData.map((employee) =>
				employee.get({ plain: true })
			);
			res.render('homepage', {
				employees,
				loggedIn: req.session.loggedIn,
				user_id: req.session.employee_id,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get('/login', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/');
		return;
	}

	res.render('login');
});

router.get('/calendar/:id', (req, res) => {
	Calendar.findOne({
		where: {
			id: req.params.id,
		},
		attributes: ['id', 'employee_id'],
		include: [
			{
				model: Event,
				attributes: [
					'id',
					'title',
					'description',
					'start_time',
					'end_time',
					'calendar_id',
					'employee_id',
				],
				include: {
					model: Employee,
					attributes: ['id', 'email', 'firstname', 'lastname'],
				},
			},
		],
	})
		.then((dbCalendarData) => {
			if (!dbCalendarData) {
				res.status(404).json({
					message: 'No calendar found with this id',
				});
				return;
			}

			// serialize the data
			const calendar = dbCalendarData.get({ plain: true });
			console.log(calendar);

			// pass data to template
			res.render('single-calendar', {
				calendar,
				loggedIn: req.session.loggedIn,
				user_id: req.session.employee_id,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get('/dashboard', (req, res) => {
	if (!req.session.loggedIn) {
		res.redirect('/login');
		return;
	}

	Employee.findOne({
		where: {
			id: req.session.employee_id,
		},
		include: { model: Calendar, include: { model: Event } },
	}).then((dbEmployeeData) => {
		// serialize the data
		const employee = dbEmployeeData.get({ plain: true });
		console.log(employee, employee.calendars);

		if (!employee.calendars.length) {
			Calendar.create({
				employee_id: req.session.employee_id,
				date: `${new Date().getMonth()}/${new Date().getDay()}/${new Date().getFullYear()}`,
			});
			res.redirect('/dashboard');
			return;
		}

		res.render('dashboard', {
			employee,
			loggedIn: req.session.loggedIn,
		});
	});
});

module.exports = router;
