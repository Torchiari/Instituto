const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let ledState = false;
let contador = 0;

app.get("/led", (req, res) => {
  res.json({
    state: ledState,
  });
});

app.get("/contador", (req, res) => {
  res.json({
    contador: contador,
  });
});

app.post("/toggle", (req, res) => {
  ledState = !ledState;

  res.json({
    state: ledState,
    contador: contador,
  });
});

app.post("/contador", (req, res) => {
  contador = req.body.contador;

  res.json({
    ok: true,
    contador: contador,
  });
});

app.listen(3001, () => {
  console.log("Servidor iniciado");
});
