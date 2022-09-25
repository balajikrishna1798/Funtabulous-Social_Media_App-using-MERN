"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const MailVerification_1 = require("../controller/MailVerification");
const Services_1 = __importDefault(require("../controller/Services"));
const users_1 = require("../controller/users");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
//routes for users
router.post("/signin", auth_1.verifyUser, users_1.signin);
router.post("/signup", (0, express_validator_1.body)('firstName').isLength({ min: 2 }), (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isLength({ min: 6 }), users_1.signup);
router.post("/googleSignIn", users_1.GoogleSignIn);
router.post('/profile', auth_1.auth, Services_1.default.single('pic'), users_1.updateProfile);
router.get("/profile", auth_1.auth, users_1.getMyProfile);
router.get("/usersProfile/:id", auth_1.auth, users_1.getOthersPosts);
router.get("/googleusersProfile/:id", auth_1.auth, users_1.getOthersGooglePosts);
router.get("/verify-email", MailVerification_1.emailVerified);
router.post("/verifypasswordmail", MailVerification_1.verifyPasswordMail);
router.post("/changePassword", users_1.changePassword);
router.post("/searchUsers", users_1.searchUsers);
router.post("/payment", auth_1.auth, users_1.payment);
exports.default = router;
//# sourceMappingURL=Users.js.map