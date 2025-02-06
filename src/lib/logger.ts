import { wrapLoggerMethod } from "@/lib/logger-extension";
import Pino from "pino";
import { PinoPretty } from "pino-pretty";

export const logger = Pino(
  {
    level: "debug",
    transport: {
      targets: [
        {
          level: "debug",
          target: "pino/file",
          options: {
            destination: "./logs/post-fetcher.log",
            sync: true,
            mkdir: true,
            rotate: {
              days: 7,
            },
          },
        },
        {
          level: "debug",
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        },
      ],
    },
  },
  PinoPretty(),
);

logger.info = wrapLoggerMethod(logger.info, "info");
logger.error = wrapLoggerMethod(logger.error, "error");
logger.debug = wrapLoggerMethod(logger.debug, "debug");
logger.warn = wrapLoggerMethod(logger.warn, "warn");

export default logger;
