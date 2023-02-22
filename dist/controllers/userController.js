"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignOut = exports.postSignIn = exports.getSignIn = exports.postSignUp = exports.getSignUp = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const getSignUp = (req, res, next) => {
    res.render("user/signIn", {
        docTitle: "Sign In",
    });
};
exports.getSignUp = getSignUp;
const postSignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const checkUniqueEmail = yield userModel_1.default.findOne({ email });
        if (checkUniqueEmail) {
            return res.status(400).json({
                message: "email already exists",
            });
        }
        const newUser = new userModel_1.default(Object.assign({}, req.body));
        const maxAge = 3 * 24 * 60 * 60;
        const token = yield newUser.genUserAuthToken();
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        yield newUser.save();
        return res.status(201).json({
            message: "User created successfully",
            user: newUser,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to create user",
            error,
        });
    }
});
exports.postSignUp = postSignUp;
const getSignIn = (req, res, next) => {
    res.render("user/logIn", {
        docTitle: "Log In",
    });
};
exports.getSignIn = getSignIn;
const postSignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findUserByCredentials(email, password);
        if (!user) {
            return res.status(400).json({
                message: "Invalid User",
            });
        }
        const maxAge = 3 * 24 * 60 * 60;
        const token = yield user.genUserAuthToken();
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({
            message: "Login successful",
            user,
            token,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Invalid credentials",
        });
    }
});
exports.postSignIn = postSignIn;
const getSignOut = (req, res, next) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect(302, "/");
};
exports.getSignOut = getSignOut;
