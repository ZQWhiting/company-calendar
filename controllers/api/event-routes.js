const router = require('express').Router();
const { Event } = require('../../models');

//create an event
router.post('/', (req, res) => {
    // check the session
    if (req.session) {
      Event.create({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        calendar_id: req.body.calendar_id,
        // use the id from the session
        employee_id: req.session.employee_id
    })
    .then(dbEventData => res.json(dbEventData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
    }
});

//update an event
router.put('/:id', (req, res) => {
    Event.update(
        {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            start_time: req.body.start_time,
            end_time: req.body.end_time
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbEventData => {
        if (!dbEventData) {
          res.status(404).json({ message: 'No event found with this id' });
          return;
        }
        res.json(dbEventData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//delete an event
router.delete('/:id', (req, res) => {
    Event.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbEventData => {
        if (!dbEventData) {
            res.status(404).json({ message: 'No event found with this id' });
            return;
        }
        res.json(dbEventData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;