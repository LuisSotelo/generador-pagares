import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      nombre,
      email,
      asunto,
      mensaje,
      website
    } = await req.json();

    // Honeypot anti-spam
    if (website) {
      return NextResponse.json({
        success: true,
      });
    }

    await resend.emails.send({
      from: "Formulario <onboarding@resend.dev>",
      to: "hola.sintaxislab@gmail.com",
      subject: `[Contacto Web] ${asunto}`,
      html: `
        <h2>Nuevo mensaje desde Sintaxis Lab</h2>

        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>

        <hr />

        <p>${mensaje}</p>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}