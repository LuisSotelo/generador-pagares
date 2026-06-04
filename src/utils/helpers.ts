// src/utils/helpers.ts

export type Periodo = 'semanal' | 'quincenal' | 'mensual';

export function calcularVencimientos(fechaInicio: string, totalPagares: number, periodicidad: Periodo): Date[] {
  const fechas: Date[] = [];
  const baseDate = new Date(fechaInicio + 'T00:00:00'); // Evita desfases de zona horaria

  for (let i = 0; i < totalPagares; i++) {
    const nuevaFecha = new Date(baseDate);
    
    if (periodicidad === 'semanal') {
      nuevaFecha.setDate(baseDate.getDate() + (i * 7));
    } else if (periodicidad === 'quincenal') {
      nuevaFecha.setDate(baseDate.getDate() + (i * 15));
    } else if (periodicidad === 'mensual') {
      nuevaFecha.setMonth(baseDate.getMonth() + i);
    }
    
    fechas.push(nuevaFecha);
  }
  
  return fechas;
}

// Formateador de moneda rápido
export function formatearMoneda(cantidad: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(cantidad);
}

// Formateador de fechas largo estilo legal mexicano
export function formatearFechaMX(fecha: Date): string {
  return fecha.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

//Función números a letras
export function cantidadALetrasMXN(num: number): string {
  const unidades = ['CONCHITA', 'UN', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE'];
  const decenas = ['DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE', 'DIECISEIS', 'DIECISIETE', 'DIECIOCHO', 'DIECINUEVE'];
  const decenasDec = ['VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'];
  const centenas = ['CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS', 'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS'];

  function filtrarCentenas(n: number): string {
    if (n === 100) return 'CIEN';
    if (n < 10) return unidades[n];
    if (n < 20) return decenas[n - 10];
    if (n < 100) {
      const d = Math.floor(n / 10);
      const u = n % 10;
      return d === 2 && u > 0 ? `VEINTI${unidades[u]}` : `${decenasDec[d - 2]}${u > 0 ? ` Y ${unidades[u]}` : ''}`;
    }
    const c = Math.floor(n / 100);
    const resto = n % 100;
    return `${centenas[c - 1]}${resto > 0 ? ` ${filtrarCentenas(resto)}` : ''}`;
  }

  if (num === 0) return 'CERO PESOS 00/100 M.N.';

  const enteros = Math.floor(num);
  const centavos = Math.round((num - enteros) * 100);
  const strCentavos = `${centavos.toString().padStart(2, '0')}/100 M.N.`;

  let resultado = '';

  if (enteros < 1000) {
    resultado = filtrarCentenas(enteros);
  } else if (enteros < 1000000) {
    const miles = Math.floor(enteros / 1000);
    const resto = enteros % 1000;
    resultado = `${miles === 1 ? 'MIL' : `${filtrarCentenas(miles)} MIL`}${resto > 0 ? ` ${filtrarCentenas(resto)}` : ''}`;
  } // Puedes expandir a millones si es necesario, pero para pagarés comunes esto cubre hasta $999,999

  const sufijoPesos = enteros === 1 ? 'PESO' : 'PESOS';
  return `(${resultado} ${sufijoPesos} ${strCentavos})`;
}

// Helper para agrupar los pagarés de dos en dos en el PDF
export function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}