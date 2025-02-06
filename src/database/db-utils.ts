import { POSTGRES_CONNECTION_STRING } from "@/constants";
import pgPromise from "pg-promise";

const pgp = pgPromise();

export const pgpDatabase = pgp(POSTGRES_CONNECTION_STRING);

export { pgp };
    
export let isDatabaseClosed = false;export const setDatabaseClosed = () => {
  isDatabaseClosed = true;
};

