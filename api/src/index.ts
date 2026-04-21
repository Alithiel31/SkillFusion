import express from 'express';
import authRouter from './routers/auth.router';

const app = express();

app.use("/auth",authRouter)

app.get('/', (req, res) => {
  res.send('Hello World!');
});



export default app;