import { DB_CONFIG, MAIL_CONFIG, ENV } from "./config.js";
import { createBackup } from "./backup.js";
import { sendMail } from "./mailer.js";
import schedule from "node-schedule";
import express from "express";

async function run() {
  try {
    if (!ENV)
      return console.error(
        "❌ Error: NODE_ENV is not set in environment variables."
      );

    console.log("📦 Creating MySQL backup...");
    const backupFile = await createBackup(DB_CONFIG);

    console.log("✅ Backup created:", backupFile);

    console.log("📧 Sending email...");
    await sendMail({ mailConfig: MAIL_CONFIG, backupFile });

    console.log("🎉 Backup emailed successfully!");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

const app = express();

app.get("/", (req, res) => {
  res.send("MySQL Backup Service is running.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

schedule.scheduleJob("0 0 * * *", () => {
  run();
});
