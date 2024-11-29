import express from 'express';
const router = express.Router();
import { SignupMiddleware } from '../appLogic/middleware/SignupMiddleware';

import { AdminSignup } from '../appLogic/auth/adminsignup';
import { AdminLogin } from '../appLogic/auth/adminlogin';
import { Adminforgot } from '../appLogic/auth/adminforgot';
import { AdminReset } from '../appLogic/auth/adminreset';
//signup
router.post('/signup', SignupMiddleware,AdminSignup);
//login
router.post('/login', AdminLogin);
//forgot password
router.post('/forgot', Adminforgot);
//reset your password
router.post('/reset', AdminReset);
export default router;