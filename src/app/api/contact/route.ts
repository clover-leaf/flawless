import { NextResponse } from "next/server";
import { Resend } from "resend";
import { fallbackSettings, getSiteSettings } from "@/lib/site-settings";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
};

export async function POST(request: Request) {
  if (!resend) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { name, phone, email, service, message } = payload;

  if (!name || !phone || !email || !service) {
    return NextResponse.json(
      { error: "Name, phone, email, and service are required." },
      { status: 400 },
    );
  }

  const settings = await getSiteSettings();
  const toEmail =
    settings.email ?? fallbackSettings.email ?? "hello@flawlesscarpet.com";
  const fromAddress =
    process.env.RESEND_FROM_EMAIL ??
    `Flawless Carpet Cleaning <${fallbackSettings.email}>`;

  try {
    await resend.emails.send({
      from: fromAddress,
      to: toEmail,
      subject: `New service inquiry from ${name}`,
      replyTo: email,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Service need: ${service}`,
        `Message: ${message ?? "n/a"}`,
      ].join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send contact email", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}
