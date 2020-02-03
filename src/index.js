const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const middleware = require("./middlewares");
const logs = require("./api/logs");

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// morgan is for logging
app.use(morgan("common"));
// helmet is for securing your application from attacks
app.use(helmet());
// just to run this on specific url
app.use(
  cors({
    origin: process.env.CORS_ORIGIN
  })
);
app.use(express.json());

app.use("/api/logs", logs);

// Middle ware
app.use(middleware.notFound);
app.use(middleware.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
