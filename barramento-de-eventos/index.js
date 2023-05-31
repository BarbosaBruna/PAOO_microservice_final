require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const { BARRAMENTO_PORTA, BARRAMENTO_HOSTS } = process.env;

app.post("/eventos", (req, res) => {
    const evento = req.body;
    console.log(evento)

    axios.post(`http://${BARRAMENTO_HOSTS}:4000/eventos`, evento);

    axios.post(`http://${BARRAMENTO_HOSTS}:5000/eventos`, evento);

    axios.post(`http://${BARRAMENTO_HOSTS}:6000/eventos`, evento);

    axios.post(`http://${BARRAMENTO_HOSTS}:7000/eventos`, evento);

    axios.post(`http://${BARRAMENTO_HOSTS}:8000/eventos`, evento);

    res.status(200).send({ msg: "ok" });
});

app.listen(BARRAMENTO_PORTA, () =>
    console.log(`Barramento. ${BARRAMENTO_PORTA}`)
);
