import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { username, password } = req.body.user;
  if (username === "" || !username) {
    res.json({
      success: false,
      message: "Please provide a valid username",
    });
  }

  if (password === "" || !password) {
    res.json({
      success: false,
      message: "Please provide a valid password",
    });
  }

  const token = jwt.sign(req.body.user, process.env.JWT_SECRET, {
    expiresIn: "1800s",
  });
  res.status(200).json({
    token,
    success: true,
    message: "Sign in successful",
  });
};
