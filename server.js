require("dotenv").config();

const path = require("path");
const express = require("express");
const conectDb = require("./config/Db");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const corsOptions = require("./config/CorsOptions");
const port = process.env.PORT || 5000;
conectDb();
const app = express();
app.use(cors(corsOptions));
app.use(cookieparser());
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "Public")));

app.use("/", require("./Routes/Routes.js"));
app.use("/auth", require("./Routes/AurhRouts.js"));
app.use("/users", require("./Routes/GetAllUsers.js"));

app.use(require("./Routes/ErrorNotFound.js"));
// Error handling middleware

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected...");
  app.listen(port, () => console.log(`app listening on port ${port}!`));
});
mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error.message);
});
