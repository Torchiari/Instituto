"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [led, setLed] = useState(false);
  const [contador, setContador] = useState(0);

  const loadState = async () => {
    const ledResponse = await fetch("https://instituto-z9pl.onrender.com/led");
    const ledData = await ledResponse.json();
    setLed(ledData.state);

    const contadorResponse = await fetch(
      "https://instituto-z9pl.onrender.com/contador",
    );
    const contadorData = await contadorResponse.json();
    setContador(contadorData.contador);
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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Control de Iluminación
        </h1>

        {/* Estado */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div
            className={`w-32 h-32 rounded-full flex items-center justify-center text-6xl transition-all duration-500 ${
              led
                ? "bg-yellow-300 shadow-[0_0_60px_rgba(255,220,0,0.8)]"
                : "bg-gray-300"
            }`}
          >
            💡
          </div>

          <span
            className={`text-xl font-bold ${
              led ? "text-green-600" : "text-red-600"
            }`}
          >
            {led ? "Luz Encendida" : "Luz Apagada"}
          </span>
        </div>

        {/* Botón */}
        <button
          onClick={toggleLed}
          className={`w-full py-4 rounded-xl text-white text-lg font-semibold transition duration-300 active:scale-95 ${
            led
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {led ? "Apagar Luz" : "Encender Luz"}
        </button>

        {/* Contador */}
        <div className="mt-8 bg-slate-100 rounded-2xl p-5">
          <p className="text-gray-500 text-sm">Cantidad de cambios</p>

          <p className="text-4xl font-bold text-slate-800 mt-2">{contador}</p>
        </div>
      </div>
    </main>
  );
}
