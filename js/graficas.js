let tramos = [];

function agregarTramo() {
  const v = parseFloat(document.getElementById("velocidad-grafica").value);
  const d = parseInt(document.getElementById("duracion-grafica").value);
  if (isNaN(v) || isNaN(d) || d <= 0) {
    alert("Por favor ingresa una velocidad válida y una duración mayor a 0.");
    return;
  }
  tramos.push({ velocidad: v, duracion: d });

  mostrarTramos();

  alert(`Tramo agregado: Vel = ${v} m/s por ${d} s`);

  // Limpiar campos
  document.getElementById("velocidad-grafica").value = "";
  document.getElementById("duracion-grafica").value = "";
}

function mostrarTramos() {
  const lista = document.getElementById("listaTramos");
  lista.innerHTML = ""; // Limpiamos lo anterior

  tramos.forEach((tramo, index) => {
    const item = document.createElement("li");
    item.textContent = `Tramo ${index + 1}: Velocidad = ${tramo.velocidad
      } m/s, Duración = ${tramo.duracion} s`;
    lista.appendChild(item);
  });
}

// graficacion
// velocidad funcion tiempo
let tiempo = [];
let velocidad = [];
let t = 0;

tramos.forEach((tramo) => {
  for (let i = 0; i < tramo.duracion; i++) {
    tiempo.push(t);
    velocidad.push(tramo.velocidad);
    t++;
  }
});

// distancia funcion tiempo

let distancia = [];
let posicion = 0;
t = 0;

tramos.forEach((tramo) => {
  for (let i = 0; i < tramo.duracion; i++) {
    posicion += tramo.velocidad; // desplazamiento en 1s
    distancia.push(posicion);
    t++;
  }
});

// charts

function generarGraficas() {
  let tiempo = [];
  let velocidadY = [];
  let distanciaY = [];

  let t = 0;
  let posicion = 0;

  tramos.forEach((tramo) => {
    for (let i = 0; i < tramo.duracion; i++) {
      tiempo.push(t);
      velocidadY.push(tramo.velocidad);
      posicion += tramo.velocidad;
      distanciaY.push(posicion);
      t++;
    }
  });

  // Crear gráfico de velocidad vs tiempo
  new Chart(document.getElementById("graficaVelocidad"), {
    type: "line",
    data: {
      labels: tiempo,
      datasets: [
        {
          label: "Velocidad (m/s)",
          data: velocidadY,
          fill: false,
          borderColor: "blue",
          tension: 0,
          stepped: true, // Para que la gráfica sea tipo escalón
        },
      ],
    },
    options: {
      scales: {
        x: {
          title: { display: true, text: "Tiempo (s)" },
          grid: {
            color: (context) => (context.tick.value === 0 ? "#000" : "#ccc"),
          },
          ticks: {
            color: (context) => (context.tick.value === 0 ? "#000" : "#333"),
          },
        },
        y: {
          title: { display: true, text: "Velocidad (m/s)" },
          grid: {
            color: (context) => (context.tick.value === 0 ? "#000" : "#ccc"),
          },
          ticks: {
            color: (context) => (context.tick.value === 0 ? "#000" : "#333"),
          },
        },
      },
    },
  });

  // Crear gráfico de distancia vs tiempo
  new Chart(document.getElementById("graficaDistancia"), {
    type: "line",
    data: {
      labels: tiempo,
      datasets: [
        {
          label: "Distancia (m)",
          data: distanciaY,
          fill: false,
          borderColor: "green",
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          title: { display: true, text: "Tiempo (s)" },
          grid: {
            color: (context) => (context.tick.value === 0 ? "#000" : "#ccc"),
          },
          ticks: {
            color: (context) => (context.tick.value === 0 ? "#000" : "#333"),
          },
        },
        y: {
          title: { display: true, text: "Velocidad (m/s)" },
          grid: {
            color: (context) => (context.tick.value === 0 ? "#000" : "#ccc"),
          },
          ticks: {
            color: (context) => (context.tick.value === 0 ? "#000" : "#333"),
          },
        },
      },
    },
  });
}
