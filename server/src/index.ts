// @ts-nocheck
import 'dotenv/config'
import express, { Request, Response } from "express";
import routeS from "./route/route"
import session from "express-session";
import passport from "passport";
import * as LocalStrategy from "passport-local"
import mongoose from "mongoose";
import MongoStore from 'connect-mongo'
import './passportConfig';
import bcrypt from "bcrypt"
import  User  from './models/user';
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
  origin: 'https://messaging-c14r9vqg2-brdorads-projects.vercel.app',
  credentials: true,
  optionSuccessStatus: 200
};
app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(passport.initialize());



app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

app.use(passport.session());

// Passport configuration
passport.serializeUser((user: UserDocument, done: (err: any, id?: string) => void) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, done: (err: any, user?: UserDocument | null) => void) => {
  User.findById(id, (err, user) => {
      done(err, user);
  });
});

app.use("/", routeS)

app.post('/register',[
  body("username").isLength({min:4, max: 20}).escape().withMessage("Username must be specified")
  .custom(async (value) => {
    const user = await User.findOne({ username: value });
    if (user) {
        throw new Error("Username is already in use");
    }
}).escape(),
  body("password").isLength({min:8, max: 25}).escape().withMessage("Password must be specified").isStrongPassword().withMessage("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."),
  body("confirm").custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Passwords do not match');
    }
    return true;
}),
  async (req: Request, res: Response) => {

    const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors)
            return res.status(400).json({ errors: errors.array() });
        }

    const { username, password, confirm } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword, confirm });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
] );


app.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err: Error | null, user: UserDocument | false, info: { message: string } | undefined) => {
    if (err || !user) {
      return res.status(400).json({ message: 'Your username or password are incorrect!' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return res.json({ token, user });
  })(req, res, next);
});


app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'This is a protected route' });
});



app.post('/logout', (req: Request, res: Response) => {
  console.log('Logout request received');
  req.logout((err) => {
      if (err) {
          console.error('Logout error:', err);
          return res.status(500).json({ error: 'Failed to log out' });
      }
      req.session.destroy((err) => {
          if (err) {
              console.error('Session destruction error:', err);
              return res.status(500).json({ error: 'Failed to destroy session' });
          }
          console.log('Logout successful');
          res.status(200).json({ message: 'Logged out successfully' });
      });
  });
});

app.get('/demo', async (req, res, next) => {
  try {
      const demoUser = await User.findOne({ username: 'admin@gmail.com' });
      if (!demoUser) {
          return res.status(404).json({ message: 'Demo user not found' });
      }
      req.login(demoUser, (err) => {
          if (err) {
              return next(err);
          }
      });
  } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(3000, () => {
  console.log("err, connected!")
})