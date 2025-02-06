import { pgpDatabase } from "@/database/db-utils";
import { getApplicationDetails } from "@/helpers/build-helper";


export const logHttpRequestToDatabase = async (
  method: string,
  url: string,
  headers: object,
  body: string,
  responseStatus: number,
  responseBody: string
): Promise<void> => {
  try {
    await pgpDatabase.none(
      "INSERT INTO http_requests (method, url, headers, body, response_status, response_body) VALUES ($1, $2, $3, $4, $5, $6)",
      [method, url, headers, body, responseStatus, responseBody]
    );
  } catch (error) {
    console.error("Error logging HTTP request to database:", error);
  }
};export const logToDatabase = async (level: string, message: string): Promise<void> => {
  try {
    const { applicationName, buildNumber } = await getApplicationDetails();
    await pgpDatabase.none(
      "INSERT INTO logs (level, message, build_number, application_name) VALUES ($1, $2, $3, $4)",
      [level, message, buildNumber, applicationName]
    );
  } catch (error) {
    console.error("Error logging to database:", error);
  }
};

