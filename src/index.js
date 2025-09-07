import { DB_CONFIG, MAIL_CONFIG, ENV } from "./config.js";
import { createBackup } from "./backup.js";
import { sendMail } from "./mailer.js";
import cron from "node-cron";

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

cron.schedule("0 0 * * *", () => {
  run();
});
