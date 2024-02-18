import 'dotenv/config';
import cors from 'cors'; 
import express from 'express';
import connectDB from "./db.js"; 
import router from './routes/user.router.js'; 

const app = express();

// Apply CORS middleware for all routes
app.use(cors());


app.use(express.json());
app.use('/api', router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
