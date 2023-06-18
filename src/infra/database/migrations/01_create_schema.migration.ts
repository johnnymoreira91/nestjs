import { UmzugMigration } from '../umzug-migration.type';

const table = {
  schema: 'user-management',
};

export const up = async (migration: UmzugMigration) => {
  const query = migration.context.getQueryInterface();

  await query.createSchema(table.schema);
};

export const down = async (migration: UmzugMigration) => {
  const query = migration.context.getQueryInterface();

  await query.dropSchema(table.schema);
};
