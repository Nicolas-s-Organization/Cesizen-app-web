import { useState } from 'react';
import { createUserFormSchema, type CreateUserFormInput } from '@/schemas/userSchema';
import { userService } from '@/services/userService';
import { getErrorMessage } from '@/lib/getErrorMessage';

interface UseCreateUserProps {
    onSuccess: () => void;
    onClose: () => void;
}

const initialForm: CreateUserFormInput = {
  email: '',
  password: '',
  confirmPassword: '',
  firstname: '',
  lastname: '',
  birthdate: '', // type string 'YYYY-MM-DD' ou ''
  role: 'USER',
};

export function useCreateUser({ onSuccess, onClose }: UseCreateUserProps) {
    const [formData, setFormData] = useState(initialForm);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [globalError, setGlobalError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setGlobalError('');

        const result = createUserFormSchema.safeParse(formData);
        console.log("result : " + result.success);
        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as string;
                if (!fieldErrors[field]) fieldErrors[field] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setLoading(true);
        try {
            await userService.create(result.data);
            onSuccess();
            onClose();
        } catch (e) {
            setGlobalError(getErrorMessage(e, "Erreur lors de la création"));
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit,
        errors,
        globalError,
        loading,
    };
}
