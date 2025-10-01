function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.statusCode || 500;
  res.status(status).json({ error: err.message || 'Erreur interne' });
}

module.exports = { errorHandler };
