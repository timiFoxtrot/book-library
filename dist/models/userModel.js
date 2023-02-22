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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true,
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified("password")) {
            return next();
        }
        const saltFactor = process.env.SALTFACTOR;
        const salt = yield bcrypt_1.default.genSalt(saltFactor);
        const hash = yield bcrypt_1.default.hashSync(user.password, salt);
        user.password = hash;
        return next();
    });
});
userSchema.static("findUserByCredentials", function findUserByCredentials(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User.findOne({ email });
        // console.log(user)
        if (!user) {
            throw new Error("Unable to login");
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Unable to login");
        }
        return user;
    });
});
userSchema.method("genUserAuthToken", function genUserAuthToken() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const secret = process.env.JWT_SECRET;
        const maxAge = 3 * 24 * 60 * 60;
        const token = jsonwebtoken_1.default.sign({ _id: user._id.toString() }, secret, {
            expiresIn: maxAge,
        });
        yield user.save();
        return token;
    });
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
