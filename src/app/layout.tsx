// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const siteUrl = "https://generador-pagares.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Generador de Pagarés en Serie Gratis | Crea Pagarés en PDF",
  description: "Crea e imprime tus pagarés de forma masiva y gratuita. Herramienta digital para llenar pagarés automáticamente con fechas de vencimiento, números de serie y conversión de cantidades a letras.",
  keywords: [
    "generador de pagares", 
    "crear pagare gratis", 
    "pagare en serie pdf", 
    "llenar pagare automatico", 
    "formato de pagare mexico", 
    "imprimir pagare gratis"
  ],
  authors: [{ name: "Sintaxis Lab" }],
  creator: "Sintaxis Lab",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Generador de Pagarés en Serie Gratis | Crea Pagarés en PDF",
    description: "Herramienta online gratuita para generar series de pagarés listos para imprimir en formato PDF con autocompletado.",
    url: siteUrl,
    siteName: "Generador Gratis de Pagarés",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Generador de Pagarés en Serie Gratis",
    description: "Llena y genera múltiples pagarés automáticamente en PDF listo para imprimir.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "google-adsense-account": "ca-pub-7135763404667447",
  },
};

const navigationLinks = [
  { href: "/que-es-un-pagare", label: "Qué es un pagaré" },
  { href: "/como-llenar-un-pagare", label: "Cómo llenarlo" },
  { href: "/pagare-en-mexico", label: "Pagaré en México" },
  { href: "/pagare-ejemplo", label: "Ejemplo" },
  { href: "/preguntas-frecuentes", label: "FAQ" },
  { href: "/contacto", label: "Contacto" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7135763404667447"
          crossOrigin="anonymous"
        />
      </head>
      <body>
         <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
            <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <Link
                href="/"
                className="flex min-w-0 items-center gap-3"
              >
                <Image
                  src="/favicon.png"
                  alt="Generador de Pagarés"
                  width={40}
                  height={40}
                />

                <div className="min-w-0">
                  <div className="font-bold text-slate-900 truncate">
                    Generador de Pagarés
                  </div>

                  <div className="text-xs text-slate-500 truncate">
                    Gratis • PDF • En Serie
                  </div>
                </div>
              </Link>

              <nav
                aria-label="Navegación principal"
                className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 text-sm md:mx-0 md:flex-wrap md:justify-end md:overflow-visible md:px-0 md:pb-0"
              >
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="shrink-0 rounded-full px-2.5 py-1 text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
              {children}
        <footer className="border-t border-slate-200 bg-white py-6 pb-14">
          <div className="max-w-5xl mx-auto px-4 text-center text-sm text-slate-600">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-3">
              {navigationLinks.slice(0, -1).map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-indigo-600">
                  {link.label}
                </Link>
              ))}

              <Link href="/privacidad" className="hover:text-slate-400">
                Privacidad
              </Link>

              <Link href="/terminos" className="hover:text-slate-400">
                Términos
              </Link>

              <Link href="/contacto" className="hover:text-slate-400">
                Contacto
              </Link>
            </div>

            <p>
              © {new Date().getFullYear()} Sintaxis Lab. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
