import createError, { HttpError } from 'http-errors';
import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import config from "config";
import * as dotenv from "dotenv"
import connect from "./utils/connect";

dotenv.config()

import indexRouter from './routes/bookRoutes';
import usersRouter from './routes/userRoutes';

const port = process.env.PORT

const app = express();

// view engine setup
app.set('views', path.join(__dirname, "../", "views"));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../", "public")));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.render('book/home', {
    docTitle: "Bookipedia",
    limit: 5
  })
});

app.use('/books', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", {
    docTitle: 'Error Page',
    path: ''
  });
});

app.listen(port, async () => {
  console.log(`App is running at http://localhost:${port}`);
  await connect()
})

export default app;
