let myp5;
let datos;

document.addEventListener("DOMContentLoaded", function () {
  const sketch = function (p) {
    p.setup = function () {
      const container = document.getElementById("canvasContainer");
      const canvasWidth = container.offsetWidth;
      const canvasHeight = container.offsetHeight || 250;
      p.createCanvas(canvasWidth, canvasHeight);
      p.textFont("Helvetica");
      p.textSize(15);
      p.noLoop();
    };

    p.windowResized = function () {
      const container = document.getElementById("canvasContainer");
      const newWidth = container.offsetWidth;
      const newHeight = container.offsetHeight || 250;
      p.resizeCanvas(newWidth, newHeight);
      if (datos) p.draw();
    };

    p.draw = function () {
      p.background(255);

      if (!datos) return;

      p.clear();
      p.background(255);

      let {
        x1,
        x2,
        v1,
        v2,
        tiempoEncuentro,
        puntoEncuentro,
        unidadSalida,
        t1Base,
        t2Base,
      } = datos;

      let factor = unidadSalida === "km" ? 1 / 1000 : 1;
      let x1Display = x1 * factor;
      let x2Display = x2 * factor;
      let puntoEncuentroDisplay = puntoEncuentro * factor;

      let x1EnTiempoMaxPartida = x1 + v1 * (Math.max(t1Base, t2Base) - t1Base);
      let x2EnTiempoMaxPartida = x2 + v2 * (Math.max(t1Base, t2Base) - t2Base);

      let x1TiempoMaxDisplay = x1EnTiempoMaxPartida * factor;
      let x2TiempoMaxDisplay = x2EnTiempoMaxPartida * factor;

      const margen = 50;
      const minPos = Math.min(
        x1Display,
        x2Display,
        x1TiempoMaxDisplay,
        x2TiempoMaxDisplay,
        puntoEncuentroDisplay
      );
      const maxPos = Math.max(
        x1Display,
        x2Display,
        x1TiempoMaxDisplay,
        x2TiempoMaxDisplay,
        puntoEncuentroDisplay
      );
      const distanciaTotal = maxPos - minPos;

      const distanciaConMargen = distanciaTotal * 1.3;
      const escala = (p.width - 2 * margen) / distanciaConMargen;
      const origenX = margen - minPos * escala * 0.85;

      function posicionEnCanvas(pos) {
        return pos * factor * escala + origenX;
      }

      const inicioX1 = posicionEnCanvas(x1);
      const inicioX2 = posicionEnCanvas(x2);

      const inicioX1Efectivo = posicionEnCanvas(x1EnTiempoMaxPartida);
      const inicioX2Efectivo = posicionEnCanvas(x2EnTiempoMaxPartida);

      const encuentroX = posicionEnCanvas(puntoEncuentro);

      p.stroke(200);
      p.strokeWeight(1);
      p.line(margen, p.height - 30, p.width - margen, p.height - 30);

      for (let i = 0; i <= 5; i++) {
        const x = margen + (i * (p.width - 2 * margen)) / 5;
        p.line(x, p.height - 35, x, p.height - 25);

        const valorReal = (x - origenX) / escala / factor;

        p.fill(0);
        p.noStroke();
        p.textAlign(p.CENTER);
        p.textSize(10);
        p.text(valorReal.toFixed(1) + " " + unidadSalida, x, p.height - 15);
      }

      if (Math.abs(t1Base - t2Base) > 0.0001) {
        p.stroke("rgba(0,0,255,0.3)");
        p.strokeWeight(2);
        p.drawingContext.setLineDash([5, 5]);
        p.line(inicioX1, 80, inicioX1Efectivo, 80);
        p.drawingContext.setLineDash([]);

        p.stroke("rgba(0,255,0,0.3)");
        p.strokeWeight(2);
        p.drawingContext.setLineDash([5, 5]);
        p.line(inicioX2, 120, inicioX2Efectivo, 120);
        p.drawingContext.setLineDash([]);
      }

      p.stroke("blue");
      p.strokeWeight(4);
      p.line(inicioX1Efectivo, 80, encuentroX, 80);

      p.stroke("green");
      p.strokeWeight(4);
      p.line(inicioX2Efectivo, 120, encuentroX, 120);

      p.noStroke();
      p.fill("blue");
      p.text("🚗 Posición inicial Obj1", inicioX1, 60);
      p.fill("green");
      p.text("🚙 Posición inicial Obj2", inicioX2, 140);

      p.fill("blue");
      p.stroke("black");
      p.strokeWeight(1);
      p.ellipse(inicioX1, 80, 8, 8);

      p.fill("green");
      p.stroke("black");
      p.strokeWeight(1);
      p.ellipse(inicioX2, 120, 8, 8);

      if (Math.abs(t1Base - t2Base) > 0.0001) {
        p.fill("darkblue");
        p.stroke("black");
        p.strokeWeight(1);
        p.ellipse(inicioX1Efectivo, 80, 6, 6);

        p.fill("darkgreen");
        p.stroke("black");
        p.strokeWeight(1);
        p.ellipse(inicioX2Efectivo, 120, 6, 6);
      }

      p.fill("red");
      p.stroke("black");
      p.strokeWeight(2);
      p.ellipse(encuentroX, 100, 12, 12);

      p.noStroke();
      p.fill("black");
      p.textAlign(p.CENTER);
      p.text("Punto de encuentro", encuentroX, 160);
      p.text(`t = ${tiempoEncuentro.toFixed(2)} s`, encuentroX, 175);
      p.text(
        `x = ${puntoEncuentroDisplay.toFixed(2)} ${unidadSalida}`,
        encuentroX,
        190
      );

      p.stroke("red");
      p.strokeWeight(2);
      p.line(encuentroX, 70, encuentroX, 130);

      p.noStroke();
      p.fill("black");
      p.textAlign(p.LEFT);
      p.textSize(12);
      p.text("Leyenda:", p.width - 150, 40);

      p.fill("blue");
      p.ellipse(p.width - 140, 55, 8, 8);
      p.fill("black");
      p.text("Posición inicial Obj1", p.width - 125, 58);

      p.fill("green");
      p.ellipse(p.width - 140, 75, 8, 8);
      p.fill("black");
      p.text("Posición inicial Obj2", p.width - 125, 78);

      p.fill("red");
      p.ellipse(p.width - 140, 95, 8, 8);
      p.fill("black");
      p.text("Punto de encuentro", p.width - 125, 98);

      drawArrow(inicioX1Efectivo + 20, 80, v1 > 0 ? 10 : -10, "blue");
      drawArrow(inicioX2Efectivo + 20, 120, v2 > 0 ? 10 : -10, "green");
    };

    function drawArrow(x, y, length, color) {
      const arrowSize = 5;
      p.stroke(color);
      p.strokeWeight(2);

      p.line(x, y, x + length, y);

      if (length > 0) {
        p.line(x + length, y, x + length - arrowSize, y - arrowSize);
        p.line(x + length, y, x + length - arrowSize, y + arrowSize);
      } else {
        p.line(x + length, y, x + length + arrowSize, y - arrowSize);
        p.line(x + length, y, x + length + arrowSize, y + arrowSize);
      }
    }
  };

  myp5 = new p5(sketch, "canvasContainer");


  const camposNumericos = [
    'posicion_x1', 'posicion_x2', 'velocidad_x1', 'velocidad_x2',
    'tiempo_x1', 'tiempo_x2'
  ];

  camposNumericos.forEach(id => {
    const campo = document.getElementById(id);
    if (campo) {
      campo.addEventListener('input', function () {
        validarCampoNumerico(this);
      });
      campo.addEventListener('blur', function () {
        validarCampoNumerico(this);
      });
    }
  });

  document
    .getElementById("calcularEncuentroBtn")
    .addEventListener("click", realizarCalculoEncuentro);
});


