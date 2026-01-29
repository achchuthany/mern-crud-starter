import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Sequelize } from "sequelize";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const env = process.env.NODE_ENV || "development";
const configPath = path.join(__dirname, "..", "config", "config.json");
let config = {};
if (fs.existsSync(configPath)) {
  const allConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
  config = allConfig[env] || {};
}

const connectionString = process.env.DATABASE_URL || null;
let sequelize;
if (connectionString) {
  sequelize = new Sequelize(connectionString, {
    dialectOptions: { ssl: process.env.DB_SSL === "true" },
  });
} else if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database || "",
    config.username || "",
    config.password || "",
    config,
  );
}

const db = {};

const files = fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf(".") !== 0 &&
    file !== path.basename(__filename) &&
    file.slice(-3) === ".js"
  );
});

for (const file of files) {
  // import model definition (expects ESM default export or CommonJS default)
  const modelPath = path.join(__dirname, file);
  const imported = await import(`file://${modelPath}`);
  const defineModel = imported.default || imported;
  const model = defineModel(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
