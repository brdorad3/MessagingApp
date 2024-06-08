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
// @ts-nocheck
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./route/route"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = __importDefault(require("mongoose"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
require("./passportConfig");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("./models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_2 = require("mongoose");
const cors_1 = __importDefault(require("cors"));
const express_validator_1 = require("express-validator");
require("./authMiddleware");
const app = (0, express_1.default)();
mongoose_1.default.set("strictQuery", false);
const mongoDB = process.env.MONGO_URI;
main().catch((err) => console.log(err));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(mongoDB);
    });
}
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
app.use((0, express_session_1.default)({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: connect_mongo_1.default.create({ mongoUrl: process.env.MONGO_URI })
}));
app.use(passport_1.default.session());
// Passport configuration
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => {
    user_1.default.findById(id, (err, user) => {
        done(err, user);
    });
});
app.use("/", route_1.default);
app.post('/register', [
    (0, express_validator_1.body)("username").isLength({ min: 4, max: 20 }).escape().withMessage("Username must be specified")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ username: value });
        if (user) {
            throw new mongoose_2.Error("Username is already in use");
        }
    })).escape(),
    (0, express_validator_1.body)("password").isLength({ min: 8, max: 25 }).escape().withMessage("Password must be specified").isStrongPassword().withMessage("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."),
    (0, express_validator_1.body)("confirm").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new mongoose_2.Error('Passwords do not match');
        }
        return true;
    }),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, password, confirm } = req.body;
        try {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = new user_1.default({ username, password: hashedPassword, confirm });
            yield newUser.save();
            res.status(201).json({ message: 'User registered successfully' });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    })
]);
// User login route
app.post('/login', (req, res, next) => {
    passport_1.default.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token, user });
    })(req, res, next);
});
// Protected route
app.get('/protected', passport_1.default.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'This is a protected route' });
});
// Logout route
app.post('/logout', (req, res) => {
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
app.get('/demo', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const demoUser = yield user_1.default.findOne({ username: 'admin@gmail.com' });
        if (!demoUser) {
            return res.status(404).json({ message: 'Demo user not found' });
        }
        req.login(demoUser, (err) => {
            if (err) {
                return next(err);
            }
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}));
app.listen(3000, () => {
    console.log("err, connected!");
});
