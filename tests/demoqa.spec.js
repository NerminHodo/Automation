// @ts-check
const { test, expect, request } = require("@playwright/test");

test.describe("demoQA", () => {
  test("Text Box", async ({ page }) => {
    await page.goto("https://demoqa.com/text-box");
    await expect(page.locator("#userForm")).toBeVisible();

    await page.locator("#userName").fill("demoQA");
    await page.locator("#userEmail").type("demoqa@demoqa.com");
    await page.locator("#currentAddress").fill("DemoQA 2nd street");
    await page.locator("#permanentAddress").type("DemoQA 1nd street");

    await page.click("#submit");

    await expect(page.locator("#output")).toBeVisible();
    await expect(page.locator("#name")).toHaveText("Name:demoQA");
    await expect(page.locator("#email")).toHaveText("Email:demoqa@demoqa.com");
    await expect(page.locator("#output >> #currentAddress")).toHaveText("Current Address :DemoQA 2nd street");
    await expect(page.locator("#output >> #permanentAddress")).toHaveText("Permananet Address :DemoQA 1nd street");
  });

  test("Check Box", async ({ page }) => {
    await page.goto("https://demoqa.com/checkbox");

    await page.locator(".rct-checkbox").check();
    await expect(page.locator("#result")).toBeVisible();
    await expect(page.locator("#result")).toContainText(
      "You have selected :homedesktopnotescommandsdocumentsworkspacereactangularveuofficepublicprivateclassifiedgeneraldownloadswordFileexcelFile"
    );
    await page.locator(".rct-checkbox").uncheck();
    await expect(page.locator("#result")).toBeHidden();

    await page.locator(".rct-collapse").click();
    await page.click('//*[@id="tree-node"]/ol/li/ol/li[2]/span/button');
    await page.click('//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[1]/span/button');

    await page.check('//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[1]/ol/li[1]/span/label/span[1]');
    await page.check('//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[1]/ol/li[2]/span/label/span[1]');
    await expect(page.locator("#result")).toBeVisible();
    await expect(page.locator("#result")).toContainText("You have selected :reactangular");
  });

  test("Radio Button", async ({ page }) => {
    await page.goto("https://demoqa.com/radio-button");
    await page.click('//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[2]/label');

    await expect(page.locator('//*[@id="app"]/div/div/div[2]/div[2]/div[2]/p')).toBeVisible();
    await expect(page.locator('//*[@id="app"]/div/div/div[2]/div[2]/div[2]/p')).toHaveText("You have selected Yes");

    await page.click('//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[3]/label');
    await expect(page.locator('//*[@id="app"]/div/div/div[2]/div[2]/div[2]/p')).toHaveText(
      "You have selected Impressive"
    );

    await expect(page.locator("#noRadio")).toBeDisabled();
  });

  test("Web Tables / Add", async ({ page }) => {
    await page.goto("https://demoqa.com/webtables");

    await page.click("#addNewRecordButton");
    await expect(page.locator(".modal-dialog")).toBeVisible();

    await page.locator("#firstName").fill("demo");
    await page.locator("#lastName").fill("QA");
    await page.locator("#userEmail").fill("demoQA@demoQA.com");
    await page.locator("#age").fill("30");
    await page.locator("#salary").fill("19000");
    await page.locator("#department").fill("IT");
    await page.click("#submit");
  });

  test("Web Tables / Sort", async ({ page }) => {
    await page.goto("https://demoqa.com/webtables");

    await page.click("#addNewRecordButton");
    await expect(page.locator(".modal-dialog")).toBeVisible();

    await page.locator("#firstName").fill("Demo");
    await page.locator("#lastName").fill("QA");
    await page.locator("#userEmail").fill("demoQA@demoQA.com");
    await page.locator("#age").fill("30");
    await page.locator("#salary").fill("19000");
    await page.locator("#department").fill("It");
    await page.click("#submit");

    const rows = 4;
    const columns = 6;

    for (let i = 1; i <= columns; i++) {
      let original = [];
      let sorted = [];

      for (let j = 1; j <= rows; j++) {
        let selector = await page
          .locator(`//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[3]/div[1]/div[2]/div[${j}]/div/div[${i}]`)
          .innerText();

        if (Number(selector)) {
          original.push(Number(selector));
        } else {
          original.push(selector);
        }
      }

      await page.click(`//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[3]/div[1]/div[1]/div/div[${i}]`);

      for (let j = 1; j <= rows; j++) {
        let selector = await page
          .locator(`//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[3]/div[1]/div[2]/div[${j}]/div/div[${i}]`)
          .innerText();

        if (Number(selector)) {
          sorted.push(Number(selector));
        } else {
          sorted.push(selector);
        }
      }

      if (typeof original[0] === "number") {
        original.sort(function (a, b) {
          return Number(a) - Number(b);
        });
      } else {
        original.sort();
      }
      expect(sorted).toEqual(original);
    }
  });

  test("Buttons", async ({ page }) => {
    await page.goto("https://demoqa.com/buttons");

    await page.dblclick("#doubleClickBtn");
    await expect(page.locator("#doubleClickMessage")).toBeVisible();
    await expect(page.locator("#doubleClickMessage")).toHaveText("You have done a double click");

    await page.locator("#rightClickBtn").click({ button: "right" });
    await expect(page.locator("#rightClickMessage")).toBeVisible();
    await expect(page.locator("#rightClickMessage")).toHaveText("You have done a right click");

    await page.locator(".mt-4 >> text=Click Me").last().click();
    await expect(page.locator("#dynamicClickMessage")).toBeVisible();
    await expect(page.locator("#dynamicClickMessage")).toHaveText("You have done a dynamic click");
  });

  test("Links / new tab", async ({ context }) => {
    const page = await context.newPage();
    await page.goto("https://demoqa.com/links");

    const [Home] = await Promise.all([
      context.waitForEvent("page"),
      // This action triggers the new tab
      page.locator("#simpleLink").click(),
    ]);

    await expect(Home).toHaveURL("https://demoqa.com/");
    await expect(Home.locator(".banner-image")).toBeVisible();

    const [DynamicHome] = await Promise.all([
      context.waitForEvent("page"),
      // This action triggers the new tab
      page.locator("#dynamicLink").click(),
    ]);
    await expect(DynamicHome).toHaveURL("https://demoqa.com/");
    await expect(DynamicHome.locator(".banner-image")).toBeVisible();
  });

  test("Links / API call", async ({ page }) => {
    await page.goto("https://demoqa.com/links");
    let statusCode;

    // Click on Created link and get response 201

    const [createResponse] = await Promise.all([
      page.waitForResponse((res) => res.status() == 201),
      await page.click("#created"),
    ]);
    statusCode = createResponse.status().toString();
    await expect(page.locator("#linkResponse")).toContainText(statusCode);

    // Click on No Content link and get response 204

    const [NoContentResponse] = await Promise.all([
      page.waitForResponse((res) => res.status() == 204),
      await page.click("#no-content"),
    ]);
    statusCode = NoContentResponse.status().toString();
    await expect(page.locator("#linkResponse")).toContainText(statusCode);

    // Click on Moved link and get response 301

    const [MovedResponse] = await Promise.all([
      page.waitForResponse((res) => res.status() == 301),
      await page.click("#moved"),
    ]);
    statusCode = MovedResponse.status().toString();
    await expect(page.locator("#linkResponse")).toContainText(statusCode);

    // Click on Bad Request link and get response 400

    const [BadRequestResponse] = await Promise.all([
      page.waitForResponse((res) => res.status() == 400),
      await page.click("#bad-request"),
    ]);
    statusCode = BadRequestResponse.status().toString();
    await expect(page.locator("#linkResponse")).toContainText(statusCode);

    // Click on Unauthorized link and get response 401

    const [unauthorizedResponse] = await Promise.all([
      page.waitForResponse((res) => res.status() == 401),
      await page.click("#unauthorized"),
    ]);
    statusCode = unauthorizedResponse.status().toString();
    await expect(page.locator("#linkResponse")).toContainText(statusCode);

    // Click on Forbidden link and get response 403

    const [forbiddenResponse] = await Promise.all([
      page.waitForResponse((res) => res.status() == 403),
      await page.click("#forbidden"),
    ]);
    statusCode = forbiddenResponse.status().toString();
    await expect(page.locator("#linkResponse")).toContainText(statusCode);

    // Click on Not Found link and get response 404

    const [NotFoundResponse] = await Promise.all([
      page.waitForResponse((res) => res.status() == 404),
      await page.click("#invalid-url"),
    ]);
    statusCode = NotFoundResponse.status().toString();
    await expect(page.locator("#linkResponse")).toContainText(statusCode);
  });

  let src1, src2;

  test("Broken Links - Images", async ({ page }) => {
    await page.goto("https://demoqa.com/broken");

    const url = "https://demoqa.com";
    src1 = await page.locator('//*[@id="app"]/div/div/div[2]/div[2]/div[2]/img[1]').getAttribute("src");
    src2 = await page.locator('//*[@id="app"]/div/div/div[2]/div[2]/div[2]/img[2]').getAttribute("src");

    // await page.goto(url + src1);
    // await page.goto(url + src2);

    let statusCode;

    const [link1Response] = await Promise.all([
      page.waitForResponse((res) => res.status() == 200),
      await page.click('//*[@id="app"]/div/div/div[2]/div[2]/div[2]/a[1]'),
    ]);
    statusCode = link1Response.status().toString();
    console.log(statusCode);

    await page.goto("https://demoqa.com/broken");

    const [link2Response] = await Promise.all([
      page.waitForResponse((res) => res.status() == 500),
      await page.click('//*[@id="app"]/div/div/div[2]/div[2]/div[2]/a[2]'),
    ]);
    statusCode = link2Response.status().toString();
    console.log(link2Response);
  });
});
