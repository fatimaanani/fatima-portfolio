import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY,
);

export async function POST(
  request: Request,
) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      message,
    } = body;

    /* =========================
       BASIC VALIDATION
    ========================= */

    if (
      !name ||
      !email ||
      !message
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please fill in all fields.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid form data.",
        },
        {
          status: 400,
        },
      );
    }

    const cleanName =
      name.trim();

    const cleanEmail =
      email.trim();

    const cleanMessage =
      message.trim();

    if (
      !cleanName ||
      !cleanEmail ||
      !cleanMessage
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please fill in all fields.",
        },
        {
          status: 400,
        },
      );
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(
        cleanEmail,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      cleanName.length > 100 ||
      cleanEmail.length > 200 ||
      cleanMessage.length > 5000
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Message is too long.",
        },
        {
          status: 400,
        },
      );
    }

    /* =========================
       SEND EMAIL
    ========================= */

    const result =
      await resend.emails.send({
        from:
          "Fatima Portfolio <onboarding@resend.dev>",

        to: [
          process.env
            .CONTACT_EMAIL ??
            "fatimaanani02@gmail.com",
        ],

        replyTo: cleanEmail,

        subject:
          `Portfolio message from ${cleanName}`,

        text: `
New portfolio contact message

Name:
${cleanName}

Email:
${cleanEmail}

Message:
${cleanMessage}
        `.trim(),
      });

    if (result.error) {
      console.error(
        "Resend error:",
        result.error,
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Unable to send message.",
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "Contact API error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Something went wrong.",
      },
      {
        status: 500,
      },
    );
  }
}