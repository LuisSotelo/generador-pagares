import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cómo Llenar un Pagaré Correctamente Paso a Paso | Sintaxis Lab",
  description: "Guía completa con los requisitos obligatorios para llenar un pagaré legal en México sin cometer errores que afecten su validez.",
};

export default function ComoLlenarPagarePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 mb-6 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
      >
        ← Volver al generador
      </Link>

      <article className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
          Cómo Llenar un Pagaré Correctamente
        </h1>

        <p className="text-lg text-slate-600 leading-relaxed mb-8">
          Llenar un pagaré de forma correcta es fundamental para asegurar su validez jurídica. Cualquier omisión, tachadura o error en los datos obligatorios puede restarle fuerza legal al documento al momento de exigir su cobro.
        </p>

        <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-950 mb-4 border-b pb-1">
              Pasos obligatorios para el llenado
            </h2>
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <strong>La palabra "Pagaré":</strong> Debe estar explícita en el texto del título y cuerpo del documento. Nuestro formato lo incluye de manera automática.
              </li>
              <li>
                <strong>Monto numérico (Bueno por $):</strong> Escribe la cantidad total del crédito con números claros. Es recomendable usar puntos y comas para los miles y centavos (Ej. $10,500.00).
              </li>
              <li>
                <strong>Persona a quien debe pagarse (Beneficiario):</strong> Coloca el nombre completo o razón social de la persona física o moral que recibirá el dinero. Evita apodos o iniciales ambiguas.
              </li>
              <li>
                <strong>Época y lugar del pago:</strong> Debes detallar con exactitud la fecha de vencimiento (día, mes y año) y la dirección o ciudad donde se exigirá el cumplimiento de la obligación.
              </li>
              <li>
                <strong>La cantidad en letras:</strong> Es un requisito legal indispensable. En caso de que exista una discrepancia entre el monto en número y el monto en letra, la legislación mercantil mexicana estipula que tendrá validez la cantidad escrita en letras.
              </li>
              <li>
                <strong>Datos y firma del deudor:</strong> El deudor debe plasmar su nombre completo, dirección, teléfono y su firma autógrafa. Sin la firma del deudor, el pagaré no tiene ningún valor legal.
              </li>
            </ol>
          </section>

          <section className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-amber-900">
            <h3 className="font-bold text-amber-950 mb-2">⚠️ Lo que NUNCA debes hacer:</h3>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li>No dejes espacios en blanco donde se puedan alterar las cifras.</li>
              <li>No uses corrector líquido ni realices tachaduras sobre montos o nombres.</li>
              <li>No olvides estipular la tasa de interés moratorio en caso de retrasos.</li>
            </ul>
          </section>

          <div className="pt-4 border-t border-slate-100 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Generar un pagaré automatizado ahora
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}