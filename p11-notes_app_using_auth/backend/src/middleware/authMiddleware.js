const jwt = require("jsonwebtoken");

function authmiddleware(req,res,next){
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Access denied. Please login first.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     req.user = decoded;
     next();
     
}
module.exports = authMiddleware;