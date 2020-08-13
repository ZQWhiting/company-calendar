const router = require('express').Router();
const { Employee, Calendar, Event } = require('../models');

router.get('/', (req, res) => {
    Employee.findAll({
      attributes: [
        'firstname',
        'lastname',
      ],
      include: [
        {
          model: Calendar,
          attributes: ['id']
        },
      ]
    })
      .then(dbEmployeeData => {
        const employees = dbEmployeeData.map(employee => employee.get({ plain: true }));
        res.render('homepage', { employees, loggedIn: req.session.loggedIn });
      })
      .catch(err => {
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

router.get('/', (req, res) => {
    console.log(req.session);
  
});

router.get('/calendar/:id', (req, res) => {
    Calendar.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'employee_id'
      ],
      include: [
        {
          model: Event,
          attributes: ['id', 'title', 'description', 'date', 'start_time', 'end_time', 'calendar_id', 'employee_id'],
          include: {
            model: Employee,
            attributes: ['id', 'email','firstname', 'lastname']
          }
        },
        {
          model: Employee,
          attributes: ['id', 'email', 'firstname', 'lastname']
        }
      ]
    })
    .then(dbCalendarData => {
    if (!dbCalendarData) {
        res.status(404).json({ message: 'No calendar found with this id' });
        return;
    }

    // serialize the data
    const calendar = dbCalendarData.get({ plain: true });

    // pass data to template
    res.render('single-calendar', { calendar, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

module.exports = router;