const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const handleRegisterUser = async (req, res) => {
    const { username, password, full_name, gender, DOB, country } = req.body;

    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password with 10 salt rounds
        const hashedPassword = await bcrypt.hash(password, 10); 
        const user = new User({
            username,
            password: hashedPassword,
            full_name,
            gender,
            DOB,
            country
        });

        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login User
const handleLoginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user){
            return res.status(400).json({ message: "Invalid credentials" });
        }

        //bcrypt.compare() hashes the input password and compares it with the stored hash.
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
             return res.status(400).json({ message: "Invalid credentials" });
        }
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get a user info
const searchUser = async (req, res) => {
    const { username } = req.query;
    try {
        // Find the user by username
        const user = await User.findOne({ username }).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user._id.toString() !== req.user.id) {
            return res.status(403).json({ message: "Access denied the token is not a valid token" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { handleRegisterUser, handleLoginUser, searchUser };
