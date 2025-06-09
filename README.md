# 📘 Documentación del Proyecto: Súper Calculadora de MRU

**Nombre del Proyecto:** Súper Calculadora de Movimiento Rectilíneo Uniforme (MRU)  
**Equipo:** César Pérez, Agustin Fleitas, Matias Bignone, Facundo Ferreira
**Versión:** 1.1
**Fecha de inicio:** Lunes 7 de abril de 2025 

---

## 📌 Descripción general

Aplicación web educativa que permite:
- Calcular variables de MRU.
- Simular encuentros entre dos objetos.
- Generar gráficas de velocidad y desplazamiento.

Cuenta con interfaz intuitiva, validaciones en tiempo real, y compatibilidad multiplataforma.

---

## 🧮 Sección 1: Calculadora MRU

### 📝 Funcionalidad
- Cálculo de **velocidad**, **tiempo** o **distancia** usando las fórmulas del MRU.
- Soporte para **notación científica** (por ejemplo: `2e3`).
- Selección de unidades personalizadas para cada dato.
- **Conversión automática de unidades** internas (ej: km ↔ m).

### 🧰 Controles y características
- Selectores de unidad y variable incógnita.
- Placeholders con ejemplos guía.
- Botones: `Calcular`, `Limpiar`.
- Validación visual de errores **en tiempo real** (campos en rojo).
- Totalmente **responsive** (adaptado a móviles y tablets).

---

## 🚦 Sección 2: Encuentros MRU

### 📝 Funcionalidad
- Simula el encuentro entre **dos objetos** en MRU.
- Datos individuales para cada objeto:
  - Posición inicial
  - Velocidad
  - Tiempo de inicio
  - Unidades configurables
- Opción para movimiento en **mismo sentido** o en **sentido contrario**.

### ✅ Validaciones implementadas
- Detección de campos vacíos o inválidos.
- Notación científica válida.
- Conversión automática de unidades.
- Prevención de simulaciones imposibles (como encuentros "en el pasado").

### 📊 Resultados
- Tiempo y distancia del punto de encuentro.
- Unidad seleccionable: metros o kilómetros.

### 🖼️ Simulación visual
- Representación gráfica de los objetos en movimiento.
- Indicadores:
  - Punto de inicio (violeta)
  - Punto de encuentro
  - Inicio efectivo del movimiento (naranja / amarillo)
- Vectores de dirección y líneas de referencia.
- **Botón de pantalla completa** para ampliar la vista.

### 🧰 Controles
- `Calcular encuentro`
- `Limpiar simulación`

---

## 📈 Sección 3: Gráficas MRU

### 📝 Funcionalidad
- Entrada de tramos con:
  - Velocidad constante (m/s)
  - Tiempo de duración (s)
- Generación automática de:
  - **Gráfico Velocidad vs. Tiempo**
  - **Gráfico Distancia vs. Tiempo**

### 🧰 Controles y características
- `Agregar tramo`
- `Calcular`
- `Limpiar`
- Validación visual en tiempo real
- Placeholders guía
- Compatible con dispositivos móviles

---

## ⚙️ Funciones Generales del Sistema

### ✅ Implementadas
- Soporte para **notación científica** en entrada y salida.
- **Conversión automática** entre unidades.
- Validaciones inmediatas con **feedback visual**.
- **Diseño responsivo** para celulares y tablets.
- Simulación y resultados actualizables sin limpiar datos previos.
- Placeholders informativos en todos los campos.

---

## 📚 Tecnologías utilizadas

- HTML5, CSS3, JavaScript
- p5.js para visualizaciones gráficas
- charts.js para graficas de funciones

---

## 🧑‍💻 Créditos

**Coordinador y desarrollo:** Cesar 
**Diseño y subcoordinación:** Agustín  
**Testing y documentación:** Matias y Facundo
**Empresa:** No aplica

---

