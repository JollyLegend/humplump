import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", env: process.env.NODE_ENV });
  });

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    console.log("Transmission attempt received...");
    const { name, email, subject, message } = req.body;

    console.log("-----------------------------------------");
    console.log("NEW TRANSMISSION RECEIVED:");
    console.log(`From: ${name} (${email})`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log("-----------------------------------------");

    // NOTE: In a real production environment, you would use a service like Resend, SendGrid, or Mailgun here.
    // Example using Resend (uncomment once you have an API key):
    /*
    if (process.env.RESEND_API_KEY) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Hump Lump Website <onboarding@resend.dev>',
            to: ['clowns@humplump.com'],
            subject: `[Website Contact] ${subject}`,
            html: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Subject:</strong> ${subject}</p>
                   <p><strong>Message:</strong> ${message}</p>`,
          }),
        });
        
        if (!response.ok) throw new Error('Email service failed');
      } catch (error) {
        console.error("Failed to send email via Resend:", error);
      }
    }
    */

    // For now, we return success so the UI shows the confirmation
    res.json({ success: true, message: "Transmission received by the void." });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
