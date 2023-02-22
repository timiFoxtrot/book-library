import mongoose, { Model, Schema, HydratedDocument, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import jwt from "jsonwebtoken"

interface IUser {
  userName: string;
  email: string;
  password: string;
  userId: number;
}

interface IUserMethods {
  genUserAuthToken(): string;
}

interface UserModel extends Model<IUser, {}, IUserMethods> {
  findUserByCredentials(
    email: string,
    password: string
  ): Promise<HydratedDocument<IUser, IUserMethods>>;
}

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this 

  if (!user.isModified("password")) {
    return next();
  }

  const saltFactor: any = process.env.SALTFACTOR

  const salt = await bcrypt.genSalt(saltFactor);

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.static(
  "findUserByCredentials",
  async function findUserByCredentials(email, password) {
    const user: any = await User.findOne({ email });
    // console.log(user)
    if (!user) {
      throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Unable to login");
    }

    return user;
  }
);

userSchema.method("genUserAuthToken", async function genUserAuthToken() {
  const user: any = this;
  const secret: string = process.env.JWT_SECRET as string;
  const maxAge: number = 3 * 24 * 60 * 60;
  const token = jwt.sign(
    { _id: user._id.toString() },
    secret,
    {
      expiresIn: maxAge,
    }
  );

  await user.save();

  return token;
});

const User = model<IUser, UserModel>("User", userSchema);

export default User

