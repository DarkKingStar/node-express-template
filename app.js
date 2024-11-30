import "dotenv/config";
import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import passport from "passport";
import http from "http";
import cluster from "cluster";
import os from "os";
import { fileURLToPath } from "url";
// imports from files
import logger  from "./src/utils/logger.js";
import Api from "./src/api.js";
import errorHandlers from "./src/handlers/error.handler.js";
import routeHandlers from "./src/handlers/route.handler.js";

// file paths 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cookieSession({
    name: "test-auth",
    keys: [
      process.env.COOKIE_SESSION_KEY1,
      process.env.COOKIE_SESSION_KEY2,
    ],
    maxAge: 24 * 60 * 60 * 1000, // in 1-day session will expire
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true, parameterLimit: 1000000 }));
app.use(compression());

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.use(helmet());

app.use(
  morgan(
    "[:date[web]] :method :url :status :response-time ms - :res[content-length]"
  )
);

app.use('/api', Api);


app.use(express.static(path.join(__dirname, './public')));

// app.get("/", (req, res) => {
//   res.send(__dirname.toString());
// });

// route handlers
app.use(routeHandlers);

//error handlers
app.use(errorHandlers);

// server routes



const port = process.env.PORT || 5000;
app.set("port", port);

process.on("uncaughtException", function (err) {
    logger.error(err);
    process.exit(1);
});

process.on("unhandledRejection", function (err) {
    logger.error(err);
    process.exit(1);
});

const server = http.createServer(app);

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      logger.error({
        message: `${bind} requires elevated privileges`,
        level: "error",
      });
      process.exit(1);
    case "EADDRINUSE":
      logger.error({
        message: `${bind} is already in use`,
        level: "error",
      });
      process.exit(1);
    default:
      throw error;
  }
}

async function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  logger.info(`Server listening at ${bind} in ${process.env.ENV} mode`);
}

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  // Fork workers for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  // Listen for dying workers and restart them
  cluster.on("exit", (worker, code, signal) => {
    logger.error({
      message: `Worker ${worker.process.pid} died. Code: ${code}, Signal: ${signal}`,
      level: "error",
    });
    logger.info("Starting a new worker...");
    cluster.fork(); // Restart the worker
  });
  logger.info(
    `Primary process ${process.pid} is running and forked ${numCPUs} workers`
  );
} else {
  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);
}
