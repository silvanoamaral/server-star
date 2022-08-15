const express = require("express");
const path = require("path");

const port = process.env.PORT || 8080;
const app = express();

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (process.env.NODE_ENV === "production") {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect("https://" + req.headers.host + req.url);
    } else {
      return next();
    }
  }
  return next();
}

app.use(requireHTTPS);

app.get("/", function (req, res) {
  return res.send("[OK] Carregou o server... ");
});

app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
