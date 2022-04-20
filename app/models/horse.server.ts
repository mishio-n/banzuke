import { GenderCategory } from "@prisma/client";
import { getHorseData } from "~/services/horse/getHorseData.server";
import { db } from "~/utils/db.server";

export type { Horse } from "@prisma/client";

export const getGenerations = async () => {
  return db.horse.groupBy({ by: ["birthyear"] });
};

export const getHorseDataByGeneration = async (
  birthyear: number,
  genderCategory?: GenderCategory
) => {
  const result = await db.horse.findMany({
    where: {
      birthyear,
      genderCategory,
    },
  });

  return result;
};

export const createHorseData = async (link: string) => {
  const data = await getHorseData(link);
  if (data === null) {
    throw new Error("");
  }
  const { ownerName, stableName, stableRegion, ...horseData } = data;

  const owner = await db.owner.findUnique({
    where: { name: ownerName },
  });

  const stable = await db.stable.findUnique({
    where: {
      name: stableName,
    },
  });

  const result = await db.horse.create({
    data: {
      ...horseData,
      owner: owner
        ? { connect: { id: owner.id } }
        : { create: { name: ownerName } },
      link,
      stable: stable
        ? { connect: { id: stable.id } }
        : {
            create: {
              name: stableName,
              region: stableRegion,
            },
          },
    },
  });

  return result;
};
