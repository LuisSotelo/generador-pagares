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
    url: "https://tudominio.com", // Cambiar por tu URL de Vercel cuando la tengas
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
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}