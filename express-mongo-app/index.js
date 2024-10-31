const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectDB = require("./database/db");
const authMiddleware = require("./middlewares/authMiddleware");
// Routes imports
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const PORT = process.env.PORT || 3030;
const ENVIRONEMNT = process.env.NODE_ENV || "DEV";
const app = express();

// Middleware
app.use(express.json());

// Routes
// unprotected routes
app.use("/auth", authRoutes);

// protected routes
app.use(authMiddleware.verifyAuthentication);
app.use("/users", userRoutes);

const startServer = async () => {
	console.log(`====================================`);
	console.log(`FLAT FINDER APP ${ENVIRONEMNT} MODE`);
	console.log(`====================================`);
	console.log("CONFIGURATION:");
	console.log(" - PORT:", PORT);
	console.log(" - ENVIRONMENT:", ENVIRONEMNT);
	console.log(" - MONGO USER:", process.env.MONGO_USER);
	try {
		await connectDB();

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.error(error.message);
	}
};

app.get("/test", (req, res) => {
	res.send("Hello World !!!!");
});

startServer();
