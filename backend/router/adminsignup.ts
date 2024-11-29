import express from 'express';
const router = express.Router();
//signup
router.get('/signup', (req, res) => {
    res.send('Devsomeware signup route is up and running');
})
//login
router.get('/login', (req, res) => {
    res.send('Devsomeware login route is up and running');
})
//reset password
router.get('/reset', (req, res) => {
    res.send('Devsomeware reset password route is up and running');
})
export default router;