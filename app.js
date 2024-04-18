const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes/index");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v3',routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
