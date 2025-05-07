function setup() {
    const container = document.getElementById('canvasContainer');
    const canvasWidth = container.offsetWidth;
    const canvas = createCanvas(canvasWidth, 250);
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
  
    const margen = 50;
    const distanciaMax = Math.max(x1, x2, pos1, pos2, puntoEncuentro);
    const escala = (width - 2 * margen) / distanciaMax;
  
    const inicio1 = x1 * escala + margen;
    const fin1 = pos1 * escala + margen;
    const inicio2 = x2 * escala + margen;
    const fin2 = pos2 * escala + margen;
  
    stroke('blue');
    strokeWeight(4);
    line(inicio1, 80, fin1, 80);
    noStroke();
    fill('blue');
    text('🚗 Objeto 1', inicio1, 70);
  
    stroke('green');
    strokeWeight(4);
    line(inicio2, 120, fin2, 120);
    noStroke();
    fill('green');
    text('🚙 Objeto 2', inicio2, 135);
  
  
  }
  