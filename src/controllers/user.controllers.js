import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"
import User from "../models/user.models.js"
import Blacklist from "../models/blackList.models.js"


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
            role: role,
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
        console.log("Register Error", error)
        return res.status(500).json({
            status: false,
            message: "Server error"
        })
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "All fields are required"
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                status: false,
                message: "Invalid credentials"
            })
        }
        const token = JWT.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict"
        })

        return res.status(200).json({
            status: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: "Server error"
        })
    }
}
const logout = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

        if (!token) {
            return res.status(400).json({
                status: false,
                message: "No token found"
            })
        }
        await Blacklist.create({
            token,
            expiresAt: new Date(decoded.exp * 1000)
        })
        res.clearCookie("token")

        return res.status(200).json({
            status: true,
            message: "Logged out successfully"
        })

    } catch (error) {
        console.error("Logout error:", error)
        return res.status(500).json({
            status: false,
            message: "Server error"
        })
    }
}
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(400).json({
                status: false,
                message: "User not Found"
            })
        }
        return res.status(200).json({
            status: true,
            message: "User Found Successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

    } catch (error) {
        console.error("GetUser error:", error)
        return res.status(500).json({
            status: false,
            message: "Server error at Get User"
        })
    }
}

export { register, login, logout,getUser } 