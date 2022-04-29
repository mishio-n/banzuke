import { db } from "~/utils/db.server";
import { generateRandomAlphanumeric } from "~/utils/generateRandomAlphanumeric.server";

export type { RaceTierList } from "@prisma/client";
export type RaceTierListJson = {
  S: RaceTierListHorse[];
  A: RaceTierListHorse[];
  B: RaceTierListHorse[];
  C: RaceTierListHorse[];
  D: RaceTierListHorse[];
  E: RaceTierListHorse[];
  initialList: RaceTierListHorse[];
};

export type RaceTierListHorse = {
  horseNum: number;
  horse: string;
};

export const getRaceTierList = async (id: string) => {
  return db.raceTierList.findUnique({
    where: {
      id,
    },
  });
};

export const getRaceTierLists = async (raceTemplateId?: string) => {
  return db.raceTierList.findMany({
    where: {
      raceTemplateId,
    },
  });
};

export const createRaceTierList = async (
  raceTemplateId: string,
  json: RaceTierListJson,
  comment: string,
  title: string
) => {
  const id = generateRandomAlphanumeric();
  return db.raceTierList.create({
    data: {
      id,
      title,
      json: JSON.stringify(json),
      comment,
      raceTemplateId,
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
