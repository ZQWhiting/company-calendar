const router = require('express').Router();

const employeeRoutes = require('./employee-routes');
const calendarRoutes = require('./calendar-routes');

router.use('/employee', employeeRoutes);
router.use('/calendar', calendarRoutes);

module.exports = router;