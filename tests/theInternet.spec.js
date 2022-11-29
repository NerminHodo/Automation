// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("The Internet", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
  });

  test("image test", async ({ page }) => {
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot({
      maxDiffPixels: 200,
    });
  });

  test("A/B Testing", async ({ page }) => {
    await page.click("text = A/B Testing");
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/abtest");
    await expect(page.locator('//*[@id="content"]/div/h3')).toBeVisible();
    await expect(page.locator('//*[@id="content"]/div/p')).toBeVisible();
  });
  test("Add/Remove Elements", async ({ page }) => {
    await page.click("text = Add/Remove Elements");
    await expect(page).toHaveURL(
      "https://the-internet.herokuapp.com/add_remove_elements/"
    );
    await page.click('//*[@id="content"]/div/button');
    await expect(page.locator('//*[@id="elements"]/button')).toBeVisible();
    await page.click('//*[@id="elements"]/button');
    await expect(page.locator('//*[@id="elements"]/button')).toBeHidden();

    // await page.click('//*[@id="content"]/div/button');
    // await page.click('//*[@id="content"]/div/button');
    // await page.click('//*[@id="content"]/div/button');
    // await page.click('//*[@id="content"]/div/button');
    // await page.click('//*[@id="elements"]/button[4]');
    // await page.click('//*[@id="elements"]/button[3]');
    // await page.click('//*[@id="elements"]/button[2]');
    // await page.click('//*[@id="elements"]/button[1]');
    // await expect(page.locator('//*[@id="elements"]/button[1]')).toBeHidden();
    // await expect(page.locator('//*[@id="elements"]/button[2]')).toBeHidden();
    // await expect(page.locator('//*[@id="elements"]/button[3]')).toBeHidden();
    // await expect(page.locator('//*[@id="elements"]/button[4]')).toBeHidden();
  });

  test("Basic Auth", async ({ page }) => {
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toEqual("I am a JS prompt");
      await dialog.accept("The Internet");
    });
    await page.click("text = Basic Auth");

    //   await page.click('//*[@id="content"]/ul/li[3]/a');
    //   page.on("dialog", async (dialog) => await dialog.accept());
    //   await expect(page).toHaveURL(
    //     "https://the-internet.herokuapp.com/basic_auth"
    //   );
    // await page.on("dialog", async (dialog) => {
    //   expect(dialog.type()).toContain("prompt");
    //   expect(dialog.message()).toContain("Username");
    //   await dialog.accept();
    // });

    // page.on("dialog", async (dialog) => {
    //   expect(dialog.type()).toContain("prompt");

    //   expect(dialog.message()).toContain("Username");
    //   expect(dialog.message()).toContain("Password");

    // });
  });

  test("Broken Images", async ({ page }) => {
    await page.click("text = Broken Images");
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
  });

  test("Challenging DOM", async ({ page }) => {
    await page.click("text = Challenging DOM");
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
  });

  test("Checkboxes", async ({ page }) => {
    await page.click("text = Checkboxes");
    expect(page).toHaveURL("https://the-internet.herokuapp.com/checkboxes");
    await page.check('//*[@id="checkboxes"]/input[1]');
    expect(page.locator('//*[@id="checkboxes"]/input[1]')).toBeChecked();
    await page.uncheck('//*[@id="checkboxes"]/input[2]');
    await page.uncheck('//*[@id="checkboxes"]/input[1]');

    expect(
      await page.locator('//*[@id="checkboxes"]/input[1]').isChecked()
    ).toBeFalsy();
    expect(
      await page.locator('//*[@id="checkboxes"]/input[2]').isChecked()
    ).toBeFalsy();
  });

  test("Context Menu", async ({ page }) => {
    await page.click("text = Context Menu");

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toEqual("You selected a context menu");
      await dialog.accept();
    });

    await page.locator("#hot-spot").click({ button: "right" });
  });

  test("Digest Authentication", async ({ page }) => {
    await page.click("text = Digest Authentication");
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
  });

  test("Disappearing Elements", async ({ page }) => {
    await page.click("text = Disappearing Elements");
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
  });

  test("Drag and Drop", async ({ page }) => {
    await page.click("text = Drag and Drop");

    expect(await page.innerText('//*[@id="column-a"]/header')).toBe("A");
    expect(await page.innerHTML('//*[@id="column-b"]/header')).toBe("B");
    await page.locator("#column-a").dragTo(page.locator("#column-b"));
    expect(await page.innerText('//*[@id="column-a"]/header')).toBe("B");
    expect(await page.innerHTML('//*[@id="column-b"]/header')).toBe("A");
  });

  test("Dropdown", async ({ page }) => {
    await page.click("text = Dropdown");

    await page.locator("#dropdown").selectOption("1");
    await expect(page.locator("#dropdown")).toHaveValue("1");
    await page.locator("#dropdown").selectOption({ label: "Option 2" });
    // await expect(page.locator("#dropdown")).toHaveValue("2");
    expect(await page.innerText("//*[@selected]")).toBe("Option 2");
  });

  test("Dynamic Content", async ({ page }) => {
    await page.click("text = Dynamic Content");

    let a = await page.innerText('//*[@id="content"]/div[1]/div[2]');
    let textBeforeReload = await page.innerText(
      '//*[@id="content"]/div[3]/div[2]'
    );

    await page.reload();

    let b = await page.innerText('//*[@id="content"]/div[1]/div[2]');
    let textAfterReload = await page.innerText(
      '//*[@id="content"]/div[3]/div[2]'
    );

    expect(a !== b);
    expect(textBeforeReload !== textAfterReload);
  });

  test("Dynamic Controls / Remove/add", async ({ page }) => {
    await page.click("text = Dynamic Controls");

    await page.locator('//*[@type="checkbox"]').check();
    expect(page.locator('//*[@type="checkbox"]')).toBeChecked;
    await page.locator('//*[@type="checkbox"]').uncheck();
    expect(await page.locator('//*[@type="checkbox"]').isChecked()).toBeFalsy();

    await page.click('//*[@id="checkbox-example"]/button');
    await expect(page.locator("#checkbox")).toBeHidden();

    await page.click('//*[@id="checkbox-example"]/button');
    await expect(page.locator("#checkbox")).toBeVisible();

    await page.locator('//*[@type="checkbox"]').check();
    expect(page.locator('//*[@type="checkbox"]')).toBeChecked;
    await page.locator('//*[@type="checkbox"]').uncheck();
    expect(await page.locator('//*[@type="checkbox"]').isChecked()).toBeFalsy();
  });

  test("Dynamic Controls / Enable/disable", async ({ page }) => {
    await page.click("text = Dynamic Controls");

    await expect(page.locator('//*[@id="input-example"]/input')).toBeDisabled();
    await page.click('//*[@id="input-example"]/button');
    await expect(page.locator('//*[@id="input-example"]/input')).toBeEnabled();
    await page.locator('//*[@id="input-example"]/input').fill("The Internet");
    await page.click('//*[@id="input-example"]/button');
    await expect(page.locator('//*[@id="input-example"]/input')).toBeDisabled();
    await expect(page.locator('//*[@id="input-example"]/input')).toHaveValue(
      "The Internet"
    );
  });

  test("Dynamic Loading / Example 1", async ({ page }) => {
    await page.click("text = Dynamic Loading");

    await page.click('//*[@id="content"]/div/a[1]');
    await page.click('//*[@id="start"]/button');
    await page.waitForLoadState("networkidle");
    await expect(page.locator('//*[@id="finish"]/h4')).toBeVisible();
  });

  test("Dynamic Loading / Example 2", async ({ page }) => {
    await page.click("text = Dynamic Loading");

    await page.click('//*[@id="content"]/div/a[2]');
    await page.click('//*[@id="start"]/button');
    await page.waitForLoadState("networkidle");
    await expect(page.locator('//*[@id="finish"]/h4')).toBeVisible();
  });

  test("Entry Ad", async ({ page }) => {
    await page.click("text = Entry Ad");
    await expect(page.locator('//*[@id="modal"]/div[2]')).toBeVisible();
    await page.click('//*[@id="modal"]/div[2]/div[3]/p');
    await expect(page.locator('//*[@id="modal"]/div[2]')).toBeHidden();
  });

  test("Exit Intent", async ({ page }) => {
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
  });

  test("File Download", async ({ page }) => {
    await page.click("text = File Download");

    const [download] = await Promise.all([
      // Start waiting for the download
      page.waitForEvent("download"),
      // Perform the action that initiates download
      page.locator('//*[@id="content"]/div/a[1]').click(),
    ]);

    // Save downloaded file somewhere
    await download.saveAs("/path/to/save/download/at.txt");
  });

  test("File Upload", async ({ page }) => {
    await page.click("text = File Upload");

    await page
      .locator("#file-upload")
      .setInputFiles("uploadedFiles/theInternet.pdf");

    await page.click("#file-submit");

    await expect(page.locator('//*[@id="content"]/div/h3')).toHaveText(
      "File Uploaded!"
    );
    await expect(page.locator("#uploaded-files")).toHaveText("theInternet.pdf");
  });

  test("Floating Menu", async ({ page }) => {
    await page.click("text = Floating Menu");
    await page.mouse.wheel(0, 2000);

    await page.click('//*[@id="menu"]/ul/li[1]/a');
    await expect(page).toHaveURL(
      "https://the-internet.herokuapp.com/floating_menu#home"
    );

    await page.click('//*[@id="menu"]/ul/li[2]/a');
    await expect(page).toHaveURL(
      "https://the-internet.herokuapp.com/floating_menu#news"
    );

    await page.click('//*[@id="menu"]/ul/li[3]/a');
    await expect(page).toHaveURL(
      "https://the-internet.herokuapp.com/floating_menu#contact"
    );

    await page.click('//*[@id="menu"]/ul/li[4]/a');
    await expect(page).toHaveURL(
      "https://the-internet.herokuapp.com/floating_menu#about"
    );
  });

  test("Forgot Password", async ({ page }) => {
    await page.click("text = Forgot Password");
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
  });

  test("Form Authentication / valid credentials", async ({ page }) => {
    await page.click("text = Form Authentication");
    await page.locator("#username").fill("tomsmith");
    await page.locator("#password").fill("SuperSecretPassword!");
    await page.click('//*[@id="login"]/button/i');
    await expect(page.locator("#flash-messages")).toBeVisible();
    await expect(page.locator('//*[@id="content"]/div/a')).toHaveText("Logout");
  });

  test("Form Authentication / invalid username", async ({ page }) => {
    await page.click("text = Form Authentication");
    await page.locator("#username").fill("theInternet");
    await page.locator("#password").fill("SuperSecretPassword!");
    await page.click('//*[@id="login"]/button/i');
    await expect(page.locator("#flash-messages")).toBeVisible();
    await expect(page.locator("#flash")).toContainText(
      "Your username is invalid!"
    );
  });

  test("Form Authentication / invalid password", async ({ page }) => {
    await page.click("text = Form Authentication");
    await page.locator("#username").fill("tomsmith");
    await page.locator("#password").fill("theInternet!");
    await page.click('//*[@id="login"]/button/i');
    await expect(page.locator("#flash-messages")).toBeVisible();
    await expect(page.locator("#flash")).toContainText(
      "Your password is invalid!"
    );
  });

  test("Frames / Nested Frames", async ({ page }) => {
    await page.click("text = Frames");
    await page.click("text = Nested Frames");
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
  });

  test("Frames / iFrame", async ({ page }) => {
    await page.click("text = Frames");
    await page.click("text = iFrame");

    const frameTest = page.frameLocator("#mce_0_ifr").locator("html");

    await expect(frameTest.locator("#tinymce")).toHaveText(
      "Your content goes here."
    );

    await frameTest.click();
    for (let i = 0; i < 30; i++) {
      await frameTest.press("Backspace");
    }
    await frameTest.type("The Internet");
    await expect(frameTest.locator("#tinymce")).toHaveText("The Internet");
  });

  test("Geolocation", async ({ page }) => {
    await page.click("text = Geolocation");
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
  });

  test("Horizontal Slider", async ({ page }) => {
    await page.click("text = Horizontal Slider");
    await page.locator('//*[@id="content"]/div/div/input').fill("3");
    await expect(page.locator("#range")).toHaveText("3");
  });

  test("Hovers", async ({ page }) => {
    await page.click("text = Hovers");

    await page.hover('//*[@id="content"]/div/div[1]');
    await expect(
      page.locator('//*[@id="content"]/div/div[1]/div'),
      "1rd image details should be visible"
    ).toBeVisible();
    await expect(
      page.locator('//*[@id="content"]/div/div[2]/div'),
      "2rd image details should be hidden"
    ).toBeHidden();
    await expect(
      page.locator('//*[@id="content"]/div/div[3]/div'),
      "3rd image details should be hidden"
    ).toBeHidden();

    await page.hover('//*[@id="content"]/div/div[2]');
    await expect(
      page.locator('//*[@id="content"]/div/div[2]/div'),
      "2rd image details should be visible"
    ).toBeVisible();
    await expect(
      page.locator('//*[@id="content"]/div/div[1]/div'),
      "1rd image details should be hidden"
    ).toBeHidden();
    await expect(
      page.locator('//*[@id="content"]/div/div[3]/div'),
      "3rd image details should be hidden"
    ).toBeHidden();

    await page.hover('//*[@id="content"]/div/div[3]');
    await expect(
      page.locator('//*[@id="content"]/div/div[3]/div'),
      "3rd image details should be visible"
    ).toBeVisible();
    await expect(
      page.locator('//*[@id="content"]/div/div[1]/div'),
      "1st image details should be hidden"
    ).toBeHidden();
    await expect(
      page.locator('//*[@id="content"]/div/div[2]/div'),
      "2nd image details should be hidden"
    ).toBeHidden();
  });

  test("Infinite Scroll", async ({ page }) => {
    await page.click("text = Infinite Scroll");
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
  });

  test("Inputs", async ({ page }) => {
    await page.click("text = Inputs");
    await page
      .locator('//*[@id="content"]/div/div/div/input')
      .type('12dfDF!"@{34');
    await expect(
      page.locator('//*[@id="content"]/div/div/div/input')
    ).toHaveValue("1234");
  });

  test("JQuery UI Menus", async ({ page }) => {
    await page.click("text = JQuery UI Menus");
    await page.hover("#ui-id-3");
    await page.hover("#ui-id-4");
    await expect(page.locator("#ui-id-5")).toBeVisible();
    await expect(page.locator("#ui-id-6")).toBeVisible();
    await expect(page.locator("#ui-id-7")).toBeVisible();
    await page.hover("#ui-id-8");
    await page.click("#ui-id-8");
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/jqueryui");
  });

  test("JavaScript Alerts / Alert", async ({ page }) => {
    await page.click("text = JavaScript Alerts");

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toEqual("I am a JS Alert");
      await dialog.accept();
    });
    await page.click('//*[@id="content"]/div/ul/li[1]/button');
    await expect(page.locator('//*[@id="result"]')).toHaveText(
      "You successfully clicked an alert"
    );
  });

  test("JavaScript Alerts / Confirm-OK", async ({ page }) => {
    await page.click("text = JavaScript Alerts");

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toEqual("I am a JS Confirm");
      await dialog.accept();
    });
    await page.click('//*[@id="content"]/div/ul/li[2]/button');
    await expect(page.locator('//*[@id="result"]')).toHaveText(
      "You clicked: Ok"
    );
  });

  test("JavaScript Alerts / Confirm-Cancel", async ({ page }) => {
    await page.click("text = JavaScript Alerts");

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toEqual("I am a JS Confirm");
      await dialog.dismiss();
    });
    await page.click('//*[@id="content"]/div/ul/li[2]/button');
    await expect(page.locator('//*[@id="result"]')).toHaveText(
      "You clicked: Cancel"
    );
  });

  test("JavaScript Alerts / Prompt", async ({ page }) => {
    await page.click("text = JavaScript Alerts");
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toEqual("I am a JS prompt");
      await dialog.accept("The Internet");
    });
    await page.click('//*[@id="content"]/div/ul/li[3]/button');
    await expect(page.locator('//*[@id="result"]')).toHaveText(
      "You entered: The Internet"
    );
  });

  test("JavaScript onload event error", async ({ page }) => {
    await page.click("text = JavaScript onload event error");
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
  });

  test("Key Presses", async ({ page }) => {
    await page.click("text = Key Presses");
    await page.locator("#target").type("A");
    await expect(page.locator("#result")).toHaveText("You entered: A");

    await page.locator("#target").press("Backspace");
    await expect(page.locator("#result")).toHaveText("You entered: BACK_SPACE");

    await page.locator("#target").press("Shift");
    await expect(page.locator("#result")).toHaveText("You entered: SHIFT");

    await page.locator("#target").type("ABCD");
    await expect(page.locator("#result")).toHaveText("You entered: D");

    await page.locator("#target").type("a");
    await expect(page.locator("#result")).toHaveText("You entered: A");
  });

  test("Large & Deep DOM", async ({ page }) => {
    await page.click("text = Large & Deep DOM");
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
  });

  //Need to disable beforeEach for next test

  test("Multiple Windows", async ({ context }) => {
    const page = await context.newPage();
    await page.goto("https://the-internet.herokuapp.com/windows");

    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      // This action triggers the new tab
      page.locator('//*[@id="content"]/div/a').click(),
    ]);

    await expect(newPage).toHaveURL(
      "https://the-internet.herokuapp.com/windows/new"
    );
  });

  test("Nested Frames", async ({ page }) => {
    await page.click("text = Nested Frames");
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
  });

  test("Notification Messages", async ({ page }) => {
    await page.click("text = Notification Messages");

    await expect(page.locator("#flash")).toBeVisible();
  });

  test("Redirect Link", async ({ page }) => {
    await page.click("text = Redirect Link");
    await page.click("#redirect");
    await expect(page).toHaveURL(
      "https://the-internet.herokuapp.com/status_codes"
    );
  });

  test("Secure File Download", async ({ page }) => {
    await page.click("text = Secure File Download");
    //
    //
    //
    //
    //
    //
    //
    //
    //
  });

  test("Shadow DOM", async ({ page }) => {
    await page.click("text = Shadow DOM");
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
  });

  test("Shifting Content", async ({ page }) => {
    await page.click("text = Shifting Content");
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
  });

  test("Slow Resources", async ({ page }) => {
    await page.click("text = Slow Resources");
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
  });

  test("Sortable Data Tables / Example 1", async ({ page }) => {
    await page.click("text = Sortable Data Tables");

    await page.locator("tr").first().waitFor();
    await page.locator("td").first().waitFor();

    const rows = await page.locator('//*[@id="table1"]/tbody >> tr').count();
    const columns = await page
      .locator('//*[@id="table1"]/tbody/tr[1] >> td')
      .count();

    for (let i = 1; i <= columns; i++) {
      let original = [];
      let sorted = [];

      for (let j = 1; j <= rows; j++) {
        if (i !== 4) {
          original.push(
            await page
              .locator(`//*[@id="table1"]/tbody/tr[${j}]/td[${i}]`)
              .innerText()
          );
        } else {
          let test = await page
            .locator(`//*[@id="table1"]/tbody/tr[${j}]/td[${i}]`)
            .innerText();

          test = test.slice(1);

          original.push(Number(test));
        }
      }

      await page.click(`//*[@id="table1"]/thead/tr/th[${i}]`);

      for (let j = 1; j <= rows; j++) {
        if (i !== 4) {
          sorted.push(
            await page
              .locator(`//*[@id="table1"]/tbody/tr[${j}]/td[${i}]`)
              .innerText()
          );
        } else {
          let test = await page
            .locator(`//*[@id="table1"]/tbody/tr[${j}]/td[${i}]`)
            .innerText();

          test = test.slice(1);

          sorted.push(Number(test));
        }
      }

      console.log(original, sorted);
      if (i !== 4) {
        original.sort();
      } else {
        original.sort(function (a, b) {
          return Number(a) - Number(b);
        });
      }

      expect(sorted).toEqual(original);
    }
  });

  test("Sortable Data Tables / Example 2", async ({ page }) => {
    await page.click("text = Sortable Data Tables");

    let classes = [".last-name", ".first-name", ".email", ".dues", ".web-site"];

    await page.locator(".last-name").first().waitFor();
    let rows = await page.locator(".last-name").count();

    for (let i = 0; i < classes.length; i++) {
      let original = [];
      let sorted = [];
      const element = classes[i];

      if (element !== ".dues") {
        for (let i = 1; i < rows; i++) {
          original.push(await page.locator(element).nth(i).innerText());
        }
      } else {
        for (let i = 1; i < rows; i++) {
          let num = await page.locator(element).nth(i).innerText();

          num = num.slice(1);

          original.push(Number(num));
        }
      }

      await page.locator(element).nth(0).click();

      if (element !== ".dues") {
        for (let i = 1; i < rows; i++) {
          sorted.push(await page.locator(element).nth(i).innerText());
        }
      } else {
        for (let i = 1; i < rows; i++) {
          let num = await page.locator(element).nth(i).innerText();

          num = num.slice(1);

          sorted.push(Number(num));
        }
      }

      console.log(original, sorted);
      
      if (element !== ".dues") {
        original.sort();
      } else {
        original.sort(function (a, b) {
          return Number(a) - Number(b);
        });
      }

      expect(sorted).toEqual(original);
    }
  });

  test("Typos", async ({ page }) => {
    await page.click("text = Typos");

    const text =
      "This example demonstrates a typo being introduced. It does it randomly on each page load.";
    const text2 = "Sometimes you'll see a typo, other times you won't.";

    await expect(page.locator('//*[@id="content"]/div/p[1]')).toHaveText(text);
    await expect(page.locator('//*[@id="content"]/div/p[2]')).toHaveText(text2);
  });
});
