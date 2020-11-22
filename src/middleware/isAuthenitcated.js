import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (error) => {
      if (error) {
        return res.json({
          success: false,
          message: "Unauthorized, please login first.",
        });
      } else {
        return next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Unauthorized, please login first.",
    });
  }
};

export default isAuthenticated;
