import nodemailer from "nodemailer";
import fs from "fs";

export async function sendMail({ mailConfig, backupFile }) {
  const transporter = nodemailer.createTransport({
    host: mailConfig.auth.host,
    port: mailConfig.auth.port,
    secure: true,
    auth: {
      user: mailConfig.auth.user,
      pass: mailConfig.auth.pass,
    },
  });

  const data = getBase64(backupFile);

  const info = await transporter.sendMail({
    from: mailConfig.auth.user,
    to: "sarada12ru@gmail.com",
    subject: "MySQL Backup",
    text: "Please find attached the latest MySQL backup.",
    attachments: [
      {
        filename: backupFile.split(/[\\/]/).pop(),
        content: data,
        encoding: "base64",
      },
    ],
  });

  console.log("📧 Email sent:", info);
}

function getBase64(filePath) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const base64 = fileBuffer.toString("base64");
    return base64;
  } catch (error) {
    console.log("Error Reading File: ", error);
    return null;
  }
}
