
function notFound(req, res) {
  res.status(404).json({ error: 'Route introuvable' });
}

module.exports = { notFound };