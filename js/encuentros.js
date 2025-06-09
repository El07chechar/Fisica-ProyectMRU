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
                encuentroEnTiempoCero
            } = datos;

            if (encuentroEnTiempoCero) {
                let factor = unidadSalida === "km" ? 1 / 1000 : 1;
                let posicionDisplay = puntoEncuentro * factor;

                let mensaje = `🔴 ENCUENTRO INMEDIATO DETECTADO\n\n`;
                mensaje += `Los objetos ya se encuentran en la misma posición al inicio del movimiento.\n\n`;
                mensaje += `📍 Posición del encuentro: ${posicionDisplay.toFixed(2)} ${unidadSalida}\n`;
                mensaje += `⏰ Tiempo: ${tiempoEncuentro.toFixed(2)} s\n\n`;
                mensaje += `✅ Para evitar esto, puedes:\n`;
                mensaje += `• Cambiar las posiciones iniciales de los objetos\n`;
                mensaje += `• Modificar los tiempos de inicio\n`;
                mensaje += `• Ajustar las velocidades`;

                Swal.fire({
                    icon: 'warning',
                    title: 'Dato inválido',
                    text: mensaje,
                    confirmButtonText: 'Entendido',
                    timer: 5000,
                    timerProgressBar: true
                });

                datos = null;
                return;
            }

            let factor = unidadSalida === "km" ? 1 / 1000 : 1;
            let x1Display = x1 * factor;
            let x2Display = x2 * factor;
            let puntoEncuentroDisplay = puntoEncuentro * factor;

            let x1EnTiempoMaxPartida = x1 + v1 * (Math.max(t1Base, t2Base) - t1Base);
            let x2EnTiempoMaxPartida = x2 + v2 * (Math.max(t1Base, t2Base) - t2Base);

            let x1TiempoMaxDisplay = x1EnTiempoMaxPartida * factor;
            let x2TiempoMaxDisplay = x2EnTiempoMaxPartida * factor;

            const margen = 50;
            const minPos = Math.min(x1Display, x2Display, x1TiempoMaxDisplay, x2TiempoMaxDisplay, puntoEncuentroDisplay);
            const maxPos = Math.max(x1Display, x2Display, x1TiempoMaxDisplay, x2TiempoMaxDisplay, puntoEncuentroDisplay);
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

            let valoresClave = [
                { valor: x1, color: "blue" },
                { valor: x2, color: "green" },
                { valor: puntoEncuentro, color: "red" },
                { valor: x1EnTiempoMaxPartida, color: "violet" },
                { valor: x2EnTiempoMaxPartida, color: "violet" }
            ];

            valoresClave = valoresClave.filter((v, i, self) => self.findIndex(o => o.valor === v.valor) === i)
                .sort((a, b) => a.valor - b.valor);

            valoresClave.forEach(({ valor, color }) => {
                const x = posicionEnCanvas(valor);
                if (x >= margen && x <= p.width - margen) {
                    p.stroke(150);
                    p.line(x, p.height - 35, x, p.height - 25);
                    p.noStroke();
                    p.fill(color);
                    p.textAlign(p.CENTER);
                    p.textSize(10);
                    p.text((valor * factor).toFixed(2) + " " + unidadSalida, x, p.height - 15);
                }
            });

            if (Math.abs(t1Base - t2Base) > 0.0001) {
                p.stroke("rgba(0,0,200,0.6)");
                p.strokeWeight(2);
                p.drawingContext.setLineDash([5, 5]);
                p.line(inicioX1, 80, inicioX1Efectivo, 80);
                p.drawingContext.setLineDash([]);

                p.stroke("rgba(0,150,0,0.6)");
                p.strokeWeight(2);
                p.drawingContext.setLineDash([5, 5]);
                p.line(inicioX2, 120, inicioX2Efectivo, 120);
                p.drawingContext.setLineDash([]);
            }

            p.stroke("blue");
            p.strokeWeight(4);
            p.line(inicioX1Efectivo, 80, encuentroX, 80);
            p.stroke("green");
            p.line(inicioX2Efectivo, 120, encuentroX, 120);

            p.textAlign(p.CENTER);
            p.noStroke();
            p.fill("blue");
            p.text("🚗 Posición inicial Obj1", inicioX1, 60);
            p.fill("black");
            p.text(`Parte en t = ${t1Base.toFixed(2)} s`, inicioX1, 75);

            p.fill("green");
            p.text("🚙 Posición inicial Obj2", inicioX2, 140);
            p.fill("black");
            p.text(`Parte en t = ${t2Base.toFixed(2)} s`, inicioX2, 155);

            p.fill("blue");
            p.stroke("black");
            p.strokeWeight(1);
            p.ellipse(inicioX1, 80, 10, 10);

            p.fill("green");
            p.stroke("black");
            p.strokeWeight(1);
            p.ellipse(inicioX2, 120, 10, 10);

            // ✅ Punto único de inicio efectivo Obj1
            p.fill("orange");
            p.ellipse(inicioX1Efectivo, 80, 8, 8);

            // ✅ Punto único de inicio efectivo Obj2
            p.fill("yellow");
            p.ellipse(inicioX2Efectivo, 120, 8, 8);

            // ✅ Líneas verticales para comparar
            p.stroke("orange");
            p.drawingContext.setLineDash([4, 4]);
            p.line(inicioX1Efectivo, 60, inicioX1Efectivo, 140);
            p.stroke("yellow");
            p.line(inicioX2Efectivo, 60, inicioX2Efectivo, 140);
            p.drawingContext.setLineDash([]);

            p.fill("red");
            p.ellipse(encuentroX, 100, 12, 12);

            p.fill("black");
            p.textAlign(p.CENTER);
            p.text("Punto de encuentro", encuentroX, 160);
            p.text(`t = ${tiempoEncuentro.toFixed(2)} s`, encuentroX, 175);
            p.text(`x = ${puntoEncuentroDisplay.toFixed(2)} ${unidadSalida}`, encuentroX, 190);

            p.stroke("red");
            p.strokeWeight(2);
            p.line(encuentroX, 70, encuentroX, 130);

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


    // MEJORADO: Validación visual sin modificar contenido + prevenir recarga
    const camposNumericos = [
        'posicion_x1', 'posicion_x2', 'velocidad_x1', 'velocidad_x2',
        'tiempo_x1', 'tiempo_x2'
    ];

    camposNumericos.forEach(id => {
        const campo = document.getElementById(id);
        if (campo) {
            // Solo validar visualmente al perder el foco
            campo.addEventListener('blur', function () {
                validarCampoVisualmente(this);
            });

            // NUEVO: Prevenir cualquier intento de limpiar con Enter
            campo.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault(); // Evitar submit del form
                    // Solo disparar el cálculo si hay datos
                    if (this.value.trim() !== '') {
                        realizarCalculoEncuentro();
                    }
                }
            });
        }
    });

    // MEJORADO: Cambio de dirección sin borrar campos
    const radiosDireccion = document.querySelectorAll('input[name="direccion_movimiento"]');
    radiosDireccion.forEach(radio => {
        radio.addEventListener('change', function (e) {
            e.preventDefault(); // Prevenir cualquier comportamiento por defecto
            // Solo recalcular si ya tenemos datos válidos
            if (datos && validarCamposBasicos()) {
                realizarCalculoEncuentro();
            }
        });
    });

    // MEJORADO: Botón de cálculo con prevención de recarga
    const btnCalcular = document.getElementById("calcularEncuentroBtn");
    if (btnCalcular) {
        btnCalcular.addEventListener('click', function (e) {
            e.preventDefault(); // CRÍTICO: Prevenir submit del formulario
            e.stopPropagation(); // Evitar propagación del evento
            realizarCalculoEncuentro();
        });
    }

    // NUEVO: Función para limpiar todos los campos
    const btnLimpiar = document.getElementById("limpiarCamposBtn");
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            limpiarTodosCampos();
        });
    }

    // NUEVO: Prevenir submit del formulario si existe
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Evitar recarga de página
            realizarCalculoEncuentro();
        });
    });
});

