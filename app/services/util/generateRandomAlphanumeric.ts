const charctors = "abcdefghijklmnopqrstuvwxyz0123456789";

export const generateRandomAlphanumeric = (length = 16) => {
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((n) => charctors[n % charctors.length])
    .join("");
};
