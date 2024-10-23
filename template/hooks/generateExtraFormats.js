const puppeteer = require('puppeteer');

module.exports = {
  'generate:after': async (generator) => {
    const asyncapi = generator.asyncapi;
    const targetDir = generator.targetDir;
    const templateParams = generator.templateParams;

    if (templateParams.pdf === 'true') {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const content = await generator.render('template.html', { asyncapi });

      await page.setContent(content);
      await page.pdf({ format: 'A4', path: `${targetDir}/index.pdf` });
      await browser.close();
    }
  }
}
