import { z } from 'zod';


export const createUserSchema = z.object({
    email: z
        .email("Format d'email invalide")
        .min(1, "L'email est requis")
        .transform((val) => val.toLowerCase().trim()),
    password: z
        .string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
        .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
        .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
        .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre'),
    firstname: z
        .string()
        .min(1, 'Le prénom est requis')
        .transform((val) => val.trim())
        .pipe(z.string().min(2, 'Le prénom doit contenir au moins 2 caractères').max(50, 'Le prénom ne peut pas dépasser 50 caractères')),
    lastname: z
        .string()
        .min(1, 'Le nom est requis')
        .transform((val) => val.trim())
        .pipe(z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(50, 'Le nom ne peut pas dépasser 50 caractères')),
    birthdate: z
        .string({ message: "La date de naissance est requise" })
        .min(1, "La date de naissance est requise")
        .refine(
            (date) => {
                const parsedDate = new Date(date);
                return !isNaN(parsedDate.getTime());
            },
            { message: "Format de date invalide" },
        )
        .refine(
            (date) => {
                const birthdateDate = new Date(date);
                const today = new Date();
                return birthdateDate <= today;
            },
            { message: "La date de naissance ne peut pas être dans le futur" },
        )
        .refine(
            (date) => {
                const birthdateDate = new Date(date);
                const today = new Date();
                const age = today.getFullYear() - birthdateDate.getFullYear();
                return age <= 120;
            },
            { message: "Date de naissance invalide" },
        ),
    role: z
        .enum(["USER", "ADMIN"], {
            message: "Le rôle doit être l'un des suivants: USER, ADMIN",
        })
        .optional(),
});

export const createUserFormSchema = createUserSchema
    .extend({
        confirmPassword: z.string().min(1, 'Veuillez confirmer le mot de passe'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Les mots de passe ne correspondent pas',
        path: ['confirmPassword'],
    });


export type createUserInput = z.infer<typeof createUserSchema>;
export type CreateUserFormInput = z.infer<typeof createUserFormSchema>;



export const updateUserFormSchema = z.object({
    firstname: z
        .string({ message: "Le prénom est requis" })
        .transform((val) => val.trim())
        .pipe(
            z
                .string()
                .min(2, "Le prénom doit contenir au moins 2 caractères")
                .max(50, "Le prénom ne peut pas dépasser 50 caractères"),
        )
        .optional(),

    lastname: z
        .string({ message: "Le nom est requis" })
        .transform((val) => val.trim())
        .pipe(
            z
                .string()
                .min(2, "Le nom doit contenir au moins 2 caractères")
                .max(50, "Le nom ne peut pas dépasser 50 caractères"),
        )
        .optional(),

    email: z
        .email({ message: "Format d'email invalide" })
        .min(1, "L'email est requis")
        .transform((val) => val.toLowerCase().trim())
        .optional(),

    birthdate: z
        .string({ message: "La date de naissance est requise" })
        .min(1, "La date de naissance est requise")
        .refine(
            (date) => {
                const parsedDate = new Date(date);
                return !isNaN(parsedDate.getTime());
            },
            { message: "Format de date invalide" },
        )
        .refine(
            (date) => {
                const birthdateDate = new Date(date);
                const today = new Date();
                return birthdateDate <= today;
            },
            { message: "La date de naissance ne peut pas être dans le futur" },
        )
        .refine(
            (date) => {
                const birthdateDate = new Date(date);
                const today = new Date();
                const age = today.getFullYear() - birthdateDate.getFullYear();
                return age <= 120;
            },
            { message: "Date de naissance invalide" },
        )
        .optional(),

    role: z
        .enum(["USER", "ADMIN"], {
            message: "Le rôle doit être l'un des suivants: USER, ADMIN",
        })
        .optional(),

    isActive: z.boolean({ message: "isActive doit être un booléen" }).optional(),
});

export type UpdateUserFormInput = z.infer<typeof updateUserFormSchema>;
