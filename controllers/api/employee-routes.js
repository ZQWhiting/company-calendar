const router = require('express').Router();
const { Employee, Calendar } = require('../../models');

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
                attributes: ['employee_id']
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