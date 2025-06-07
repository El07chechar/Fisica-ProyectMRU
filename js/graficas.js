let tramos = [];

// Variables globales para los gráficos
let graficaVelocidad = null;
let graficaDistancia = null;

function agregarTramo() {
  const v = parseFloat(document.getElementById("velocidad-grafica").value);
  const d = parseInt(document.getElementById("duracion-grafica").value);
  if (isNaN(v) || isNaN(d) || d <= 0) {
    alert("Por favor ingresa una velocidad válida y una duración mayor a 0.");
    return;
  }
  tramos.push({ velocidad: v, duracion: d });

  mostrarTramos();

  // Limpiar campos
  document.getElementById("velocidad-grafica").value = "";
  document.getElementById("duracion-grafica").value = "";
}

function mostrarTramos() {
  const lista = document.getElementById("listaTramos");
  lista.innerHTML = ""; // Limpiamos lo anterior

  if (tramos.length === 0) {
    lista.innerHTML = '<li class="estado-vacio">No hay tramos agregados</li>';
    return;
  }

  tramos.forEach((tramo, index) => {
    const item = document.createElement("li");
    item.textContent = `Tramo ${index + 1}: Velocidad = ${tramo.velocidad} m/s, Duración = ${tramo.duracion} s`;
    lista.appendChild(item);
  });
}

function limpiarTodo() {
  // Vaciar array
  tramos = [];

  // Actualizar lista
  mostrarTramos();

  // Destruir gráficos si existen
  if (graficaVelocidad) {
    graficaVelocidad.destroy();
    graficaVelocidad = null;
  }
  if (graficaDistancia) {
    graficaDistancia.destroy();
    graficaDistancia = null;
  }
}

function generarGraficas() {
  if (tramos.length === 0) {
    alert("No hay tramos para graficar.");
    return;
  }

  // Primero destruir gráficos anteriores si existen para evitar superposiciones
  if (graficaVelocidad) {
    graficaVelocidad.destroy();
  }
  if (graficaDistancia) {
    graficaDistancia.destroy();
  }

  let tiempo = [];
  let velocidadY = [];
  let distanciaY = [];

  let t = 0;
  let posicion = 0;

  tramos.forEach((tramo) => {
    for (let i = 0; i < tramo.duracion; i++) {
      tiempo.push(t);
      velocidadY.push(tramo.velocidad);
      posicion += tramo.velocidad; // incremento de distancia en 1s
      distanciaY.push(posicion);
      t++;
    }
  });

  // Crear gráfico de velocidad vs tiempo y asignar a variable global
  const ctxVel = document.getElementById("graficaVelocidad").getContext("2d");
  graficaVelocidad = new Chart(ctxVel, {
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
          stepped: true,
        },
      ],
    },
    options: {
      scales: {
        x: {
          title: { display: true, text: "Tiempo (s)" },
          grid: { color: (context) => (context.tick.value === 0 ? "#000" : "#ccc") },
          ticks: { color: (context) => (context.tick.value === 0 ? "#000" : "#333") },
        },
        y: {
          title: { display: true, text: "Velocidad (m/s)" },
          grid: { color: (context) => (context.tick.value === 0 ? "#000" : "#ccc") },
          ticks: { color: (context) => (context.tick.value === 0 ? "#000" : "#333") },
        },
      },
    },
  });

  // Crear gráfico de distancia vs tiempo y asignar a variable global
  const ctxDist = document.getElementById("graficaDistancia").getContext("2d");
  graficaDistancia = new Chart(ctxDist, {
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
          grid: { color: (context) => (context.tick.value === 0 ? "#000" : "#ccc") },
          ticks: { color: (context) => (context.tick.value === 0 ? "#000" : "#333") },
        },
        y: {
          title: { display: true, text: "Distancia (m)" },
          grid: { color: (context) => (context.tick.value === 0 ? "#000" : "#ccc") },
          ticks: { color: (context) => (context.tick.value === 0 ? "#000" : "#333") },
        },
      },
    },
  });
}
