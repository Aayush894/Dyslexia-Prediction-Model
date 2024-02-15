import 'dotenv/config';
import cors from 'cors'; 
import express from 'express';
import connectDB from "./db.js"; 
import router from './routes/CreateUser.js'; 
// import DisplayData from './routes/DisplayData.js';
// import Order from './routes/OrderData.js';

const app = express();

// Apply CORS middleware for all routes
app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.header (
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   ); 
//   next() ; 
// });

app.use(express.json());
app.use('/api', router);
// app.use('/api', DisplayData);
// app.use('/api', Order);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
