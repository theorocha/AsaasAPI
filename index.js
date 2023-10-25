const express = require("express");
const axios = require("axios");
const config = require("/config");

const apiKey = config.apiKey;

const app = express();
const port = 8081;

app.get("/api");

app.get("https://sandbox.asaas.com/api/v3/customers");

app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});
