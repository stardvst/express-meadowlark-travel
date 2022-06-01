const portfinder = require('portfinder');
const puppeteer = require('puppeteer');

const app = require('../app');

let server = null;
let port = null;

beforeEach(async () => {
  port = await portfinder.getPortPromise();
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

test('should link to about page from home page', async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}`);

  await Promise.all([page.waitForNavigation(), page.click('[data-test-id="about"]')]);
  expect(await page.url()).toBe(`http://localhost:${port}/about`);
  await browser.close();
});
