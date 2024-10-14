const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require('path')
const cron = require('./utils/cron.js')
const globalLevelErrorHandlerMiddleware = require("./errors/globalErrorHandlerMiddleware.js");
// const rateLimit = require("express-rate-limit");

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.static(path.join(__dirname,"public")))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// CORS setup

app.use(cors());
// app.use(
//   cors({
//     origin: process.env.CLIENT,
//     methods: ["GET", "POST","PUT"],
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Access", "Authorization"],
//   })
// );

// // Rate limiting middleware
// const limiter = rateLimit({
//   windowMs : 15 * 60 * 1000, // 15 minutes
//   max : 100, // Limit each IP to 100 requests per windowMs
//   message : "Too many requests from this IP, please try again later." 
// })

// Apply to all requests
// app.use(limiter);

// Routers
const User = require("./router/user");
const KotManagementRouterRouter = require("./router/kot.routers.js");
const BillingManagementRouterRouter = require("./router/billing.routers.js");
const OrderManagementRouter = require("./router/order.management.routers.js");
app.use("/", User);
app.use("/api/v1/kot", KotManagementRouterRouter);
app.use("/api/v1/billing", BillingManagementRouterRouter);
app.use("/api/v1/order", OrderManagementRouter);
app.use(globalLevelErrorHandlerMiddleware);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

cron // cron integration