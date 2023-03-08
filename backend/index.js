require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

let corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
};

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());

const port = process.env.NODE_LCCAL_PORT || 5000;

require("./routes")(app);

app.listen(port, () => {
  console.log(`Sever is running on port ${port}`);
});
