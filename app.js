if (process.env) require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const routes = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v3", routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
