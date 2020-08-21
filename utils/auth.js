const withAuth = (req, res, next) => {
	if (!req.session.employee_id) {
		res.redirect('login');
	} else {
		next();
	}
};

module.exports = withAuth;
