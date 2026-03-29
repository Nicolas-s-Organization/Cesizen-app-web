import { useState, useEffect } from 'react';
import { updateUserFormSchema, type UpdateUserFormInput } from '@/schemas/userSchema';
import { userService } from '@/services/userService';
import type { User } from '@/types/auth';

interface UseUpdateUserProps {
  user: User | null;
  onSuccess: () => void;
  onClose: () => void;
}

export function useUpdateUser({ user, onSuccess, onClose }: UseUpdateUserProps) {
  const [formData, setFormData] = useState<UpdateUserFormInput>({
    firstname: '',
    lastname: '',
    email: '',
    birthdate: '',
    role: 'USER',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        birthdate: user.birthdate ? new Date(user.birthdate).toISOString().split('T')[0] : '',
        role: user.role as 'USER' | 'ADMIN',
      });
      setErrors({});
      setGlobalError('');
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setErrors({});
    setGlobalError('');

    const result = updateUserFormSchema.safeParse(formData);
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
      const payload = {
        ...result.data,
        ...(result.data.birthdate && { birthdate: new Date(result.data.birthdate).toISOString() }),
      };
      await userService.update(user.id, payload);
      onSuccess();
      onClose();
    } catch (e: any) {
      setGlobalError(e?.response?.data?.message || "Erreur lors de la modification");
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, errors, globalError, loading };
}
