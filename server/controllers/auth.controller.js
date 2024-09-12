import User from "../models/user.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    try {
        let { name, email, password, cpassword, gender } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(422).json({ msg: 'User already exists' });
        }
        let boyPic = `https://avatar.iran.liara.run/public/boy?username=${name}`
        let girlPic = `https://avatar.iran.liara.run/public/girl?username=${name}`
        const user = new User({
            name,
            email,
            password,
            cpassword,
            gender,
            profilePic: gender === "male" ? boyPic : girlPic
        });
        const registerUser = await user.save();
        if (registerUser) {
            return res.status(201).json({ msg: "User registered successfully" });
        } else {
            return res.status(500).json({ msg: 'Error registering user' });
        }
    } catch (error) {
        console.log(error)
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
    }
    const token = await user.generateAuthToken();
    res.cookie("jwt", token, {
        expires: new Date(Date.now() + 6000000000),
        httpOnly: true,
        secure: false,
    });
    return res.status(200).json({ msg: "Welcome, Signed in successfully", data: { _id: user._id, name: user.name, profile: user.profilePic } });
}

export const logout = (req, res) => {
    let userLogout = res.clearCookie("jwt", { path: "/" })
    if (!userLogout) {
        res.status(400).json({ msg: "User is not logged in..." })
    }
    else {
        res.status(200).json({ msg: "User logged out successfully" });
    }
}
