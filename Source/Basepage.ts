import {expect,Locator,Page, test} from '@playwright/test'

export class BasePage{
    readonly page : Page;

    constructor(page:Page){
        this.page=page
    }


    /**
   * Clicks on a web element safely with retries, visibility checks, and error handling.
   * @param element - The Playwright Locator for the element.
   * @param elementName - A readable name for logs and screenshots.
   * @param timeout - Optional custom timeout in ms (default: 5000).
   */
  async clickElement(element: Locator, elementName: string, timeout: number = 5000): Promise<void> {
    console.log(`🟡 Attempting to click: ${elementName}`);

    try {
      // ✅ Wait for the element to be visible and enabled
      await expect(element).toBeVisible({ timeout });
      await expect(element).toBeEnabled({ timeout });

      // ✅ Scroll element into view before clicking
      await element.scrollIntoViewIfNeeded();

      // ✅ Perform the click
      await element.click({ timeout });
      console.log(`✅ Successfully clicked: ${elementName}`);

    } catch (error) {
      // ❌ Handle click failure
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = `click-failed-${elementName.replace(/\s+/g, '_')}-${timestamp}.png`;

      console.error(`❌ Failed to click: ${elementName}`);
      console.error(`📄 Error: ${(error as Error).message}`);

      // 📸 Capture screenshot for debugging
      await this.page.screenshot({ path: `test-results/${fileName}`, fullPage: true });
      console.log(`📸 Screenshot saved: test-results/${fileName}`);

      // Re-throw error to fail test if necessary
      throw new Error(`Click failed on ${elementName}. Error: ${(error as Error).message}`);
    }
  }

  /**
   * Fills a text field safely with visibility checks, retries, and error handling.
   * @param element - The Playwright Locator for the input or textarea element.
   * @param text - The text value to type into the element.
   * @param elementName - A readable name for logs and screenshots.
   * @param timeout - Optional custom timeout in ms (default: 5000).
   */
  async fillElement(
    element: Locator,
    text: string,
    elementName: string,
    timeout: number = 5000
  ): Promise<void> {
    console.log(`🟡 Attempting to fill "${elementName}" with value: "${text}"`);

    try {
      // ✅ Wait for element to be visible and enabled
      await expect(element).toBeVisible({ timeout });
      await expect(element).toBeEnabled({ timeout });

      // ✅ Clear any existing text before filling
      await element.fill('');
      await element.fill(text, { timeout });

      console.log(`✅ Successfully filled "${elementName}" with value: "${text}"`);

    } catch (error) {
      // ❌ Handle failure
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = `fill-failed-${elementName.replace(/\s+/g, '_')}-${timestamp}.png`;

      console.error(`❌ Failed to fill "${elementName}"`);
      console.error(`📄 Error: ${(error as Error).message}`);

      // 📸 Take screenshot for debugging
      await this.page.screenshot({ path: `test-results/${fileName}`, fullPage: true });
      console.log(`📸 Screenshot saved at: test-results/${fileName}`);

      // Rethrow to fail the test
      throw new Error(`Fill failed on "${elementName}". Error: ${(error as Error).message}`);
    }
  }

  /**
   * Selects an option from a dropdown by its visible text.
   * Handles native <select> tags and custom dropdowns.
   * @param dropdown - The Playwright Locator for the dropdown element.
   * @param visibleText - The visible text of the option to select.
   * @param dropdownName - A name for logs and error messages.
   * @param timeout - Maximum wait time in ms (default: 5000).
   */
  async selectDropdownByText(
    dropdown: Locator,
    visibleText: string,
    dropdownName: string,
    timeout: number = 5000
  ): Promise<void> {
    try {
      console.log(`🔽 Attempting to select "${visibleText}" from ${dropdownName}`);

      // Wait until dropdown is visible
      await dropdown.waitFor({ state: "visible", timeout });

      // Try native <select> dropdown first
      const tagName = await dropdown.evaluate(el => el.tagName.toLowerCase());
      if (tagName === "select") {
        await dropdown.selectOption({ label: visibleText });
        console.log(`✅ Selected "${visibleText}" from native select dropdown`);
        return;
      }

      // For custom dropdowns (div, span, li, etc.)
      await dropdown.click();
      const option = this.page.locator(`text="${visibleText}"`);
      await expect(option).toBeVisible({ timeout });
      await option.click();

      console.log(`✅ Selected "${visibleText}" from custom dropdown`);
    } catch (error) {
      console.error(`❌ Failed to select "${visibleText}" from ${dropdownName}`);
      throw error;
    }
  }

