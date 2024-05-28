import 'dotenv/config'
import express, { Request, Response } from "express";
import routeS from "./route/route"
import session from "express-session";
import passport from "passport";
import * as LocalStrategy from "passport-local"
import mongoose from "mongoose";
import './passportConfig';
import bcrypt from "bcrypt"
import User from './models/user';
import jwt from 'jsonwebtoken';
import { UserDocument } from './models/user';
import { Error } from 'mongoose';
import cors from "cors"
import {body, validationResult} from "express-validator"
import "./authMiddleware"


const app = express();

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB!);
  
}
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionSuccessStatus: 200
};

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(passport.initialize());

app.use("/", routeS)

app.post('/register',[
  body("username").isLength({min:5, max: 20}).escape().withMessage("Username must be specified")
  .custom(async (value) => {
    const user = await User.findOne({ username: value });
    if (user) {
        throw new Error("Username is already in use");
    }
}).escape(),
  body("password").isLength({min:8, max: 25}).escape().withMessage("Password must be specified"),
  async (req: Request, res: Response) => {

    const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors)
            res.status(400).json({ errors: errors.array() });
        }

    console.log(req.body)
    const { username, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
] );

// User login route
app.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err: Error | null, user: UserDocument | false, info: { message: string } | undefined) => {
    if (err || !user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return res.json({ token, user });
  })(req, res, next);
});

// Protected route
app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'This is a protected route' });
});

app.listen(3000, () => {
  console.log("err, connected!")
})