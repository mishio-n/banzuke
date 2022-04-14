import { ElementHandle } from "puppeteer";

export const getTextFromElement = async (
  element: ElementHandle | null,
  selector = "",
  propertyName = "textContent"
): Promise<string | null> => {
  const selected = selector ? await element?.$(selector) : element;
  if (!selected) {
    return null;
  }
  const text = await (await selected?.getProperty(propertyName))?.jsonValue();
  if (typeof text !== "string") {
    return null;
  }
  return text.trim();
};
