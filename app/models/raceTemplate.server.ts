import { getRaceData } from "~/services/race/getRaceData";
import { db } from "~/utils/db.server";

export type { RaceTemplate } from "@prisma/client";

export const getRaceTemplates = async () => {
  return db.raceTemplate.findMany();
};

export const getRaceTemplate = async (id: string) => {
  return db.raceTemplate.findUnique({
    where: {
      id,
    },
  });
};

export const createRaceTemplate = async (url: string, title: string) => {
  const { id, ...raceData } = await getRaceData(url);

  const result = await db.raceTemplate.create({
    data: {
      id,
      json: JSON.stringify({ ...raceData, title }),
    },
  });

  return result;
};

export const deleteRaceTemplate = async (id: string) => {
  return db.raceTemplate.delete({
    where: {
      id,
    },
  });
};
