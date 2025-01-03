import { z } from 'zod';

export const addRoleSchema = z.object({
  name: z.string()
})

export type AddRoleDto = z.infer<typeof addRoleSchema>;