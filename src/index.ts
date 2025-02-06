import logger from "@/lib/logger";


async function main(): Promise<void> {
  logger.info("Starting...");
  logger.info("Ended");
}

main()
  .then(() => {
    return;
  })
  .catch((error) => {
    logger.error("An error occurred:", error);
    throw error;
  });
