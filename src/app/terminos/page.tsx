import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Sintaxis Lab",
  description: "Términos y condiciones de uso del Generador de Pagarés.",
};

export default function TerminosPage() {
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
      <h1 className="text-3xl font-bold mb-8 text-slate-900">
        Términos y Condiciones
      </h1>

      <div className="space-y-6 text-slate-900 leading-relaxed">
        <p>
          Última actualización: Junio de 2026
        </p>

        <h2 className="text-xl font-semibold">
          Uso del servicio
        </h2>

        <p>
          El Generador de Pagarés es una herramienta gratuita destinada a
          facilitar la creación de documentos PDF listos para imprimir.
        </p>

        <h2 className="text-xl font-semibold">
          Responsabilidad del usuario
        </h2>

        <p>
          El usuario es responsable de verificar que toda la información
          capturada sea correcta antes de utilizar cualquier documento
          generado.
        </p>

        <p>
          También es responsabilidad del usuario asegurarse de que el uso de
          los documentos cumple con las leyes y regulaciones aplicables en su
          país o jurisdicción.
        </p>

        <h2 className="text-xl font-semibold">
          Limitación de responsabilidad
        </h2>

        <p>
          Sintaxis Lab proporciona esta herramienta como apoyo administrativo y
          no ofrece asesoría legal.
        </p>

        <p>
          No asumimos responsabilidad por pérdidas económicas, conflictos
          legales o daños derivados del uso de esta herramienta.
        </p>

        <h2 className="text-xl font-semibold">
          Disponibilidad
        </h2>

        <p>
          Nos reservamos el derecho de modificar, suspender o retirar el
          servicio en cualquier momento sin previo aviso.
        </p>

        <h2 className="text-xl font-semibold">
          Publicidad
        </h2>

        <p>
          Este sitio se financia parcialmente mediante publicidad proporcionada
          por terceros, incluyendo Google AdSense.
        </p>

        <h2 className="text-xl font-semibold">
          Modificaciones
        </h2>

        <p>
          Estos términos podrán actualizarse periódicamente. El uso continuado
          del sitio implica la aceptación de dichas modificaciones.
        </p>

        <h2 className="text-xl font-semibold">
          Contacto
        </h2>

        <p>
          Para cualquier consulta:
        </p>

        <p className="font-medium">
          hola.sintaxislab@gmail.com
        </p>
      </div>
      <div className="mt-10 pt-6 border-t border-slate-200">
  <Link
    href="/"
    className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors sm:w-auto"
  >
    Crear pagarés gratis
  </Link>
</div>
      </article>
      </div>
    </main>
  );
}
