import mysqldump from "mysqldump";
import path from "path";

export async function createBackup(DB_CONFIG) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filePath = path.join(process.cwd(), `dump/backup-${timestamp}.sql`);

  const mySqlConfig = {
    connection: DB_CONFIG,
    dumpToFile: filePath,
  };

  if (DB_CONFIG.tables) {
    Object.assign(mySqlConfig, {
      dump: {
        tables: DB_CONFIG.tables,
      },
    });
  }

  await mysqldump(mySqlConfig);

  return filePath;
}
