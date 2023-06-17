import { Sequelize } from 'sequelize-typescript';
import { Permissions } from 'src/permission/entities/permission.entity';
import { User } from 'src/user/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: 'postgres',
      });
      sequelize.addModels([User, Permissions]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
