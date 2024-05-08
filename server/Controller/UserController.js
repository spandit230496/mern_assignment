const { User } = require("../Models/UserModel");
const bcrypt = require("bcrypt");
async function registerUser(req, res) {
    const { name, email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        if(!emailRegex.test(email)){
            return res
                .status(400)
                .json({ message: "please write the correct email format" })
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
            return res.status(400).json({ message: "user Saved Successfully" });
        }
    } catch (error) {
        console.log(error);
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const savedUser = await User.findOne({ email });
        const savedPassword = savedUser.password;
        const matched = await bcrypt.compare(password, savedPassword);

        if (matched) {
            return res
                .status(200)
                .send({ message: "Logged in", success: true });
        }
        else{
            return res
            .status(403)
            .send({
                message: "creds not matched ,please try again",
                success: false,
            });
        }
    } catch (error) {
        return res
            .status(500)
            .send({
                message: "internal server error",
                success: false,
            });
    }
}

module.exports = { registerUser,loginUser };
