import asyncHandler from "express-async-handler";
import UserModel from "../models/userModels.js";

export const createUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
  
    const userExists = await UserModel.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
  
    const user = await UserModel.create({
      name,
      email,
      password,
    });
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  });