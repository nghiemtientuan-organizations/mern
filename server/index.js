require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const PORT = 5000;

const authRouter = require('./routers/auth');
const postRouter = require('./routers/post');

const MONGO_DB_CONNECT = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}?retryWrites=true&w=majority`;
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_DB_CONNECT);

    console.log('MongoDb connected');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectDB();

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);

app.listen(PORT, () => console.log(`Server start ${PORT}`));
