import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { Resend } from "resend";
import mongoose from "mongoose";


const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

await connectDB();
if (!mongoose.connection.readyState) {
  throw new Error("MongoDB not connected");
}
    await Contact.create({ name, email, subject, message });

    if (resend && process.env.CONTACT_EMAIL) {
      await resend.emails.send({
        from: "Portfolio Contact <no-reply@resend.dev>",
        to: process.env.CONTACT_EMAIL,
        subject: "New Contact Message",
        html: `
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Subject:</b> ${subject}</p>
          <p>${message}</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  }  catch (error: any) {
  console.error("CONTACT API ERROR:", error?.message || error);
  return NextResponse.json(
    { error: error?.message || "Server error" },
    { status: 500 }
  );

  }

}