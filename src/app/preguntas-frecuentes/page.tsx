import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes sobre Pagarés (FAQ) | Sintaxis Lab",
  description: "Respuestas claras e inmediatas a las dudas más comunes sobre la validez, firma, cobro e intereses de los pagarés.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "¿Qué pasa si un pagaré no tiene fecha de vencimiento?",
      a: "De acuerdo con el artículo 171 de la Ley General de Títulos y Operaciones de Crédito en México, si un pagaré no menciona la fecha de vencimiento, se considerará pagadero 'a la vista'. Esto significa que el acreedor puede exigir el cobro en cualquier momento en que presente el documento al deudor."
    },
    {
      q: "¿Es válido un pagaré firmado en una hoja blanca común?",
      a: "Sí. La ley no exige que el pagaré esté impreso en un formato comercial de papelería o block. Cualquier escrito es legalmente válido siempre y cuando contenga explícitamente los requisitos obligatorios del artículo 170 de la LGTOC, principalmente la firma del deudor y la palabra 'Pagaré'."
    },
    {
      q: "¿Cuál es la vigencia o caducidad de un pagaré?",
      a: "La acción cambiaria directa (el derecho a cobrar mediante un juicio ejecutivo rápido) prescribe o vence a los 3 años, contados a partir de la fecha de vencimiento escrita en el pagaré."
    },
    {
      q: "¿Se pueden cobrar intereses si no se escribieron en el documento?",
      a: "Si no se pactó ninguna tasa de interés moratorio de forma explícita en el pagaré, la ley mercantil mexicana establece que se aplicará el interés legal general, el cual equivale al 6% anual."
    },
    {
      q: "¿Qué es el aval en un pagaré?",
      a: "El aval es una persona que firma el pagaré comprometiéndose de forma solidaria a pagar la deuda en caso de que el deudor principal no lo haga. Legalmente, el acreedor puede exigirle el pago del 100% de la deuda al aval directamente."
    }
  ];

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

                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-950 mb-2">
                    Preguntas Frecuentes
                    </h1>
                    <p className="text-sm text-slate-500">
                    Respuestas a las dudas más habituales sobre el uso y legalidad de los pagarés mercantiles.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                    <div 
                        key={index} 
                        className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm"
                    >
                        <h3 className="text-base font-bold text-slate-950 mb-2 flex items-start gap-2">
                        <span className="text-indigo-600 font-extrabold">¿</span>
                        {faq.q}
                        </h3>
                        <p className="text-sm text-slate-600 pl-4 border-l-2 border-slate-100 leading-relaxed">
                        {faq.a}
                        </p>
                    </div>
                    ))}
                </div>

                <div className="mt-10 pt-6 border-t border-slate-200">
                    <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
                    >
                    Crear pagarés gratis
                    </Link>
                </div>
            </article>
        </div>
    </main>
  );
}