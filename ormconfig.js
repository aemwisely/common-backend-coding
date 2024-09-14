const { DataSource } = require('typeorm');
const path = require('path');
const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy;
require('dotenv').config();

function env(key) {
  return process.env[key];
}

const baseConfig = new DataSource({
  type: env('DB_CONNECTION'),
  host: env('DB_HOST'),
  port: env('DB_PORT'),
  username: env('DB_USERNAME'),
  password: env('DB_PASSWORD'),
  database: env('DB_DATABASE'),
  migrations: [path.resolve('.', 'migrations', 'model', '*{.js,.ts}')],
  cli: {
    migrationsDir: path.resolve('.', 'migrations', 'model'),
  },
  namingStrategy: new SnakeNamingStrategy(),
});

module.exports = { baseConfig };
