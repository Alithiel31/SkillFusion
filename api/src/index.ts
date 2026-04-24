import express from 'express';
import cors from "cors";
import {xss} from 'express-xss-sanitizer';
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";           

import { globalErrorHandler } from "./middlewares/global-error-handler";

import { config } from "./config";
import authRouter from './routers/auth.router';
import coursRouter from './routers/cours.router';

const app = express();

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   
  max: 200,                    
  standardHeaders: true,       
  legacyHeaders: false,        
  message: { message: "Trop de requêtes, veuillez réessayer plus tard." }
});

app.use(helmet());
app.use(cors({ origin: config.allowedOrigins }));
app.use(cookieParser());
app.use(express.json());
app.use(xss());
app.use(globalLimiter);    


app.use("/auth", authRouter)
app.use("/api",coursRouter)

app.get('/', (req, res) => {
  res.send('Welcome to the SkillFusion API');
});

app.use(globalErrorHandler);

export default app;