// NUEVA FUNCIÓN: Limpiar todos los campos de entrada y resultados
// NUEVA FUNCIÓN: Limpiar todos los campos de entrada y resultados
// NUEVA FUNCIÓN: Limpiar todos los campos reiniciando la página
function limpiarTodosCampos() {
    try {
        // Reiniciar la página completamente
        window.location.reload();

    } catch (error) {
        console.error("Error al limpiar campos:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error al limpiar campos',
            text: "Error al limpiar los campos. Recarga la página si el problema persiste.",
            confirmButtonText: 'Entendido',
            timer: 5000, // se cierra automáticamente a los 5 segundos
            timerProgressBar: true
        });
    }
}

// FUNCIÓN COMPLETAMENTE SEGURA: Solo lee valores, NUNCA los modifica
function interpretarValor(valorString) {
    // Si está vacío, devolver 0 sin tocar el campo original
    if (!valorString || valorString.trim() === '') return 0;

    const valorLimpio = valorString.trim();

    // Si es un número válido, convertirlo
    if (esNumeroValido(valorLimpio)) {
        const valor = parseFloat(valorLimpio);
        return isNaN(valor) ? 0 : valor;
    }

    // Si no es válido, devolver 0 sin modificar el campo
    return 0;
}

// FUNCIÓN COMPLETAMENTE SEGURA: Solo valida formato
function esNumeroValido(str) {
    if (!str || str.trim() === '') return false;

    const strLimpio = str.trim();
    const patronNumerico = /^[-+]?(\d+\.?\d*|\.\d+)([eE][-+]?\d+)?$/;

    return patronNumerico.test(strLimpio) && !isNaN(parseFloat(strLimpio));
}

