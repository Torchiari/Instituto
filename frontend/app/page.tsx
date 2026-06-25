"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [led, setLed] = useState(false);
  const [contador, setContador] = useState(0);

  const loadState = async () => {
    const response = await fetch("https://instituto-z9pl.onrender.com/led");

    const data = await response.json();

    setLed(data.state);
    setContador(data.contador);
  };

  const toggleLed = async () => {
    const response = await fetch("https://instituto-z9pl.onrender.com/toggle", {
      method: "POST",
    });

    const data = await response.json();

    setLed(data.state);
  };

  useEffect(() => {
    loadState();

    const interval = setInterval(() => {
      loadState();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <h1>{led ? "💡 Luz Encendida" : "⚫ Luz Apagada"}</h1>

      <button onClick={toggleLed}>Cambiar de Estado</button>
      <h2>Contador: {contador}</h2>
    </main>
  );
}
