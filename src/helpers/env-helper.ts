/**
 * Utility function to safely convert a JSON string or default value to an array of strings.
 *
 * @param envVarName - The name of the environment variable.
 * @param defaultValue - The default value to use if the environment variable is not set or invalid.
 * @returns An array of strings derived from the environment variable or the default value.
 */
export function getEnvArray(envVarName: string, defaultValue: string[] = []): string[] {
    const envValue = process.env[envVarName];

    if (!envValue) {
        return defaultValue;
    }

    try {
        const parsedValue = JSON.parse(envValue);
        
        if (Array.isArray(parsedValue)) {
            // Ensure all elements in the array are strings
            return parsedValue.map(String);
        } else {
            throw new TypeError('Parsed value is not an array');
        }
    } catch (error) {
        console.error(`Failed to parse ${envVarName} as a JSON array:`, error);
        return defaultValue;
    }
}