import express from 'express';
import cors from "cors";
import {xss} from 'express-xss-sanitizer';
import helmet from "helmet";
import cookieParser from "cookie-parser";

import authRouter from './routers/auth.router';


const app = express();

app.use(helmet());

app.use(cors())

app.use(cookieParser());

app.use(express.json());
app.use(xss());


app.use("/auth", authRouter)

app.get('/', (req, res) => {
  res.send('Welcome to the SkillFusion API');
});

export default app;