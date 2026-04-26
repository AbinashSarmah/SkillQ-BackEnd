const users = [];

export const getUsers = (req, res) => {
  res.json({
    success: true,
    data: users,
  });
};

export const createUser = (req, res) => {
  const { name, email } = req.body;

  const user = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(user);

  res.status(201).json({
    success: true,
    data: user,
  });
};