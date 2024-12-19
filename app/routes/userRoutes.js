const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { users } = require("../models/userModel");
const { db } = require("../config/db");
const { JWT_SECRET } = process.env;

const router = express.Router();

// User Registration
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
        name,
        email,
        passwordHash: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
});

// User Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await db.select().from(users).where("email", email).first();

    if (!user) return res.status(404).json({ error: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
});

module.exports = router;
