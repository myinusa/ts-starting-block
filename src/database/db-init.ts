import { pgpDatabase } from "./db-utils";
import logger from "@/lib/logger";
import { setDatabaseClosed } from "./db-utils";

export async function initializeDatabase() {
  try {
    await pgpDatabase.none(`
            CREATE TABLE IF NOT EXISTS logs (
                id SERIAL PRIMARY KEY,
                level VARCHAR(50),
                message TEXT,
                build_number VARCHAR(100),
                application_name VARCHAR(100),
                timestamp TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP
            );
        `);
    await pgpDatabase.none(`
            CREATE TABLE IF NOT EXISTS http_requests (
                id SERIAL PRIMARY KEY,
                method VARCHAR(10),
                url TEXT,
                headers JSONB,
                body TEXT,
                response_status INT,
                response_body TEXT,
                timestamp TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP
            );
        `);
    logger.debug("Database initialized.");
  } catch (error) {
    logger.error("Failed to initialize database:", error);
    throw new Error("Failed to initialize database");
  }
}

export const closeDatabaseConnection = async (): Promise<void> => {
  try {
    console.log("Closing database connection pool...");
    await pgpDatabase.$pool.end();
    setDatabaseClosed();
    console.log("Database connection pool closed.");
  } catch (error) {
    console.error("Error closing database connection pool:", error);
  }
};
