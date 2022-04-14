import { GenderCategory, StableRegion } from "@prisma/client";
import Puppeteer from "puppeteer";
import { getTextFromElement } from "~/services/util/puppeteer";

export const getHorseData = async (url: string) => {
  const id = url.split("/")[4];
  const birthYear = +id.substring(0, 4);

  const browser = await Puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  const titleElement = await page.$("div.horse_title");
  const name = await getTextFromElement(titleElement, "h1");
  const meta = await getTextFromElement(titleElement, "p.txt_01");
  if (name === null) {
    return null;
  }
  if (meta === null) {
    return null;
  }

  const genderCategory: GenderCategory =
    meta.split("　")[1].split("")[0] === "牝" ? "FEMALE" : "MALE";

  const profileTableElement = await page.$$("table.db_prof_table > tbody > tr");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_1, stableElement, ownerElement, ..._2] = profileTableElement;

  const ownerName = await getTextFromElement(ownerElement, "td > a");
  if (ownerName === null) {
    return null;
  }

  const [stableName, region] = (await getTextFromElement(
    stableElement,
    "td"
  ))!.split("(");
  const stableRegion: StableRegion = region.includes("美浦") ? "MIHO" : "RITTO";

  const bloodTableElement = await page.$$("table.blood_table > tbody > tr");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sireElement, _3, bloodmareElement, _4] = bloodTableElement;

  const sire = await getTextFromElement(sireElement, "td");
  const bloodmare = await getTextFromElement(bloodmareElement, "td");
  if (sire === null) {
    return null;
  }
  if (bloodmare === null) {
    return null;
  }

  await browser.close();

  return {
    id,
    name,
    birthYear,
    genderCategory,
    ownerName,
    stableName,
    stableRegion,
    sire,
    bloodmare,
  };
};
