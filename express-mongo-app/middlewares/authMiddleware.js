const jwt = require("jsonwebtoken");

const verifyAuthentication = (req, res, next) => {
	try {
		const token = req.headers.authorization;
		if (!token) throw Error("No token provided");

		const decoded = jwt.verify(token, process.env.SECRET_KEY);

		const currentTime = Math.floor(Date.now() / 1000); // Current time in Unix format (seconds)

		// Check if the token has expired
		if (decoded.exp < currentTime) {
			return res.status(401).json({ message: "Token has expired" });
		}

		console.log("DECODED TOKEN");
		console.log(decoded);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(401).json({ message: error.message });
	}
};

const verifyAdmin = (req, res, next) => {
	const userRole = req.user.isAdmin;
	if (!userRole) {
		return res.status(401).json({ message: "You are not an admin" });
	}
	console.log("USER IS ADMIN");
	next();
};

module.exports = { verifyAuthentication, verifyAdmin };
