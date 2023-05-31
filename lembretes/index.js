require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.json());

const lembretes = {};
let idAtual = 0;

const funcoes = {
    LembreteAnalisado: (lembrete) => {
        lembretes[lembrete.id] = lembrete;
        axios.post("http://localhost:10000/eventos", {
            tipo: "LembreteAtualizado",
            dados: {
                id: lembrete.id,
                texto: lembrete.texto,
                sentimento: lembrete.sentimento,
            },
        });
    },
};

//GET localhost:400/lembretes
app.get("/lembretes", (req, res) => {
    res.send(lembretes);
});

//POST localhost:400/lembretes
app.post("/lembretes", async (req, res) => {
    idAtual++;
    const { texto } = req.body;
    lembretes[idAtual] = {
        id: idAtual,
        texto,
        sentimento: "aguardando",
    };
    await axios.post("http://localhost:10000/eventos", {
        tipo: "LembreteCriado",
        dados: { id: idAtual, texto, sentimento: "aguardando" },
    });
    res.status(201).send(lembretes[idAtual]);
});

app.post("/eventos", (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    } catch (e) {}
    res.status(200).send({ msg: "ok" });
});

const { MSS_LEMBRETES_PORTA } = process.env;
app.listen(MSS_LEMBRETES_PORTA, () => {
    console.log(`Lembretes. Porta ${MSS_LEMBRETES_PORTA}`);
});
