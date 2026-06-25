import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ejemplo de Pagaré Llenado y Formato Guía | Sintaxis Lab",
  description: "Revisa un ejemplo visual y práctico de un formato de pagaré tradicional completamente llenado con datos ficticios de guía.",
};

export default function PagareEjemploPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
            <article className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
                <Link
                    href="/"
                    className="inline-flex items-center gap-1 mb-6 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                    ← Volver al generador
                </Link>
                <h1 className="text-3xl font-bold tracking-tight text-slate-950 mb-2">
                Ejemplo Práctico de un Pagaré
                </h1>
                <p className="text-sm text-slate-500 mb-8">
                A continuación se muestra un modelo representativo de cómo se estructuran y visualizan los datos en un formato físico tradicional.
                </p>

                {/* Simulador de formato tradicional */}
                <div className="border border-slate-400 bg-amber-50/20 rounded-xl p-4 sm:p-6 font-mono text-slate-800 text-xs sm:text-sm space-y-4 shadow-inner max-w-2xl mx-auto">
                <div className="flex justify-between items-center border-b border-slate-300 pb-2">
                    <span className="font-bold border border-slate-800 px-2 py-0.5 bg-white text-slate-950">PAGARÉ 1 DE 1</span>
                    <div>
                    <span>Bueno por: </span>
                    <span className="font-bold bg-white px-2 py-0.5 border border-slate-400 text-slate-950">$5,400.00</span>
                    </div>
                </div>

                <p className="text-right text-slate-600">
                    En Culiacán, Sinaloa, México a 17 de Junio de 2026
                </p>

                <p className="leading-relaxed">
                    Debe(mos) y pagare(mos) en forma incondicional este Pagaré a la orden de{" "}
                    <span className="font-bold underline text-slate-950">CARLOS MENDOZA CASTRO</span>, en la ciudad de{" "}
                    <span className="font-bold text-slate-950">Culiacán, Sinaloa</span>, el día{" "}
                    <span className="font-bold underline text-slate-950">17 de Octubre de 2026</span>.
                </p>

                <div className="bg-white p-2 border border-slate-300 text-slate-950 font-bold italic">
                    La cantidad de: (CINCO MIL CUATROCIENTOS PESOS 00/100 M.N.)
                </div>

                <p className="text-[10px] text-slate-500 leading-tight">
                    Valor recibido en mi (nuestra) satisfacción, quedando sujetos a que se agregue un interés moratorio de 1.5% mensual en caso de no pagarse en el término establecido.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                    <div className="border border-slate-300 p-2 bg-white rounded text-[11px] space-y-1">
                    <div><span className="text-slate-500">Deudor:</span> Sofia López Ramos</div>
                    <div><span className="text-slate-500">Dirección:</span> Av. Álvaro Obregón #450</div>
                    <div><span className="text-slate-500">Población:</span> Culiacán, Sin.</div>
                    <div><span className="text-slate-500">Teléfono:</span> 6677123456</div>
                    </div>
                    <div className="text-center flex flex-col justify-between pt-2">
                    <span className="font-bold text-xs text-slate-950">ACEPTO</span>
                    <div className="border-b border-slate-400 w-4/5 mx-auto py-2"></div>
                    <span className="text-[10px] font-bold text-slate-600">FIRMA DEL DEUDOR</span>
                    </div>
                </div>
                </div>

                <div className="mt-8 pt-6 border-t text-sm text-slate-600 text-center">
                <p className="mb-4">¿Necesitas crear un bloque entero de pagarés con tus propios datos y fechas automáticas?</p>
                <Link
                    href="/"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors sm:w-auto"
                >
                    Utilizar el generador gratuito
                </Link>
                </div>
            </article>
        </div>
    </main>
  );
}
