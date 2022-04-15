import { generateRandomAlphanumeric } from "~/services/util/generateRandomAlphanumeric";
import { db } from "~/utils/db.server";

export type { RaceTierList } from "@prisma/client";

export const getRaceTierList = async (id: string) => {
  return db.raceTierList.findUnique({
    where: {
      id,
    },
  });
};

export const createRaceTierList = async (json: any) => {
  const id = generateRandomAlphanumeric();
  return db.raceTierList.create({
    data: {
      id,
      json: JSON.stringify(json),
    },
  });
};

export const deleteRaceTierList = async (id: string) => {
  return db.raceTierList.delete({ where: { id } });
};

export const updateRaceTierList = async (id: string, body: any) => {
  return db.raceTierList.update({
    where: {
      id,
    },
    data: {
      json: JSON.stringify(body),
    },
  });
};
