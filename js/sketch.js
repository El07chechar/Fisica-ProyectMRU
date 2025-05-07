
function setup() {
    const canvas = createCanvas(900, 250);
    canvas.parent('canvasContainer');
    textFont('Helvetica');
    textSize(15);
    noLoop();
  }
  
  function draw() {
    background(255);
    if (!datos) return;
  
    let {
      x1, x2, v1, v2, direccion, tiempoEncuentro, puntoEncuentro, unidadSalida
    } = datos;
  
    let factor = unidadSalida === 'km' ? 1 / 1000 : 1;
    x1 *= factor;
    x2 *= factor;
    puntoEncuentro *= factor;
  
    let pos1, pos2;
    if (direccion === 'opuestos') {
      pos1 = x1 + v1 * tiempoEncuentro * factor;
      pos2 = x2 - v2 * tiempoEncuentro * factor;
    } else {
      pos1 = x1 + v1 * tiempoEncuentro * factor;
      pos2 = x2 + v2 * tiempoEncuentro * factor;
    }
  
   
    const maxX = Math.max(x1, x2, pos1, pos2, puntoEncuentro);
    const minX = Math.min(x1, x2, pos1, pos2, puntoEncuentro);
    const margen = 20;
    const escala = (width - 2 * margen) / (maxX - minX);
  

    const toCanvasX = (x) => margen + (x - minX) * escala;
  
    stroke('blue'); strokeWeight(4);
    line(toCanvasX(x1), 80, toCanvasX(pos1), 80);
    noStroke(); fill('blue');
    text('🚗 Objeto 1', toCanvasX(x1), 70);
  
    stroke('green'); strokeWeight(4);
    line(toCanvasX(x2), 120, toCanvasX(pos2), 120);
    noStroke(); fill('green');
    text('🚙 Objeto 2', toCanvasX(x2), 135);
  
    fill('red');
    ellipse(toCanvasX(puntoEncuentro), 100, 15, 15);
    text(' Encuentro', toCanvasX(puntoEncuentro) + 5, 100);
  
    fill(0); textSize(12);
    text(`Encuentro en x = ${puntoEncuentro.toFixed(2)} ${unidadSalida}, t = ${tiempoEncuentro.toFixed(2)} s`, 20, 190);
  }
  