  /**
   * Selects a date in a date picker (supports native and custom date pickers).
   * @param dateInput - Locator for the date input or calendar trigger.
   * @param dateValue - Date string in format 'YYYY-MM-DD'.
   * @param elementName - Descriptive name for logging.
   * @param timeout - Optional custom timeout in ms (default: 5000).
   */
  async selectDate(
    dateInput: Locator,
    dateValue: string,
    elementName: string,
    timeout: number = 5000
  ): Promise<void> {
    try {
      console.log(`📅 Attempting to select date "${dateValue}" for ${elementName}`);

      // Wait for input to be visible
      await expect(dateInput).toBeVisible({ timeout });

      // Detect element tag type
      const tagName = await dateInput.evaluate(el => el.tagName.toLowerCase());
      const typeAttr = await dateInput.evaluate(el => (el as HTMLInputElement).type);

      // ✅ Case 1: Native <input type="date">
      if (tagName === "input" && typeAttr === "date") {
        await dateInput.fill(dateValue);
        console.log(`✅ Set native date input value to ${dateValue}`);
        return;
      }

      // ✅ Case 2: Custom date picker UI (calendar popup)
      await dateInput.click();
      {timeout:10000}
      console.log("📆 Calendar popup opened (custom date picker)");

      // Split input date into parts
      const [year, month, day] = dateValue.split("-").map(Number);

      // Example locator patterns for a custom calendar:
      const yearSelector = this.page.locator(`text='${year}'`);
      const monthSelector = this.page.locator(`text='${month}'`);
      const daySelector = this.page.locator(`text='${day}'`);

      // Try to find and click each
      if (await yearSelector.isVisible()) {
        {timeout:10000}
        await yearSelector.click(); 
        console.log(`🗓 Year selected: ${year}`);
      }
      if (await monthSelector.isVisible()) {
        {timeout:10000}
        await monthSelector.click();
        console.log(`📆 Month selected: ${month}`);
      }
      if (await daySelector.isVisible()) {
        {timeout:10000}
        await daySelector.click();
        console.log(`✅ Day selected: ${day}`);
      }

    } catch (error) {
      console.error(`❌ Failed to select date "${dateValue}" for ${elementName}`);
      throw error;
    }
  }
    /**
   * Performs a search action by typing text and pressing Enter (or clicking a search button).
   * @param searchInput - Locator for the search input box.
   * @param searchText - The text to search for.
   * @param elementName - A readable name for logs and screenshots.
   * @param searchButton - Optional locator for a search button (if Enter key is not enough).
   * @param timeout - Optional custom timeout in ms (default: 5000).
   */
  async PerformSearch(
    searchInput: Locator,
    searchText: string,
    elementName: string,
    searchButton?: Locator,
    timeout: number = 5000
  ): Promise<void> {
    try {
      console.log(`🔍 Starting search for "${searchText}" in ${elementName}`);

      // Ensure the search box is visible and enabled
      await expect(searchInput).toBeVisible({ timeout });
      await expect(searchInput).toBeEnabled({ timeout });

      // Clear any pre-filled text
      await searchInput.fill("");
      console.log(`✏️ Cleared existing text in ${elementName}`);

      // Type the new search query
      await searchInput.fill(searchText);
      console.log(`⌨️ Typed "${searchText}" into ${elementName}`);

      // Either click a search button or press Enter
      if (searchButton) {
        await expect(searchButton).toBeVisible({ timeout });
        await searchButton.click();
        console.log(`🖱️ Clicked search button for ${elementName}`);
      } else {
        await this.page.keyboard.press("Enter");
        console.log(`⏎ Pressed Enter to submit search in ${elementName}`);
      }

      // Optional: wait for results or loading indicator
      await this.page.waitForTimeout(2000); // Adjust as needed

      console.log(`✅ Search completed for "${searchText}"`);

    } catch (error) {
      console.error(`❌ Search failed for "${searchText}" in ${elementName}:`, error);

      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const screenshotPath = `test-output/search-failed-${elementName}-${timestamp}.png`;

      await this.page.screenshot({ path: screenshotPath, fullPage: true }).catch(() => null);
      console.log(`📸 Screenshot saved: ${screenshotPath}`);

      throw new Error(`Search for "${searchText}" failed. Screenshot: ${screenshotPath}`);
    }
  }
  /**
   * Selects an option from an autocomplete/suggestion dropdown.
   * Works with input fields that show dynamic suggestions while typing.
   *
   * @param inputLocator - Locator for the input/search field.
   * @param optionText - The text to select from the suggestion list.
   * @param suggestionsLocator - Locator for suggestion options (li/div elements).
   * @param timeout - Optional timeout in ms (default: 5000).
   */
  async selectFromSuggestionList(
    inputLocator: Locator,
    optionText: string,
    suggestionsLocator: Locator,
    timeout: number = 5000
  ): Promise<void> {
    console.log(`🔍 Attempting to select "${optionText}" from suggestion list...`);

    try {
      // Step 1: Wait for input to be visible
      await expect(inputLocator).toBeVisible({ timeout });

      // Step 2: Focus and type text
      await inputLocator.click();
      await inputLocator.fill(optionText.substring(0, 3)); // type first letter
      await this.page.waitForTimeout(2000); // small delay for suggestions to appear

      // Step 3: Wait for suggestion list to populate
      await expect(suggestionsLocator.first()).toBeVisible({ timeout : 20000 });

      // Step 4: Find matching option
      const matchingOption = suggestionsLocator.filter({
        hasText: optionText,
      });

      const count = await matchingOption.count();

      if (count === 0) {
        console.log(`⚠️ No suggestion found for "${optionText}"`);
        throw new Error(`No matching suggestion for text: ${optionText}`);
      }

      // Step 5: Click the first matched option
      await matchingOption.first().click();
      console.log(`✅ Selected suggestion: "${optionText}"`);
    } catch (error) {
      console.error(`❌ Failed to select from suggestion list: ${error}`);
      const screenshot = `suggestion_fail_${Date.now()}.png`;
      await this.page.screenshot({ path: `test-results/${screenshot}` });
      throw error;
    }
  }
  
  async SelectTab(RequiredTab:Locator,Tabname:string,timeout?:1000):Promise<void>{
        await RequiredTab.click()
        console.log(`Navigated to ${Tabname}`)
}

}