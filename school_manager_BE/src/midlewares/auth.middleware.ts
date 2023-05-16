import jwt from "jsonwebtoken";

export const checkAuth = async (req, res, next) => {
    try {
        
        let tokenUser = req.cookies.token;
        
        if (tokenUser) {
            jwt.verify(tokenUser, "123456789", (err, decoded) => {
                if (err) {
                    res.status(401).json({ message: err.message });
                } else {
                    req.decoded = decoded;
                    return next();
                }
            });
        } else {
            res.status(401).json({ message: "token dosen't exist" });
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}