const express = require("express");
const axios = require("axios");
const config = require("/config");

const apiKey = config.apiKey;

const app = express();
const port = 8081;

app.get("/api");

app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});
