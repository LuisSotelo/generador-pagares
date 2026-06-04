'use client';

import { useState, useEffect } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { 
  calcularVencimientos, 
  formatearMoneda, 
  formatearFechaMX, 
  cantidadALetrasMXN, 
  chunkArray,
  Periodo 
} from '@/utils/helpers';

export default function Home() {
  const [loading, setLoading] = useState(false);
  
  // Estados del Formulario (Campos de texto limpios por defecto)
  const [beneficiario, setBeneficiario] = useState('');
  const [deudor, setDeudor] = useState('');
  const [direccionDeudor, setDirecciónDeudor] = useState('');
  const [montoTotal, setMontoTotal] = useState<number | ''>('');
  const [totalPagares, setTotalPagares] = useState<number>(1);
  const [periodicidad, setPeriodicidad] = useState<Periodo>('mensual');
  const [fechaPrimerVencimiento, setFechaPrimerVencimiento] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [interesMoratorio, setInteresMoratorio] = useState<string>('0'); // Interés estándar sugerido
  const [remision, setRemision] = useState('');
  const [telefonoDeudor, setTelefonoDeudor] = useState('');
  const [poblacionDeudor, setPoblacionDeudor] = useState('');
  const [lugarExpedicion, setLugarExpedicion] = useState('Culiacán, Sinaloa, México');

  // Cálculos dinámicos con valores seguros en caso de estar vacíos
  const seguroMontoTotal = montoTotal === '' ? 0 : montoTotal;
  const importePorPagare = Number((seguroMontoTotal / totalPagares).toFixed(2));

  const manejarGeneracionPDF = async () => {
    if (!beneficiario || seguroMontoTotal <= 0) {
      alert('Por favor, ingresa al menos el nombre del beneficiario y un monto válido.');
      return;
    }

    setLoading(true);
    try {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const drawTextFit = ({
        page,
        text,
        x,
        y,
        maxWidth,
        font,
        size = 10,
        minSize = 6,
        color = rgb(0, 0, 0),
      }: {
        page: any;
        text: string;
        x: number;
        y: number;
        maxWidth: number;
        font: any;
        size?: number;
        minSize?: number;
        color?: ReturnType<typeof rgb>;
      }) => {
        let currentSize = size;
        let safeText = text.trim();

        while (
          font.widthOfTextAtSize(safeText, currentSize) > maxWidth &&
          currentSize > minSize
        ) {
          currentSize -= 0.25;
        }

        if (font.widthOfTextAtSize(safeText, currentSize) > maxWidth) {
          while (
            safeText.length > 0 &&
            font.widthOfTextAtSize(`${safeText}...`, currentSize) > maxWidth
          ) {
            safeText = safeText.slice(0, -1);
          }

          safeText = `${safeText}...`;
        }

        page.drawText(safeText, {
          x,
          y,
          size: currentSize,
          font,
          color,
        });
      };

      const PAGE_W = 612; 
      const PAGE_H = 792; 

      const fechasVencimiento = calcularVencimientos(fechaPrimerVencimiento, totalPagares, periodicidad);

      const installments = fechasVencimiento.map((fecha, index) => ({
        installment_number: index + 1,
        amount: importePorPagare,
        due_date: fecha,
      }));

      const chunks = chunkArray(installments, 2);

      for (const group of chunks) {
        const p = pdfDoc.addPage([PAGE_W, PAGE_H]);
        const blockTops = [740, 380]; // Controla la posición Y de los dos pagarés por página

        for (let idx = 0; idx < group.length; idx++) {
          const inst = group[idx];
          const top = blockTops[idx];

          // 1. Contenedor del Pagaré (Fondo blanco y borde exterior fino)
          p.drawRectangle({
            x: 30,
            y: top - 300,
            width: 552,
            height: 300,
            borderColor: rgb(0.2, 0.2, 0.2),
            borderWidth: 1,
          });

          // 2. Botón/Recuadro superior izquierdo: PAGARÉ
          p.drawRectangle({
            x: 45,
            y: top - 35,
            width: 110,
            height: 22,
            borderColor: rgb(0.2, 0.2, 0.2),
            borderWidth: 1,
          });
          p.drawText(
            `PAGARÉ ${inst.installment_number} DE ${totalPagares}`,
            {
              x: 50,
              y: top - 28,
              size: 8,
              font: bold,
            }
          );

          // 3. Recuadro superior derecho: Bueno por $ [ Cantidad ]
          // REMISIÓN CENTRADA

          if (remision) {
            p.drawText(`REMISIÓN #${remision}`, {
              x: 220,
              y: top - 28,
              size: 10,
              font: bold,
            });

            p.drawText('Folio de venta', {
              x: 250,
              y: top - 38,
              size: 6,
              font,
              color: rgb(0.45, 0.45, 0.45),
            });
          }

          // BUENO POR A LA DERECHA

          p.drawText('Bueno por $', {
            x: 410,
            y: top - 28,
            size: 10,
            font,
          });

          p.drawRectangle({
            x: 485,
            y: top - 35,
            width: 75,
            height: 22,
            borderColor: rgb(0.2, 0.2, 0.2),
            borderWidth: 1,
          });

          drawTextFit({
            page: p,
            text: formatearMoneda(inst.amount),
            x: 490,
            y: top - 28,
            maxWidth: 65,
            size: 10,
            minSize: 7,
            font: bold,
          });

          // 4. Lugar y fecha de expedición
          const textoFechaExp = `En ${lugarExpedicion} a ${formatearFechaMX(new Date())}`;

          drawTextFit({
            page: p,
            text: textoFechaExp,
            x: 230,
            y: top - 65,
            maxWidth: 330,
            size: 10,
            minSize: 7,
            font,
          });
          p.drawText('Lugar y fecha', { x: 340, y: top - 76, size: 7, font: font, color: rgb(0.3, 0.3, 0.3) });

          // 5. Cuerpo del pagaré - Beneficiario e información de serie/remisión si existen
         const textoBeneficiario = beneficiario
            ? beneficiario.toUpperCase()
            : '___________________________________________________________';

          const nombreBeneficiario = textoBeneficiario;

          p.drawText(
            'Debe(mos) y pagare(mos) en forma incondicional este Pagaré a la orden de',
            { x: 45, y: top - 100, size: 10, font }
          );

          drawTextFit({
            page: p,
            text: nombreBeneficiario,
            x: 390,
            y: top - 100,
            maxWidth: 170,
            size: 9,
            minSize: 6,
            font: bold,
          });
          p.drawText('Nombre de la persona', { x: 450, y: top - 111, size: 7, font: font, color: rgb(0.3, 0.3, 0.3) });

          // 6. Lugar del pago y Fecha de vencimiento
          // línea separadora

          p.drawLine({
            start: { x: 45, y: top - 140 },
            end: { x: 560, y: top - 140 },
            thickness: 0.5,
            color: rgb(0.75, 0.75, 0.75),
          });

          // etiquetas pequeñas

          p.drawText('LUGAR DE PAGO', {
            x: 45,
            y: top - 125,
            size: 6.5,
            font,
            color: rgb(0.45, 0.45, 0.45),
          });

          p.drawText('FECHA DE PAGO', {
            x: 355,
            y: top - 125,
            size: 6.5,
            font,
            color: rgb(0.45, 0.45, 0.45),
          });

          // valores

          drawTextFit({
            page: p,
            text: lugarExpedicion,
            x: 45,
            y: top - 135,
            maxWidth: 280,
            size: 10,
            minSize: 7,
            font: bold,
          });

          drawTextFit({
            page: p,
            text: formatearFechaMX(inst.due_date),
            x: 355,
            y: top - 135,
            maxWidth: 180,
            size: 10,
            minSize: 7,
            font: bold,
          });

          // 7. Bloque de Cantidad en letras
          p.drawText('La cantidad de:', { x: 45, y: top - 165, size: 10, font: font });
          p.drawRectangle({
            x: 45,
            y: top - 205,
            width: 515,
            height: 32,
            color: rgb(0.93, 0.93, 0.93), // Fondo gris suave de la caja
            borderColor: rgb(0.7, 0.7, 0.7),
            borderWidth: 0.5,
          });
          drawTextFit({
            page: p,
            text: cantidadALetrasMXN(inst.amount),
            x: 55,
            y: top - 192,
            maxWidth: 495,
            size: 9,
            minSize: 6,
            font: bold,
          });

          // 8. Texto legal de interés moratorio abreviado
          const textoInteresLegible = `Valor recibido en mi (nuestra) satisfacción, quedando sujetos a que se agregue un interés moratorio de ${interesMoratorio}% mensual en caso de no pagarse en el término establecido.`;
          drawTextFit({
            page: p,
            text: textoInteresLegible,
            x: 45,
            y: top - 222,
            maxWidth: 515,
            size: 7.2,
            minSize: 5.5,
            font,
          });

          // 9. Recuadro inferior izquierdo: Datos del Deudor
          p.drawRectangle({
            x: 45,
            y: top - 290,
            width: 250,
            height: 58,
            borderColor: rgb(0.5, 0.5, 0.5),
            borderWidth: 0.8,
          });

          drawTextFit({
            page: p,
            text: `Nombre del deudor: ${deudor || '________________________'}`,
            x: 50,
            y: top - 246,
            maxWidth: 235,
            size: 8,
            minSize: 5.8,
            font,
          });

          drawTextFit({
            page: p,
            text: `Dirección: ${direccionDeudor || '________________________'}`,
            x: 50,
            y: top - 262,
            maxWidth: 235,
            size: 8,
            minSize: 5.8,
            font,
          });

          drawTextFit({
            page: p,
            text: `Población: ${poblacionDeudor || '_____________'}`,
            x: 50,
            y: top - 278,
            maxWidth: 125,
            size: 8,
            minSize: 5.8,
            font,
          });

          drawTextFit({
            page: p,
            text: `Teléfono: ${telefonoDeudor || '_____________'}`,
            x: 180,
            y: top - 278,
            maxWidth: 105,
            size: 8,
            minSize: 5.8,
            font,
          });

          // 10. Área inferior derecha: Acepto y Firma
          p.drawText('ACEPTO', { x: 425, y: top - 248, size: 10, font: bold });
          p.drawText('____________________________________', { x: 360, y: top - 278, size: 10, font: font });
          p.drawText('FIRMAS', { x: 425, y: top - 290, size: 9, font: bold });
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `serie-pagares-${deudor || 'documento'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (err) {
      console.error(err);
      alert('Error generando el documento');
    } finally {
      setLoading(false);
    }
  };

  const obtenerUbicacion = async () => {
    if (!navigator.geolocation) {
      alert('Tu navegador no soporta geolocalización');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );

          const data = await res.json();

          const ciudad =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            '';

          const estado = data.address.state || '';

          setLugarExpedicion(`${ciudad}, ${estado}, México`);
        } catch {
          alert('No fue posible obtener la ubicación.');
        }
      },
      () => {
        alert('Permiso de ubicación denegado.');
      }
    );
  };
  
  useEffect(() => {
    try {
      // Comprobamos que existan las funciones de adsbygoogle en el objeto window antes de empujar el anuncio
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("Error al cargar el bloque de AdSense", e);
    }
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* COLUMNA DE LA IZQUIERDA Y CENTRO: FORMULARIO PRINCIPAL */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              Generador de Pagarés en Serie
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Crea formatos de pagarés legales listos para imprimir de forma masiva y automática.
            </p>
          </div>

          <div className="space-y-6">
            {/* Sección: Datos de la Obligación */}
            <div>
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block border-b border-slate-100 pb-1">
                Información del Préstamo
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Beneficiario (Persona que recibe el pago)</label>
                  <input 
                    type="text" 
                    placeholder="Ej. Juan Pérez López"
                    value={beneficiario} 
                    onChange={(e) => setBeneficiario(e.target.value)} 
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all" 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Monto Total del Crédito ($)</label>
                    <input 
                      type="number" 
                      placeholder="Ej. 10000"
                      value={montoTotal} 
                      onChange={(e) => setMontoTotal(e.target.value === '' ? '' : Number(e.target.value))} 
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Número de Pagarés (Serie)</label>
                    <input 
                      type="number" 
                      min="1" 
                      value={totalPagares} 
                      onChange={(e) => setTotalPagares(Math.max(1, Number(e.target.value)))} 
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Frecuencia de Pagos</label>
                    <select 
                      value={periodicidad} 
                      onChange={(e) => setPeriodicidad(e.target.value as Periodo)} 
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                    >
                      <option value="semanal">Semanal</option>
                      <option value="quincenal">Quincenal</option>
                      <option value="mensual">Mensual</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Interés Moratorio Mensual (%)</label>
                    <input 
                      type="text" 
                      value={interesMoratorio} 
                      onChange={(e) => setInteresMoratorio(e.target.value)} 
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Fecha del Primer Vencimiento</label>
                    <input 
                      type="date" 
                      value={fechaPrimerVencimiento} 
                      onChange={(e) => setFechaPrimerVencimiento(e.target.value)} 
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      No. de Remisión / Factura <span className="text-slate-400 font-normal">(Opcional)</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="Ej. 1452"
                      value={remision} 
                      onChange={(e) => setRemision(e.target.value)} 
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all" 
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Lugar de Expedición
                    </label>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={lugarExpedicion}
                        onChange={(e) => setLugarExpedicion(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                      />

                      <button
                        type="button"
                        onClick={obtenerUbicacion}
                        className="px-3 rounded-lg bg-slate-100 hover:bg-slate-200"
                      >
                        📍
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección: Datos del Deudor */}
            <div className="pt-2">
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block border-b border-slate-100 pb-1">
                Información del Deudor
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Nombre Completo del Deudor</label>
                  <input 
                    type="text" 
                    placeholder="Nombre del deudor u obligado" 
                    value={deudor} 
                    onChange={(e) => setDeudor(e.target.value)} 
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Dirección Completa</label>
                  <input 
                    type="text" 
                    placeholder="Calle, número, colonia y código postal" 
                    value={direccionDeudor} 
                    onChange={(e) => setDirecciónDeudor(e.target.value)} 
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Población
                  </label>

                  <input
                    type="text"
                    value={poblacionDeudor}
                    onChange={(e) => setPoblacionDeudor(e.target.value)}
                    placeholder="Ej. Culiacán, Sinaloa"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Teléfono
                  </label>

                  <input
                    type="text"
                    value={telefonoDeudor}
                    onChange={(e) => setTelefonoDeudor(e.target.value)}
                    placeholder="6671234567"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100">
            <button
              onClick={manejarGeneracionPDF}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-indigo-100 transition-all disabled:bg-slate-300 disabled:shadow-none text-sm tracking-wide flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Procesando Documento...
                </>
              ) : 'Descargar Serie de Pagarés (PDF)'}
            </button>
          </div>
        </div>

        {/* COLUMNA DE LA DERECHA: CÁLCULOS EN TIEMPO REAL Y PUBLICIDAD */}
        <div className="space-y-6">
          {/* Tarjeta de Resumen / Cálculo Estimado */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-3">
              Vista Previa de Distribución
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-xs text-indigo-600 block">Cada pagaré se emitirá por:</span>
                <strong className="text-xl font-bold text-indigo-950">{formatearMoneda(importePorPagare)}</strong>
              </div>
              <div className="border-t border-indigo-200/60 pt-2">
                <span className="text-xs text-indigo-600 block mb-0.5">Texto legal de cantidad:</span>
                <p className="text-xs text-slate-600 font-medium leading-relaxed italic bg-white/60 rounded-lg p-2 border border-indigo-100/40">
                  {cantidadALetrasMXN(importePorPagare)}
                </p>
              </div>
              <div className="text-[11px] text-indigo-500/90 leading-snug pt-1">
                💡 Al generar la serie de <span className="font-semibold">{totalPagares}</span> documentos, las fechas se calcularán de manera secuencial automáticamente.
              </div>
            </div>
          </div>

          {/* Banner Publicitario reposicionado a la derecha lateral */}
          <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center text-center min-h-[250px]">
            <ins 
              className="adsbygoogle"
              style={{ display: 'block', width: '100%' }}
              data-ad-client="ca-pub-7135763404667447"
              data-ad-slot="6705345469"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        </div>

      </div>
    </main>
  );
}