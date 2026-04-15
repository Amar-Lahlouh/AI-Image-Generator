import jwt from "jsonwebtoken";
export const VerifyAuth = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return console.log("Token", token);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    req.user = decoded;
    next();
  });
};
