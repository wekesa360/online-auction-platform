import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import config from "../config.js";
import { validateRegistration } from "../helpers/validation.js";

const register = async (req, res, next) => {
  try {
    const { username, email, role, password } = req.body;

    // Validate input
    const validationErrors = validateRegistration(username, email, role, password);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    // Check if the username or email is already taken
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email is already taken" });
    }

    const user = new User({ username, email, role, password });
    await user.save();
    res.json({ message: "Registration successful" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ $or: [{ username }, { email: username }] });


    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password matches
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const tokenPayload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };
    // Generate and send the JWT token
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: config.jwtExpiration,
    });

    res.json({ token });
  } catch (error) {
    // Handle unexpected errors
    next(error);
  }
};

const getAuthUser = async (req, res, next) => {
  try {
    const { password, revokedTokens, __v, ...userWithoutPassword } = req.user.toObject();
    res.json({ "user": userWithoutPassword });
  } catch (error) {
    next(error);
  }
  
}

export { register, login, getAuthUser };
