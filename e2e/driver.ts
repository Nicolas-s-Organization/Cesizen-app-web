import { Builder, Browser } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

// URL de l'app testée (surchargée par E2E_BASE_URL en cas de besoin)
export const BASE_URL = process.env.E2E_BASE_URL ?? 'http://127.0.0.1:4173';

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
