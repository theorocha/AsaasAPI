const express = require("express");
const axios = require("axios");
const https = require("https");
const config = require("./config");

const apiKey = config.apiKey;

const app = express();
const port = 8081;

app.get("/api/customers", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://sandbox.asaas.com/api/v3/customers",
    headers: {
      accept: "application/json",
      access_token:
        "$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNjgwNzU6OiRhYWNoX2IyNWNkZjJhLTIxYTktNGU2NS05MjU4LWIwOTM1MGYzZjI0Ng==",
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

app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});
