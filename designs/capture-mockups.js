/**
 * Capture each .phone frame from designs/index.html into designs/mockups/
 * so static mockups match the HTML source of truth.
 */
const path = require("path");
const fs = require("fs");
const http = require("http");
const puppeteer = require("puppeteer-core");

const ROOT = path.resolve(__dirname, "..");
const HTML = path.join(ROOT, "designs", "index.html");
const OUT = path.join(ROOT, "designs", "mockups");
const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const SCREENS = [
  "s01",
  "s02",
  "s03",
  "s04",
  "s05-setup",
  "s05-roster",
  "s05",
  "s06",
  "s07",
  "s08",
  "s09",
  "s10",
  "s10b",
];

const NAMES = {
  s01: "s01-role-select",
  s02: "s02-parent-home",
  s03: "s03-bind-child",
  s04: "s04-timeline",
  "s05-setup": "s05a-teacher-create-class",
  "s05-roster": "s05b-teacher-upload-roster",
  s05: "s05-teacher-home",
  s06: "s06-roster",
  s07: "s07-teacher-score",
  s08: "s08-ranking-board",
  s09: "s09-admin-overview",
  s10: "s10-admin-class-rank",
  s10b: "s10b-admin-person-rank",
};

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  const html = fs.readFileSync(HTML);
  const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const { port } = server.address();
  const url = `http://127.0.0.1:${port}/`;

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1200, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: "networkidle0" });

  // Hide gallery chrome so only phones matter; wait fonts
  await page.addStyleTag({
    content: `
      .page-head, .nav-tabs, .footer-note, .screen-label { display: none !important; }
      .gallery { padding: 40px !important; gap: 80px !important; }
      body { background: #E9F0ED !important; }
    `,
  });
  await page.evaluate(() => document.fonts.ready);

  // Remove old AI jpgs that no longer match
  for (const f of fs.readdirSync(OUT)) {
    if (/\.(jpg|jpeg|png)$/i.test(f)) fs.unlinkSync(path.join(OUT, f));
  }

  for (const id of SCREENS) {
    const el = await page.$(`#${id} .phone`);
    if (!el) {
      console.warn("missing", id);
      continue;
    }
    await el.scrollIntoViewIfNeeded();
    await new Promise((r) => setTimeout(r, 200));
    const outPath = path.join(OUT, `${NAMES[id]}.png`);
    await el.screenshot({ path: outPath, type: "png" });
    console.log("wrote", outPath);
  }

  await browser.close();
  server.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
