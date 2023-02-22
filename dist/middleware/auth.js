"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
const auth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jsonwebtoken_1.default.verify(token, secret, (err, decodedToken) => {
            if (err) {
                console.log(err);
                // res.status(400).json({
                //   message: "User Invalid"
                // })
                res.redirect("/users/signIn");
            }
            else {
                req._id = decodedToken._id;
                next();
            }
        });
    }
    else {
        res.redirect("/users/signIn");
        // res.status(400).json({
        //   message: "Unauthorized User"
        // })
    }
};
exports.auth = auth;
