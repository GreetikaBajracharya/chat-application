import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try{
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error("Token verification error:", error);
    res.status(403).json({ message: error.message });
  }
};
