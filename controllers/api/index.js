const router = require('express').Router();

const employeeRoutes = require('./employee-routes');
const calendarRoutes = require('./calendar-routes');
const eventRoutes = require('./event-routes');

router.use('/employee', employeeRoutes);
router.use('/calendar', calendarRoutes);
router.use('/event', eventRoutes);

module.exports = router;