"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getAmdDesktopGamingProsessors;
const puppeteer_1 = require("puppeteer");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { amd_website_domain, amd_desktop_prosessors_route } = process.env;
async function evaluatePage(page) {
    return await page.evaluate(() => {
        const amd_prosessor_series = Array.from(document.querySelectorAll("ol.cmp-tabs__tablist")[1].querySelectorAll("li"));
        return amd_prosessor_series.map(async (amd_prosessor_serie) => {
            const seriesId = amd_prosessor_serie.getAttribute('id');
            const seriesTableSection = `${seriesId}panel`;
            await page.waitForSelector(`#${seriesTableSection} tbody tr td:first-child`);
            const amd_processors_in_series = Array.from(document.querySelectorAll(`#${seriesTableSection} tbody tr td:first-child`));
            return amd_processors_in_series.map(td => {
                const name = td.textContent?.trim();
                const link = td.getAttribute('href');
                return { name, link };
            });
        });
    });
}
async function getAmdDesktopGamingProsessors() {
    const browser = await (0, puppeteer_1.launch)({
        headless: false,
        defaultViewport: {
            height: 1000,
            width: 1300
        }
    });
    const page = await browser.newPage();
    await page.goto(`${amd_website_domain}${amd_desktop_prosessors_route}`);
    // await page.waitForNavigation({ waitUntil: "load" })
    const amd_prosessor_series = await evaluatePage(page);
    console.log(amd_prosessor_series);
}
// export default getAmdDesktopGamingProsessors()
