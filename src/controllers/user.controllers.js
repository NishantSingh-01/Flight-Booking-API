import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"
import User from "../models/user.models.js"


const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                status: false,
                message: "All fields are required"
            })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({
                status: false,
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            role:role,
            password: hashedPassword
        })

        const token = JWT.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
        })

        return res.status(201).json({
            status: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        })
    } catch (error) {
        console.log("Register Error",error)
        return res.status(500).json({
            status: false,
            message: "Server error"
        })
    }
}

export  {register}