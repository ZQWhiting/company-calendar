const router = require('express').Router();
const { Event, Employee } = require('../../models');
const session = require('express-session');
const withAuth = require('../../utils/auth');

// get event
router.get('/', (req, res) => {
	Event.findAll({
		attributes: [
			'id',
			'title',
			'description',
			'start_time',
			'end_time',
			'calendar_id',
			'employee_id',
		],
		include: [
			{
				model: Employee,
				attributes: ['firstname', 'lastname', 'email'],
			},
		],
	})
		.then((dbEventData) => res.json(dbEventData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

//get a single event
router.get('/:id', (req, res) => {
	Event.findOne({
		where: {
			id: req.params.id,
		},
		attributes: [
			'id',
			'title',
			'description',
			'start_time',
			'end_time',
			'calendar_id',
			'employee_id',
		],
		include: [
			{
				model: Employee,
				attributes: ['firstname', 'lastname', 'email'],
			},
		],
	})
		.then((dbEventData) => {
			if (!dbEventData) {
				res.status(404).json({
					message: 'No event found with this id',
				});
				return;
			}
			res.json(dbEventData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

//create an event
router.post('/', withAuth, (req, res) => {
	// check the session
	if (req.session) {
		Event.create({
			title: req.body.title,
			description: req.body.description,
			start_time: req.body.start_time,
			end_time: req.body.end_time,
			calendar_id: req.body.calendar_id,
			// use the id from the session
			employee_id: req.session.employee_id,
		})
			.then((dbEventData) => res.json(dbEventData))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	}
});

// add event to calendar
router.post('/:id/calendar/:calendar_id', withAuth, (req, res) => {
	Event.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((event) => {
			if (!event) {
				res.status(404).json({
					message: 'No event found with this id',
				});
				return;
			}
			Calendar.findOne({ where: { id: req.params.calendar_id } }).then(
				(calendar) => {
					if (!calendar) {
						res.status(404).json({
							message: 'No calendar found with this id',
						});
						return;
					}
					calendar.addEvent(event);
					res.status(200).json({ message: 'success' });
				}
			);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

//update an event
router.put('/:id', withAuth, (req, res) => {
	Event.update(
		{
			title: req.body.title,
			description: req.body.description,
			start_time: req.body.start_time,
			end_time: req.body.end_time,
		},
		{
			where: {
				id: req.params.id,
			},
		}
	)
		.then((dbEventData) => {
			if (!dbEventData) {
				res.status(404).json({
					message: 'No event found with this id',
				});
				return;
			}
			res.json(dbEventData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

//delete an event
router.delete('/:id', withAuth, (req, res) => {
	Event.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbEventData) => {
			if (!dbEventData) {
				res.status(404).json({
					message: 'No event found with this id',
				});
				return;
			}
			res.json(dbEventData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
