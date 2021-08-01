import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import indexRouter from './routes/index.js';
import { connectDB } from './config/db.js';

dotenv.config();
connectDB();
const app = express();
app.use(morgan('dev'));
app.use(express.json())

const port = process.env.PORT || 8081;



app.use('/api/v1', indexRouter);

app.get('/', (_req, res) => {
  res.redirect('/api/v1');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})