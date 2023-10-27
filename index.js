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
      res.status(500).json({ error: "Erro ao listar clientes." });
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
        error: "Erro ao obter informações do cliente.",
      });
    });
});

app.delete("/api/customers/:id", async (req, res) => {
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
      res.status(204).send(data);
    })
    .catch(function (error) {
      res.status(500).json({
        error: "Erro ao excluir cliente.",
      });
    });
});

app.post("/api/customers", async (req, res) => {
  const postData = req.body;

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
      res.status(201).send(response.data);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao criar cliente." });
    });
});

app.post("/api/payments", async (req, res) => {
  const postData = req.body;
  const options = {
    method: "POST",
    url: "https://sandbox.asaas.com/api/v3/payments",
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
      res.status(201).send(response.data);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao criar cobrança." });
    });
});

app.post("/api/pix-payment", async (req, res) => {
  const postData = req.body;
  const options = {
    method: "POST",
    url: "https://sandbox.asaas.com/api/v3/pix/qrCodes/pay",
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
      res.send(response.data);
      console.log(response.data);
    })
    .catch(function (error) {
      res.status(500).json({ error: "Erro ao pagar cobrança." });
      console.error(error);
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
      res.status(500).json({ error: "Erro ao listar cobranças." });
    });
});

app.get("/api/generatePixQRCode/:id", async (req, res) => {
  const id = req.params.id;

  const options = {
    method: "GET",
    url: `https://sandbox.asaas.com/api/v3/payments/${id}/pixQrCode`,
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
        error: "Erro ao gerar QR code do PIX.",
      });
    });
});

app.listen(port, () => {
  console.log(`${port} executando...`);
});
