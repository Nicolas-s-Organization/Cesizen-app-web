export type Emotion = {
  id: string;
  name: string;
  level: number;
  parentId: string | null;
  children?: Emotion[]; 
  createdAt: string;
  updatedAt: string;
};