# 📝 Generador de Pagarés en Serie (Gratis & Online)

Una herramienta web estática e interactiva desarrollada con **Next.js** y **Tailwind CSS** que permite a microempresarios, comerciantes y público en general generar múltiples pagarés numerados en serie, listos para guardar o imprimir en formato PDF.

Toda la lógica de procesamiento y generación de archivos se ejecuta 100% en el lado del cliente (Navegador) utilizando `pdf-lib`, lo que garantiza costo cero de servidor y máxima privacidad de datos.

## 🚀 Características

- **Generación en Serie:** Define el número total de pagarés y crea la secuencia numerada automáticamente (Ej. 1 de 5, 2 de 5).
- **Autocompletado Numérico:** Conversión automática de cantidades numéricas a formato de texto legal en pesos mexicanos (MXN) (Ej. $5,000 -> Cinco mil pesos 00/100 M.N.).
- **Cálculo Dinámico de Fechas:** Distribución automática de las fechas de vencimiento consecutivas según la periodicidad seleccionada.
- **Diseño Listo para Impresión:** Genera PDFs optimizados con un diseño limpio basado en los formatos tradicionales de pagarés.
- **Client-Side:** Cero bases de datos y procesamiento en servidor.

## 🛠️ Tecnologías Utilizadas

- **Framework:** [Next.js 14 (App Router)](https://nextjs.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Generación de PDF:** [pdf-lib](https://pdf-lib.js.org/)
- **Lenguaje:** TypeScript

## 📦 Instalación y Desarrollo Local

1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/tu-usuario/generador-pagares.git](https://github.com/tu-usuario/generador-pagares.git)