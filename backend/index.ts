import express from 'express';
import cors from 'cors';
import 'dotenv/config';
const app = express();
import adminSignupRouter from './router/adminauth';
const PORT = process.env.PORT || 3000;
import mongoose from 'mongoose';
//parsing the request body

//CONNECT TO MONGODB
(async () => {
    try{
     await mongoose.connect(process.env.MONGO_URL||"");
        console.log('Connected to the database');
    }
    catch(err){
        console.log('Error connecting to the database');
        console.log(err);
    }
})();

app.use(express.json());
//enabling cors
app.use(cors());
//get route
app.use('/api', adminSignupRouter);
app.get('/', (req, res) => {
    res.send('Devsomeware admin backend is up and running');
});
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})