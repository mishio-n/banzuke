import { getRaceData } from "~/services/race/getRaceData";
import { db } from "~/utils/db.server";

export type { RaceTemplate } from "@prisma/client";
export type RaceTemplateJson = {
  horseList: RaceTemplateHorse[];
  totalHorseNum: number;
};
export type RaceTemplateHorse = {
  horseNum: number;
  horse: string;
  jockey: string;
};

export const getRaceTemplates = async () => {
  return db.raceTemplate.findMany({ select: { id: true, title: true } });
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
      title,
      json: JSON.stringify({ ...raceData }),
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
