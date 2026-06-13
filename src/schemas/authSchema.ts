import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .email({ message: "Format d'email invalide" })
    .min(1, "L'email est requis")
    .transform((val) => val.toLowerCase().trim()),

  password: z
    .string({ message: "Le mot de passe est requis" })
    .min(1, "Le mot de passe est requis"),
});

export type LoginInput = z.infer<typeof loginSchema>;