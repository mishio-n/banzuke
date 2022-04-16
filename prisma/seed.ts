import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  // Owner
  const owner1 = await prisma.owner.create({
    data: {
      name: "社台レースホース",
      colors:
        "https://horse-racing-colors.s3.ap-northeast-1.amazonaws.com/shadai-rh.svg",
    },
  });

  // Horse
  const horse1 = await prisma.horse.create({
    data: {
      id: "2018104541",
      name: "プログノーシス",
      genderCategory: "MALE",
      link: "https://db.netkeiba.com/horse/2018104541/",
      birthyear: 2018,
      sire: "ディープインパクト",
      bloodmare: "ヴェルダ",
      owner: {
        connect: {
          id: owner1.id,
        },
      },
      stable: {
        create: {
          name: "中内田充",
          region: "RITTO",
        },
      },
    },
  });

  console.log(owner1);
  console.log(horse1);

  const raceTemplate1 = await prisma.raceTemplate.create({
    data: {
      id: "202209020609",
      json: JSON.stringify({
        totalHorseNum: 8,
        horseList: [
          { horse: "セルケト", horseNum: 1, jockey: "横山武" },
          { horse: "インザオベーション", horseNum: 2, jockey: "武豊" },
          { horse: "ユキノプリンセス", horseNum: 3, jockey: "幸" },
          { horse: "グランスラムアスク", horseNum: 4, jockey: "古川奈" },
          { horse: "シーグラス", horseNum: 5, jockey: "戸崎圭" },
          { horse: "ダイム", horseNum: 6, jockey: "横山典" },
          { horse: "アートハウス", horseNum: 7, jockey: "川田" },
          { horse: "ロマンシングブルー", horseNum: 8, jockey: "ルメール" },
        ],
      }),
    },
  });

  console.log(raceTemplate1);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
