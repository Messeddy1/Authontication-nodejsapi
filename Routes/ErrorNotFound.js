const express = require('express');
const path = require('path');
const ERROR = express.Router();
ERROR.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
      res.sendFile(path.join(__dirname, "..","veiws", "404.html"));
    } else if (req.accepts("json")) {
      res.send({ error: "Page Not found" });
    } else {
      res.type("txt").send("Page Not found");
    }
  });
  module.exports = ERROR;