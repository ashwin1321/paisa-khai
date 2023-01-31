const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDb = require("./config/connectDb");
const router = require("./routes/userRoutes");
const transactionRouter = require("./routes/transactionRoutes");
const path = require("path");
const app = express();

connectDb();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// user routes
app.use("/api/v1/users", router);

// transaction routes
app.use("/api/v1/transactions", transactionRouter);



// static files
app.use(express.static(path.join(__dirname, "./client/dist")));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"))
})

// listen
connectDb().then(() => {
  app.listen(5000, () => {
    console.log(`Server is running on port 5000`.yellow.bold);
  });
})


//