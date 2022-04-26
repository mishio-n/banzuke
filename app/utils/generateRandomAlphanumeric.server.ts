import crypto from "crypto";

const charctors = "abcdefghijklmnopqrstuvwxyz0123456789";

export const generateRandomAlphanumeric = (length = 16) => {
  return Array.from(crypto.randomFillSync(new Uint8Array(length)))
    .map((n) => charctors[n % charctors.length])
    .join("");
};
