// src/app/que-es-un-pagare/page.tsx

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "¿Qué es un pagaré? Definición, usos y diferencias | Sintaxis Lab",
  description:
    "Conoce qué es un pagaré, para qué sirve, quién lo utiliza, sus ventajas y diferencias con un contrato o recibo.",
};

export default function QueEsUnPagarePage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <article className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
        <Link
          href="/"
          className="inline-block mb-6 text-sm text-indigo-600 hover:underline"
        >
          ← Volver al generador
        </Link>

        <div className="mb-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 p-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-950">
            ¿Qué es un pagaré?
          </h1>

          <p className="mt-3 text-slate-600">
            Aprende qué es un pagaré, para qué sirve, cuándo se utiliza y las diferencias
            con otros documentos financieros.
          </p>
        </div>

        <div className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-slate-950 mb-3">
              Definición de pagaré
            </h2>

            <p>
              Un pagaré es un documento que establece una promesa de pago. En él,
              una persona llamada deudor reconoce que debe una cantidad de dinero
              y se compromete a pagarla a favor de otra persona, conocida como
              beneficiario.
            </p>

            <p className="mt-4">
              Este tipo de documento es muy utilizado en operaciones comerciales,
              préstamos personales, ventas a crédito y acuerdos de pago. Su
              finalidad principal es dejar por escrito la obligación de pagar una
              suma determinada.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950 mb-3">
              ¿Para qué sirve un pagaré?
            </h2>

            <p>
              Un pagaré sirve para respaldar una deuda. Cuando una persona presta
              dinero, vende mercancía a crédito o acuerda recibir un pago en el
              futuro, el pagaré funciona como constancia escrita del compromiso.
            </p>

            <p className="mt-4">
              También ayuda a organizar pagos cuando una deuda se divide en varias
              parcialidades. Por ejemplo, una venta de $10,000 puede documentarse
              en cinco pagarés de $2,000 cada uno.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950 mb-3">
              ¿Quién utiliza los pagarés?
            </h2>

            <p>
              Los pagarés son utilizados por personas, comercios, emprendedores,
              distribuidores y empresas que necesitan documentar una obligación de
              pago.
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Comercios que venden productos a crédito.</li>
              <li>Personas que realizan préstamos particulares.</li>
              <li>Empresas que otorgan financiamiento a clientes.</li>
              <li>Distribuidores que manejan pagos en parcialidades.</li>
              <li>Emprendedores que necesitan controlar cuentas por cobrar.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950 mb-3">
              Ventajas de utilizar un pagaré
            </h2>

            <p>
              La principal ventaja de un pagaré es que permite dejar constancia
              clara de una deuda. Esto ayuda tanto al beneficiario como al deudor,
              porque ambos conocen el monto, la fecha de pago y las condiciones
              acordadas.
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Ayuda a documentar ventas a crédito.</li>
              <li>Permite dividir una deuda en varias fechas de pago.</li>
              <li>Facilita el control administrativo de cuentas pendientes.</li>
              <li>Reduce errores al dejar los acuerdos por escrito.</li>
              <li>Puede imprimirse y conservarse como respaldo físico.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950 mb-3">
              Diferencia entre pagaré y contrato
            </h2>

            <p>
              Un contrato es un acuerdo más amplio entre dos o más partes. Puede
              incluir obligaciones, condiciones, garantías, penalizaciones,
              entregas, servicios y responsabilidades adicionales.
            </p>

            <p className="mt-4">
              En cambio, el pagaré se enfoca principalmente en una obligación de
              pago. Su propósito central es dejar claro que una persona promete
              pagar una cantidad determinada de dinero.
            </p>

            <p className="mt-4">
              Por ejemplo, en una venta a crédito puede existir un contrato de
              compraventa y, además, uno o varios pagarés que respalden los pagos
              pendientes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950 mb-3">
              Diferencia entre pagaré y recibo
            </h2>

            <p>
              Un recibo sirve para comprobar que un pago ya fue realizado. El
              pagaré, en cambio, sirve para documentar una promesa de pago futura.
            </p>

            <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-5">
              <p>
                <strong>Ejemplo de recibo:</strong> Juan pagó $2,000 el día 10 de
                junio.
              </p>

              <p className="mt-3">
                <strong>Ejemplo de pagaré:</strong> Juan se compromete a pagar
                $2,000 el día 10 de julio.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-950 mb-3">
              Conclusión
            </h2>

            <p>
              El pagaré es una herramienta sencilla y útil para documentar deudas,
              ventas a crédito y acuerdos de pago. Aunque su formato puede parecer
              simple, es importante llenarlo con cuidado, revisar todos los datos
              y conservarlo correctamente.
            </p>

            <p className="mt-4">
              Si necesitas crear varios documentos, puedes usar nuestro generador
              gratuito de pagarés en serie para calcular montos, fechas de
              vencimiento y descargar un PDF listo para imprimir.
            </p>
          </section>

          <div className="mt-10 pt-6 border-t border-slate-200">
            <Link
              href="/"
            className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors sm:w-auto"
            >
              Crear pagarés gratis
            </Link>
          </div>
        </div>
      </article>
      </div>
    </main>
  );
}
