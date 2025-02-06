import logger from "@/lib/logger";

export const handleError = (error: unknown, message: string): Error => {
  if (error instanceof Error) {
    logger.error(`${message}: ${error.message}`);
    return new Error(error.message);
  }
  logger.error(`${message}: ${error}`);
  return new Error(String(error));
};