function interpretarValor(valorString) {
  if (!valorString || valorString.trim() === '') return 0;


  valorString = valorString.trim();


  if (esNumeroValido(valorString)) {
    const valor = parseFloat(valorString);
    return isNaN(valor) ? 0 : valor;
  }

  return 0;
}

function esNumeroValido(str) {
  if (!str || str.trim() === '') return false;

  str = str.trim();


  const patronNumerico = /^[-+]?(\d+\.?\d*|\.\d+)([eE][-+]?\d+)?$/;

  return patronNumerico.test(str) && !isNaN(parseFloat(str));
}


function validarCampoNumerico(campo) {
  const valor = campo.value.trim();


  campo.classList.remove('input-valido', 'input-invalido');

  if (valor === '') {

    campo.classList.add('input-valido');
    return true;
  }

  if (esNumeroValido(valor)) {
    campo.classList.add('input-valido');
    return true;
  } else {
    campo.classList.add('input-invalido');
    return false;
  }
}


function convertirAUnidadBase(valor, unidad) {
  if (!valor) return 0;

  switch (unidad) {
    case "km":
      return valor * 1000;
    case "km/h":
      return valor / 3.6;
    case "min":
      return valor * 60;
    case "h":
      return valor * 3600;
    default:
      return valor;
  }
}


