const router = require('express').Router();
const { Calendar, Employee, Event } = require('../../models');

//get all calendars
router.get('/', (req, res) => {
    Calendar.findAll({
        attributes: ['id', 'employee_id'],
        include: [
            {
                model: Event,
                attributes: ['id','title', 'description', 'date', 'start_time', 'end_time', 'calendar_id', 'employee_id'],
                include: {
                    model: Employee,
                    attributes: ['firstname', 'lastname', 'email']
                }
            },
            {
                model: Employee,
                attributes: ['firstname', 'lastname', 'email']
            }
        ]
    })
    .then(dbCalendarData => res.json(dbCalendarData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//get a single calendar
router.get('/:id', (req, res) => {
    Calendar.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'employee_id'],
        include: [
            {
                model: Event,
                attributes: ['id','title', 'description', 'date', 'start_time', 'end_time', 'calendar_id', 'employee_id'],
                include: {
                    model: Employee,
                    attributes: ['firstname', 'lastname', 'email']
                }
            },
            {
                model: Employee,
                attributes: ['firstname', 'lastname', 'email']
            }
        ]
    })
    .then(dbCalendarData => {
        if(!dbCalendarData) {
            res.status(404).json({ message: 'No calendar found with this id' })
            return;
        }
        res.json(dbCalendarData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//create a calendar
router.post('/', (req, res) => {
    Calendar.create({
      employee_id: req.body.employee_id
    })
    .then(dbCalendarData => res.json(dbCalendarData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//delete a calendar
router.delete('/:id', (req, res) => {
    Calendar.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCalendarData => {
        if (!dbCalendarData) {
            res.status(404).json({ message: 'No calendar found with this id' });
            return;
        }
        res.json(dbCalendarData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;