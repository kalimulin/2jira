import {z} from 'zod';

export const createWorkspaceSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  image: z.union([
    z.instanceof(File),
    z.string().transform((value) => value === '' ? undefined : value),
  ])
  .optional(),
})

export const updateWorkspaceSchema = z.object({
  name: z.string().trim().min(1, "Must be a or more characters").optional(),
  image: z.union([
    z.instanceof(File),
    z.string().transform((value) => value === '' ? undefined : value),
  ])
  .optional(),
})
