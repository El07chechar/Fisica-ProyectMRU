document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('calcularEncuentroBtn');

    btn.addEventListener('click', function() {
        const x1 = parseFloat(document.getElementById('posicion_x1').value);
        const x2 = parseFloat(document.getElementById('posicion_x2').value);
        const v1 = parseFloat(document.getElementById('velocidad_x1').value);
        const v2 = parseFloat(document.getElementById('velocidad_x2').value);
        const t1 = parseFloat(document.getElementById('tiempo_x1').value);
        const t2 = parseFloat(document.getElementById('tiempo_x2').value);
        const direccion = document.getElementById('direccion_movimiento').value;

        const resultadoField = document.getElementById('resultadoEncuentros');

     
        if (isNaN(x1) || isNaN(x2) || isNaN(v1) || isNaN(v2) || isNaN(t1) || isNaN(t2) || direccion === '') {
            resultadoField.value = 'Por favor completa todos los campos correctamente.';
            return;
        }

        if (v1 < 0 || v2 < 0) {
            resultadoField.value = 'Las velocidades deben ser positivas.';
            return;
        }

       
        const pos1 = x1 + v1 * t1;
        const pos2 = x2 + v2 * t2;

        let tiempoEncuentro;

        if (direccion === 'opuestos') {
           
            tiempoEncuentro = Math.abs(pos2 - pos1) / (v1 + v2);
        } else if (direccion === 'mismo') {
           
            if (v1 === v2) {
                resultadoField.value = 'No se encontrarán: velocidades iguales.';
                return;
            }
            tiempoEncuentro = Math.abs(pos2 - pos1) / Math.abs(v1 - v2);
        } else {
            resultadoField.value = 'Selecciona una dirección válida.';
            return;
        }

        if (tiempoEncuentro < 0) {
            resultadoField.value = 'No se van a encontrarán (tiempo negativo).';
        } else {
            const puntoEncuentro = pos1 + v1 * tiempoEncuentro;
            resultadoField.value = `Se encuentran en t = ${tiempoEncuentro.toFixed(2)} s, en x = ${puntoEncuentro.toFixed(2)} m.`;
        }
    });
});
