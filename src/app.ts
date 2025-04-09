import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import booksRoutes from './routes/books';
import authorsRoutes from './routes/authors';
import genresRoutes from './routes/genres';
import publishersRoutes from './routes/publishers';
import authRoutes from './routes/auth';
import createHttpError, { isHttpError } from 'http-errors';
import session from 'express-session';
import * as session2 from 'express-session';
import dotenv from 'dotenv';
import connectMySQLSession from 'express-mysql-session';

dotenv.config();
const SESSION_SECRET =
  process.env.SESSION_SECRET || 'n4jmtaCTkMJVyqzeeDU52zqZy4zU490w';

const MySQLStore = connectMySQLSession(session2);

const options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '12345678',
  database: 'library',
};

const sessionStore = new MySQLStore(options);

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 6000 * 60 * 6 /* 6000 * 60 = 1h => 6000 * 60 * 6 = 6h */,
    },
    rolling: true,
    store: sessionStore,
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/authors', authorsRoutes);
app.use('/api/genres', genresRoutes);
app.use('/api/publishers', publishersRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, 'Endpoint Not Found!'));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = 'An unknown error occurred';
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
