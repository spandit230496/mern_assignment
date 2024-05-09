const { User } = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const { emailRegex } = require("../Utils/validation");
async function registerUser(req, res) {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        if (!emailRegex.test(email)) {
            return res
                .status(400)
                .json({ message: "please write the correct email format" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Email ID already exists in our database" });
        } else {
            const newUser = await User.create({
                name,
                email,
                password: hashedPassword,
            });
            await newUser.save();
            return res.status(400).json({ message: "user Saved Successfully","success":true });
        }
    } catch (error) {
        console.log(error);
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const savedUser = await User.findOne({ email });

        if (!savedUser) {
            return res.status(404).send({
                message: "User not found",
                success: false,
            });
        }

        const savedPassword = savedUser.password;
        const matched = await bcrypt.compare(password, savedPassword);

        if (matched) {
            return res.status(200).send({
                data: {
                    "name": savedUser.name,
                    "message": "Loggedin Successfully",
                },
                success: true,
            });
        } else {
            return res.status(401).send({
                message: "Incorrect password",
                success: false,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Internal server error",
            success: false,
        });
    }
}

module.exports = { registerUser, loginUser };
