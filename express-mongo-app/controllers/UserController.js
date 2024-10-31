const UserModel = require("../models/UserModel");

const getAllUsers = async (req, res) => {
	try {
		const users = await UserModel.find().select("-password");
		res.status(200).json(users);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

module.exports = {
	getAllUsers,
};
