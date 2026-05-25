import { isAxiosError } from 'axios';

/**
 * Extrait un message d'erreur lisible depuis une erreur inconnue.
 * Centralise la gestion des erreurs API (évite les `catch (e: any)` dupliqués).
 */
export function getErrorMessage(error: unknown, fallback = 'Une erreur est survenue'): string {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? fallback;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
}
