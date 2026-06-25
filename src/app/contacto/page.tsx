"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactoPage() {
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // 1. DEFINIR EL TIEMPO DE ESPERA (Ej. 5 minutos en milisegundos)
    const TIEMPO_BLOQUEO = 5 * 60 * 1000; 
    const ahora = Date.now();
    const ultimoEnvio = localStorage.getItem("ultimo_envio_contacto");

    // 2. VERIFICAR SI EL USUARIO ESTÁ EN PERIODO DE ENFRIAMIENTO
    if (ultimoEnvio) {
      const tiempoTranscurrido = ahora - parseInt(ultimoEnvio, 10);
      
      if (tiempoTranscurrido < TIEMPO_BLOQUEO) {
        const minutosRestantes = Math.ceil((TIEMPO_BLOQUEO - tiempoTranscurrido) / 1000 / 60);
        alert(`Por favor, espera ${minutosRestantes} minuto(s) antes de enviar otro mensaje. Evitemos el spam.`);
        return;
      }
    }

    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        nombre: formData.get("nombre"),
        email: formData.get("email"),
        asunto: formData.get("asunto"),
        mensaje: formData.get("mensaje"),
        website: formData.get("website"),
      }),
    });

    setLoading(false);

    if (res.ok) {
      setEnviado(true);
      form.reset();
      
      // 3. GUARDAR EL TIMESTAMP DEL ENVÍO EXITOSO
      localStorage.setItem("ultimo_envio_contacto", Date.now().toString());
    } else {
      alert("No fue posible enviar el mensaje.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
          <Link
              href="/"
              className="inline-block mb-6 text-sm text-indigo-600 hover:underline"
            >
              ← Volver al generador
            </Link>
          <h1 className="text-3xl font-bold mb-4 text-slate-900">
            Contacto
          </h1>

          <p className="text-slate-900 mb-8">
            ¿Tienes alguna duda, sugerencia o encontraste algún problema?
            Escríbenos y te responderemos lo antes posible.
          </p>

          <div className="border-t border-slate-100 pt-6">
            {enviado && (
              <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4 text-green-700">
                Mensaje enviado correctamente.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="website"
                className="hidden"
              />
              <div>
                <label className="block text-sm mb-1 text-slate-900">
                  Nombre
                </label>

                <input
                  name="nombre"
                  required
                  className="w-full border rounded-lg p-3 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-slate-900">
                  Correo electrónico
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border rounded-lg p-3 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-slate-900">
                  Asunto
                </label>

                <input
                  name="asunto"
                  required
                  className="w-full border rounded-lg p-3 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-slate-900">
                  Mensaje
                </label>

                <textarea
                  name="mensaje"
                  rows={6}
                  required
                  className="w-full border rounded-lg p-3 text-slate-900"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-slate-400"
              >
                {loading ? "Enviando..." : "Enviar mensaje"}
              </button>
            </form>
          </div>

          <div className="mt-10 text-slate-900">
            <h2 className="text-xl font-semibold mb-3">
              Sobre Sintaxis Lab
            </h2>

            <p>
              Sintaxis Lab es un proyecto independiente dedicado al
              desarrollo de herramientas web, automatización de
              procesos y soluciones digitales para personas y empresas.
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
          </div>
      </div>
    </main>
  );
}
