const fs = require("fs");
const puppeteer = require("puppeteer");

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.traversymedia.com");

  // downloading page. shows the folder that will be opened in. to reach full page = fullPage: true
  //   await page.pdf({ path: 'example.pdf', format: 'A4' })

  // getting HTML from browser page
  //   const html = await page.content();

  // grabbing documents by title
  //   const title = await page.evaluate(() => document.title);

  // getting all documents and their inner text
  // const text = await page.evaluate(() => document.body.innerText);

  // getting all documents that include a, as an example
  //   const links = await page.evaluate(() =>
  //     Array.from(document.querySelectorAll("a"), (e) => e.href)
  //   );

  // pulling an array of specific SSR
  // const courses = await page.evaluate(() =>
  // Array.from(document.querySelectorAll('#courses .card'), (e) => ({
  //     title: e.querySelector('.card-body h3').innerText,
  //     level: e.querySelector('.card-body .level').innerText,
  //     url: e.querySelector('.card-footer a').href,
  //     promo: e.querySelector('.card-footer .promo-code .promo').innerText,
  // }))
  // );

  const courses = await page.$$eval("#courses .card", (elements) =>
    elements.map((e) => ({
      title: e.querySelector(".card-body h3").innerText,
      level: e.querySelector(".card-body .level").innerText,
      url: e.querySelector(".card-footer a").href,
      promo: e.querySelector('.card-footer .promo-code .promo').innerText,
    }))
  );
  console.log(courses);

  // Save data to JSON file
  fs.writeFile("courses.json", JSON.stringify(courses), (err) => {
    if (err) throw err;
    console.log("File saved");
  });


  await browser.close();
}

run();
