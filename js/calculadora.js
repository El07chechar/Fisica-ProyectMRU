
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const v = parseFloat(document.getElementById("velocidad").value);
  const vUnidad = document.getElementById("velocidadUnidad").value;

  const t = parseFloat(document.getElementById("tiempo").value);
  const tUnidad = document.getElementById("tiempoUnidad").value;

  const d = parseFloat(document.getElementById("distancia").value);
  const dUnidad = document.getElementById("distanciaUnidad").value;

  let valoresIngresados = [!isNaN(v), !isNaN(t), !isNaN(d)].filter(Boolean).length;

  // Verificación
  if (valoresIngresados !== 2) {
    alert("Debes ingresar exactamente 2 valores.");
    document.getElementById("resultado").value = "";
    return;
  }

  // Conversión de unidades a estándar
  let velocidad = v;
  if (vUnidad === "km/h") velocidad = v * 1000 / 3600;

  let tiempo = t;
  if (tUnidad === "min") tiempo = t * 60;
  if (tUnidad === "h") tiempo = t * 3600;

  let distancia = d;
  if (dUnidad === "km") distancia = d * 1000;

  let resultado;

  // Calcular valor faltante
  if (isNaN(v)) {
    resultado = distancia / tiempo;
    document.getElementById("resultado").value = resultado.toFixed(2); // m/s
  } else if (isNaN(t)) {
    resultado = distancia / velocidad;
    document.getElementById("resultado").value = resultado.toFixed(2); // s
  } else if (isNaN(d)) {
    resultado = velocidad * tiempo;
    document.getElementById("resultado").value = resultado.toFixed(2); // m
  }
});
