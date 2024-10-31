const UserModel = require("../models/UserModel");
const {
	comparePasswords,
	signToken,
} = require("../services/encryption-service");

const registerUser = async (req, res) => {
	const userData = req.body;
	try {
		const newUser = new UserModel(userData);
		await newUser.save();

		console.log(newUser);
		res.status(201).json({
			message: "User registered successfully",
			data: newUser._id,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	console.log(email, password);
	try {
		if (!email || !password) throw Error("Email and password are required");

		const userEntry = await UserModel.findOne({ email: email });

		if (!userEntry) throw Error("User doesn't exist!");

		const hashedPassword = userEntry.password;
		const passwordValid = await comparePasswords(password, hashedPassword);

		if (!passwordValid) throw Error("Passwords do not match!");

		console.log(userEntry);
		const token = signToken(userEntry);
		console.log(token);
		res.status(200).json(token);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

module.exports = {
	registerUser,
	loginUser,
};
