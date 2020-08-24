const router = require('express').Router();
const { Employee, Calendar, Event } = require('../models');
const withAuth = require('../utils/auth');
const { findAll } = require('../models/Event')

router.get('/', (req, res) => {
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
		console.log(employee);

		res.render('dashboard', {
			employee,
            loggedIn: req.session.loggedIn,
        })
	})
})

module.exports = router;