function validarTodosLosCampos() {
  const camposRequeridos = [
    'posicion_x1', 'posicion_x2', 'velocidad_x1', 'velocidad_x2'
  ];

  let todosValidos = true;
  let mensajesError = [];

  camposRequeridos.forEach(id => {
    const campo = document.getElementById(id);
    const valor = campo.value.trim();

    if (valor === '') {
      mensajesError.push(`El campo ${campo.previousElementSibling.textContent} es requerido`);
      todosValidos = false;
    } else if (!esNumeroValido(valor)) {
      mensajesError.push(`El valor "${valor}" no es un número válido. Use formato decimal (ej: 123.45) o científico (ej: 1.23e4)`);
      todosValidos = false;
    }
  });


  const camposTiempo = ['tiempo_x1', 'tiempo_x2'];
  camposTiempo.forEach(id => {
    const campo = document.getElementById(id);
    const valor = campo.value.trim();

    if (valor !== '' && !esNumeroValido(valor)) {
      mensajesError.push(`El tiempo "${valor}" no es un número válido. Use formato decimal (ej: 123.45) o científico (ej: 1.23e4)`);
      todosValidos = false;
    }
  });

  if (!todosValidos) {
    alert("Errores en los datos ingresados:\n\n" + mensajesError.join('\n'));
  }

  return todosValidos;
}

