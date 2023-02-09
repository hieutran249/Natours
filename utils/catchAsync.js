module.exports = (fn) => (req, res, next) => {
  // liên quan đến closures
  fn(req, res, next).catch(next); // catch(next) == catch(err => next(err))
};
