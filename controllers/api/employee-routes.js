const router = require('express').Router();
const { Employee, Calendar, Event } = require('../../models');

// GET /api/employee
router.get('/', (req, res) => {
    Employee.findAll({
        attributes: {exclude: [ 'password'] }
    })
    .then(dbEmployeeData => res.json(dbEmployeeData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// GET /api/employee/1
router.get('/:id', (req, res) => {
    Employee.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Calendar,
                attributes: ['id', 'employee_id']
            }, 
            {
                model: Event,
                attributes: ['id','title', 'description', 'date', 'start_time', 'end_time', 'calendar_id', 'employee_id'],
                include: {
                  model: Calendar,
                  attributes: ['id']
                }
            },
        ]
    })
    .then(dbEmployeeData => {
        if(!dbEmployeeData) {
            res.status(404).json({ message: 'No employee found with this id' })
            return;
        }
        res.json(dbEmployeeData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// POST /api/employee
router.post('/', (req, res) => {
    Employee.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbEmployeeData => {
        Calendar.create({
            employee_id: dbEmployeeData.id,
        });
        req.session.save(() => {
            req.session.employee_id = dbEmployeeData.id;
            req.session.email = dbEmployeeData.email;
            req.session.loggedIn = true;
            res.json(dbEmployeeData);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/employee/login
router.post('/login', (req, res) => {
    Employee.findOne({
        where: {
          email: req.body.email
        }
      }).then(dbEmployeeData => {
        if (!dbEmployeeData) {
          res.status(400).json({ message: 'No employee with that email address!' });
          return;
        }
    
        const validPassword = dbEmployeeData.checkPassword(req.body.password);
  
        if (!validPassword) {
          res.status(400).json({ message: 'Incorrect password!' });
          return;
        }
  
          req.session.save(() => {
              req.session.employee_id = dbEmployeeData.id;
              req.session.email = dbEmployeeData.email;
              req.session.loggedIn = true;
      
              res.json({ employee: dbEmployeeData, message: 'You are now logged in!' });
        });
    });
})

// POST /api/employee/logout
router.post('/logout', (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
		  	res.status(204).end();
		});
	}
	else {
		res.status(404).end();
	}
});

// PUT /api/employee/1
router.put('/:id', (req, res) => {
    Employee.update(req.body, {
        individualHooks: true,
        where: {
          id: req.params.id
        }
    })
    .then(dbEmployeeData => {
    if (!dbEmployeeData[0]) {
        res.status(404).json({ message: 'No employee found with this id' });
        return;
    }
    res.json(dbEmployeeData);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

// DELETE /api/employee/1
router.delete('/:id', (req, res) => {
    Employee.destroy({
        where: {
          id: req.params.id
        }
    })
    .then(dbEmployeeData => {
        if (!dbEmployeeData) {
        res.status(404).json({ message: 'No employee found with this id' });
        return;
        }
        res.json(dbEmployeeData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;