function realizarCalculoEncuentro() {

  if (!validarTodosLosCampos()) {
    return;
  }

  const x1 = interpretarValor(document.getElementById("posicion_x1").value);
  const x2 = interpretarValor(document.getElementById("posicion_x2").value);
  const v1 = interpretarValor(document.getElementById("velocidad_x1").value);
  const v2 = interpretarValor(document.getElementById("velocidad_x2").value);
  const t1 = interpretarValor(document.getElementById("tiempo_x1").value);
  const t2 = interpretarValor(document.getElementById("tiempo_x2").value);
  const direccionElement = document.querySelector(
    'input[name="direccion_movimiento"]:checked'
  );

  if (!direccionElement) {
    alert("Por favor selecciona una dirección de movimiento");
    return;
  }

  const direccion = direccionElement.value;
  const unidadSalida = document.getElementById("unidadSalida").value;

  const x1Base = convertirAUnidadBase(
    x1,
    document.getElementById("unidad_posicion_x1").value
  );
  const x2Base = convertirAUnidadBase(
    x2,
    document.getElementById("unidad_posicion_x2").value
  );
  const v1Base = convertirAUnidadBase(
    v1,
    document.getElementById("unidad_velocidad_x1").value
  );
  const v2Base = convertirAUnidadBase(
    v2,
    document.getElementById("unidad_velocidad_x2").value
  );
  const t1Base = convertirAUnidadBase(
    t1,
    document.getElementById("unidad_tiempo_x1").value
  );
  const t2Base = convertirAUnidadBase(
    t2,
    document.getElementById("unidad_tiempo_x2").value
  );

  let v1Adjusted = v1Base;
  let v2Adjusted = v2Base;

  if (direccion === "opuestos") {
    if (x1Base < x2Base) {
      v2Adjusted = -v2Base;
    } else {
      v1Adjusted = -v1Base;
    }
  }

  let tiempoEncuentro, puntoEncuentro;

  if (Math.abs(v1Adjusted - v2Adjusted) < 0.0001) {
    if (Math.abs(x1Base - x2Base) < 0.0001) {
      tiempoEncuentro = Math.max(t1Base, t2Base);
    } else {
      alert(
        "No hay encuentro: los objetos tienen la misma velocidad y diferentes posiciones"
      );
      return;
    }
  } else {
    tiempoEncuentro =
      (x2Base - x1Base - v2Adjusted * t2Base + v1Adjusted * t1Base) /
      (v1Adjusted - v2Adjusted);
  }

  if (tiempoEncuentro < Math.max(t1Base, t2Base)) {
    const pos1EnTiempoMaxPartida =
      x1Base + v1Adjusted * (Math.max(t1Base, t2Base) - t1Base);
    const pos2EnTiempoMaxPartida =
      x2Base + v2Adjusted * (Math.max(t1Base, t2Base) - t2Base);

    if (Math.abs(pos1EnTiempoMaxPartida - pos2EnTiempoMaxPartida) < 0.0001) {
      tiempoEncuentro = Math.max(t1Base, t2Base);
    } else {
      const tiempoEncuentroRelativoT1 =
        t1Base + (x2Base - x1Base) / (v1Adjusted - v2Adjusted);
      const tiempoEncuentroRelativoT2 =
        t2Base + (x1Base - x2Base) / (v2Adjusted - v1Adjusted);

      if (
        (tiempoEncuentroRelativoT1 >= t1Base &&
          tiempoEncuentroRelativoT1 < t2Base) ||
        (tiempoEncuentroRelativoT2 >= t2Base &&
          tiempoEncuentroRelativoT2 < t1Base)
      ) {
        alert("Los objetos se cruzaron antes de que ambos partieran");
        return;
      }

      alert(
        "No hay encuentro: el tiempo calculado es anterior al tiempo de partida de uno de los objetos"
      );
      return;
    }
  }

  puntoEncuentro = x1Base + v1Adjusted * (tiempoEncuentro - t1Base);

  if (direccion === "mismo") {
    const v1Mayor = Math.abs(v1Adjusted) > Math.abs(v2Adjusted);
    const x1Detras =
      (x1Base < x2Base && v1Adjusted > 0) ||
      (x1Base > x2Base && v1Adjusted < 0);

    if (v1Mayor && !x1Detras) {
      alert(
        "No hay encuentro: el primer objeto es más rápido pero ya pasó al segundo"
      );
      return;
    }

    if (!v1Mayor && x1Detras) {
      alert(
        "No hay encuentro: el segundo objeto es más rápido pero ya pasó al primero"
      );
      return;
    }
  }


  const tiempoFormateado = formatearNumero(tiempoEncuentro);
  const factorConversion = unidadSalida === "km" ? 0.001 : 1;
  const puntoEncuentroFormateado = formatearNumero(puntoEncuentro * factorConversion);

  document.getElementById("tiempoEncuentro").value = `${tiempoFormateado} s`;
  document.getElementById("resultadoEncuentros").value = `${puntoEncuentroFormateado} ${unidadSalida}`;

  datos = {
    x1: x1Base,
    x2: x2Base,
    v1: v1Adjusted,
    v2: v2Adjusted,
    direccion: direccion,
    tiempoEncuentro: tiempoEncuentro,
    puntoEncuentro: puntoEncuentro,
    unidadSalida: unidadSalida,
    t1Base: t1Base,
    t2Base: t2Base,
  };

  if (myp5) myp5.draw();
}


function formatearNumero(numero) {
  if (Math.abs(numero) >= 1000000 || (Math.abs(numero) < 0.001 && numero !== 0)) {
    return numero.toExponential(3);
  } else {
    return numero.toFixed(3);
  }
}