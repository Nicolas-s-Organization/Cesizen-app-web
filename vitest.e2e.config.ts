import { defineConfig } from 'vitest/config';

// Config séparée pour les tests E2E (Selenium) :
// environnement Node (on pilote un vrai navigateur externe), timeouts longs,
// pas de parallélisme entre fichiers (un seul navigateur à la fois).
export default defineConfig({
  test: {
    include: ['e2e/**/*.e2e.ts'],
    environment: 'node',
    testTimeout: 30_000,
    hookTimeout: 30_000,
    fileParallelism: false,
  },
});
