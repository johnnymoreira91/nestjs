import { Sequelize } from 'sequelize-typescript';
import { Umzug, SequelizeStorage } from 'umzug';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
});

const umzug = new Umzug({
  migrations: {
    glob: 'src/infra/database/seed/*.seed.ts',
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize: sequelize,
    modelName: 'seeder_meta',
  }),
  logger: console,
});

const task = process.env.MIGRATION;

switch (task) {
  case 'up':
    umzug.up().then((result) => {
      console.log('Migrations up went successful!', result);
      process.exit(0);
    });
    break;
  case 'down':
    umzug.down().then((result) => {
      console.log('Migrations down went successful!', result);
      process.exit(0);
    });
    break;
  default:
    break;
}
