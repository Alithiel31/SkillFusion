import express from 'express';
import cors from "cors";
import {xss} from 'express-xss-sanitizer';
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { globalErrorHandler } from "./middlewares/global-error-handler";

import { config } from "./config";
import authRouter from './routers/auth.router';
import coursRouter from './routers/cours.router';
import categorieRouter from './routers/categorie.router';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.allowedOrigins }));
app.use(cookieParser());
app.use(express.json());
app.use(xss());


app.use("/auth", authRouter)
app.use("/api",coursRouter)
app.use("/api", categorieRouter)

app.get('/', (req, res) => {
  res.send('Welcome to the SkillFusion API');
});

app.use(globalErrorHandler);

export default app;