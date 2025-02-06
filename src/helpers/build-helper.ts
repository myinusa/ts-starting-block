import { promises as fs } from "node:fs";
import path from "node:path";

const getBuildNumber = () => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  return `${year}${month}${day}.${hours}${minutes}`;
};

export async function getApplicationDetails() {
  const packageJsonPath = path.resolve(import.meta.dirname, "..", "..", "package.json");

  const buildNumber = getBuildNumber();

  try {
    const packageJsonContent = await fs.readFile(packageJsonPath);
    const packageJson = JSON.parse(packageJsonContent.toString());

    return {
      applicationName: packageJson.name,
      buildNumber: packageJson.version + "." + buildNumber,
    };
  } catch (error) {
    console.error("Error reading package.json:", error);
    throw error;
  }
}
