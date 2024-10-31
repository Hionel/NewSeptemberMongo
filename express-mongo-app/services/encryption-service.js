const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 10;

const hashPassword = async (password) => {
	try {
		const salt = await bcrypt.genSalt(SALT_ROUNDS);
		const hashedPassword = await bcrypt.hash(password, salt);
		return hashedPassword;
	} catch (error) {
		console.error("Error while hashing password");
		console.error(error.message);
		return error;
	}
};

const comparePasswords = async (inputPassword, hashedPassword) => {
	try {
		const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
		return isMatch;
	} catch (error) {
		console.error("Error while comparing passwords");
		console.error(error.message);
		return error;
	}
};

const signToken = (user) => {
	const payload = {
		id: user._id,
		email: user.email,
		fullname: user.firstName + " " + user.lastName,
		isAdmin: user.isAdmin,
	};

	const secretKey = process.env.SECRET_KEY;
	const jwtOptions = { expiresIn: "1h" };
	const token = jwt.sign(payload, secretKey, jwtOptions);

	return token;
};

module.exports = {
	hashPassword,
	comparePasswords,
	signToken,
};
