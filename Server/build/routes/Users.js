"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Services_1 = __importDefault(require("../controller/Services"));
const users_js_1 = require("../controller/users.js");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
//routes for users
router.post("/signin", users_js_1.verifyUser, users_js_1.signin);
router.post("/signup", users_js_1.signup);
router.post("/googleSignIn", users_js_1.GoogleSignIn);
// router.post("/profile",auth,upload.single('pic'),updateProfile)
router.post('/profile', auth_1.auth, Services_1.default.single('pic'), users_js_1.updateProfile);
router.get("/profile", auth_1.auth, users_js_1.getMyProfile);
router.get("/usersProfile/:id", auth_1.auth, users_js_1.getOthersPosts);
router.get("/googleusersProfile/:id", auth_1.auth, users_js_1.getOthersGooglePosts);
router.get("/verify-email", users_js_1.emailVerified);
router.post("/verifypasswordmail", users_js_1.verifyPasswordMail);
router.post("/changePassword", users_js_1.changePassword);
router.post("/searchUsers", users_js_1.searchUsers);
exports.default = router;
//# sourceMappingURL=Users.js.map