const mongoose = require("mongoose");
const { hashPassword } = require("../services/encryption-service");

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: [true, "Please provide an email"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Please provide a password"],
			minlength: [6, "Password must be at least 6 characters long"],
		},
		firstName: {
			type: String,
			required: [true, "Please provide a first name"],
		},
		lastName: {
			type: String,
			required: [true, "Please provide a last name"],
		},
		birthDate: {
			type: Date,
			required: [true, "Please provide a birth date"],
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		favoriteFlatList: {
			type: [mongoose.Schema.Types.ObjectId],
			default: [],
		},
		created: {
			type: Date,
			default: Date.now,
		},
		updated: {
			type: Date,
			default: Date.now,
		},
	},
	{
		versionKey: false,
	}
);

UserSchema.pre("save", async function (next) {
	console.log("Pre save hook");
	const user = this;
	console.log(user);
	if (!user.isModified("password")) next();

	try {
		const hashedPassword = await hashPassword(user.password);
		console.log("Hashed Password");
		console.log(hashedPassword);
		user.password = hashedPassword;
		next();
	} catch (error) {
		next(error);
	}
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
