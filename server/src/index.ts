import 'dotenv/config'
import express from "express";
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

const app = express();

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB!);
  
}
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User login route
app.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err: Error | null, user: UserDocument | false, info: { message: string } | undefined) => {
    if (err || !user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    return res.json({ token });
  })(req, res, next);
});

// Protected route
app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'This is a protected route' });
});


app.use("/users", routeS)

app.listen(3000)