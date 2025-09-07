## Technical Description

This project is an automated MySQL backup and email delivery tool built with Node.js. It performs the following key functions:

- **Database Backup:** Uses the `mysqldump` library to create a backup of specified MySQL tables or the entire database. The backup file is saved in the `dump` directory with a timestamped filename.
- **Email Delivery:** Utilizes `nodemailer` to send the backup file as a base64-encoded email attachment to a configured recipient.
- **Scheduling:** Employs `node-cron` to schedule the backup and email process to run automatically every day at midnight.
- **Configuration:** All sensitive and environment-specific settings (database credentials, mail server details, etc.) are managed via environment variables loaded using `dotenv`.

### Main Components

- `index.js`: Orchestrates the backup and email workflow, and sets up the scheduled task.
- `backup.js`: Handles the creation of MySQL backups.
- `mailer.js`: Manages email sending with the backup file attached.
- `config.js`: Loads and exports configuration from environment variables.

This setup ensures regular, automated backups of your MySQL database with offsite delivery via email for added reliability.
