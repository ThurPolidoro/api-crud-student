import Knex from 'knex';
import { env } from '@/config/env'

const HOST = env.MYSQL_HOST || 'localhost';
const USER = env.MYSQL_USER;
const PASSWORD = env.MYSQL_PASS;
const DATABASE = env.MYSQL_DATABASE;
const PORT = env.MYSQL_PORT;

const options = {
  client: 'mysql2',
  connection: {
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    port: PORT
  },
};

const knex = Knex(options);

export default knex;
