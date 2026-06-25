import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "El Pagaré en México: Marco Legal y Regulación | Sintaxis Lab",
  description: "Conoce el fundamento legal del pagaré en México según la Ley General de Títulos y Operaciones de Crédito (LGTOC).",
};

export default function PagareMexicoPage() {
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
                <h1 className="text-3xl font-bold tracking-tight text-slate-950 mb-4">
                El Pagaré y su Regulación en México
                </h1>
                <p className="text-xs text-slate-400 mb-6 pb-2 border-b border-slate-100">
                Marco Legal y Derecho Mercantil Mexicano
                </p>

                <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
                <p>
                    En México, el pagaré no es un simple papel de compromiso; es un <strong>Título de Crédito</strong> formal y ejecutivo regulado de manera estricta por la <strong>Ley General de Títulos y Operaciones de Crédito (LGTOC)</strong>, específicamente en sus artículos del 170 al 174.
                </p>

                <section>
                    <h2 className="text-lg font-bold text-slate-900 mb-2">
                    El Artículo 170 de la LGTOC
                    </h2>
                    <p>
                    Este artículo dicta de manera tajante los requisitos indispensables que debe contener un pagaré para conservar aparejada su ejecución legal. Si un documento carece de alguno de estos elementos, pierde su naturaleza de título ejecutivo:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs sm:text-sm text-slate-700">
                    <li>La mención de ser pagaré, inserta en el texto del documento.</li>
                    <li>La promesa incondicional de pagar una suma determinada de dinero.</li>
                    <li>El nombre de la persona a quien ha de hacerse el pago.</li>
                    <li>La época y el lugar del pago.</li>
                    <li>La fecha y el lugar en que se suscribe el documento.</li>
                    <li>La firma del suscriptor o de la persona que firme a su ruego o en su nombre.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-slate-900 mb-2">
                    ¿Qué significa que traiga &quot;aparejada ejecución&quot;?
                    </h2>
                    <p>
                    Esta es la mayor ventaja del pagaré en México. En caso de incumplimiento, el acreedor puede iniciar un <strong>Juicio Ejecutivo Mercantil</strong>. Esto permite que, desde el primer momento de la demanda (antes del juicio largo), un juez ordene el requerimiento de pago y, de ser necesario, el embargo precautorio de bienes del deudor para garantizar el saldo de la deuda.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-slate-900 mb-2">
                    Intereses Moratorios Legales vs. Usura
                    </h2>
                    <p>
                    Aunque la ley permite que las partes acuerden libremente la tasa de interés moratorio (por ejemplo, el 1.5% o 5% mensual), la Suprema Corte de Justicia de la Nación (SCJN) prohíbe la <strong>usura</strong>. Si un juez considera que los intereses estipulados son excesivos o abusivos, tiene la facultad de reducirlos de oficio a parámetros comerciales éticos y legales.
                    </p>
                </section>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-center">
                    <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors shadow-sm"
                    >
                    Generar un pagaré automatizado ahora
                    </Link>
                </div>
            </article>
        </div>
    </main>
  );
}
