document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  
  // Función para parsear números incluyendo notación científica
  function parseNumber(value) {
    if (!value || value.trim() === '') return NaN;
    
    // Reemplazar 'e' o 'E' por notación científica válida si es necesario
    const cleanValue = value.trim().replace(/[eE]/g, 'e');
    const parsed = parseFloat(cleanValue);
    
    return isNaN(parsed) ? NaN : parsed;
  }
  
  // Función para formatear números con notación científica cuando sea apropiado
  function formatNumber(num, decimals = 4) {
    if (isNaN(num)) return '';
    
    // Si el número es muy grande o muy pequeño, usar notación científica
    if (Math.abs(num) >= 1e6 || (Math.abs(num) < 0.001 && num !== 0)) {
      return num.toExponential(decimals);
    }
    
    // Para números normales, usar formato decimal
    return parseFloat(num.toFixed(decimals)).toString();
  }
  
  // Obtener valores de entrada
  const vInput = document.getElementById("velocidad").value;
  const vUnidad = document.getElementById("velocidadUnidad").value;
  
  const tInput = document.getElementById("tiempo").value;
  const tUnidad = document.getElementById("tiempoUnidad").value;
  
  const dInput = document.getElementById("distancia").value;
  const dUnidad = document.getElementById("distanciaUnidad").value;
  
  // Parsear valores permitiendo notación científica
  const v = parseNumber(vInput);
  const t = parseNumber(tInput);
  const d = parseNumber(dInput);
  
  // Validar entrada
  const valoresIngresados = [!isNaN(v), !isNaN(t), !isNaN(d)].filter(Boolean).length;
  
  if (valoresIngresados !== 2) {
    alert("Debes ingresar exactamente 2 valores.");
    document.getElementById("resultado").value = "";
    return;
  }
  
  // Validar que los valores sean positivos
  const valores = [v, t, d].filter(val => !isNaN(val));
  if (valores.some(val => val <= 0)) {
    alert("Todos los valores deben ser positivos.");
    document.getElementById("resultado").value = "";
    return;
  }
  
  try {
    // Conversión de unidades a estándar (SI)
    let velocidad = v;
    if (!isNaN(v)) {
      switch(vUnidad) {
        case "km/h":
          velocidad = v / 3.6; // Conversión más precisa
          break;
        case "cm/s":
          velocidad = v / 100;
          break;
        // m/s es la unidad base, no necesita conversión
      }
    }
    
    let tiempo = t;
    if (!isNaN(t)) {
      switch(tUnidad) {
        case "min":
          tiempo = t * 60;
          break;
        case "h":
          tiempo = t * 3600;
          break;
        case "ms":
          tiempo = t / 1000;
          break;
        // s es la unidad base, no necesita conversión
      }
    }
    
    let distancia = d;
    if (!isNaN(d)) {
      switch(dUnidad) {
        case "km":
          distancia = d * 1000;
          break;
        case "cm":
          distancia = d / 100;
          break;
        case "mm":
          distancia = d / 1000;
          break;
        // m es la unidad base, no necesita conversión
      }
    }
    
    let resultado;
    let unidadResultado;
    let tipoCalculo;
    
    // Calcular valor faltante usando v = d/t
    if (isNaN(v)) {
      // Calcular velocidad
      resultado = distancia / tiempo;
      unidadResultado = "m/s";
      tipoCalculo = "velocidad";
    } else if (isNaN(t)) {
      // Calcular tiempo
      resultado = distancia / velocidad;
      unidadResultado = "s";
      tipoCalculo = "tiempo";
    } else if (isNaN(d)) {
      // Calcular distancia
      resultado = velocidad * tiempo;
      unidadResultado = "m";
      tipoCalculo = "distancia";
    }
    
    // Validar resultado
    if (!isFinite(resultado) || resultado <= 0) {
      alert("Error en el cálculo. Verifica los valores ingresados.");
      document.getElementById("resultado").value = "";
      return;
    }
    
    // Mostrar resultado formateado
    const resultadoFormateado = formatNumber(resultado);
    document.getElementById("resultado").value = `${resultadoFormateado} ${unidadResultado}`;
    
    // Opcional: mostrar información adicional en consola para debugging
    console.log(`Calculado: ${tipoCalculo} = ${resultadoFormateado} ${unidadResultado}`);
    
  } catch (error) {
    console.error("Error en el cálculo:", error);
    alert("Error inesperado en el cálculo. Verifica los valores ingresados.");
    document.getElementById("resultado").value = "";
  }
});