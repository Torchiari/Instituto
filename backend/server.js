const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let ledState = false;

app.get("/led", (req, res) => {
  res.json({
    state: ledState,
  });
});

app.post("/toggle", (req, res) => {
  ledState = !ledState;

  res.json({
    state: ledState,
  });
});

app.listen(3001, () => {
  console.log("Servidor iniciado");
});
