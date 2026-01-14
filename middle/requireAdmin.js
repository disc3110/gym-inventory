require("dotenv").config();

function requireAdmin(req, res, next) {
  const provided = req.body.admin_password;
  if (provided && provided === process.env.ADMIN_PASSWORD) return next();

  // For now: simple error response. Later you can re-render with a message.
  return res.status(403).send("Forbidden: wrong admin password");
}

module.exports = requireAdmin;