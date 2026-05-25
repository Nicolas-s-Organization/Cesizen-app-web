import { rm } from 'node:fs/promises';
import path from 'node:path';

// Vide le dossier des captures avant chaque run E2E :
// le dossier ne contient ainsi QUE les screenshots du run courant.
export default async function () {
  await rm(path.resolve('e2e/screenshots'), { recursive: true, force: true });
}
