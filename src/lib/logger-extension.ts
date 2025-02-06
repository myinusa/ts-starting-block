import { logToDatabase } from "@/database/db-log";
import { isType } from "@/helpers/type-guard";
import { logger } from "@/lib/logger";
import { isDatabaseClosed } from "@/database/db-utils";

export const wrapLoggerMethod = (method: (message: string, ...arguments_: unknown[]) => void, level: string) => {
  return async (object: unknown, ...arguments_: unknown[]) => {
    if (!isType<string>(object, "string")) {
      return method.call(logger, "", ...arguments_);
    }
    if (!isDatabaseClosed) {
      try {
        await logToDatabase(level, object);
      } catch {
        method.call(logger, "Failed to log to database, continuing with console logging");
      }
    }
    method.call(logger, object, ...arguments_);
  };
};
