const usersService = require('../services/usersService');

const STATUS_CREATED = 201;
const STATUS_CONFLICT = 409;
const STATUS_BAD_REQUEST = 400;

const createUser = async (req, res) => {
  const { name, email, password, queroVender } = req.body;

  const result = await usersService.createUser(name, email, password, queroVender);

  if (result === 'Invalid entries. Try again.') {
    res.status(STATUS_BAD_REQUEST).json({ message: result });
  } else if (result === 'Email already registered') {
    res.status(STATUS_CONFLICT).json({ message: result });
  } else {
    res.status(STATUS_CREATED).json({ user: result });
  }
};

module.exports = { createUser };
