import api from './api'
import type { CreateEmotionInput, UpdateEmotionInput } from '@/schemas/emotionSchema';
import type { Emotion } from '@/types/emotion';

const emotionService = {
  getAll: async (): Promise<Emotion[]> => {
    const response = await api.get('/emotions');
    return response.data;
  },

  create: async (data: CreateEmotionInput): Promise<Emotion> => {
    const response = await api.post('/emotions', data);
    return response.data;
  },

  update: async (id: string, data: UpdateEmotionInput): Promise<Emotion> => {
    const response = await api.patch(`/emotions/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/emotions/${id}`);
  },
};

export default emotionService;
