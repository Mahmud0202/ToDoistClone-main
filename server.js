const express = require("express");
const app = express();
require("dotenv").config();

const userRoutes = require("./src/routes/userRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
