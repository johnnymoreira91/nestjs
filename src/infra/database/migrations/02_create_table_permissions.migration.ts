import { DataTypes } from 'sequelize';

import sequelize from 'sequelize';
import { UmzugMigration } from '../umzug-migration.type';

const table = {
  name: 'permissions',
  schema: 'user-management',
};

export const up = async (migration: UmzugMigration) => {
  const query = migration.context.getQueryInterface();

  await query.createTable(
    {
      tableName: table.name,
      schema: table.schema,
    },
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('NOW()'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('NOW()'),
      },
    },
  );
};

export const down = async (migration: UmzugMigration) => {
  const query = migration.context.getQueryInterface();

  await query.dropTable({
    tableName: table.name,
    schema: table.schema,
  });
};
