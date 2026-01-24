import { POSTGRES_CONNECTION_STRING } from "@/constants";
import pgPromise, { IDatabase, IMain } from "pg-promise";

const pgp: IMain = pgPromise();

const buildDatabaseInstance = (): IDatabase<Record<string, unknown>> | null => {
  if (!POSTGRES_CONNECTION_STRING) {
    console.warn(
      "POSTGRES_CONNECTION_STRING is not set. Database features are disabled."
    );
    return null;
  }
  try {
    // Validate that the connection string at least conforms to a URL format
    new URL(POSTGRES_CONNECTION_STRING);
    return pgp(POSTGRES_CONNECTION_STRING);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.warn(
      "Invalid POSTGRES_CONNECTION_STRING provided. Database features are disabled.",
      reason
    );
    return null;
  }
};

export const pgpDatabase = buildDatabaseInstance();
export { pgp };

export const isDatabaseConfigured = pgpDatabase !== null;
export let isDatabaseClosed = !isDatabaseConfigured;

export const setDatabaseClosed = () => {
  isDatabaseClosed = true;
};
