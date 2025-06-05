
//Agustin

document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();
        

        function parseNumber(value) {
          if (!value || value.trim() === '') return NaN;
          
          
          const cleanValue = value.trim().replace(/[eE]/g, 'e');
          const parsed = parseFloat(cleanValue);
          
          return isNaN(parsed) ? NaN : parsed;
        }
        
      
        function formatNumber(num, decimals = 4) {
          if (isNaN(num)) return '';
          
          
          if (Math.abs(num) >= 1e6 || (Math.abs(num) < 0.001 && num !== 0)) {
            return num.toExponential(decimals);
          }
          
      
          return parseFloat(num.toFixed(decimals)).toString();
        }
        
        
        function setInputState(element, state) {
          element.className = element.className.replace(/\b(error|success)\b/g, '');
          if (state) {
            element.classList.add(state);
          }
        }

        document.querySelectorAll('.campo__valor, .valor--resultado').forEach(input => {
          setInputState(input, '');
        });
        
     
        const vInput = document.getElementById("velocidad").value;
        const vUnidad = document.getElementById("velocidadUnidad").value;
        
        const tInput = document.getElementById("tiempo").value;
        const tUnidad = document.getElementById("tiempoUnidad").value;
        
        const dInput = document.getElementById("distancia").value;
        const dUnidad = document.getElementById("distanciaUnidad").value;
        
        const v = parseNumber(vInput);
        const t = parseNumber(tInput);
        const d = parseNumber(dInput);
        
       
        const valoresIngresados = [!isNaN(v), !isNaN(t), !isNaN(d)].filter(Boolean).length;
        
        if (valoresIngresados !== 2) {
          alert("⚠️ Debes ingresar exactamente 2 valores para calcular el tercero.");
          document.getElementById("resultado").value = "";
          setInputState(document.getElementById("resultado"), 'error');
          return;
        }
        
   
        const valores = [v, t, d].filter(val => !isNaN(val));
        if (valores.some(val => val <= 0)) {
          alert("⚠️ Todos los valores deben ser positivos.");
          document.getElementById("resultado").value = "";
          setInputState(document.getElementById("resultado"), 'error');
          return;
        }
        
        try {
         
          let velocidad = v;
          if (!isNaN(v)) {
            switch(vUnidad) {
              case "km/h":
                velocidad = v / 3.6;
                break;
              case "cm/s":
                velocidad = v / 100;
                break;
             
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
             
            }
          }
          
          let resultado;
          let unidadResultado;
          let tipoCalculo;
          
          
          if (isNaN(v)) {
          
            resultado = distancia / tiempo;
            unidadResultado = "m/s";
            tipoCalculo = "velocidad";
          } else if (isNaN(t)) {
            
            resultado = distancia / velocidad;
            unidadResultado = "s";
            tipoCalculo = "tiempo";
          } else if (isNaN(d)) {
       
            resultado = velocidad * tiempo;
            unidadResultado = "m";
            tipoCalculo = "distancia";
          }
          
         
          if (!isFinite(resultado) || resultado <= 0) {
            alert("❌ Error en el cálculo. Verifica los valores ingresados.");
            document.getElementById("resultado").value = "";
            setInputState(document.getElementById("resultado"), 'error');
            return;
          }
          
         
          const resultadoFormateado = formatNumber(resultado);
          const resultadoCompleto = `${resultadoFormateado} ${unidadResultado}`;
          
          document.getElementById("resultado").value = resultadoCompleto;
          setInputState(document.getElementById("resultado"), 'success');
          
     
          console.log(`✅ Calculado: ${tipoCalculo} = ${resultadoCompleto}`);
          
        } catch (error) {
          console.error("Error en el cálculo:", error);
          alert("❌ Error inesperado en el cálculo. Verifica los valores ingresados.");
          document.getElementById("resultado").value = "";
          setInputState(document.getElementById("resultado"), 'error');
        }
      });

      document.querySelectorAll('input[type="text"]').forEach(input => {
        input.addEventListener('input', function() {
          if (input.id !== 'resultado') {
            document.getElementById("resultado").value = "";
            document.querySelectorAll('.campo__valor, .valor--resultado').forEach(el => {
              el.className = el.className.replace(/\b(error|success)\b/g, '');
            });
          }
        });
      });