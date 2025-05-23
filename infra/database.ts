import { Client } from "pg";
import { ServiceError } from "./errors/customizeds";

async function query(queryObjects) {
  let client: Client;

  try {
    client = await getNewClient();
    const result = await client.query(queryObjects);
    return result;
  } catch (error) {
    throw new ServiceError({
      message: "Erro na conexão com banco de dados ou na query",
      cause: error,
    });
  } finally {
    if (client) {
      await client.end();
    }
  }
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ssl: getSSLValues(),
  });

  await client.connect();
  return client;
}

const database = {
  query,
  getNewClient,
};

export default database;

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === "production" ? true : false;
}
