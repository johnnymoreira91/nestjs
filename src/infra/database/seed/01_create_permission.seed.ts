import { UmzugMigration } from '../umzug-migration.type';

const table = {
  name: 'permissions',
  schema: 'user-management',
};

const seed = [
  { id: 1, name: 'user' },
  { id: 2, name: 'maintenance' },
  { id: 3, name: 'dev' },
  { id: 4, name: 'admin' },
];

export const up = async (migration: UmzugMigration) => {
  const query = migration.context.getQueryInterface();

  await query.bulkInsert(
    {
      tableName: table.name,
      schema: table.schema,
    },
    seed,
  );
};

export const down = async (migration: UmzugMigration) => {
  const query = migration.context.getQueryInterface();

  await query.bulkDelete(
    {
      tableName: table.name,
      schema: table.schema,
    },
    { id: seed.map((seed) => seed.id) },
  );
};
