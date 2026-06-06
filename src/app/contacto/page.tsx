"use client";

import { useState } from "react";
import type { Metadata } from "next";

export default function ContactoPage() {
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);

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
      e.currentTarget.reset();
    } else {
      alert("No fue posible enviar el mensaje.");
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">
        Contacto
      </h1>

      <p className="text-slate-600 mb-8">
        ¿Tienes alguna duda, sugerencia o encontraste algún problema?
        Escríbenos y te responderemos lo antes posible.
      </p>

      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        {enviado && (
          <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4 text-green-700">
            Mensaje enviado correctamente.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">
              Nombre
            </label>

            <input
            type="text"
            name="website"
            className="hidden"
            />

            <input
              name="nombre"
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Correo electrónico
            </label>

            <input
              type="email"
              name="email"
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Asunto
            </label>

            <input
              name="asunto"
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Mensaje
            </label>

            <textarea
              name="mensaje"
              rows={6}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-slate-400"
          >
            {loading ? "Enviando..." : "Enviar mensaje"}
          </button>
        </form>
      </div>

      <div className="mt-10 text-slate-600">
        <h2 className="text-xl font-semibold mb-3">
          Sobre Sintaxis Lab
        </h2>

        <p>
          Sintaxis Lab es un proyecto independiente dedicado al
          desarrollo de herramientas web, automatización de
          procesos y soluciones digitales para personas y empresas.
        </p>
      </div>
    </main>
  );
}