let datos = null;

document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('calcularEncuentroBtn');

  btn.addEventListener('click', function () {
    let x1 = parseFloat(document.getElementById('posicion_x1').value);
    let x2 = parseFloat(document.getElementById('posicion_x2').value);
    let v1 = parseFloat(document.getElementById('velocidad_x1').value);
    let v2 = parseFloat(document.getElementById('velocidad_x2').value);
    let t1 = parseFloat(document.getElementById('tiempo_x1').value);
    let t2 = parseFloat(document.getElementById('tiempo_x2').value);
    const direccion = document.getElementById('direccion_movimiento').value;

    const resultadoField = document.getElementById('resultadoEncuentros');

    const unidad_posicion_x1 = document.getElementById('unidad_posicion_x1').value;
    const unidad_posicion_x2 = document.getElementById('unidad_posicion_x2').value;
    const unidad_velocidad_x1 = document.getElementById('unidad_velocidad_x1').value;
    const unidad_velocidad_x2 = document.getElementById('unidad_velocidad_x2').value;
    const unidad_tiempo_x1 = document.getElementById('unidad_tiempo_x1').value;
    const unidad_tiempo_x2 = document.getElementById('unidad_tiempo_x2').value;

    if (
      isNaN(x1) || isNaN(x2) || isNaN(v1) || isNaN(v2) ||
      isNaN(t1) || isNaN(t2) || direccion === ''
    ) {
      resultadoField.value = 'Por favor completa todos los campos correctamente.';
      return;
    }

    if (v1 < 0 || v2 < 0) {
      resultadoField.value = 'Las velocidades deben ser positivas.';
      return;
    }

    function convertirPosicion(valor, unidad) {
      return unidad === 'km' ? valor * 1000 : valor;
    }

    function convertirVelocidad(valor, unidad) {
      return unidad === 'km/h' ? valor * (1000 / 3600) : valor;
    }

    function convertirTiempo(valor, unidad) {
      if (unidad === 'min') return valor * 60;
      if (unidad === 'h') return valor * 3600;
      return valor;
    }


    const unidadSalida = unidad_posicion_x1 === 'km' || unidad_posicion_x2 === 'km' ? 'km' : 'm';
    x1 = convertirPosicion(x1, unidad_posicion_x1);
    x2 = convertirPosicion(x2, unidad_posicion_x2);
    v1 = convertirVelocidad(v1, unidad_velocidad_x1);
    v2 = convertirVelocidad(v2, unidad_velocidad_x2);
    t1 = convertirTiempo(t1, unidad_tiempo_x1);
    t2 = convertirTiempo(t2, unidad_tiempo_x2);

    const pos1 = x1 + v1 * t1;
    const pos2 = x2 + v2 * t2;

    let tiempoEncuentro;

    if (direccion === 'opuestos') {
      tiempoEncuentro = Math.abs(pos2 - pos1) / (v1 + v2);
    } else if (direccion === 'mismo') {
      if (v1 === v2) {
        if (pos1 === pos2) {
          tiempoEncuentro = 0;
        } else {
          resultadoField.value = 'No se encontrarán: velocidades iguales y distinta posición.';
          return;
        }
      } else {
        tiempoEncuentro = Math.abs(pos2 - pos1) / Math.abs(v1 - v2);
      }
    } else {
      resultadoField.value = 'Selecciona una dirección válida.';
      return;
    }

    if (tiempoEncuentro < 0) {
      resultadoField.value = 'No se encontrarán (tiempo negativo).';
      return;
    }

    const puntoEncuentro = x1 + v1 * tiempoEncuentro;

    resultadoField.value = `Se encuentran en t = ${tiempoEncuentro.toFixed(2)} s, en x = ${unidadSalida === 'km' ? (puntoEncuentro / 1000).toFixed(2) : puntoEncuentro.toFixed(2)} ${unidadSalida}.`;

    datos = {
      x1, x2, v1, v2, t1, t2, direccion, tiempoEncuentro, puntoEncuentro, unidadSalida
    };
    redraw(); 
  });
});