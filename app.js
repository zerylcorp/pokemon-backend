if (process.env) require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const routes = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v3", routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
