import { test, expect } from "@playwright/test";

test.describe("Login functionality", () => {
  test.beforeEach("Go to login page", async ({ page }) => {
    //1. launch URL
    await page.goto("https://katalon-demo-cura.herokuapp.com/", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveTitle(/CURA Healthcare Service/i);
    await expect(page.locator("h1")).toHaveText("CURA Healthcare Service");

    //2. Click on the Make Appointment link
    await page.locator("#btn-make-appointment").click();
    await expect(page.locator("#txt-username")).toBeVisible();
    await expect(page.locator("#txt-password")).toBeVisible();
  });

  test("should login successfully", async ({ page }) => {
    // 3. fill login form
    await page.fill("#txt-username", "John Doe");
    await page.fill("#txt-password", "ThisIsNotAPassword");
    await page.click("#btn-login");

    await expect(page.locator("h2")).toHaveText("Make Appointment");
  });
  test("should not login with wrong credentials", async ({ page }) => {
    // 3. fill login form
    await page.fill("#txt-username", "Wrong User");
    await page.fill("#txt-password", "Wrong Password");
    await page.click("#btn-login");
    await expect(page.locator(".text-danger")).toHaveText(
      "Login failed! Please ensure the username and password are valid.",
    );
  });
});
