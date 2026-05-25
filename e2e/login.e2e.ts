import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { By, type WebDriver } from 'selenium-webdriver';
import { createDriver, saveScreenshot, BASE_URL } from './driver';

describe('Page de connexion — validation côté client', () => {
  let driver: WebDriver;

  beforeAll(async () => {
    driver = await createDriver();
  });

  afterAll(async () => {
    await driver?.quit();
  });

  // Capture l'état final de chaque test (préfixé par pass/fail) -> preuve visuelle
  afterEach(async (ctx) => {
    const state = ctx.task.result?.state ?? 'unknown';
    await saveScreenshot(driver, `${state}-${ctx.task.name}`);
  });

  // Scénario A — la validation Zod s'exécute AVANT tout appel API (return anticipé).
  // On laisse l'email vide : un input type=email vide passe la validation HTML5 native
  // (pas de `required`), mais échoue la validation Zod -> on atteint bien le message.
  it("affiche une erreur de format quand l'email est vide", async () => {
    await driver.get(`${BASE_URL}/login`);
    await driver.findElement(By.css('input[type="password"]')).sendKeys('peu importe');
    await driver.findElement(By.css('button[type="submit"]')).click();

    const message = await driver.wait(async () => {
      const text = await driver.findElement(By.css('body')).getText();
      return text.includes("Format d'email invalide") ? text : false;
    }, 5000);

    expect(message).toContain("Format d'email invalide");
  });

  it('affiche une erreur quand le mot de passe est vide', async () => {
    await driver.get(`${BASE_URL}/login`);
    await driver.findElement(By.css('input[type="email"]')).sendKeys('admin@cesi-zen.com');
    await driver.findElement(By.css('button[type="submit"]')).click();

    const message = await driver.wait(async () => {
      const text = await driver.findElement(By.css('body')).getText();
      return text.includes('Le mot de passe est requis') ? text : false;
    }, 5000);

    expect(message).toContain('Le mot de passe est requis');
  });

  // Scénario B — interaction DOM réelle dans un vrai navigateur
  it("le bouton œil bascule la visibilité du mot de passe", async () => {
    await driver.get(`${BASE_URL}/login`);
    const password = await driver.findElement(By.css('input[type="password"]'));
    await password.sendKeys('secret123');

    expect(await password.getAttribute('type')).toBe('password');

    // Le seul bouton type="button" de la page de login est le toggle œil
    await driver.findElement(By.css('button[type="button"]')).click();

    expect(await password.getAttribute('type')).toBe('text');
  });
});
