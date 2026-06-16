// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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
  openGraph: {
    title: "Generador de Pagarés en Serie Gratis | Crea Pagarés en PDF",
    description: "Herramienta online gratuita para generar series de pagarés listos para imprimir en formato PDF con autocompletado.",
    url: "https://generador-pagares.vercel.app",
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
      <body className={inter.className}>{children}
        <footer className="mt-16 border-t border-slate-200 py-6">
          <div className="max-w-5xl mx-auto px-4 text-center text-sm text-slate-50">
            <div className="flex justify-center gap-4 mb-2">
              <a href="/que-es-un-pagare" className="hover:text-slate-500">
                ¿Qué es un pagaré?
              </a>

              <a href="/privacidad" className="hover:text-slate-500">
                Privacidad
              </a>

              <a href="/terminos" className="hover:text-slate-500">
                Términos
              </a>

              <a href="/contacto" className="hover:text-slate-500">
                Contacto
              </a>
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