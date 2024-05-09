import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const token = req.cookies["user"];

  if (!token)
    return res
      .status(401)
      .json({
        success: false,
        error: "Unauthorized",
        message: "Please login to access this route",
      });

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedData._id;

  next();
};