// FUNCIÓN COMPLETAMENTE SEGURA: Solo validación visual, NUNCA modifica contenido
function validarCampoVisualmente(campo) {
    const valor = campo.value.trim();

    // Remover clases anteriores
    campo.classList.remove('input-valido', 'input-invalido');

    // Aplicar clase según validez, pero NUNCA cambiar el valor
    if (valor === '' || esNumeroValido(valor)) {
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

function obtenerNombreCampo(id) {
    const nombres = {
        'posicion_x1': 'Posición del objeto 1',
        'posicion_x2': 'Posición del objeto 2',
        'velocidad_x1': 'Velocidad del objeto 1',
        'velocidad_x2': 'Velocidad del objeto 2',
        'tiempo_x1': 'Tiempo de inicio del objeto 1',
        'tiempo_x2': 'Tiempo de inicio del objeto 2'
    };
    return nombres[id] || id;
}

function crearMensajeError(campo, valor, tipo) {
    const nombreCampo = obtenerNombreCampo(campo.id);

    if (tipo === 'requerido') {
        return `${nombreCampo}: Campo requerido`;
    } else if (tipo === 'formato') {
        return `${nombreCampo}: "${valor}" no es un número válido`;
    }
    return `Error en ${nombreCampo}`;
}

function mostrarErroresAmigables(errores) {
    if (errores.length === 0) return;

    let mensaje = "🔧 Necesitas completar estos campos:<br><br>";

    errores.forEach((error, index) => {
        mensaje += `${index + 1}. ${error}<br>`;
    });

    Swal.fire({
        icon: 'warning',
        title: 'Dato inválido',
        html: mensaje,
        confirmButtonText: 'Entendido',
        timer: 5000, // se cierra automáticamente a los 5 segundos
        timerProgressBar: true
    });
}

function mostrarErrorEspecifico(tipo, detalles = '') {
    const mensajes = {
        'direccion': "🧭 Selecciona cómo se mueven los objetos:<br>• MISMO SENTIDO: Van hacia la misma dirección (ej: dos autos en la misma carretera)<br>• SENTIDOS OPUESTOS: Van uno hacia el otro (ej: dos trenes que se aproximan)",
        'velocidades_iguales': "⚠️ Los objetos tienen la misma velocidad pero están en posiciones diferentes.<br>✅ Para solucionarlo:<br>• Cambia una de las velocidades, O<br>• Pon ambos objetos en la misma posición inicial",
        'encuentro_pasado': "⏰ El encuentro habría ocurrido en el pasado.<br>✅ Para solucionarlo:<br>• Reduce los tiempos de inicio, O<br>• Cambia las posiciones iniciales, O<br>• Ajusta las velocidades",
        'imposible_mismo_sentido_1_adelante': "🏃‍♂️ El Objeto 1 es más rápido pero ya está adelante del Objeto 2.<br>✅ Para que se encuentren:<br>• Pon al Objeto 1 DETRÁS del Objeto 2, O<br>• Haz al Objeto 2 más rápido que el Objeto 1",
        'imposible_mismo_sentido_2_adelante': "🏃‍♀️ El Objeto 2 es más rápido pero ya está adelante del Objeto 1.<br>✅ Para que se encuentren:<br>• Pon al Objeto 2 DETRÁS del Objeto 1, O<br>• Haz al Objeto 1 más rápido que el Objeto 2"
    };

    Swal.fire({
        icon: 'warning',
        title: 'Dato inválido',
        html: (mensajes[tipo] || "Error desconocido"),
        confirmButtonText: 'Entendido',
        timer: 5000, // se cierra automáticamente a los 5 segundos
        timerProgressBar: true
    });
}

// FUNCIÓN COMPLETAMENTE SEGURA: Validación que NUNCA modifica valores de campos
function validarCamposBasicos() {
    const camposRequeridos = [
        'posicion_x1', 'posicion_x2', 'velocidad_x1', 'velocidad_x2'
    ];

    let todosValidos = true;
    let mensajesError = [];

    // Validar campos requeridos - SOLO marcar como válidos/inválidos
    camposRequeridos.forEach(id => {
        const campo = document.getElementById(id);
        if (!campo) return; // Protección adicional

        const valor = campo.value.trim();

        if (valor === '') {
            mensajesError.push(crearMensajeError(campo, valor, 'requerido'));
            todosValidos = false;
            campo.classList.remove('input-valido');
            campo.classList.add('input-invalido');
        } else if (!esNumeroValido(valor)) {
            mensajesError.push(crearMensajeError(campo, valor, 'formato'));
            todosValidos = false;
            campo.classList.remove('input-valido');
            campo.classList.add('input-invalido');
        } else {
            campo.classList.remove('input-invalido');
            campo.classList.add('input-valido');
        }
    });

    // Validar campos opcionales de tiempo - SOLO marcar como válidos/inválidos
    const camposTiempo = ['tiempo_x1', 'tiempo_x2'];
    camposTiempo.forEach(id => {
        const campo = document.getElementById(id);
        if (!campo) return; // Protección adicional

        const valor = campo.value.trim();

        if (valor !== '' && !esNumeroValido(valor)) {
            mensajesError.push(crearMensajeError(campo, valor, 'formato'));
            todosValidos = false;
            campo.classList.remove('input-valido');
            campo.classList.add('input-invalido');
        } else if (valor !== '') {
            campo.classList.remove('input-invalido');
            campo.classList.add('input-valido');
        }
    });

    if (!todosValidos) {
        mostrarErroresAmigables(mensajesError);
    }

    return todosValidos;
}

// FUNCIÓN PRINCIPAL 100% SEGURA - NUNCA TOCA CAMPOS DE ENTRADA
function realizarCalculoEncuentro() {
    try {
        // 1. VALIDACIÓN BÁSICA (solo marca campos, no los modifica)
        if (!validarCamposBasicos()) {
            return; // Salir si hay errores, pero sin tocar nada
        }

        // 2. OBTENER VALORES (solo lectura, nunca escritura en campos)
        const x1 = interpretarValor(document.getElementById("posicion_x1")?.value);
        const x2 = interpretarValor(document.getElementById("posicion_x2")?.value);
        const v1 = interpretarValor(document.getElementById("velocidad_x1")?.value);
        const v2 = interpretarValor(document.getElementById("velocidad_x2")?.value);
        const t1 = interpretarValor(document.getElementById("tiempo_x1")?.value);
        const t2 = interpretarValor(document.getElementById("tiempo_x2")?.value);
        const direccionElement = document.querySelector('input[name="direccion_movimiento"]:checked');

        // 3. VALIDAR DIRECCIÓN
        if (!direccionElement) {
            mostrarErrorEspecifico('direccion');
            return; // Solo salir, no tocar campos
        }

        const direccion = direccionElement.value;
        const unidadSalida = document.getElementById("unidadSalida")?.value || "m";
        const unidadSalidaTiempo = document.getElementById("unidadSalidaTiempo")?.value || "s";

        // 4. CONVERTIR A UNIDADES BASE
        const x1Base = convertirAUnidadBase(x1, document.getElementById("unidad_posicion_x1")?.value || "m");
        const x2Base = convertirAUnidadBase(x2, document.getElementById("unidad_posicion_x2")?.value || "m");
        const v1Base = convertirAUnidadBase(v1, document.getElementById("unidad_velocidad_x1")?.value || "m/s");
        const v2Base = convertirAUnidadBase(v2, document.getElementById("unidad_velocidad_x2")?.value || "m/s");
        const t1Base = convertirAUnidadBase(t1, document.getElementById("unidad_tiempo_x1")?.value || "s");
        const t2Base = convertirAUnidadBase(t2, document.getElementById("unidad_tiempo_x2")?.value || "s");

        // NUEVO: Verificar si todos los valores son idénticos
        if (Math.abs(x1Base - x2Base) < 0.0001 &&
            Math.abs(v1Base - v2Base) < 0.0001 &&
            Math.abs(t1Base - t2Base) < 0.0001) {
            mensaje = "⚠️ VALORES IDÉNTICOS DETECTADOS<br>" +
                "Ambos objetos tienen los mismos valores, lo que hace imposible graficar un encuentro.<br>" +
                "✅ Para solucionarlo, cambia al menos uno de estos valores:<br>" +
                "• Las posiciones iniciales (deben ser diferentes)<br>" +
                "• Las velocidades (deben ser diferentes)<br>" +
                "• Los tiempos de inicio (pueden ser diferentes)"
            Swal.fire({
                icon: 'warning',
                title: 'Dato inválido',
                html: mensaje,
                confirmButtonText: 'Entendido',
                timer: 5000, // se cierra automáticamente a los 5 segundos
                timerProgressBar: true
            });
            return;
        }




        // 5. AJUSTAR VELOCIDADES SEGÚN DIRECCIÓN
        let v1Adjusted = v1Base;
        let v2Adjusted = v2Base;

        if (direccion === "opuestos") {
            if (x1Base < x2Base) {
                v2Adjusted = -v2Base;
            } else {
                v1Adjusted = -v1Base;
            }
        }

        // 6. REALIZAR CÁLCULOS
        let tiempoEncuentro, puntoEncuentro;
        let encuentroEnTiempoCero = false; // NUEVO: Flag para detectar encuentro inmediato

        if (Math.abs(v1Adjusted - v2Adjusted) < 0.0001) {
            if (Math.abs(x1Base - x2Base) < 0.0001) {
                tiempoEncuentro = Math.max(t1Base, t2Base);
                puntoEncuentro = x1Base;

                // NUEVO: Detectar si se encuentran inmediatamente
                if (Math.abs(tiempoEncuentro) < 0.0001) {
                    encuentroEnTiempoCero = true;
                }
            } else {
                mostrarErrorEspecifico('velocidades_iguales');
                return; // Solo salir, no tocar campos
            }
        } else {
            tiempoEncuentro = (x2Base - x1Base - v2Adjusted * t2Base + v1Adjusted * t1Base) / (v1Adjusted - v2Adjusted);
            puntoEncuentro = x1Base + v1Adjusted * (tiempoEncuentro - t1Base);

            // NUEVO: Detectar si se encuentran inmediatamente
            if (Math.abs(tiempoEncuentro) < 0.0001) {
                encuentroEnTiempoCero = true;
                tiempoEncuentro = 0; // Asegurar que sea exactamente 0
            }
        }

        // 7. VALIDAR RESULTADO (excepto si es encuentro inmediato)
        if (!encuentroEnTiempoCero && tiempoEncuentro < Math.max(t1Base, t2Base)) {
            mostrarErrorEspecifico('encuentro_pasado');
            return; // Solo salir, no tocar campos
        }

        // 8. VALIDAR LÓGICA DE MOVIMIENTO (excepto si es encuentro inmediato)
        if (!encuentroEnTiempoCero && direccion === "mismo") {
            const v1EsMayor = Math.abs(v1Adjusted) > Math.abs(v2Adjusted);
            const x1EstaDetras = (v1Adjusted > 0 && x1Base < x2Base) || (v1Adjusted < 0 && x1Base > x2Base);

            if (v1EsMayor && !x1EstaDetras) {
                mostrarErrorEspecifico('imposible_mismo_sentido_1_adelante');
                return; // Solo salir, no tocar campos
            }

            if (!v1EsMayor && x1EstaDetras) {
                mostrarErrorEspecifico('imposible_mismo_sentido_2_adelante');
                return; // Solo salir, no tocar campos
            }
        }

        // 9. ✅ ÉXITO: Actualizar SOLO resultados (nunca campos de entrada)
        actualizarResultados(tiempoEncuentro, puntoEncuentro, unidadSalida, {
            x1: x1Base,
            x2: x2Base,
            v1: v1Adjusted,
            v2: v2Adjusted,
            t1Base,
            t2Base,
            direccion,
            encuentroEnTiempoCero, // NUEVO: Flag
            unidadSalidaTiempo     // ✅ PASO 3: Nueva propiedad agregada
        });

    } catch (error) {
        console.error("Error en cálculo:", error);
        Swal.fire({
            icon: 'warning',
            title: 'Dato inválido',
            text: "Error en el cálculo. Por favor, verifica los datos ingresados.",
            confirmButtonText: 'Entendido',
            timer: 5000, // se cierra automáticamente a los 5 segundos
            timerProgressBar: true
        });
        // NO tocar campos de entrada bajo ninguna circunstancia
    }
}

// FUNCIÓN 100% SEGURA: Solo actualiza resultados, nunca campos de entrada
function actualizarResultados(tiempoEncuentro, puntoEncuentro, unidadSalida, datosCalculo) {
    try {
        let tiempoConvertido = tiempoEncuentro;
        switch (datosCalculo.unidadSalidaTiempo) {
            case "min":
                tiempoConvertido = tiempoEncuentro / 60;
                break;
            case "h":
                tiempoConvertido = tiempoEncuentro / 3600;
                break;
            case "s":
            default:
                tiempoConvertido = tiempoEncuentro;
        }
        const tiempoFormateado = formatearNumero(tiempoConvertido);
        const factorConversion = unidadSalida === "km" ? 0.001 : 1;
        const puntoEncuentroFormateado = formatearNumero(puntoEncuentro * factorConversion);

        // Actualizar SOLO campos de resultado (nunca los de entrada)
        const campoTiempo = document.getElementById("tiempoEncuentro");
        const campoResultado = document.getElementById("resultadoEncuentros");

        if (campoTiempo) {
            // NUEVO: Mensaje especial para encuentro inmediato
            if (datosCalculo.encuentroEnTiempoCero) {
                campoTiempo.value = `${tiempoFormateado} s (Encuentro inmediato)`;
            } else {
                campoTiempo.value = `${tiempoFormateado} ${datosCalculo.unidadSalidaTiempo}` +
                    (datosCalculo.encuentroEnTiempoCero ? " (Encuentro inmediato)" : "");

            }
        }

        if (campoResultado) {
            campoResultado.value = `${puntoEncuentroFormateado} ${unidadSalida}`;
        }

        // Actualizar datos para el gráfico
        datos = {
            x1: datosCalculo.x1,
            x2: datosCalculo.x2,
            v1: datosCalculo.v1,
            v2: datosCalculo.v2,
            direccion: datosCalculo.direccion,
            tiempoEncuentro: tiempoEncuentro,
            puntoEncuentro: puntoEncuentro,
            unidadSalida: unidadSalida,
            t1Base: datosCalculo.t1Base,
            t2Base: datosCalculo.t2Base,
            encuentroEnTiempoCero: datosCalculo.encuentroEnTiempoCero // NUEVO: Incluir flag
        };

        // Redibujar gráfico
        if (myp5) myp5.draw();

    } catch (error) {
        console.error("Error actualizando resultados:", error);
    }
}

function formatearNumero(numero) {
    if (Math.abs(numero) >= 1000000 || (Math.abs(numero) < 0.001 && numero !== 0)) {
        return numero.toExponential(3);
    } else {
        return numero.toFixed(3);
    }
}