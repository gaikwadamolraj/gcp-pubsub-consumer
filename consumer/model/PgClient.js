import pg from "pg";
const { Client } = pg;
export const getClient = async () => {
  try {
    const client = new Client({
      host: process.env.PG_HOST || "localhost",
      port: process.env.PG_PORT || 5432,
      user: process.env.PG_USER || "myuser",
      password: process.env.PG_PASSWORD || "secret",
      database: process.env.PG_DATABASE || "mydatabase",
    });
    await client.connect();
    return client;
  } catch (error) {
    console.error(`Failed to connect to pg db `, error);
  }
};

export const insert = async (payload) => {
  const client = await getClient();
  const { env, failed, project_name, report, status, total, total_passed } =
    payload;
  const insertQuery = `insert into 
                    compliance(env, failed, project_name, report, status, total, total_passed) VALUES 
                    ($1, $2, $3, $4, $5, $6, $7)`;

  return await client.query(insertQuery, [
    env,
    failed,
    project_name,
    report,
    status,
    total,
    total_passed,
  ]);
};
