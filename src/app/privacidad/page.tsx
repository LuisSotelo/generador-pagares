import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | Sintaxis Lab",
  description: "Política de privacidad del Generador de Pagarés de Sintaxis Lab.",
};

export default function PrivacidadPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">
        Política de Privacidad
      </h1>

      <div className="space-y-6 text-slate-700 leading-relaxed">
        <p>
          Última actualización: Junio de 2026
        </p>

        <h2 className="text-xl font-semibold">
          Información que recopilamos
        </h2>

        <p>
          Esta herramienta está diseñada para funcionar directamente en el
          navegador del usuario. Los datos capturados en los formularios,
          incluyendo nombres, domicilios, cantidades y demás información
          utilizada para generar pagarés, no son almacenados en nuestros
          servidores.
        </p>

        <h2 className="text-xl font-semibold">
          Generación de documentos
        </h2>

        <p>
          Los documentos PDF se generan localmente en el dispositivo del
          usuario. La información ingresada permanece bajo el control exclusivo
          del usuario.
        </p>

        <h2 className="text-xl font-semibold">
          Publicidad
        </h2>

        <p>
          Este sitio utiliza Google AdSense para mostrar anuncios. Google puede
          utilizar cookies u otras tecnologías para personalizar anuncios y
          medir su rendimiento.
        </p>

        <p>
          Más información:
        </p>

        <a
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline"
        >
          https://policies.google.com/technologies/partner-sites
        </a>

        <h2 className="text-xl font-semibold">
          Cookies
        </h2>

        <p>
          Este sitio puede utilizar cookies necesarias para su funcionamiento y
          para la correcta operación de los servicios publicitarios.
        </p>

        <h2 className="text-xl font-semibold">
          Enlaces externos
        </h2>

        <p>
          No somos responsables por las políticas o contenidos de sitios web de
          terceros enlazados desde esta página.
        </p>

        <h2 className="text-xl font-semibold">
          Contacto
        </h2>

        <p>
          Para cualquier duda relacionada con esta política puedes escribir a:
        </p>

        <p className="font-medium">
          hola.sintaxislab@gmail.com
        </p>
      </div>
    </main>
  );
}