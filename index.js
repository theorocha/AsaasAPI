const express = require("express");
const axios = require("axios");
const https = require("https");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");

const apiKey = config.apiKey;

const app = express();
const port = 8081;

app.use(cors());
app.use(bodyParser.json());

app.get("/api/customers", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://sandbox.asaas.com/api/v3/customers",
    headers: {
      accept: "application/json",
      access_token: apiKey,
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  };

  axios
    .request(options)
    .then(function (response) {
      const data = response.data;
      res.send(data);
    })
    .catch(function (error) {
      res
        .status(500)
        .json({ error: "Erro ao listar clientes da API externa." });
    });
});

app.get("/api/customers/:id", async (req, res) => {
  const customerId = req.params.id;

  const options = {
    method: "GET",
    url: `https://sandbox.asaas.com/api/v3/customers/${customerId}`,
    headers: {
      accept: "application/json",
      access_token: apiKey,
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  };

  axios
    .request(options)
    .then(function (response) {
      const data = response.data;
      res.send(data);
    })
    .catch(function (error) {
      res.status(500).json({
        error: "Erro ao obter informações do cliente da API externa.",
      });
    });
});
app.post("/api/customers", async (req, res) => {
  const postData = req.body;
  console.log(postData);

  const options = {
    method: "POST",
    url: "https://sandbox.asaas.com/api/v3/customers",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      access_token: apiKey,
    },
    data: postData,
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  };

  axios
    .request(options)
    .then(function (response) {
      res.sendStatus(201);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao criar cliente na API externa." });
    });
});

app.get("/api/payments", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://sandbox.asaas.com/api/v3/payments",
    headers: {
      accept: "application/json",
      access_token: apiKey,
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  };

  axios
    .request(options)
    .then(function (response) {
      const data = response.data;
      res.send(data);
    })
    .catch(function (error) {
      res
        .status(500)
        .json({ error: "Erro ao listar cobranças da API externa." });
    });
});


app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});
