import express, { Application, Request, Response, NextFunction } from "express";
import User from "../models/userModel";

export const getSignUp = (req: Request, res: Response, next: NextFunction) => {
  res.render("user/signIn", {
    docTitle: "Sign In",
  });
};

export const postSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const checkUniqueEmail = await User.findOne({ email });

    if (checkUniqueEmail) {
      return res.status(400).json({
        message: "email already exists",
      });
    }

    const newUser = new User({ ...req.body });
    const maxAge: number = 3 * 24 * 60 * 60;
    const token = await newUser.genUserAuthToken();
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create user",
      error,
    });
  }
};

export const getSignIn = (req: Request, res: Response, next: NextFunction) => {
  res.render("user/logIn", {
    docTitle: "Log In",
  });
};

export const postSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);

    if (!user) {
      return res.status(400).json({
        message: "Invalid User",
      });
    }
    const maxAge: number = 3 * 24 * 60 * 60;
    const token = await user.genUserAuthToken();
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Invalid credentials",
    });
  }
};

export const getSignOut = (req: Request, res: Response, next: NextFunction) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect(302, "/");
};
