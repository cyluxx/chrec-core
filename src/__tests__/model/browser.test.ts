import { Capabilities, Capability, ISize, WebDriver } from 'selenium-webdriver';
import { Chrome } from '../../model/browser/chrome';
import { Edge } from '../../model/browser/edge';
import { Firefox } from '../../model/browser/firefox';

const SELENIUM_GRID_URL: string = 'localhost:4444';

test('BuildWebDriver builds proper edge', async () => {
    const browser: Edge = new Edge('foo', 800, 600);
    const driver: WebDriver = browser.buildWebDriver(SELENIUM_GRID_URL);
    const capabilities: Capabilities = await driver.getCapabilities();
    const size: ISize = await driver.manage().window().getSize();
    driver.quit();

    expect.assertions(3);
    expect(capabilities.get(Capability.BROWSER_NAME)).toEqual('MicrosoftEdge');
    expect(size.width).toEqual(800);
    expect(size.height).toEqual(600);
});

test('BuildWebDriver builds proper firefox', async () => {
    const browser: Firefox = new Firefox('foo', 800, 600);
    const driver: WebDriver = browser.buildWebDriver(SELENIUM_GRID_URL);
    const capabilities: Capabilities = await driver.getCapabilities();
    const size: ISize = await driver.manage().window().getSize();
    driver.quit();

    expect.assertions(3);
    expect(capabilities.get(Capability.BROWSER_NAME)).toEqual('firefox');
    expect(size.width).toEqual(800);
    expect(size.height).toEqual(600);
});

test('BuildWebDriver builds proper chrome', async () => {
    const browser: Chrome = new Chrome('foo', 800, 600, false);
    const driver: WebDriver = browser.buildWebDriver(SELENIUM_GRID_URL);
    const capabilities: Capabilities = await driver.getCapabilities();
    const size: ISize = await driver.manage().window().getSize();
    driver.quit();

    expect.assertions(3);
    expect(capabilities.get(Capability.BROWSER_NAME)).toEqual('chrome');
    expect(size.width).toEqual(800);
    expect(size.height).toEqual(600);
});

test('BuildWebDriver builds proper headless chrome', async () => {
    const browser: Chrome = new Chrome('foo', 800, 600, true);
    const driver: WebDriver = browser.buildWebDriver(SELENIUM_GRID_URL);
    const capabilities: Capabilities = await driver.getCapabilities();
    const size: ISize = await driver.manage().window().getSize();
    driver.quit();

    expect.assertions(3);
    expect(capabilities.get(Capability.BROWSER_NAME)).toEqual('chrome');
    expect(size.width).toEqual(800);
    expect(size.height).toEqual(600);
});