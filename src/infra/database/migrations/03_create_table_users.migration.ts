import { DataTypes } from 'sequelize';

import sequelize from 'sequelize';
import { UmzugMigration } from '../umzug-migration.type';

const table = {
  name: 'users',
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
      public_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      super_user: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: 'permissions',
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
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
