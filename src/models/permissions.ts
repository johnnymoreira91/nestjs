import { z } from 'zod';

const schemaPermission = z.object({
  id: z.number().nullable(),
  name: z.string(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

const createSchemaPermission = z.object({
  name: z.string(),
});

export type PermissionModel = z.infer<typeof schemaPermission>;
export type CreatePermission = z.infer<typeof createSchemaPermission>;
