import { useState, useEffect, useCallback } from 'react';
import emotionService from '@/services/emotionService';
import type { Emotion } from '@/types/emotion';
import { createEmotionSchema, updateEmotionSchema } from '@/schemas/emotionSchema';
import type { CreateEmotionInput, UpdateEmotionInput } from '@/schemas/emotionSchema';
import { getErrorMessage } from '@/lib/getErrorMessage';

export const useEmotions = () => {
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState('');

  const clearErrors = () => {
    setErrors({});
    setGlobalError('');
  };

  const fetchEmotions = useCallback(async () => {
    try {
      setLoading(true);
      setGlobalError('');
      const data = await emotionService.getAll();
      setEmotions(data);
    } catch (e) {
      setGlobalError(getErrorMessage(e, 'Erreur lors du chargement des émotions'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmotions();
  }, [fetchEmotions]);

  const createEmotion = async (data: CreateEmotionInput) => {
    clearErrors();

    const result = createEmotionSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return null;
    }

    try {
      const newEmotion = await emotionService.create(result.data);
      await fetchEmotions();
      return newEmotion;
    } catch (e) {
      setGlobalError(getErrorMessage(e, 'Erreur lors de la création'));
      return null;
    }
  };

  const updateEmotion = async (id: string, data: UpdateEmotionInput) => {
    clearErrors();
    const result = updateEmotionSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return null;
    }

    try {
        console.log("EDIT 2")
      const updated = await emotionService.update(id, result.data);
        console.log("updated : " + JSON.stringify(updated))
      await fetchEmotions();
      return updated;
    } catch (e) {
      setGlobalError(getErrorMessage(e, 'Erreur lors de la modification'));
      return null;
    }
  };

  const deleteEmotion = async (id: string) => {
    clearErrors();

    try {
      await emotionService.delete(id);
      await fetchEmotions();
    } catch (e) {
      setGlobalError(getErrorMessage(e, 'Erreur lors de la suppression'));
    }
  };

  return {
    emotions,
    loading,
    errors,
    globalError,
    clearErrors,
    createEmotion,
    updateEmotion,
    deleteEmotion,
    refetch: fetchEmotions,
  };
};
