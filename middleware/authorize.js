const passport = require('passport');

module.exports = function (roles = []) {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    },
  ];
};
