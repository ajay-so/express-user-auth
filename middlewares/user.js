const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Not authorized" });
    }

    try {
        //it means it decode the token and secret key( seperate id, role, user, iat, exp )
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
