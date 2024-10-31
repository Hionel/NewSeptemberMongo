const mongoose = require("mongoose");
const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority&appName=FlatFinder-Cluster`;

const connectDB = async () => {
	try {
		await mongoose.connect(MONGO_URI);

		console.log("MongoDB Connected successfully");
	} catch (error) {
		console.warn("MongoDB Connection failed");
		console.error(error.message);
	}
};

module.exports = connectDB;
