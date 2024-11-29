import express from 'express';
import cors from 'cors';
import 'dotenv/config';
const app = express();

const PORT = process.env.PORT || 3000;
//parsing the request body
app.use(express.json());
//enabling cors
app.use(cors());
//get route
app.get('/', (req, res) => {
    res.send('Devsomeware admin backend is up and running');
});
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})