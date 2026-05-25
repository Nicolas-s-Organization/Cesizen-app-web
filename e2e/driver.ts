import { Builder, Browser, type WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

// URL de l'app testée (surchargée par E2E_BASE_URL en cas de besoin)
export const BASE_URL = process.env.E2E_BASE_URL ?? 'http://127.0.0.1:4173';

// Dossier où sont écrites les captures (preuve visuelle / debug)
export const SCREENSHOTS_DIR = path.resolve('e2e/screenshots');

/**
 * Crée un driver Chrome.
 * - Headless par défaut (CI).
 * - HEADLESS=false pour voir le navigateur en local (debug).
 */
export async function createDriver() {
  const options = new chrome.Options();

  if (process.env.HEADLESS !== 'false') {
    options.addArguments(
      '--headless=new',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--window-size=1280,800',
    );
  }

  return await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();
}

/**
 * Capture l'écran courant et l'enregistre dans e2e/screenshots/<name>.png.
 * Preuve visuelle en cas de succès, aide au debug en cas d'échec.
 */
export async function saveScreenshot(driver: WebDriver, name: string) {
  await mkdir(SCREENSHOTS_DIR, { recursive: true });
  const safeName = name.replace(/[^a-z0-9-]+/gi, '-').toLowerCase();
  const image = await driver.takeScreenshot(); // PNG encodé en base64
  await writeFile(path.join(SCREENSHOTS_DIR, `${safeName}.png`), image, 'base64');
}
